(function () {
  const shell = document.querySelector('[data-portfolio-shell]');
  if (!shell) return;

  const sidebarStorageKey = 'portfolio-sidebar-collapsed';
  const recentStorageKey = 'jamus-portfolio-recently-viewed-v1';
  const browserStateStorageKey = 'jamus-portfolio-browser-state-v1';
  const workReturnStorageKey = 'jamus-portfolio-work-return-v1';
  const workReturnPendingStorageKey = 'jamus-portfolio-work-return-pending-v1';
  const projectBrowserScrollStorageKey = 'jamus-portfolio-project-browser-scroll-v1';
  const defaultColumns = 5;
  const maximumRecentProjects = 18;
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
  const recentProjectsControl = shell.querySelector('[data-browser-view="recent"]');
  const categoryControls = Array.from(shell.querySelectorAll('.portfolio-category-filter[data-category]'));
  const cardCategoryLinks = Array.from(shell.querySelectorAll('.portfolio-card-category[data-category]'));
  const columnsControl = shell.querySelector('[data-thumbnail-columns]');
  const columnsOutput = shell.querySelector('[data-thumbnail-columns-output]');
  const cards = browser ? Array.from(browser.querySelectorAll('.project-card')) : [];
  const workProjectLinks = browser
    ? Array.from(browser.querySelectorAll('.project-card-image-link, .project-card-title'))
    : [];
  const projectClose = shell.querySelector('[data-project-close]');
  const projectBrowserStrip = shell.querySelector('[data-project-browser-strip]');
  const projectBrowserPrimaryLinks = projectBrowserStrip
    ? Array.from(projectBrowserStrip.querySelectorAll('[data-project-browser-primary]'))
    : [];
  const currentProjectBrowserLink = projectBrowserStrip
    ? projectBrowserStrip.querySelector('[aria-current="page"]')
    : null;
  let mobileReturnFocus = null;
  let activeState = { categories: [], recent: false, columns: defaultColumns };

  function storageGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function storageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      // Local storage is optional; normal browser filtering remains available.
    }
  }

  function storageRemove(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      // Local storage is optional.
    }
  }

  function sessionGet(key) {
    try {
      return window.sessionStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function sessionSet(key, value) {
    try {
      window.sessionStorage.setItem(key, value);
    } catch (error) {
      // URL state remains the primary browser-state source.
    }
  }

  function sessionRemove(key) {
    try {
      window.sessionStorage.removeItem(key);
    } catch (error) {
      // Session storage is optional.
    }
  }

  function readRecentProjectIds() {
    const stored = storageGet(recentStorageKey);
    if (!stored) return [];

    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
    } catch (error) {
      storageRemove(recentStorageKey);
      return [];
    }
  }

  function writeRecentProjectIds(projectIds) {
    storageSet(recentStorageKey, JSON.stringify(projectIds.slice(0, maximumRecentProjects)));
  }

  function recordCurrentProject() {
    const projectId = shell.dataset.projectId;
    if (shell.dataset.projectEligible !== 'true' || !projectId) return;

    const updatedIds = readRecentProjectIds().filter((id) => id !== projectId);
    updatedIds.unshift(projectId);
    writeRecentProjectIds(updatedIds);
  }

  function setCollapsed(collapsed) {
    shell.classList.toggle('is-sidebar-collapsed', collapsed);
    sidebarToggle.setAttribute('aria-expanded', String(!collapsed));
    sidebarToggle.setAttribute('aria-label', collapsed ? 'Expand navigation' : 'Collapse navigation');
    sidebarToggle.title = collapsed ? 'Expand navigation' : 'Collapse navigation';
    storageSet(sidebarStorageKey, String(collapsed));
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
      setCollapsed(storageGet(sidebarStorageKey) === 'true');
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

  function validCategories(value) {
    const requestedCategories = typeof value === 'string' && value ? value.split(',') : [];
    const availableCategories = categoryControls.map((control) => control.dataset.category);
    return availableCategories.filter((category) => requestedCategories.includes(category));
  }

  function storedBrowserState() {
    const stored = sessionGet(browserStateStorageKey);
    if (!stored) return null;

    try {
      const parsed = JSON.parse(stored);
      return {
        categories: validCategories(parsed.categories && parsed.categories.join ? parsed.categories.join(',') : ''),
        recent: parsed.recent === true,
        columns: validColumns(parsed.columns),
      };
    } catch (error) {
      return null;
    }
  }

  function stateFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const requestedView = params.get('view');
    const requestedCategories = params.get('category');
    const hasExplicitView = requestedView === 'recent' || Boolean(requestedCategories);

    if (!hasExplicitView) {
      const stored = storedBrowserState();
      if (stored && stored.recent) {
        stored.columns = params.has('columns') ? validColumns(params.get('columns')) : stored.columns;
        return stored;
      }
    }

    return {
      categories: requestedView === 'recent' ? [] : validCategories(requestedCategories),
      recent: requestedView === 'recent',
      columns: validColumns(params.get('columns')),
    };
  }

  function writeUrl(state, replace) {
    const url = new URL(window.location.href);
    url.searchParams.delete('home');
    url.searchParams.delete('view');
    url.searchParams.delete('scale');
    url.searchParams.delete('category');
    url.searchParams.delete('columns');
    if (state.recent) url.searchParams.set('view', 'recent');
    else if (state.categories.length) url.searchParams.set('category', state.categories.join(','));
    if (state.columns !== defaultColumns) url.searchParams.set('columns', state.columns);
    history[replace ? 'replaceState' : 'pushState']({}, '', url);
  }

  function setColumns(columns) {
    const value = validColumns(columns);
    columnsControl.value = value;
    columnsOutput.textContent = value;
    browser.style.setProperty('--portfolio-selected-columns', value);
  }

  function validRecentCards() {
    const cardsById = new Map(cards.map((card) => [card.dataset.projectId, card]));
    const seen = new Set();
    const validIds = readRecentProjectIds().filter((id) => {
      if (!cardsById.has(id) || seen.has(id)) return false;
      seen.add(id);
      return true;
    });

    if (validIds.length !== readRecentProjectIds().length) writeRecentProjectIds(validIds);
    return validIds.map((id) => cardsById.get(id));
  }

  function reorderCards(orderedCards) {
    orderedCards.forEach((card) => browser.querySelector('[data-project-grid]').appendChild(card));
  }

  function rememberBrowserState(state) {
    sessionSet(browserStateStorageKey, JSON.stringify(state));
  }

  function workReturnState(destination) {
    const url = new URL(window.location.href);
    const projectUrl = new URL(destination, window.location.origin);
    return {
      url: `${url.pathname}${url.search}`,
      scrollY: Math.max(0, Math.round(window.scrollY || window.pageYOffset || 0)),
      destination: projectUrl.pathname,
    };
  }

  function readWorkReturnState(key) {
    const stored = sessionGet(key);
    if (!stored) return null;

    try {
      const parsed = JSON.parse(stored);
      const url = new URL(parsed.url, window.location.origin);
      if (
        url.origin !== window.location.origin ||
        typeof parsed.scrollY !== 'number' ||
        typeof parsed.destination !== 'string'
      ) return null;
      return {
        url: `${url.pathname}${url.search}`,
        scrollY: Math.max(0, parsed.scrollY),
        destination: new URL(parsed.destination, window.location.origin).pathname,
      };
    } catch (error) {
      return null;
    }
  }

  function revealProjectBrowserCard(link, behavior) {
    if (!projectBrowserStrip || !link) return;
    const card = link.closest('.project-card');
    if (!card) return;
    const left = card.offsetLeft;
    const right = left + card.offsetWidth;
    const visibleLeft = projectBrowserStrip.scrollLeft;
    const visibleRight = visibleLeft + projectBrowserStrip.clientWidth;
    let target = visibleLeft;
    if (left < visibleLeft) target = left;
    else if (right > visibleRight) target = right - projectBrowserStrip.clientWidth;
    if (target !== visibleLeft) projectBrowserStrip.scrollTo({ left: target, behavior });
  }

  function renderState(state, updateHistory) {
    if (!browser) return;

    const recentCards = validRecentCards();
    const normalizedState = {
      categories: state.recent ? [] : validCategories(state.categories.join(',')),
      recent: state.recent && recentCards.length > 0,
      columns: validColumns(state.columns),
    };
    const visibleCards = normalizedState.recent
      ? recentCards
      : normalizedState.categories.length
        ? cards.filter((card) => {
            const categories = card.dataset.category.trim().split(/\s+/);
            return normalizedState.categories.some((category) => categories.includes(category));
          })
        : cards;
    const visibleSet = new Set(visibleCards);

    reorderCards(normalizedState.recent ? recentCards : cards);
    cards.forEach((card) => { card.hidden = !visibleSet.has(card); });
    setColumns(normalizedState.columns);

    const allActive = !normalizedState.recent && normalizedState.categories.length === 0;
    allProjectsControl.classList.toggle('is-active', allActive);
    allProjectsControl.setAttribute('aria-pressed', String(allActive));
    recentProjectsControl.hidden = recentCards.length === 0;
    recentProjectsControl.classList.toggle('is-active', normalizedState.recent);
    recentProjectsControl.setAttribute('aria-pressed', String(normalizedState.recent));
    categoryControls.forEach((control) => {
      const active = normalizedState.categories.includes(control.dataset.category);
      control.classList.toggle('is-active', active);
      control.setAttribute('aria-pressed', String(active));
    });

    workCount.textContent = `(${visibleCards.length}/${cards.length})`;
    workControl.setAttribute('aria-label', `Work (${visibleCards.length} of ${cards.length} projects)`);
    emptyState.hidden = visibleCards.length !== 0;
    activeState = normalizedState;
    rememberBrowserState(normalizedState);
    if (updateHistory) writeUrl(normalizedState, false);
  }

  window.clearRecentlyViewedProjects = function () {
    storageRemove(recentStorageKey);
    if (browser) renderState({ categories: [], recent: false, columns: activeState.columns }, true);
  };

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
    workProjectLinks.forEach((link) => {
      link.addEventListener('click', function () {
        sessionSet(workReturnStorageKey, JSON.stringify(workReturnState(link.href)));
      });
    });
    cardCategoryLinks.forEach((link) => {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        renderState({ categories: [link.dataset.category], recent: false, columns: activeState.columns }, true);
      });
    });
    allProjectsControl.addEventListener('click', function () {
      renderState({ categories: [], recent: false, columns: activeState.columns }, true);
      setMobileOpen(false);
    });
    recentProjectsControl.addEventListener('click', function () {
      renderState({ categories: [], recent: true, columns: activeState.columns }, true);
      setMobileOpen(false);
    });
    categoryControls.forEach((control) => {
      control.addEventListener('click', function () {
        const categories = activeState.recent ? [] : activeState.categories.slice();
        const category = control.dataset.category;
        const index = categories.indexOf(category);
        if (index === -1) categories.push(category);
        else categories.splice(index, 1);
        renderState({ categories, recent: false, columns: activeState.columns }, true);
        setMobileOpen(false);
      });
    });
    columnsControl.addEventListener('input', function () {
      const state = Object.assign({}, activeState, { columns: Number(columnsControl.value) });
      setColumns(state.columns);
      activeState = state;
      rememberBrowserState(state);
      writeUrl(state, true);
    });
  }

  if (projectClose) {
    const savedReturn = readWorkReturnState(workReturnStorageKey);
    const validReturn = savedReturn && savedReturn.destination === window.location.pathname ? savedReturn : null;
    if (validReturn) projectClose.href = validReturn.url;
    projectClose.addEventListener('click', function (event) {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      if (!validReturn) return;
      event.preventDefault();
      sessionSet(workReturnPendingStorageKey, JSON.stringify(validReturn));
      window.location.assign(validReturn.url);
    });
  }

  if (projectBrowserStrip) {
    projectBrowserStrip.addEventListener('click', function (event) {
      const currentProjectLink = event.target.closest('.project-card.is-current .project-card-image-link, .project-card.is-current .project-card-title');
      if (!currentProjectLink || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
    });

    projectBrowserPrimaryLinks.forEach((link) => {
      link.addEventListener('click', function () {
        sessionSet(projectBrowserScrollStorageKey, String(Math.round(projectBrowserStrip.scrollLeft)));
        const savedReturn = readWorkReturnState(workReturnStorageKey);
        if (savedReturn) {
          savedReturn.destination = new URL(link.href, window.location.origin).pathname;
          sessionSet(workReturnStorageKey, JSON.stringify(savedReturn));
        }
      });
    });

    projectBrowserStrip.addEventListener('keydown', function (event) {
      if ((event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') || event.metaKey || event.ctrlKey || event.altKey) return;
      const index = projectBrowserPrimaryLinks.indexOf(event.target);
      if (index === -1) return;
      const nextIndex = event.key === 'ArrowLeft' ? index - 1 : index + 1;
      if (nextIndex < 0 || nextIndex >= projectBrowserPrimaryLinks.length) return;
      event.preventDefault();
      const nextLink = projectBrowserPrimaryLinks[nextIndex];
      nextLink.focus({ preventScroll: true });
      revealProjectBrowserCard(nextLink, mobileMedia.matches ? 'auto' : 'smooth');
    });

    window.requestAnimationFrame(function () {
      const savedScroll = Number(sessionGet(projectBrowserScrollStorageKey));
      if (Number.isFinite(savedScroll) && savedScroll > 0) projectBrowserStrip.scrollLeft = savedScroll;
      revealProjectBrowserCard(currentProjectBrowserLink, 'auto');
    });
  }

  window.addEventListener('popstate', function () { renderState(stateFromUrl(), false); });
  mobileMedia.addEventListener('change', syncResponsiveNavigation);

  recordCurrentProject();
  syncResponsiveNavigation();
  if (browser) {
    const initialState = stateFromUrl();
    renderState(initialState, false);
    writeUrl(activeState, true);
    const pendingReturn = readWorkReturnState(workReturnPendingStorageKey);
    if (pendingReturn) {
      sessionRemove(workReturnPendingStorageKey);
      window.requestAnimationFrame(function () {
        window.scrollTo({ top: pendingReturn.scrollY, behavior: 'auto' });
      });
    }
  }
})();
