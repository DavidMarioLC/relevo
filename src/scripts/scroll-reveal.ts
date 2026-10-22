const groups = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
const preference = matchMedia('(prefers-reduced-motion: reduce)');
const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;

function initScrollReveal() {
  if (!groups.length || preference.matches || navigation?.type === 'back_forward' ||
      !('IntersectionObserver' in window) || !Element.prototype.animate) return;

  const pending = new Set(groups);
  const active = new Map<HTMLElement, { animation: Animation; timeout: number }>();
  const listeners = new AbortController();
  const options = { signal: listeners.signal };
  const easing = getComputedStyle(document.documentElement).getPropertyValue('--ease-out').trim();
  const narrow = matchMedia('(max-width: 767px)');
  let width = innerWidth;
  let furthestScroll = scrollY;
  let destination: HTMLElement | null = null;

  // Observe the fixed slot so translating its contents cannot change intersection.
  const slot = (group: HTMLElement) => group.closest<HTMLElement>('[data-reveal-slot]') ?? group;
  const targets = new Map(groups.map(group => [slot(group), group]));
  const visible = (rect: DOMRectReadOnly) => rect.bottom > 0 && rect.top < innerHeight;

  function finish(group: HTMLElement) {
    pending.delete(group);
    const running = active.get(group);
    if (running) {
      active.delete(group);
      clearTimeout(running.timeout);
      running.animation.cancel();
    }
    observer.unobserve(slot(group));
  }

  function finishVisible() {
    for (const group of pending) {
      const rect = slot(group).getBoundingClientRect();
      if (rect.top < innerHeight) finish(group);
    }
  }

  function stop() {
    for (const group of groups) finish(group);
    observer.disconnect();
    listeners.abort();
  }

  function enter(group: HTMLElement, delay: number) {
    pending.delete(group);
    const kind = group.dataset.reveal;
    const subtle = ['footer', 'footer-bottom', 'billing', 'note'].includes(kind ?? '');
    const duration = kind === 'art' ? 2000 : subtle ? 1600 : 1800;
    const distance = subtle ? 8 : 12;
    try {
      const frames = kind === 'art' ? [{ opacity: 0 }, { opacity: 1 }] : [
        { opacity: 0, transform: `translateY(${distance}px)` },
        { opacity: 1, transform: 'none' },
      ];
      const animation = group.animate(frames, { duration, delay, easing, fill: 'backwards' });
      active.set(group, { animation, timeout: window.setTimeout(() => finish(group), duration + delay + 200) });
      animation.finished.then(() => finish(group), () => finish(group));
    } catch {
      finish(group);
    }
  }

  const observer = new IntersectionObserver(entries => {
    if (document.hidden) return;
    const candidates: HTMLElement[] = [];
    for (const entry of entries) {
      const group = targets.get(entry.target as HTMLElement);
      if (!group) continue;
      const rect = slot(group).getBoundingClientRect();
      if (rect.bottom + scrollY <= furthestScroll || (!entry.isIntersecting && active.has(group))) {
        finish(group);
      } else if (entry.isIntersecting && pending.has(group)) {
        if (destination?.contains(group) || group.contains(document.activeElement)) finish(group);
        else candidates.push(group);
      }
    }

    // DOM order and each row's fixed top edge determine the local stagger.
    candidates.sort((a, b) => groups.indexOf(a) - groups.indexOf(b));
    const rows: { parent: Element | null; top: number; count: number; kind: string | undefined }[] = [];
    for (const group of candidates) {
      const kind = group.dataset.reveal;
      let delay = 0;
      if (kind === 'footer' || (kind === 'card' && !narrow.matches)) {
        const anchor = slot(group);
        const top = anchor.getBoundingClientRect().top;
        let row = rows.find(row => row.parent === anchor.parentElement && row.kind === kind && Math.abs(row.top - top) < 2);
        if (!row) {
          row = { parent: anchor.parentElement, top, count: 0, kind };
          rows.push(row);
        }
        delay = row.count++ * (kind === 'card' ? 70 : 40);
        if (kind === 'card' && candidates.some(other => other.dataset.reveal === 'heading' && other.closest('section') === group.closest('section'))) delay += 70;
      } else if (kind === 'billing' || kind === 'art') {
        const section = group.closest('section');
        const companion = kind === 'billing' ? 'heading' : 'copy';
        if (candidates.some(other => other.closest('section') === section && other.dataset.reveal === companion)) {
          delay = kind === 'billing' ? 40 : 70;
        }
      }
      // Let the group move into view before its entrance starts.
      enter(group, 140 + delay);
    }
  }, { threshold: 0 });

  function revealDestination(hash: string) {
    let target: HTMLElement | null;
    try { target = document.getElementById(decodeURIComponent(hash.slice(1))); }
    catch { return; }
    destination = target?.closest<HTMLElement>('section, footer') ?? target;
    if (!destination) return;
    for (const group of groups) {
      if (destination.contains(group) && visible(slot(group).getBoundingClientRect())) finish(group);
    }
  }

  // Existing content stays readable when scripts arrive late or the tab starts hidden.
  finishVisible();
  if (location.hash) revealDestination(location.hash);
  pending.forEach(group => observer.observe(slot(group)));

  document.addEventListener('focusin', event => {
    if (!(event.target instanceof Element)) return;
    const group = event.target.closest<HTMLElement>('[data-reveal]');
    if (group) finish(group);
  }, options);
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const url = new URL(link.href, location.href);
    if (url.origin === location.origin && url.pathname === location.pathname && url.search === location.search && url.hash) revealDestination(url.hash);
  }, options);
  window.addEventListener('hashchange', () => revealDestination(location.hash), options);
  // Record skipped content without measuring layout on every scroll event.
  window.addEventListener('scroll', () => { furthestScroll = Math.max(furthestScroll, scrollY); }, { ...options, passive: true });
  // A deliberate scroll gesture ends the special handling for an anchor journey.
  for (const type of ['wheel', 'touchstart', 'pointerdown', 'keydown']) {
    window.addEventListener(type, () => { destination = null; }, { ...options, passive: true });
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      for (const group of active.keys()) finish(group);
    } else finishVisible();
  }, options);
  window.addEventListener('resize', () => {
    if (innerWidth === width) return;
    width = innerWidth;
    for (const group of active.keys()) finish(group);
    finishVisible();
  }, options);
  preference.addEventListener('change', () => { if (preference.matches) stop(); }, options);
  window.addEventListener('pageshow', event => { if (event.persisted) stop(); }, options);
  // Finalize before a BFCache freeze, even after motion was disabled earlier.
  window.addEventListener('pagehide', stop, { once: true });
}

initScrollReveal();
