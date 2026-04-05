const header = document.getElementById('header');
const infoBtn = document.querySelector('.js-info');
const closeBtn = document.querySelector('.header__close');

/* =========================
   SCROLL (homepage only)
========================= */
if (document.body.classList.contains('page-home')) {
  window.addEventListener('scroll', () => {
    const maxScroll = 300;
    const scroll = Math.min(window.scrollY, maxScroll);

    const scale = 1 - (scroll / maxScroll);

    const fontSize = 17.5 + (42 - 17.5) * scale;
    const lineHeight = 26 + (63 - 26) * scale;

    header.style.setProperty('--font-size', `${fontSize}px`);
    header.style.setProperty('--line-height', `${lineHeight}px`);
  });
}

/* =========================
   INFO OPEN
========================= */
infoBtn.addEventListener('click', (e) => {
  e.preventDefault();

  header.classList.remove('header--small');
  header.classList.add('header--large');

  requestAnimationFrame(() => {
    header.classList.add('header--info');
  });
});

/* =========================
   INFO CLOSE
========================= */
closeBtn.addEventListener('click', () => {
  header.classList.remove('header--info');
});