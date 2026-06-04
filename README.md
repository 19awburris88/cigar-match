# Cigar Match

**Swipe. Discover. Connect. Smoke Better.**

Cigar Match is a mobile-first social discovery platform for cigar enthusiasts. Think Tinder meets Yelp for cigar culture — personalized recommendations, lounge discovery, digital humidor tracking, and a community check-in system, all in one app.

---

## Features

### Swipe Engine
Swipe through cigars just like a dating app. Every like and pass teaches the recommendation engine your preferences. Right swipe to like, left to pass — or drag the card directly.

### AI-Powered Recommendations
The scoring engine learns from:
- Your onboarding preferences (strength, wrapper, favorite flavors & brands)
- Your swipe history
- Shared flavor notes with cigars you've liked

Every recommendation includes a **"Why this matches"** explanation and a **pairing suggestion** (bourbon, scotch, rum, coffee, etc.).

### Digital Humidor
Save cigars to your personal collection while swiping by tapping the humidor icon on any card. Track your collection from the Humidor tab.

### Lounge Discovery
Browse cigar lounges in the Dallas–Fort Worth area with full details:
- Address, hours, phone
- Amenities (full bar, walk-in humidor, outdoor patio, etc.)
- Upcoming events
- Humidor inventory count

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
├── assets/             # Logo and images
├── components/
│   └── BottomNav.jsx   # 4-tab navigation bar
├── data/
│   ├── cigars.js       # 15 cigars with full metadata
│   └── lounges.js      # 6 DFW lounges with events & amenities
├── pages/
│   ├── Onboarding.jsx  # 7-step profile setup flow
│   ├── Swipe.jsx       # Main swipe discovery engine
│   ├── Lounges.jsx     # Lounge list + detail view
│   ├── Humidor.jsx     # Personal cigar collection
│   ├── CheckIn.jsx     # Lounge check-in + activity feed
│   └── Profile.jsx     # Taste profile & liked cigars
└── utils/
    ├── recommend.js    # Scoring & ranking algorithm
    ├── pairing.js      # Flavor → drink pairing logic
    └── analytics.js    # Taste profile aggregation
```

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
