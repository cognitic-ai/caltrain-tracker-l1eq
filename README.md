# Caltrain App

A comprehensive iOS Caltrain schedule and station information app built with Expo Router.

## Features

- **Schedules Tab**: Browse northbound and southbound train schedules
  - Filter by train type (Local, Limited, Express)
  - View upcoming trains with departure and arrival times
  - Color-coded trains by type (Express: Red, Limited: Orange, Local: Green)
  - Tap any train to see full trip details with all stops

- **Stations Tab**: Explore all Caltrain stations
  - Search stations by name
  - Organized by zone (1-6)
  - View upcoming trains at each station
  - Station details with coordinates

- **Dark Mode**: Full support for iOS dark mode with Apple color system

## Tech Stack

- Expo Router for file-based navigation
- TypeScript for type safety
- @bacons/apple-colors for native iOS color support
- Native iOS navigation with large titles and search

## Project Structure

```
src/
├── app/                    # Routes
│   ├── (schedules)/       # Schedules tab
│   │   ├── index.tsx      # Schedule list
│   │   └── trip/[id].tsx  # Trip details
│   ├── (stations)/        # Stations tab
│   │   ├── index.tsx      # Station list
│   │   └── station/[id].tsx # Station details
│   └── _layout.tsx        # Root layout with tabs
├── components/            # Reusable components
│   └── theme-provider.tsx
├── data/                  # Data layer
│   ├── schedules.ts       # Train schedules
│   └── stations.ts        # Station information
├── types/                 # TypeScript types
│   └── caltrain.ts
└── utils/                 # Utility functions
    └── time.ts            # Time formatting helpers
```

## Get started

1. Install dependencies

   ```bash
   bun install
   ```

2. Start the app

   ```bash
   bunx expo
   ```
