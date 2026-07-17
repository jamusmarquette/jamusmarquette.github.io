(function () {
  const shell = document.querySelector('[data-portfolio-shell]');
  if (!shell) return;

  const storageKey = 'portfolio-sidebar-collapsed';
  const sidebarToggle = shell.querySelector('[data-sidebar-toggle]');
  const mobileToggle = shell.querySelector('[data-mobile-sidebar-toggle]');
  const backdrop = shell.querySelector('[data-sidebar-backdrop]');
  const homeControls = Array.from(shell.querySelectorAll('[data-home-control]'));
  const projectsControl = shell.querySelector('[data-projects-control]');
  const intro = shell.querySelector('[data-portfolio-intro]');
  const browserTools = shell.querySelector('[data-browser-tools]');
  const browser = shell.querySelector('[data-project-browser]');
  const cards = browser ? Array.from(browser.querySelectorAll('.project-card')) : [];
  const filters = Array.from(shell.querySelectorAll('.portfolio-category-filter'));
  const count = shell.querySelector('[data-project-count]');
  const emptyState = shell.querySelector('[data-empty-state]');

  function setCollapsed(collapsed) {
    shell.classList.toggle('is-sidebar-collapsed', collapsed);
    sidebarToggle.setAttribute('aria-expanded', String(!collapsed));
    sidebarToggle.querySelector('.portfolio-sidebar__toggle-label').textContent = collapsed ? 'Expand' : 'Collapse';
    sidebarToggle.querySelector('[data-sidebar-toggle-icon]').textContent = collapsed ? '→' : '←';
    sidebarToggle.title = collapsed ? 'Expand sidebar' : 'Collapse sidebar';
    localStorage.setItem(storageKey, String(collapsed));
  }

  function setMobileOpen(open) {
    shell.classList.toggle('is-mobile-sidebar-open', open);
    mobileToggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('portfolio-drawer-open', open);
  }

  function setHomeState(active, updateHistory) {
    if (!intro || !browserTools) return;
    intro.hidden = !active;
    browserTools.hidden = active;
    shell.classList.toggle('is-home-state', active);

    if (active && shell.classList.contains('is-sidebar-collapsed')) setCollapsed(false);

    if (updateHistory) {
      const url = new URL(window.location.href);
      if (active) url.searchParams.set('home', '1');
      else url.searchParams.delete('home');
      history.pushState({}, '', url);
    }
  }

  function setCategory(category, updateHistory) {
    if (!browser) return;
    const validCategory = filters.some((filter) => filter.dataset.category === category) ? category : 'all';
    let visible = 0;

    cards.forEach((card) => {
      const categories = card.dataset.category.trim().split(/\s+/).filter(Boolean);
      const show = validCategory === 'all' || categories.includes(validCategory);
      card.hidden = !show;
      if (show) visible += 1;
    });

    filters.forEach((filter) => {
      const active = filter.dataset.category === validCategory;
      filter.classList.toggle('is-active', active);
      filter.setAttribute('aria-pressed', String(active));
    });

    count.textContent = validCategory === 'all' ? `${cards.length} projects` : `${visible} of ${cards.length} projects`;
    emptyState.hidden = visible !== 0;

    if (updateHistory) {
      const url = new URL(window.location.href);
      url.searchParams.delete('home');
      if (validCategory === 'all') url.searchParams.delete('category');
      else url.searchParams.set('category', validCategory);
      history.pushState({}, '', url);
    }

    setHomeState(false, false);
  }

  sidebarToggle.addEventListener('click', function () {
    setCollapsed(!shell.classList.contains('is-sidebar-collapsed'));
  });
  mobileToggle.addEventListener('click', function () {
    setMobileOpen(!shell.classList.contains('is-mobile-sidebar-open'));
  });
  backdrop.addEventListener('click', function () { setMobileOpen(false); });

  if (browser) {
    homeControls.forEach((homeControl) => {
      homeControl.addEventListener('click', function (event) {
        event.preventDefault();
        setHomeState(true, true);
      });
    });
    projectsControl.addEventListener('click', function (event) {
      event.preventDefault();
      setHomeState(false, true);
      setMobileOpen(false);
    });
    filters.forEach((filter) => {
      filter.addEventListener('click', function () {
        setCategory(filter.dataset.category, true);
        setMobileOpen(false);
      });
    });
  }

  window.addEventListener('popstate', function () {
    const params = new URLSearchParams(window.location.search);
    setCategory(params.get('category') || 'all', false);
    setHomeState(params.get('home') === '1', false);
  });

  setCollapsed(localStorage.getItem(storageKey) === 'true');
  const params = new URLSearchParams(window.location.search);
  setCategory(params.get('category') || 'all', false);
  setHomeState(params.get('home') === '1', false);
})();
