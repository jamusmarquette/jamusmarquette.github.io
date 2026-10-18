const vm = require('node:vm');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const code = fs.readFileSync('source/js/pixel-reveal.js', 'utf8');

function setup({ cached = false, reduced = false, offscreen = false, height = 300, video = false, poster = false, generated = false, paused = false, hasPreview = true, initialRatio = null, deferInitial = false } = {}) {
  const windowEvents = {};
  const events = {}, frames = new Map(), canvases = [];
  let decoded = false, completeDecode, intersection, observerOptions, now = 0, id = 0;
  const motion = { matches: reduced, addEventListener() {} };
  const rect = { width: 400, height, top: offscreen ? 2000 : 0,
    bottom: offscreen ? 2000 + height : height, left: 0, right: 400 };
  const image = {
    tagName: video ? 'VIDEO' : 'IMG',
    videoWidth: video ? 800 : 0, videoHeight: video ? 600 : 0,
    readyState: cached ? 2 : 0, paused, currentTime: 0, controls: true,
    poster: poster ? 'poster.jpg' : '',
    hasAttribute: name => generated && name === 'data-pixel-generated-poster',
    removeAttribute(name) { if (name === 'poster') this.poster = ''; },
    play() { throw new Error('Reveal must not play videos'); },
    pause() { throw new Error('Reveal must not pause videos'); },
    load() { throw new Error('Reveal must not reload videos'); },
    complete: cached, naturalWidth: 800, naturalHeight: 600,
    dataset: hasPreview ? { pixelPreview: 'data:preview' } : {}, offsetWidth: 400, offsetHeight: 300,
    offsetLeft: 0, offsetTop: 0,
    getBoundingClientRect: () => rect,
    addEventListener: (name, callback) => { events[name] = callback; },
    removeEventListener: name => { delete events[name]; },
    insertAdjacentElement: (_, canvas) => canvases.push(canvas),
    decode: () => new Promise(resolve => { completeDecode = () => { decoded = true; resolve(); }; })
  };
  const context = {
    Image: class {
      constructor() { this.naturalWidth = 24; this.naturalHeight = 18; this.complete = true; }
      set src(value) { this.onload(); }
    },
    IntersectionObserver: class {
      constructor(callback, options) { intersection = callback; observerOptions = options; }
      observe() {} unobserve() {} disconnect() {}
    },
    window: { scrollX: 0, scrollY: 0, IntersectionObserver: true, matchMedia: () => motion,
      addEventListener(name, callback) { windowEvents[name] = callback; } },
    document: {
      readyState: 'complete', hidden: false, addEventListener() {}, querySelectorAll: () => [image],
      createElement: () => ({ style: {}, setAttribute() {},
        getContext: () => ({ drawImage(source) { if (source === image) assert.ok(video ? image.readyState >= 2 : decoded); } }),
        remove() { this.removed = true; }
      })
    },
    innerWidth: 1000, innerHeight: 800, performance: { now: () => now },
    getComputedStyle: () => ({ objectFit: 'cover', objectPosition: '50% 50%' }),
    requestAnimationFrame: callback => { frames.set(++id, callback); return id; },
    cancelAnimationFrame: key => frames.delete(key)
  };
  function emit(ratio) {
    intersection([{ target: image, isIntersecting: ratio > 0, intersectionRatio: ratio,
      boundingClientRect: { ...rect }, intersectionRect: { ...rect,
        width: ratio > 0 ? rect.width : 0, height: rect.height * ratio,
        bottom: rect.top + rect.height * ratio } }]);
  }
  function settleInitial() {
    for (let i = 0; i < 2; i++) {
      const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach(callback => callback(now));
    }
    emit(initialRatio ?? (offscreen ? 0 : Math.min(1, 800 / height)));
  }
  vm.runInNewContext(code, context);
  if (!deferInitial) settleInitial();
  return {
    canvases, events, frames, motion, image, settleInitial,
    scroll(y) { context.window.scrollY = y; windowEvents.scroll({ target: context.document }); },
    wheel() { windowEvents.wheel?.({ target: context.document }); },
    restore(y) {
      windowEvents.pagehide({ persisted: true });
      windowEvents.pageshow({ persisted: true });
      context.window.scrollY = y;
      settleInitial();
    },
    get threshold() { return observerOptions.threshold[1]; },
    intersect(ratio) { emit(ratio); },
    enter() { rect.top = 0; rect.bottom = height; emit(1); },
    leave() { rect.top = 2000; rect.bottom = 2300; emit(0); },
    advance(time) {
      now = time;
      const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach(callback => callback(time));
    },
    async ready() {
      if (video) {
        image.readyState = 2;
        events.loadeddata?.();
      } else {
        if (!cached) events.load();
        completeDecode();
      } await new Promise(resolve => setImmediate(resolve));
    }
  };
}

