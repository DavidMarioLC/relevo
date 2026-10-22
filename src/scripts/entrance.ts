const root = document.documentElement;

if (root.dataset.entrance === 'pending') {
  requestAnimationFrame(() => {
    if (root.dataset.entrance !== 'pending') return;
    const duration = Number(getComputedStyle(root).getPropertyValue('--entrance-total'));
    document.dispatchEvent(new CustomEvent('relevo:entrance-start', { detail: { duration } }));
    if (root.dataset.entrance !== 'running') return;

    const animations = Array.from(document.querySelectorAll<HTMLElement>('[data-entrance], [data-entrance-word]'))
      .flatMap(element => element.getAnimations())
      .filter(animation => animation instanceof CSSAnimation && animation.animationName.startsWith('entrance-'));

    Promise.allSettled(animations.map(animation => animation.finished)).then(() => {
      if (root.dataset.entrance === 'running') document.dispatchEvent(new Event('relevo:entrance-end'));
    });
  });
}
