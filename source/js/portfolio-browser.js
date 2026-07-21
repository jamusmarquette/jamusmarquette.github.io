(function () {
  const shell = document.querySelector('[data-portfolio-shell]');
  if (!shell) return;

  const storageKey = 'portfolio-sidebar-collapsed';
  const defaultColumns = 5;
  const sidebarToggle = shell.querySelector('[data-sidebar-toggle]');
  const mobileToggle = shell.querySelector('[data-mobile-sidebar-toggle]');
  const backdrop = shell.querySelector('[data-sidebar-backdrop]');
  const browser = shell.querySelector('[data-project-browser]');
  const workControl = shell.querySelector('.portfolio-work-group > .portfolio-nav-link');
  const workCount = shell.querySelector('[data-work-count]');
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
    sidebarToggle.setAttribute('aria-label', collapsed ? 'Expand sidebar' : 'Collapse sidebar');
    sidebarToggle.title = collapsed ? 'Expand sidebar' : 'Collapse sidebar';
    localStorage.setItem(storageKey, String(collapsed));
  }

  function setMobileOpen(open) {
    shell.classList.toggle('is-mobile-sidebar-open', open);
    mobileToggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('portfolio-drawer-open', open);
  }

  function validColumns(value) {
    const columns = Number(value);
    return Number.isInteger(columns) && columns >= 2 && columns <= 6 ? columns : defaultColumns;
  }

  function stateFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const validCategory = categoryControls.some((control) => control.dataset.category === category);
    return { category: validCategory ? category : null, columns: validColumns(params.get('columns')) };
  }

  function writeUrl(state, replace) {
    const url = new URL(window.location.href);
    url.searchParams.delete('home');
    url.searchParams.delete('view');
    url.searchParams.delete('scale');
    url.searchParams.delete('category');
    url.searchParams.delete('columns');
    if (state.category) url.searchParams.set('category', state.category);
    if (state.columns !== defaultColumns) url.searchParams.set('columns', state.columns);
    history[replace ? 'replaceState' : 'pushState']({}, '', url);
  }

  function setColumns(columns) {
    const value = validColumns(columns);
    columnsControl.value = value;
    columnsOutput.textContent = value;
    browser.style.setProperty('--portfolio-selected-columns', value);
  }

  function renderState(state, updateHistory) {
    if (!browser) return;
    const visibleCards = state.category
      ? cards.filter((card) => card.dataset.category.trim().split(/\s+/).includes(state.category))
      : cards;
    const visibleSet = new Set(visibleCards);

    cards.forEach((card) => { card.hidden = !visibleSet.has(card); });
    setColumns(state.columns);

    const allActive = !state.category;
    allProjectsControl.classList.toggle('is-active', allActive);
    allProjectsControl.setAttribute('aria-pressed', String(allActive));
    categoryControls.forEach((control) => {
      const active = control.dataset.category === state.category;
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
    cardCategoryLinks.forEach((link) => {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        renderState({ category: link.dataset.category, columns: Number(columnsControl.value) }, true);
      });
    });
    allProjectsControl.addEventListener('click', function () {
      renderState({ category: null, columns: Number(columnsControl.value) }, true);
      setMobileOpen(false);
    });
    categoryControls.forEach((control) => {
      control.addEventListener('click', function () {
        renderState({ category: control.dataset.category, columns: Number(columnsControl.value) }, true);
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
  if (browser) {
    const initialState = stateFromUrl();
    renderState(initialState, false);
    writeUrl(initialState, true);
  }
})();
