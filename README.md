# Humidor Connect

**Discover cigars you’ll love, where you are.**

Humidor Connect is a mobile-first discovery platform for cigar enthusiasts. It
connects someone’s taste to the selection around them — recommendations filtered
to what the lounge actually carries, lounge discovery, digital humidor tracking,
and a community check-in system, all in one app.

Live at **[humidorconnect.com](https://humidorconnect.com)** (Netlify, deployed
from `main`).

---

## Features

### Age gate
A date-of-birth check stands in front of everything, onboarding included. A pass
is remembered per device so it is asked once rather than daily; a refusal is
deliberately *not* stored, so a mistyped year doesn't lock someone out for good.

### Swipe engine
Swipe through cigars like a dating app. Every like and pass teaches the ranking
engine your preferences. Right to like, left to pass, or drag the card directly.

### Recommendations
A deterministic scoring engine — no model, no inference — weighing:

- Your onboarding preferences. Strength, wrapper, flavors and brands are all
  multi-select, so a palate spanning Medium-Full *and* Full is scored as such
- Your swipe history
- Flavor notes shared with cigars you've already liked

Every recommendation carries a **"Why this matches"** explanation and a
**pairing suggestion** (bourbon, scotch, rum, coffee, and so on). Pass a lounge's
inventory in and the same ranking runs against only what that lounge stocks.

### Digital humidor
Tap the humidor icon on any card while swiping and the cigar lands in your
collection, tracked under the Humidor tab.

### Lounge discovery
Browse lounges across **Dallas–Fort Worth, Atlanta, Houston and Indianapolis**,
filtered by metro. Each listing carries address, hours and phone; amenities;
upcoming events; and the full humidor, priced.

### Check-ins
Check into a lounge and log what you're smoking, with an activity feed of what
everyone else is on.

### Taste profile
The Profile tab builds a live taste profile as you swipe — strength and wrapper
breakdowns as percentage bars, top flavor notes, and your liked collection.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 19.2 |
| Build tool | Vite 8 |
| UI library | MUI (Material UI) v9 |
| Animations | Framer Motion 12 |
| Icons | MUI Icons Material |
| State | React state, written through to `localStorage` |
| Hosting | Netlify, auto-deployed from `main` |
| Type | Cormorant Garamond (display) + Inter (UI) |

No backend. Everything a visitor does lives on their own device.

---

## Getting Started

```bash
npm install     # install dependencies
npm run dev     # start dev server
npm run build   # production build
npm run lint    # eslint
```

---

## Project Structure

```
src/
├── components/
│   ├── BottomNav.jsx   # 4-tab navigation bar
│   ├── CigarTile.jsx   # Shared grid tile (Humidor + Profile)
│   ├── DebugPanel.jsx  # Operator-only session export (#debug)
│   ├── Logo.jsx        # Brand lockup: monogram, wordmark, tagline
│   └── logoPaths.js    # Traced outlines of the master artwork
├── data/
│   ├── cigars.js       # 43 cigars — 15 core houses plus the boutique shelf
│   └── lounges.js      # 21 lounges across 4 metros
├── pages/
│   ├── AgeGate.jsx     # Date-of-birth check, ahead of everything
│   ├── Onboarding.jsx  # Splash + 7-step profile setup
│   ├── Swipe.jsx       # Main swipe discovery engine
│   ├── Lounges.jsx     # Lounge list + detail view
│   ├── Humidor.jsx     # Personal cigar collection
│   ├── CheckIn.jsx     # Lounge check-in + activity feed
│   └── Profile.jsx     # Taste profile & liked cigars
└── utils/
    ├── recommend.js    # Scoring & ranking algorithm
    ├── prefs.js        # Multi-select preference readers
    ├── pairing.js      # Flavor → drink pairing logic
    ├── analytics.js    # Taste profile aggregation (what someone likes)
    ├── events.js       # Field-test event log (what someone did)
    ├── storage.js      # Safe localStorage + usePersistentState
    └── age.js          # Age arithmetic for the gate
```

