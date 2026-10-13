import { isStandalone, isIOS, canPromptNatively } from "./install";

/**
 * Why "Add to Home screen" is or isn't offered, read on the device itself.
 *
 * Chrome decides installability quietly: the menu simply says the app cannot
 * be installed, with no reason given. The checks it runs are a registered and
 * active service worker, a reachable manifest with the right fields, and a
 * secure origin. This reports each one so a failure on someone's phone can be
 * read off rather than guessed at.
 */
export async function collectInstallDiagnostics() {
  const rows = [];

  rows.push(["Secure origin", window.isSecureContext ? "yes" : "NO — install needs https"]);
  rows.push(["Already installed", isStandalone() ? "yes" : "no"]);
  rows.push(["Platform", isIOS() ? "iOS (manual Share → Add)" : "Android / other"]);
  rows.push(["Native prompt ready", canPromptNatively() ? "yes" : "not fired"]);

  if ("serviceWorker" in navigator) {
    try {
      const regs = await navigator.serviceWorker.getRegistrations();
      if (!regs.length) {
        rows.push(["Service worker", "NONE registered"]);
      } else {
        const r = regs[0];
        const state = r.active?.state ?? (r.installing ? "installing" : r.waiting ? "waiting" : "unknown");
        rows.push(["Service worker", state]);
        rows.push(["SW controlling page", navigator.serviceWorker.controller ? "yes" : "no — reload once"]);
      }
    } catch (e) {
      rows.push(["Service worker", `error: ${e.message}`]);
    }
  } else {
    rows.push(["Service worker", "unsupported"]);
  }

  try {
    const res = await fetch("/manifest.webmanifest", { cache: "no-store" });
    const type = res.headers.get("content-type") ?? "?";
    const mf = await res.json();
    rows.push(["Manifest", `${res.status} · ${mf.name}`]);
    rows.push(["Manifest type", type.split(";")[0]]);
    rows.push(["Manifest icons", String(mf.icons?.length ?? 0)]);
  } catch (e) {
    rows.push(["Manifest", `FAILED: ${e.message}`]);
  }

  return rows;
}
