const scenes = Array.from(document.querySelectorAll<HTMLElement>('[data-scene]'));
const control = document.querySelector<HTMLButtonElement>('[data-motion-toggle]');
const preference = matchMedia('(prefers-reduced-motion: reduce)');
let userPaused = false;
const visible = new Set<HTMLElement>();

function updateMotion() {
  const reduced = preference.matches;
  document.documentElement.dataset.motion = reduced ? 'reduced' : 'enabled';
  for (const scene of scenes) {
    scene.dataset.running = String(visible.has(scene) && !document.hidden && !reduced && !userPaused);
  }
  if (control) {
    control.hidden = reduced;
    control.setAttribute('aria-pressed', String(userPaused));
    const label = control.querySelector('[data-motion-label]');
    const icon = control.querySelector('.motion-symbol');
    if (label) label.textContent = userPaused ? 'Resume animations' : 'Pause animations';
    if (icon) icon.textContent = userPaused ? '▷' : 'Ⅱ';
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
updateMotion();