---

## Persistence

`src/utils/storage.js` wraps `localStorage` behind namespaced, schema-stamped
keys. Every read and write is guarded: private browsing, an exhausted quota and
browsers set to block site data all *throw* rather than returning null, and a
half-written value left by an older build must never white-screen the app. A
failed write is not treated as an error — the session keeps working, it just
won't survive a reload.

Bump `SCHEMA` whenever the shape of anything stored changes. Mismatched data is
discarded rather than migrated, which is the right trade while this is a test
build.

**Collections are stored as cigar ids and rehydrated from the catalog on load,
never as whole cigar objects.** A saved humidor therefore always reflects the
current catalog instead of carrying a stale copy of a blend's details, and any
cigar dropped from the catalog simply disappears from it. Components still work
in cigar objects; only `App.jsx` knows about ids.

---

## Field testing

`src/utils/events.js` keeps an append-only log of what a person actually did —
distinct from `analytics.js`, which aggregates what they *like* to draw the
profile screen. It is capped at 1000 entries as a ring buffer, held in memory
and written through on every event so a crash loses nothing.

Recorded: session start, age gate pass/block, onboarding start → every step view
→ complete or skip, swipes (cigar, brand, direction, deck depth), humidor adds
and removes, tab changes, metro filter, lounge opens, check-ins.

The onboarding step events are the ones to watch: the last step recorded for a
device that never completed is exactly where that person gave up.

Nothing leaves the device. To pull a session off a test phone, open **`#debug`**
— an operator-only panel with a summary, JSON download, clipboard copy, and a
"reset device for the next tester" wipe. Nothing in the UI links to it, so a
tester poking around will not land there.

---

## Brand

| Token | Hex | Used for |
| --- | --- | --- |
| Tobacco Copper | `#904818` | Primary buttons, links, icons, selected states |
| Deep Charcoal | `#131210` | Headings, navigation, footer |
| Warm Cream | `#FAF6EF` | Main background, text on dark surfaces |
| Warm Graphite | `#38332D` | Body text and descriptions |
| Muted Taupe | `#6A5E51` | Secondary text, captions, supporting labels |

These live in `src/theme.js` as `tokens`. Cream is the ground, charcoal gives
structure, copper carries emphasis. The one place the app still goes dark is
type sitting on photography — the `onImage*` and `scrim` tokens cover that.

The logo is inline SVG. `logoPaths.js` holds the monogram and wordmark traced
from the master artwork as outlines, so the lockup is resolution-independent and
carries no font dependency. Regenerate it from the source art rather than
editing the path data by hand.

---

## Data & assets

Cigar and lounge photography is hand-picked, hotlinked Unsplash — editorial
photographs that set the mood for a blend, **not** manufacturer product shots of
that exact stick.

Three things in here are still sample data and need replacing before any of it
is presented as authoritative:

- **`src/data/lounges.js`** — venue names come from the real lounge scene in each
  metro, but hours, phone numbers (all `555-`) and humidor contents are invented.
- **`src/data/cigars.js`** — the boutique shelf (ids 16–43) carries blend specs
  and prices assembled from public sources, flagged as such in the file header.
  Reconcile against a shop's own humidor list.
- **`SEED_CHECKINS` in `src/pages/CheckIn.jsx`** — the activity feed is seeded
  with invented people. Fine in a narrated demo; strip or label it before real
  customers see a screen that looks live.

---

## Roadmap

- [x] Age gate
- [x] Session persistence (localStorage)
- [x] Field-test event capture + export
- [ ] Real inventory and pricing for the pilot lounge
- [ ] Attribute a discovery to an actual purchase — the only number a lounge cares about
- [ ] Backend + user authentication
- [ ] Real-time check-in feed
- [ ] Lounge map view
- [ ] Social features (follow, feed, smoking circles)
- [ ] Event discovery page
- [ ] Premium membership tier
- [ ] Brand advertising & lounge partnerships
- [ ] iOS / Android via React Native or Capacitor
