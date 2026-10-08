# Humidor Connect

**Discover cigars you’ll love, where you are.**

Humidor Connect is a mobile-first discovery platform for cigar enthusiasts. It connects someone’s taste to the selection around them — personalized recommendations filtered to what the lounge actually carries, lounge discovery, digital humidor tracking, and a community check-in system, all in one app.

---

## Features

### Swipe Engine
Swipe through cigars just like a dating app. Every like and pass teaches the recommendation engine your preferences. Right swipe to like, left to pass — or drag the card directly.

### AI-Powered Recommendations
The scoring engine learns from:
- Your onboarding preferences — strength, wrapper, flavors and brands are all
  multi-select, so a palate that spans Medium-Full *and* Full is scored as such
- Your swipe history
- Shared flavor notes with cigars you've liked

Every recommendation includes a **"Why this matches"** explanation and a **pairing suggestion** (bourbon, scotch, rum, coffee, etc.).

### Digital Humidor
Save cigars to your personal collection while swiping by tapping the humidor icon on any card. Track your collection from the Humidor tab.

### Lounge Discovery
Browse cigar lounges across **Dallas–Fort Worth, Atlanta, Houston and
Indianapolis** — pick a metro from the filter strip at the top. Each listing has:
- Address, hours, phone
- Amenities (full bar, walk-in humidor, outdoor patio, etc.)
- Upcoming events
- What's in their humidor, priced

### Check-In System
Check into lounges and log what you're smoking. A live activity feed shows what the community is enjoying in real time.

### Taste Profile
Your Profile tab builds a live taste profile as you swipe — strength and wrapper breakdowns with percentage bars, top flavor notes, and your full liked cigars collection.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 19 |
| Build Tool | Vite |
| UI Library | MUI (Material UI) v9 |
| Animations | Framer Motion |
| Icons | MUI Icons Material |
| State | React useState (client-side) |
| Type | Cormorant Garamond (display) + Inter (UI) |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## Project Structure

```
src/
├── components/
│   ├── BottomNav.jsx   # 4-tab navigation bar
│   ├── CigarTile.jsx   # Shared grid tile (Humidor + Profile)
│   ├── Logo.jsx        # Brand lockup: monogram, wordmark, tagline
│   └── logoPaths.js    # Traced outlines of the master artwork
├── data/
│   ├── cigars.js       # 43 cigars — 15 core houses plus the boutique shelf
│   └── lounges.js      # 21 lounges across 4 metros
├── pages/
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
    └── analytics.js    # Taste profile aggregation
```

---

## Data & assets

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
carries no font dependency; regenerate it from the source art rather than
editing the path data by hand.

Cigar and lounge photography is hand-picked, hotlinked Unsplash — one distinct
frame per cigar and per lounge. They are editorial photographs that set the mood
for a blend, **not** manufacturer product shots of that exact stick.

`src/data/lounges.js` is demo data. Venue names come from the real lounge scene
in each metro, but hours, phone numbers (all `555-`) and humidor contents are
sample values — swap the file for a Places/Yelp feed before launch.

---

## Roadmap

- [ ] Backend + user authentication
- [ ] Real-time check-in feed
- [ ] Lounge map view
- [ ] Social features (follow, feed, smoking circles)
- [ ] Event discovery page
- [ ] Premium membership tier
- [ ] Brand advertising & lounge partnerships
- [ ] iOS / Android via React Native or Capacitor

---

## Tagline

> *"Find Your Perfect Smoke."*
