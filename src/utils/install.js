/**
 * Home-screen install, which works very differently on the two platforms.
 *
 * Android/Chrome fires `beforeinstallprompt`, which must be captured and
 * stashed — it fires once, early, often before React has mounted, and calling
 * `prompt()` later is the only way to show the native sheet.
 *
 * iOS Safari has no equivalent API at all. The only route is the user tapping
 * Share → Add to Home Screen, so there we show instructions instead.
 */

let deferred = null;
const listeners = new Set();

const notify = () => listeners.forEach((fn) => fn());

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    // Chrome's own mini-infobar would otherwise pre-empt our banner.
    e.preventDefault();
    deferred = e;
    notify();
  });

  window.addEventListener("appinstalled", () => {
    deferred = null;
    notify();
  });
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** True once the app is running from the home screen rather than a tab. */
export function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    // iOS Safari's own non-standard flag, which predates display-mode.
    window.navigator.standalone === true
  );
}

export function isIOS() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  // iPadOS 13+ reports itself as a Mac, so touch support is the tell.
  return /iphone|ipad|ipod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
}

/** Whether Android's native install sheet is available right now. */
export const canPromptNatively = () => deferred !== null;

/** Shows the native sheet. Resolves to the user's choice, or null if unavailable. */
export async function promptInstall() {
  if (!deferred) return null;
  const event = deferred;
  deferred = null;
  notify();
  event.prompt();
  const { outcome } = await event.userChoice;
  return outcome; // "accepted" | "dismissed"
}
