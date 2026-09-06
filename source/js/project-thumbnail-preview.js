(function () {
  const desktopHover = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hoverDelay = 400;
  const imageDuration = 800;
  const maximumPreviewImages = 4;
  let activePreview = null;

  function normalizedUrl(path) {
    try {
      return new URL(path, document.baseURI).href;
    } catch (error) {
      return null;
    }
  }

  function seededShuffle(items, seedText) {
    let seed = 2166136261;
    for (let index = 0; index < seedText.length; index += 1) {
      seed ^= seedText.charCodeAt(index);
      seed = Math.imul(seed, 16777619);
    }

    const shuffled = items.slice();
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      seed += 0x6d2b79f5;
      let value = seed;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      const random = ((value ^ (value >>> 14)) >>> 0) / 4294967296;
      const swapIndex = Math.floor(random * (index + 1));
      [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }
    return shuffled;
  }

  function loadImage(path) {
    return new Promise(function (resolve) {
      const image = new Image();
      image.onload = function () { resolve(path); };
      image.onerror = function () { resolve(null); };
      image.src = path;
    });
  }

  function setupCard(card) {
    const cover = card.querySelector('.content-image');
    const layer = card.querySelector('[data-project-preview-layer]');
    const sourceTemplate = card.querySelector('[data-project-preview-images]');
    if (!cover || !layer || !sourceTemplate) return;

    const coverUrl = normalizedUrl(cover.getAttribute('src'));
    const thumbnailUrl = normalizedUrl(card.dataset.projectThumbnail);
    const seen = new Set();
    const candidates = Array.from(sourceTemplate.content.querySelectorAll('[data-project-preview-src]'))
      .map(function (item) { return normalizedUrl(item.dataset.projectPreviewSrc); })
      .filter(function (path) {
        if (!path || path === coverUrl || path === thumbnailUrl || seen.has(path)) return false;
        seen.add(path);
        return true;
      });
    if (!candidates.length) return;

    const orderedCandidates = seededShuffle(candidates, card.dataset.projectId || coverUrl || 'project');
    let hoverTimer = null;
    let cycleTimer = null;
    let session = 0;

    function stop() {
      session += 1;
      window.clearTimeout(hoverTimer);
      window.clearTimeout(cycleTimer);
      hoverTimer = null;
      cycleTimer = null;
      layer.classList.add('is-resetting');
      layer.replaceChildren();
      window.requestAnimationFrame(function () { layer.classList.remove('is-resetting'); });
      if (activePreview === stop) activePreview = null;
    }

    function begin() {
      if (!desktopHover.matches || reducedMotion.matches) return;
      if (activePreview && activePreview !== stop) activePreview();
      activePreview = stop;
      const currentSession = ++session;

      hoverTimer = window.setTimeout(function () {
        Promise.all(orderedCandidates.map(loadImage)).then(function (loadedPaths) {
          if (currentSession !== session || activePreview !== stop) return;
          const previewPaths = loadedPaths.filter(Boolean).slice(0, maximumPreviewImages);
          if (!previewPaths.length) return;

          const images = previewPaths.map(function (path) {
            const image = document.createElement('img');
            image.className = 'project-card-preview__image';
            image.src = path;
            image.alt = '';
            layer.appendChild(image);
            return image;
          });
          let visibleIndex = 0;

          function showNext() {
            if (currentSession !== session || activePreview !== stop) return;
            images.forEach(function (image, index) {
              image.classList.toggle('is-visible', index === visibleIndex);
            });
            visibleIndex = (visibleIndex + 1) % images.length;
            cycleTimer = window.setTimeout(showNext, imageDuration);
          }

          window.requestAnimationFrame(showNext);
        });
      }, hoverDelay);
    }

    card.addEventListener('mouseenter', begin);
    card.addEventListener('mouseleave', stop);
  }

  document.querySelectorAll('.project-card').forEach(setupCard);
})();
