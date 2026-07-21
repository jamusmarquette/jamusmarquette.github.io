(function () {
  const navigation = document.querySelector('[data-section-navigation]');
  if (!navigation) return;

  const controls = Array.from(navigation.querySelectorAll('[data-section-control]'));
  const sections = Array.from(document.querySelectorAll('[data-project-section]'));
  const introductions = Array.from(document.querySelectorAll('[data-project-introduction]'));
  const validSections = new Set(controls.map((control) => control.dataset.sectionControl));

  function selectedFromUrl() {
    const requested = new URLSearchParams(window.location.search).get('section');
    return requested && validSections.has(requested) ? requested : 'all';
  }

  function applySection(sectionId, updateHistory) {
    const selected = validSections.has(sectionId) ? sectionId : 'all';

    sections.forEach((section) => {
      section.hidden = selected !== 'all' && section.dataset.projectSection !== selected;
    });

    introductions.forEach((introduction) => {
      introduction.hidden = selected !== 'all';
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

      const shell = document.querySelector('[data-portfolio-shell]');
      const mobileToggle = shell && shell.querySelector('[data-mobile-sidebar-toggle]');
      if (shell) shell.classList.remove('is-mobile-sidebar-open');
      if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('portfolio-drawer-open');
    });
  });

  window.addEventListener('popstate', function () {
    applySection(selectedFromUrl(), false);
  });

  applySection(selectedFromUrl(), false);
})();
