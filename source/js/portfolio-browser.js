(function () {
  const shell = document.querySelector('[data-portfolio-shell]');
  if (!shell) return;

  const storageKey = 'portfolio-sidebar-collapsed';
  const homeColumns = 3;
  const workColumns = 6;
  const sidebarToggle = shell.querySelector('[data-sidebar-toggle]');
  const mobileToggle = shell.querySelector('[data-mobile-sidebar-toggle]');
  const backdrop = shell.querySelector('[data-sidebar-backdrop]');
  const homeControls = Array.from(shell.querySelectorAll('[data-home-control]'));
  const workControl = shell.querySelector('[data-projects-control]');
  const workCount = shell.querySelector('[data-work-count]');
  const intro = shell.querySelector('[data-portfolio-intro]');
  const browserTools = shell.querySelector('[data-browser-tools]');
  const browser = shell.querySelector('[data-project-browser]');
  const emptyState = shell.querySelector('[data-empty-state]');
  const allProjectsControl = shell.querySelector('[data-browser-view="all"]');
  const categoryControls = Array.from(shell.querySelectorAll('.portfolio-category-filter[data-category]'));
  const cardCategoryLinks = Array.from(shell.querySelectorAll('.portfolio-card-category[data-category]'));
  const columnsControl = shell.querySelector('[data-thumbnail-columns]');
  const columnsOutput = shell.querySelector('[data-thumbnail-columns-output]');
  const cards = browser ? Array.from(browser.querySelectorAll('.project-card')) : [];

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

  function validColumns(value, fallback) {
    const columns = Number(value);
    return Number.isInteger(columns) && columns >= 2 && columns <= 6 ? columns : fallback;
  }

  function stateFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const validCategory = categoryControls.some((control) => control.dataset.category === category);
    const type = validCategory ? 'category' : params.get('view') === 'all' ? 'all' : 'home';
    const fallbackColumns = type === 'home' ? homeColumns : workColumns;
    return { type, category: validCategory ? category : null, columns: validColumns(params.get('columns'), fallbackColumns) };
  }

  function defaultColumns(state) {
    return state.type === 'home' ? homeColumns : workColumns;
  }

  function writeUrl(state, replace) {
    const url = new URL(window.location.href);
    url.searchParams.delete('home');
    url.searchParams.delete('view');
    url.searchParams.delete('category');
    url.searchParams.delete('scale');
    url.searchParams.delete('columns');
    if (state.type === 'all') url.searchParams.set('view', 'all');
    if (state.type === 'category') url.searchParams.set('category', state.category);
    if (state.columns !== defaultColumns(state)) url.searchParams.set('columns', state.columns);
    history[replace ? 'replaceState' : 'pushState']({}, '', url);
  }

  function setColumns(columns) {
    const value = validColumns(columns, workColumns);
    columnsControl.value = value;
    columnsOutput.textContent = value;
    browser.style.setProperty('--portfolio-selected-columns', value);
  }

  function renderState(state, updateHistory) {
    if (!browser) return;
    const home = state.type === 'home';
    const visibleCards = state.type === 'category'
      ? cards.filter((card) => card.dataset.category.trim().split(/\s+/).includes(state.category))
      : cards;
    const visibleSet = new Set(visibleCards);

    cards.forEach((card) => { card.hidden = !visibleSet.has(card); });
    setColumns(state.columns);

    intro.hidden = !home;
    browserTools.hidden = home;
    shell.classList.toggle('is-home-state', home);
    workControl.classList.toggle('is-active', !home);
    if (home && shell.classList.contains('is-sidebar-collapsed')) setCollapsed(false);

    const allActive = state.type === 'all';
    allProjectsControl.classList.toggle('is-active', allActive);
    allProjectsControl.setAttribute('aria-pressed', String(allActive));
    categoryControls.forEach((control) => {
      const active = state.type === 'category' && control.dataset.category === state.category;
      control.classList.toggle('is-active', active);
      control.setAttribute('aria-pressed', String(active));
    });

    workCount.textContent = `(${visibleCards.length}/${cards.length})`;
    workControl.setAttribute('aria-label', `Work (${visibleCards.length} of ${cards.length} projects)`);
    emptyState.hidden = visibleCards.length !== 0;
    if (updateHistory) writeUrl(state, false);
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
        renderState({ type: 'home', category: null, columns: homeColumns }, true);
      });
    });
    cardCategoryLinks.forEach((link) => {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        renderState({ type: 'category', category: link.dataset.category, columns: Number(columnsControl.value) }, true);
      });
    });
    workControl.addEventListener('click', function (event) {
      event.preventDefault();
      renderState({ type: 'all', category: null, columns: workColumns }, true);
      setMobileOpen(false);
    });
    allProjectsControl.addEventListener('click', function () {
      renderState({ type: 'all', category: null, columns: workColumns }, true);
      setMobileOpen(false);
    });
    categoryControls.forEach((control) => {
      control.addEventListener('click', function () {
        renderState({ type: 'category', category: control.dataset.category, columns: Number(columnsControl.value) }, true);
        setMobileOpen(false);
      });
    });
    columnsControl.addEventListener('input', function () {
      const state = stateFromUrl();
      state.columns = Number(columnsControl.value);
      setColumns(state.columns);
      writeUrl(state, true);
    });
  }

  window.addEventListener('popstate', function () { renderState(stateFromUrl(), false); });

  setCollapsed(localStorage.getItem(storageKey) === 'true');
  const initialState = stateFromUrl();
  renderState(initialState, false);
  if (browser) writeUrl(initialState, true);
})();
