import { read, write, remove } from "./storage";

/**
 * Append-only event log for field testing.
 *
 * The point is to answer three questions after a session in a lounge:
 * where does onboarding lose people, what do they actually swipe on, and
 * does anything make it as far as the humidor. Nothing here leaves the
 * device — the operator pulls it out through the debug panel (#debug).
 *
 * `analytics.js` is a different thing: it aggregates taste from likes to
 * draw the profile screen. This records what a person did.
 */

/** Ring buffer. localStorage gives us ~5MB; this keeps us far under it. */
const MAX_EVENTS = 1000;

function uuid() {
  // randomUUID needs a secure context, which http:// test builds may not be.
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Stable per-device id, so one phone passed around reads as one device. */
export function deviceId() {
  let id = read("device", null);
  if (!id) {
    id = uuid();
    write("device", id);
  }
  return id;
}

/** New on every page load, so returns can be told apart from one long sitting. */
const sessionId = uuid();

// Kept in memory as well as on disk: re-parsing the whole log on every swipe
// would get slow, and writing through on each event means a crash loses nothing.
let log = null;

function ensureLog() {
  if (log === null) log = read("events", []);
  return log;
}

export function track(type, props = {}) {
  const entry = { at: Date.now(), session: sessionId, type, ...props };
  const entries = ensureLog();
  entries.push(entry);
  if (entries.length > MAX_EVENTS) entries.splice(0, entries.length - MAX_EVENTS);
  write("events", entries);
  return entry;
}

export function getEvents() {
  return [...ensureLog()];
}

export function clearEvents() {
  log = [];
  remove("events");
}

/** What the debug panel copies or downloads. */
export function exportPayload() {
  const events = getEvents();
  return {
    device: deviceId(),
    exportedAt: new Date().toISOString(),
    schema: 1,
    eventCount: events.length,
    events,
  };
}

/** A quick read on the log without having to open the JSON. */
export function summarize(events = getEvents()) {
  const count = (type) => events.filter((e) => e.type === type).length;
  const swipes = events.filter((e) => e.type === "swipe");
  const steps = events.filter((e) => e.type === "onboarding_step");
  return {
    sessions: new Set(events.map((e) => e.session)).size,
    onboardingStarted: count("onboarding_start"),
    onboardingCompleted: count("onboarding_complete"),
    deepestStep: steps.reduce((max, e) => Math.max(max, e.step ?? 0), -1) + 1,
    swipes: swipes.length,
    likes: swipes.filter((e) => e.dir === "right").length,
    passes: swipes.filter((e) => e.dir === "left").length,
    humidorAdds: count("humidor_add"),
    loungesOpened: count("lounge_open"),
    checkins: count("checkin_post"),
  };
}
