(function () {
  const navigation = document.querySelector('[data-section-navigation]');
  if (!navigation) return;

  const controls = Array.from(navigation.querySelectorAll('[data-section-control]'));
  const sections = Array.from(document.querySelectorAll('[data-project-section]'));
  const introductions = Array.from(document.querySelectorAll('[data-project-introduction]'));
  const projectBrowsers = Array.from(document.querySelectorAll('[data-project-browser-at-end]'));
  const mobileMedia = window.matchMedia('(max-width: 767px)');
  const validSections = new Set(controls.map((control) => control.dataset.sectionControl));

  function selectedFromUrl() {
    const requested = new URLSearchParams(window.location.search).get('section');
    if (requested === 'overview') return 'all';
    if (requested === 'structure') return 'development';
    return requested && validSections.has(requested) ? requested : 'all';
  }

  function applySection(sectionId, updateHistory) {
    const selected = validSections.has(sectionId) ? sectionId : 'all';
    const visibleSection = mobileMedia.matches ? 'all' : selected;

    sections.forEach((section) => {
      section.hidden = visibleSection !== 'all' && section.dataset.projectSection !== visibleSection;
    });

    introductions.forEach((introduction) => {
      introduction.hidden = visibleSection !== 'all';
    });

    projectBrowsers.forEach((projectBrowser) => {
      projectBrowser.hidden = visibleSection !== 'all';
    });

    controls.forEach((control) => {
      const active = control.dataset.sectionControl === selected;
      control.classList.toggle('is-active', active);
      control.setAttribute('aria-pressed', String(active));
    });

    if (updateHistory) {
      const url = new URL(window.location.href);
      if (selected === 'all') url.searchParams.delete('section');
      else url.searchParams.set('section', selected);
      history.pushState({}, '', url);
    }
  }

  controls.forEach((control) => {
    control.addEventListener('click', function () {
      applySection(control.dataset.sectionControl, true);

    });
  });

  window.addEventListener('popstate', function () {
    applySection(selectedFromUrl(), false);
  });
  mobileMedia.addEventListener('change', function () {
    applySection(selectedFromUrl(), false);
  });

  applySection(selectedFromUrl(), false);
})();
