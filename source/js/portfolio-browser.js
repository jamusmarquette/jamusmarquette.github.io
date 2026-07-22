(function () {
  const shell = document.querySelector('[data-portfolio-shell]');
  if (!shell) return;

  const storageKey = 'portfolio-sidebar-collapsed';
  const defaultColumns = 5;
  const mobileMedia = window.matchMedia('(max-width: 767px)');
  const sidebar = shell.querySelector('#portfolio-sidebar');
  const sidebarToggle = shell.querySelector('[data-sidebar-toggle]');
  const mobileToggle = shell.querySelector('[data-mobile-sidebar-toggle]');
  const mobileClose = shell.querySelector('[data-mobile-sidebar-close]');
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
  let mobileReturnFocus = null;

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
    sidebar.toggleAttribute('inert', mobileMedia.matches && !open);
    sidebar.setAttribute('aria-hidden', String(mobileMedia.matches && !open));

    if (open) {
      mobileReturnFocus = document.activeElement;
      window.requestAnimationFrame(function () { mobileClose.focus(); });
    } else if (mobileMedia.matches && mobileReturnFocus) {
      mobileReturnFocus.focus();
      mobileReturnFocus = null;
    }
  }

  function syncResponsiveNavigation() {
    if (mobileMedia.matches) {
      shell.classList.remove('is-sidebar-collapsed');
      setMobileOpen(false);
    } else {
      setCollapsed(localStorage.getItem(storageKey) === 'true');
      shell.classList.remove('is-mobile-sidebar-open');
      document.body.classList.remove('portfolio-drawer-open');
      sidebar.removeAttribute('inert');
      sidebar.removeAttribute('aria-hidden');
    }
  }

  function mobileFocusableElements() {
    return Array.from(
      sidebar.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])')
    ).filter((element) => element.offsetParent !== null);
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
  mobileClose.addEventListener('click', function () { setMobileOpen(false); });
  backdrop.addEventListener('click', function () { setMobileOpen(false); });

  document.addEventListener('keydown', function (event) {
    if (!mobileMedia.matches || !shell.classList.contains('is-mobile-sidebar-open')) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      setMobileOpen(false);
      return;
    }

    if (event.key !== 'Tab') return;
    const focusable = mobileFocusableElements();
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  shell.querySelectorAll('.portfolio-primary-nav a').forEach((link) => {
    link.addEventListener('click', function () {
      if (mobileMedia.matches) setMobileOpen(false);
    });
  });

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
  mobileMedia.addEventListener('change', syncResponsiveNavigation);

  syncResponsiveNavigation();
  if (browser) {
    const initialState = stateFromUrl();
    renderState(initialState, false);
    writeUrl(initialState, true);
  }
})();