(async () => {
  for (const cached of [false, true]) {
    const test = setup({ cached });
    assert.equal(test.canvases[0].width, 4, '100 CSS pixel preview blocks');
    test.enter();
    await test.ready();
    for (const [time, width] of [[0,4],[75,7],[150,10],[225,17],[300,34],[375,67],[450,200]]) {
      test.advance(time);
      assert.equal(test.canvases[0].width, width, `stage at ${time} ms`);
    }
    test.advance(525);
    assert.ok(test.canvases[0].removed, 'eighth stage displays native sharp image');
    test.advance(600);
    assert.equal(test.frames.size, 0);
    assert.equal(test.events.error, undefined);
    test.leave(); test.enter();
    assert.equal(test.frames.size, 0, 'completed reveal never replays');
  }
  const slow = setup();
  slow.events.load(); // The original is loaded but decode is still pending.
  slow.advance(2000);
  assert.equal(slow.canvases[0].width, 4);
  assert.ok(!slow.canvases[0].removed, 'preview stays until decode completes');

  const lazy = setup({ offscreen: true });
  await lazy.ready();
  assert.equal(lazy.frames.size, 0);
  lazy.enter();
  assert.equal(lazy.canvases[0].width, 4, 'offscreen decoding does not consume reveal');
  lazy.advance(150); lazy.leave();
  assert.equal(lazy.frames.size, 1, 'triggered animation continues offscreen');
  lazy.advance(600);
  assert.ok(lazy.canvases[0].removed);
  lazy.enter();
  assert.equal(lazy.frames.size, 0, 'scrolling back cannot restart it');

  const partial = setup({ cached: true, initialRatio: 0 });
  partial.intersect(0.1);
  await partial.ready();
  assert.equal(partial.threshold, 0.25);
  assert.equal(partial.frames.size, 0, 'decoded image waits for quarter visibility');
  assert.equal(partial.canvases[0].width, 4);
  partial.intersect(0.24);
  assert.equal(partial.frames.size, 0);
  partial.intersect(0.25);
  assert.equal(partial.frames.size, 1);
  partial.advance(75);
  assert.equal(partial.canvases[0].width, 7);

  const tall = setup({ height: 4800, offscreen: true });
  assert.ok(Math.abs(tall.threshold - 1 / 24) < 0.0001);
  tall.intersect(0.03);
  await tall.ready();
  assert.equal(tall.frames.size, 0);
  tall.intersect(0.05);
  assert.equal(tall.frames.size, 1, 'oversized image starts at meaningful attainable visibility');

  const waiting = setup();
  waiting.intersect(0.5);
  waiting.leave();
  assert.equal(waiting.frames.size, 0);
  await waiting.ready();
  assert.equal(waiting.frames.size, 1, 'threshold crossing is remembered while waiting for decode');
  waiting.advance(600);
  assert.ok(waiting.canvases.every(canvas => canvas.removed));

  const reduced = setup({ reduced: true });
  await reduced.ready();
  assert.ok(reduced.canvases.every(canvas => canvas.removed));
  assert.equal(reduced.frames.size, 0);
  const failed = setup(); failed.events.error();
  assert.ok(failed.canvases.every(canvas => canvas.removed));
  assert.equal(failed.events.load, undefined);
  for (const poster of [false, true]) {
    const video = setup({ video: true, poster, initialRatio: 0 });
    video.intersect(0.24);
    await video.ready();
    assert.equal(video.threshold, 0.25);
    assert.equal(video.frames.size, 0);
    assert.equal(video.canvases[0].width, 4);
    video.intersect(0.25);
    video.advance(75);
    assert.equal(video.canvases[0].width, 7);
    assert.equal(video.canvases[0].style.clipPath, 'inset(0 0 48px 0)');
    video.leave(); video.advance(600); video.enter();
    assert.equal(video.frames.size, 0);
    assert.ok(video.canvases.every(canvas => canvas.removed));
    assert.equal(video.events.loadeddata, undefined);
  }
  const generated = setup({ video: true, poster: true, generated: true });
  generated.enter();
  assert.equal(generated.frames.size, 0, 'tiny generated poster never counts as full video readiness');
  await generated.ready();
  assert.equal(generated.image.poster, '', 'decoded frame replaces generated poster');
  assert.equal(generated.frames.size, 1);
  const pausedPoster = setup({ video: true, poster: true, paused: true });
  pausedPoster.intersect(0.25);
  pausedPoster.advance(75);
  assert.equal(pausedPoster.image.paused, true);
  assert.equal(pausedPoster.image.currentTime, 0);
  assert.equal(pausedPoster.image.poster, 'poster.jpg');
  assert.equal(pausedPoster.canvases[0].width, 7, 'paused poster can reveal without forced video loading');
  const bareVideo = setup({ video: true, hasPreview: false });
  assert.equal(bareVideo.canvases.length, 0, 'posterless legacy video keeps native fallback until a frame exists');
  await bareVideo.ready();
  assert.equal(bareVideo.canvases[0].width, 4, 'available decoded frame supplies the initial coarse view');
  bareVideo.intersect(0.25); bareVideo.advance(600);
  assert.ok(bareVideo.canvases.every(canvas => canvas.removed));
  const videoReduced = setup({ video: true, reduced: true });
  await videoReduced.ready();
  assert.equal(videoReduced.frames.size, 0);
  assert.ok(videoReduced.canvases.every(canvas => canvas.removed));
  for (const video of [false, true]) {
    const initialPartial = setup({ video, cached: true, initialRatio: 0.6 });
    await initialPartial.ready();
    assert.equal(initialPartial.frames.size, 0, 'initial partial media waits despite meeting 25%');
    initialPartial.intersect(1);
    assert.equal(initialPartial.frames.size, 0, 'layout changes alone do not unlock initial partial media');
    initialPartial.wheel(); initialPartial.scroll(0);
    assert.equal(initialPartial.frames.size, 0, 'wheel intent and unchanged scroll position do not unlock');
    initialPartial.scroll(1);
    assert.equal(initialPartial.frames.size, 1, 'actual position change unlocks without requiring a new observer crossing');
    initialPartial.advance(75);
    assert.equal(initialPartial.canvases[0].width, 7);
    initialPartial.scroll(2); initialPartial.leave(); initialPartial.advance(600);
    assert.ok(initialPartial.canvases.every(canvas => canvas.removed));
    initialPartial.enter();
    assert.equal(initialPartial.frames.size, 0);

    const underThreshold = setup({ video, initialRatio: 0.1 });
    await underThreshold.ready(); underThreshold.scroll(1);
    assert.equal(underThreshold.frames.size, 0);
    underThreshold.intersect(0.25);
    assert.equal(underThreshold.frames.size, 1, 'scroll unlock still requires the normal threshold');
  }
  const restored = setup({ cached: true, initialRatio: 0.6, deferInitial: true });
  await restored.ready();
  // Return-position restoration happens before the initial two-frame snapshot.
  restored.scroll(400); restored.settleInitial();
  assert.equal(restored.frames.size, 0);
  restored.scroll(400);
  assert.equal(restored.frames.size, 0, 'restored position is the baseline, not user scrolling');
  restored.scroll(401);
  assert.equal(restored.frames.size, 1);

  const bfcache = setup({ cached: true, initialRatio: 0.6 });
  await bfcache.ready(); bfcache.restore(800);
  assert.equal(bfcache.frames.size, 0, 'back-forward restoration reclassifies pending media');
  bfcache.scroll(800); assert.equal(bfcache.frames.size, 0);
  bfcache.scroll(801); assert.equal(bfcache.frames.size, 1);

  const tolerance = setup({ cached: true, initialRatio: 299.5 / 300 });
  await tolerance.ready();
  assert.equal(tolerance.frames.size, 1, 'subpixel clipping counts as fully visible');
  const partialReduced = setup({ reduced: true, initialRatio: 0.5 });
  await partialReduced.ready();
  assert.ok(partialReduced.canvases.every(canvas => canvas.removed));
  assert.equal(partialReduced.frames.size, 0);
  console.log('PASS: initial viewport gate, actual scroll changes, restoration, tolerance, eight even stages, cached reveal, decode hold, 25% image/video trigger, poster/frame fallbacks, playback preservation, oversized fallback, offscreen completion, no replay, reduced motion, failure cleanup');
})();
