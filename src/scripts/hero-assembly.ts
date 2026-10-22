import { ASSEMBLY_DURATION, ASSEMBLY_TIMEOUT, phases } from '../data/hero-assembly';

/** The server-rendered SVG is the final state. Only an early opt-in may hide it. */
function initializeAssembly() {
  const root = document.documentElement;
  const scene = document.querySelector<HTMLElement>('.scene-hero');
  if (!scene || root.dataset.heroAssembly !== 'boot') return;

  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const listeners = new AbortController();
  const options = { signal: listeners.signal };
  const effects: Animation[] = [];
  let observer: IntersectionObserver | undefined;
  let watchdog: ReturnType<typeof setTimeout> | undefined;
  let initialWidth = innerWidth;
  let visible = false;

  const finish = () => {
    if (root.dataset.heroAssembly === 'complete') return;
    // Release the initial CSS before cancelling effects, preserving native opacities.
    root.dataset.heroAssembly = 'complete';
    for (const effect of effects) effect.cancel();
    effects.length = 0;
    clearTimeout(watchdog);
    observer?.disconnect();
    listeners.abort();
    document.dispatchEvent(new Event('relevo:assembly-complete'));
  };

  try {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    if (preference.matches || document.hidden || scrollY > 0 ||
        (location.hash && location.hash !== '#home') || navigation?.type === 'back_forward') {
      finish();
      return;
    }
    const nodes = Array.from(scene.querySelectorAll<SVGElement>('[data-build]'));
    const ids = new Set(nodes.map(node => node.dataset.build));
    const required = ['platform-top', 'cage-back', 'cage-front', 'cube-top', 'cube-left', 'cube-right',
      'key', 'memory-plate-0', 'memory-plate-1', 'memory-plate-2', 'monitor-screen', 'relay-stem',
      'agent-connections', 'cage-label', 'cube-label', 'memory-label', 'monitor-label', 'relay-label'];
    if (nodes.length === 0 || ids.size !== nodes.length || required.some(id => !ids.has(id)) ||
        scene.querySelectorAll('.hero-agent').length !== 16 || scene.querySelectorAll('[data-label]').length !== 7) {
      throw new Error('Incomplete hero assembly geometry');
    }
    const pieces = nodes.map(node => {
      const start = Number(node.dataset.buildStart);
      const duration = Number(node.dataset.buildDuration);
      const phase = node.dataset.buildPhase;
      const draw = node.dataset.buildMode === 'draw';
      if (!phase || !(phase in phases) || !Number.isFinite(start) || !Number.isFinite(duration) ||
          start < 0 || duration <= 0 || start + duration > ASSEMBLY_DURATION ||
          (node.dataset.buildMode !== 'fade' && !draw)) throw new Error('Invalid hero assembly timing');
      const length = draw && node instanceof SVGGeometryElement ? node.getTotalLength() : 0;
      if (draw && (!Number.isFinite(length) || length <= 0)) throw new Error('Invalid hero stroke');
      return { node, start, duration, length, opacity: Number(node.getAttribute('opacity') ?? 1) };
    });
    const easing = getComputedStyle(root).getPropertyValue('--ease-out').trim();

    const start = () => {
      if (root.dataset.heroAssembly !== 'waiting' || !visible) return;
      if (preference.matches || document.hidden) { finish(); return; }
      root.dataset.heroAssembly = 'running';
      watchdog = setTimeout(finish, ASSEMBLY_TIMEOUT);
      try {
        // Share one document-timeline origin so all pieces remain aligned.
        const origin = document.timeline.currentTime;
        for (const piece of pieces) {
          const keyframes: Keyframe[] = piece.length > 0
            ? [{opacity:piece.opacity,strokeDasharray:`${piece.length} ${piece.length}`,strokeDashoffset:piece.length},
               {opacity:piece.opacity,strokeDasharray:`${piece.length} ${piece.length}`,strokeDashoffset:0}]
            : [{opacity:0},{opacity:piece.opacity}];
          const effect = piece.node.animate(keyframes, {
            duration:piece.duration, delay:piece.start, fill:'both',
            easing:piece.length > 0 ? 'linear' : easing,
          });
          effect.id = `hero-build:${piece.node.dataset.build}`;
          effect.startTime = origin;
          effects.push(effect);
        }
        Promise.all(effects.map(effect => effect.finished)).then(finish, finish);
      } catch { finish(); }
    };

    const checkVisibility = () => {
      const bounds = scene.getBoundingClientRect();
      const height = Math.max(0, Math.min(bounds.bottom, innerHeight) - Math.max(bounds.top, 0));
      visible = bounds.width > 0 && bounds.height > 0 && height >= Math.min(96, .2 * Math.min(bounds.height, innerHeight));
      if (height === 0 && root.dataset.heroAssembly === 'running') finish();
      else start();
    };
    const observeVisibility = () => {
      observer?.disconnect();
      const height = scene.getBoundingClientRect().height;
      const threshold = height > 0 ? Math.min(96, .2 * Math.min(height, innerHeight)) / height : 0;
      observer = new IntersectionObserver(checkVisibility, {threshold:[0, threshold]});
      observer.observe(scene);
    };
    observeVisibility();
    window.addEventListener('resize', () => {
      if (innerWidth !== initialWidth && root.dataset.heroAssembly === 'running') { finish(); return; }
      initialWidth = innerWidth;
      observeVisibility();
      checkVisibility();
    }, options);
    document.addEventListener('relevo:motion-pause', event => {
      if ((event as CustomEvent<{paused:boolean}>).detail.paused) finish();
    }, options);
    preference.addEventListener('change', () => { if (preference.matches) finish(); }, options);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && root.dataset.heroAssembly === 'running') finish();
      else if (!document.hidden) checkVisibility();
    }, options);
    window.addEventListener('pagehide', finish, options);
    window.addEventListener('pageshow', event => { if (event.persisted) finish(); }, options);
    root.dataset.heroAssembly = 'waiting';
    document.dispatchEvent(new Event('relevo:assembly-ready'));
    checkVisibility();
  } catch { finish(); }
}

initializeAssembly();
