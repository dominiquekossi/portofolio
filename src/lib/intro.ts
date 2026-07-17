/**
 * Coordinates the one-time entrance ("press registration") between the
 * Preloader overlay and the Hero, which mount as siblings under App.
 *
 * Sticky by design: if the reveal fires before a listener subscribes, that
 * listener runs immediately on subscribe, so the mount order between the two
 * components (and StrictMode's dev double-mount) never causes a missed cue.
 */
let fired = false;
const listeners = new Set<() => void>();

export function fireIntroReveal() {
  if (fired) return;
  fired = true;
  listeners.forEach((cb) => cb());
  listeners.clear();
}

export function onIntroReveal(cb: () => void): () => void {
  if (fired) {
    cb();
    return () => {};
  }
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function introHasFired() {
  return fired;
}
