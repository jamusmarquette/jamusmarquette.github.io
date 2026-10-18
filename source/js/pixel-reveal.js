(function () {
  'use strict';
  // Eight equal 75 ms stages; zero displays the actual original image.
  const settings = { visibilityThreshold: 0.25, visibilityTolerance: 1, duration: 600, pixels: [100, 64, 40, 24, 12, 6, 2, 0] };
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const active = new Set();
  const hasObserver = 'IntersectionObserver' in window;
  let initialReady = false;
  let hasScrolled = false;
  let initialFrame = 0;
  const scrollPositions = new Map();

  function position(target) {
    return target === window ? [window.scrollX, window.scrollY] : [target.scrollLeft, target.scrollTop];
  }
  function establishInitialViewport() {
    initialReady = false;
    hasScrolled = false;
    cancelAnimationFrame(initialFrame);
    // pageshow precedes history scroll restoration. Two frames also allow the
    // portfolio's queued layout and return-position updates to settle.
    initialFrame = requestAnimationFrame(function () {
      initialFrame = requestAnimationFrame(function () {
        initialReady = true;
        scrollPositions.clear();
        scrollPositions.set(window, position(window));
        active.forEach(function (state) {
          let ancestor = state.image.parentElement;
          while (ancestor) {
            scrollPositions.set(ancestor, position(ancestor));
            ancestor = ancestor.parentElement;
          }
          state.classifyInitial();
        });
      });
    });
  }
  function onScroll(event) {
    const target = event.target === document || event.target === window ? window : event.target;
    const current = position(target);
    const previous = scrollPositions.get(target);
    scrollPositions.set(target, current);
    if (!initialReady || !previous || (current[0] === previous[0] && current[1] === previous[1])) return;
    const needsRefresh = !hasScrolled || !hasObserver;
    hasScrolled = true;
    if (needsRefresh) refresh();
  }

  document.querySelectorAll('img[data-pixel-preview], .portfolio-shell video').forEach(function (image) {
    const isVideo = image.tagName === 'VIDEO';
    const generatedPoster = isVideo && image.hasAttribute('data-pixel-generated-poster');
    const readyEvent = isVideo ? 'loadeddata' : 'load';
    let poster = null;
    let canvas = null;
    let frame = 0;
    let done = false;
    let decoding = false;
    let decoded = false;
    let elapsed = 0;
    let lastTime = null;
    let step = -1;
    let preview;
    let triggered = false;
    let observer = null;
    let observedThreshold = null;
    let initiallyPartial = null;
    let intersectionEligible = false;
    const state = { image: image, finish: finish, classifyInitial: function () {
      if (triggered || done) return;
      initiallyPartial = null;
      observedThreshold = null;
      watch();
      update();
    }, refresh: function () {
      watch();
      update();
    } };

    function threshold() {
      const box = image.getBoundingClientRect();
      if (!box.width || !box.height) return settings.visibilityThreshold;
      const maximumVisibleRatio = Math.min(box.width, innerWidth) *
        Math.min(box.height, innerHeight) / (box.width * box.height);
      // Oversized media trigger at a quarter of their attainable visible area.
      return maximumVisibleRatio >= settings.visibilityThreshold
        ? settings.visibilityThreshold
        : maximumVisibleRatio * settings.visibilityThreshold;
    }
    function classify(box, intersection) {
      if (!initialReady || initiallyPartial !== null) return;
      const overlaps = intersection.width > 0 && intersection.height > 0;
      const tolerance = settings.visibilityTolerance;
      const fullyVisible = overlaps && intersection.left <= box.left + tolerance &&
        intersection.top <= box.top + tolerance && intersection.right >= box.right - tolerance &&
        intersection.bottom >= box.bottom - tolerance;
      initiallyPartial = overlaps && !fullyVisible;
    }
    function mayTrigger() {
      return initialReady && initiallyPartial !== null &&
        (!initiallyPartial || hasScrolled) && intersectionEligible;
    }
    function watch() {
      if (!hasObserver || triggered || done) return;
      const value = threshold();
      if (value === observedThreshold) return;
      if (observer) observer.disconnect();
      observedThreshold = value;
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          classify(entry.boundingClientRect, entry.intersectionRect);
          intersectionEligible = entry.isIntersecting && entry.intersectionRatio >= threshold();
          if (mayTrigger()) {
            triggered = true;
            observer.disconnect();
          }
        });
        watch();
        update();
      }, { threshold: [0, value] });
      observer.observe(image);
    }

    function finish() {
      done = true;
      cancelAnimationFrame(frame);
      if (canvas) canvas.remove();
      canvas = null;
      image.removeEventListener(readyEvent, resolve);
      if (isVideo) {
        image.removeEventListener('canplay', resolve);
        image.removeEventListener('loadedmetadata', metadata);
      }
      if (preview) preview.onload = null;
      if (poster) poster.onload = null;
      image.removeEventListener('error', fail);
      if (observer) observer.disconnect();
      active.delete(state);
    }
    function visible() {
      const box = image.getBoundingClientRect();
      return box.width > 0 && box.height > 0 && box.bottom > 0 && box.top < innerHeight &&
        box.right > 0 && box.left < innerWidth && !document.hidden;
    }
    function draw(source, pixel) {
      if (done || (!triggered && !visible())) return false;
      const box = image.getBoundingClientRect();
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.setAttribute('aria-hidden', 'true');
        canvas.style.cssText = 'position:absolute;pointer-events:none;image-rendering:pixelated;z-index:1;';
        // Leave native video controls visible and clickable throughout the reveal.
        if (isVideo && image.controls) canvas.style.clipPath = 'inset(0 0 48px 0)';
        image.insertAdjacentElement('afterend', canvas);
      }
      canvas.width = Math.max(1, Math.ceil(box.width / pixel));
      canvas.height = Math.max(1, Math.ceil(box.height / pixel));
      canvas.style.width = image.offsetWidth + 'px';
      canvas.style.height = image.offsetHeight + 'px';
      canvas.style.left = image.offsetLeft + 'px';
      canvas.style.top = image.offsetTop + 'px';
      const context = canvas.getContext('2d');
      if (!context) { finish(); return false; }
      const style = getComputedStyle(image);
      // Match object-fit cropping and positioning, including featured thumbnails.
      const iw = source.videoWidth || source.naturalWidth;
      const ih = source.videoHeight || source.naturalHeight;
      const cover = style.objectFit === 'cover';
      const contain = style.objectFit === 'contain';
      let w = canvas.width, h = canvas.height;
      if (cover || contain) {
        const scale = (cover ? Math.max : Math.min)(w / iw, h / ih);
        w = iw * scale; h = ih * scale;
      }
      const positions = style.objectPosition.split(' ');
      const x = parseFloat(positions[0]) / 100 || 0;
      const y = parseFloat(positions[1]) / 100 || 0;
      context.drawImage(source, (canvas.width - w) * x, (canvas.height - h) * y, w, h);
      // Keep the semantic image in the accessibility tree.
      return true;
    }
    function fail() {
      finish(); // Native broken image/alternative text remains available.
    }
    function tick(now) {
      frame = 0;
      if (done) return;
      if (motion.matches) { finish(); return; }
      if (lastTime !== null) elapsed += now - lastTime;
      lastTime = now;
      if (elapsed >= settings.duration) { finish(); return; }
      const next = Math.min(settings.pixels.length - 1,
        Math.floor(elapsed / (settings.duration / settings.pixels.length)));
      if (next !== step || !canvas) {
        step = next;
        if (settings.pixels[step] === 0) {
          if (canvas) canvas.remove();
          canvas = null;
        } else {
          try { draw(revealSource(), settings.pixels[step]); } catch (error) { finish(); return; }
        }
      }
      frame = requestAnimationFrame(tick);
    }
    function update() {
      if (done) return;
      if (!hasObserver && !triggered && visible()) {
        const box = image.getBoundingClientRect();
        const width = Math.max(0, Math.min(box.right, innerWidth) - Math.max(box.left, 0));
        const height = Math.max(0, Math.min(box.bottom, innerHeight) - Math.max(box.top, 0));
        const intersection = { width: width, height: height,
          left: Math.max(box.left, 0), top: Math.max(box.top, 0),
          right: Math.min(box.right, innerWidth), bottom: Math.min(box.bottom, innerHeight) };
        classify(box, intersection);
        intersectionEligible = width * height / (box.width * box.height) >= threshold();
      }
      if (!triggered && mayTrigger()) {
        triggered = true;
        if (observer) observer.disconnect();
      }
      if (decoded && motion.matches) { finish(); return; }
      if (decoded && triggered) {
        if (!frame) tick(performance.now());
      } else if (visible()) {
        const source = decoded ? revealSource() : preview;
        if (source && ((source === image && isVideo && image.readyState >= 2) ||
          (source.complete && source.naturalWidth))) {
          try { draw(source, settings.pixels[0]); } catch (error) { finish(); }
        }
      }
    }

    function revealSource() {
      // Paused videos retain their authored poster; playing videos sample their current frame.
      return isVideo && image.paused && image.currentTime === 0 && poster && poster.complete && poster.naturalWidth
        ? poster : image;
    }
    function metadata() {
      watch();
      update();
    }
    async function resolve() {
      if (decoding || done || decoded) return;
      if (isVideo) {
        if (image.readyState < 2 && !(image.paused && image.currentTime === 0 && poster && poster.complete && poster.naturalWidth)) return;
      } else {
        decoding = true;
        try { if (image.decode) await image.decode(); } catch (error) { finish(); return; }
        if (done) return;
        if (!image.naturalWidth) { finish(); return; }
      }
      if (generatedPoster) image.removeAttribute('poster');
      decoded = true;
      if (motion.matches) { finish(); return; }
      update();
    }

    active.add(state);
    watch();
    image.addEventListener(readyEvent, resolve);
    image.addEventListener('error', fail);
    const previewUrl = image.dataset.pixelPreview || (isVideo && image.poster);
    if (previewUrl) {
      preview = new Image();
      preview.onload = update;
      preview.src = previewUrl;
    }
    if (isVideo) {
      image.addEventListener('canplay', resolve);
      image.addEventListener('loadedmetadata', metadata);
      if (image.poster && !generatedPoster) {
        poster = new Image();
        poster.onload = function () { resolve(); update(); };
        poster.src = image.poster;
      }
      // Reading an available frame never seeks, pauses, restarts, or loads the video.
      if (image.error) fail();
      else resolve();
    } else if (image.complete) {
      if (image.naturalWidth) resolve();
      else fail();
    }
    // A preview never gates the original request or its error handling.
  });
  function refresh() {
    active.forEach(function (state) { state.refresh(); });
  }
  window.addEventListener('resize', refresh);
  window.addEventListener('scroll', onScroll, { passive: true, capture: true });
  document.addEventListener('visibilitychange', refresh);
  motion.addEventListener('change', refresh);
  window.addEventListener('pageshow', establishInitialViewport);
  if (document.readyState === 'complete') establishInitialViewport();
  window.addEventListener('pagehide', function (event) {
    cancelAnimationFrame(initialFrame);
    if (!event.persisted) active.forEach(function (state) { state.finish(); });
  });
})();
