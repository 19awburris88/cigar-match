import { useState, useEffect } from "react";

/**
 * Safe localStorage.
 *
 * Every read and write is wrapped. Private browsing, a full quota and
 * browsers set to block site data all *throw* on access rather than
 * returning null, and a half-written value left by an older build must
 * never white-screen the app. A failed write is not an error here — the
 * session keeps working, it just won't survive a reload.
 *
 * Keys are namespaced and stamped with SCHEMA. Bump SCHEMA whenever the
 * shape of anything stored changes: mismatched data is discarded rather
 * than migrated, which is the right trade while this is a test build.
 */
const NAMESPACE = "hc";
const SCHEMA = 1;

const keyFor = (name) => `${NAMESPACE}:${name}`;

export function read(name, fallback) {
  try {
    const raw = window.localStorage.getItem(keyFor(name));
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw);
    return parsed?.v === SCHEMA ? parsed.d : fallback;
  } catch {
    return fallback;
  }
}

export function write(name, value) {
  try {
    window.localStorage.setItem(keyFor(name), JSON.stringify({ v: SCHEMA, d: value }));
    return true;
  } catch {
    return false;
  }
}

export function remove(name) {
  try {
    window.localStorage.removeItem(keyFor(name));
  } catch {
    /* nothing to do — the key is already unreachable */
  }
}

/** Drop every key this app owns, for the reset button on the debug panel. */
export function clearAll() {
  try {
    const { localStorage } = window;
    // Collect first: removing while iterating by index shifts everything after it.
    const ours = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const k = localStorage.key(i);
      if (k?.startsWith(`${NAMESPACE}:`)) ours.push(k);
    }
    ours.forEach((k) => localStorage.removeItem(k));
  } catch {
    /* ignore */
  }
}

/** `useState`, written through to localStorage on every change. */
export function usePersistentState(name, initial) {
  const [state, setState] = useState(() => read(name, initial));
  useEffect(() => {
    write(name, state);
  }, [name, state]);
  return [state, setState];
}
