function setHeaderLabel(el, text) {
  el.innerHTML = '';

  const label = document.createElement('span');
  label.className = 'header-label-text';
  label.textContent = text.trim();

  const period = document.createElement('span');
  period.className = 'header-label-period';
  period.textContent = '.';

  el.appendChild(label);
  el.appendChild(period);
}

function scrollToProjects() {
  const projectsSection = document.getElementById('projects-section');

  if (!projectsSection) return;

  const headerOffset = 120;

  const targetTop = projectsSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: targetTop,
    behavior: 'smooth',
  });
}

function applyCategoryFilter(category) {
  const projectCards = document.querySelectorAll('.project-card');
  const filterLinks = document.querySelectorAll('.category-filter');

  projectCards.forEach((card) => {
    const cardCategories = card.dataset.category ? card.dataset.category.split(' ') : [];

    card.style.display = category === 'all' || cardCategories.includes(category) ? '' : 'none';
  });

  let activeLink = null;

  filterLinks.forEach((link) => {
    link.classList.remove('active-category');

    if (link.dataset.category === category) {
      link.classList.add('active-category');
      activeLink = link;
    }
  });

  const loveText = document.querySelector('.love');

  if (loveText) {
    if (category === 'all') {
      setHeaderLabel(loveText, 'featured projects');
      loveText.classList.remove('filtered-category');
    } else {
      setHeaderLabel(loveText, activeLink ? activeLink.textContent.trim() : category.replace(/-/g, ' '));

      loveText.classList.add('filtered-category');
    }
  }
}

function filterThenScroll(category) {
  applyCategoryFilter(category);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      scrollToProjects();
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const filterLinks = document.querySelectorAll('.category-filter');
  const isHomepage = !!document.getElementById('projects-section');

  filterLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      const category = this.dataset.category;

      if (!isHomepage) return;

      e.preventDefault();

      const url = new URL(window.location.href);

      if (category === 'all') {
        url.searchParams.delete('category');
      } else {
        url.searchParams.set('category', category);
      }

      url.hash = 'projects-section';
      history.pushState({}, '', url);

      filterThenScroll(category);

      const collapseElement = document.getElementById('collapseCategories');

      if (collapseElement && window.bootstrap) {
        const bsCollapse =
          bootstrap.Collapse.getInstance(collapseElement) || new bootstrap.Collapse(collapseElement, { toggle: false });

        bsCollapse.hide();
      }
    });
  });
});

window.addEventListener('load', function () {
  const isHomepage = !!document.getElementById('projects-section');

  if (!isHomepage) return;

  const params = new URLSearchParams(window.location.search);
  const category = params.get('category') || 'all';

  if (window.location.hash === '#projects-section' || params.has('category')) {
    filterThenScroll(category);
  }
});
