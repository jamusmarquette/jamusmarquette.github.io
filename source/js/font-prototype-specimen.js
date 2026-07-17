(function () {
  const specimen = document.querySelector('[data-font-specimen]');
  if (!specimen) return;

  const defaults = {
    preset: 'display',
    weight: 450,
    opticalSize: 20,
    fontSize: 72,
    tracking: 0,
    foreground: '#111827',
    background: '#f2f0e8',
  };

  const presets = {
    display: 'Shape language into useful form.',
    paragraph: 'A type system succeeds when rhythm, hierarchy, and detail remain clear across changing contexts.',
    numerals: '0123456789  14:32  $128.50  27/07/2026',
    interface: 'Explore collection  ·  Save route  ·  Continue',
    alternates: 'Hamburgefontsiv  Rafiq  Type & systems',
  };

  const stage = specimen.querySelector('[data-font-stage]');
  const text = specimen.querySelector('[data-font-text]');
  const support = specimen.querySelector('[data-font-support]');
  const controls = {};

  specimen.querySelectorAll('[data-font-control]').forEach((control) => {
    controls[control.dataset.fontControl] = control;
  });

  function output(name, value) {
    specimen.querySelector(`[data-font-output="${name}"]`).textContent = value;
  }

  function update() {
    const weight = Number(controls.weight.value);
    const opticalSize = Number(controls.opticalSize.value);
    const fontSize = Number(controls.fontSize.value);
    const tracking = Number(controls.tracking.value) / 100;

    stage.style.fontVariationSettings = `'wght' ${weight}, 'opsz' ${opticalSize}`;
    stage.style.fontSize = `${fontSize}px`;
    stage.style.letterSpacing = `${tracking}em`;
    stage.style.color = controls.foreground.value;
    stage.style.backgroundColor = controls.background.value;

    output('weight', weight);
    output('opticalSize', opticalSize.toFixed(1).replace('.0', ''));
    output('fontSize', `${fontSize}px`);
    output('tracking', `${tracking.toFixed(2).replace(/0+$/, '').replace(/\.$/, '') || '0'}em`);
    output('foreground', controls.foreground.value);
    output('background', controls.background.value);
  }

  function setPreset(name) {
    text.textContent = presets[name];
    specimen.querySelectorAll('[data-font-preset]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.fontPreset === name));
    });
  }

  function reset() {
    Object.keys(controls).forEach((name) => {
      controls[name].value = defaults[name];
    });
    setPreset(defaults.preset);
    update();
  }

  specimen.querySelectorAll('[data-font-preset]').forEach((button) => {
    button.addEventListener('click', function () { setPreset(button.dataset.fontPreset); });
  });
  Object.values(controls).forEach((control) => control.addEventListener('input', update));
  specimen.querySelector('[data-font-reset]').addEventListener('click', reset);

  if (!CSS.supports('font-variation-settings', "'wght' 450")) {
    support.textContent = 'Variable-font axes are not supported in this browser. Static fallback styling is active.';
  }

  reset();
})();
