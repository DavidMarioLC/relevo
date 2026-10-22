const scenes = Array.from(document.querySelectorAll<HTMLElement>('[data-scene]'));
const control = document.querySelector<HTMLButtonElement>('[data-motion-toggle]');
const pauseIcon = control?.querySelector<HTMLElement>('[data-motion-icon="pause"]');
const playIcon = control?.querySelector<HTMLElement>('[data-motion-icon="play"]');
const preference = matchMedia('(prefers-reduced-motion: reduce)');
let userPaused = false;
const visible = new Set<HTMLElement>();

function updateMotion() {
  const reduced = preference.matches;
  document.documentElement.dataset.motion = reduced ? 'reduced' : 'enabled';
  for (const scene of scenes) {
    const entrance = document.documentElement.dataset.entrance;
    const ready = scene.dataset.kind !== 'hero' || (entrance !== 'pending' && entrance !== 'running');
    scene.dataset.running = String(ready && visible.has(scene) && !document.hidden && !reduced && !userPaused);
  }
  if (control) {
    control.hidden = reduced;
    control.setAttribute('aria-pressed', String(userPaused));
    const label = control.querySelector('[data-motion-label]');
    if (label) label.textContent = userPaused ? 'Resume animations' : 'Pause animations';
    if (pauseIcon) pauseIcon.hidden = userPaused;
    if (playIcon) playIcon.hidden = !userPaused;
  }
}
const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    const scene = entry.target as HTMLElement;
    if (entry.isIntersecting) visible.add(scene);
    else visible.delete(scene);
  }
  updateMotion();
});
scenes.forEach(scene => observer.observe(scene));
control?.addEventListener('click', () => { userPaused = !userPaused; updateMotion(); });
preference.addEventListener('change', updateMotion);
document.addEventListener('visibilitychange', updateMotion);
document.addEventListener('relevo:entrance-complete', updateMotion);
updateMotion();
