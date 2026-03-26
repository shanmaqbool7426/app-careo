# Carea — Car Marketplace App

## Overview
A comprehensive car marketplace mobile app built with Expo/React Native, targeting both iOS/Android and web. The app covers the full car-buying lifecycle: onboarding, browsing cars (new & used), car detail views, comparison, reviews, dealer directory, messaging, wallet, orders, and more.

## Tech Stack
- **Framework:** Expo SDK 53 + React Native 0.79
- **Navigation:** Expo Router (file-based, v4)
- **Language:** TypeScript
- **State/Data:** TanStack React Query
- **Fonts:** @expo-google-fonts/inter
- **Icons:** @expo/vector-icons (Ionicons, MaterialCommunityIcons)
- **Gestures:** react-native-gesture-handler
- **Animations:** react-native-reanimated
- **Safe Area:** react-native-safe-area-context
- **Gradients:** expo-linear-gradient
- **Package Manager:** npm (always use `--legacy-peer-deps`)

## Project Structure
```
├── app/
│   ├── _layout.tsx              # Root layout (fonts, providers, stack screens)
│   ├── index.tsx                # Entry → redirects to (onboarding)
│   ├── (onboarding)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx            # Splash screen (2s → welcome)
│   │   └── welcome.tsx          # Onboarding slides + auth entry
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── sign-up.tsx
│   │   ├── login.tsx
│   │   ├── forgot-password.tsx
│   │   ├── otp.tsx
│   │   ├── create-pin.tsx
│   │   └── fill-profile.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Tab bar: Home/Search/Sell/Favorites/Profile (Inbox+Wallet hidden via href:null)
│   │   ├── index.tsx            # Home feed (offers, brands, budget categories, top deals, explore grid)
│   │   ├── search.tsx           # Search + filter (new/used toggle, sort)
│   │   ├── sell.tsx             # Sell a car (multi-step form)
│   │   ├── favorites.tsx        # Saved/liked cars
│   │   ├── inbox.tsx            # Messages + calls (accessible from Profile)
│   │   ├── wallet.tsx           # Balance + transactions (accessible from Profile)
│   │   └── profile.tsx          # User profile + account grid + settings nav
│   ├── car/[id].tsx             # Car detail (Overview/Features/Reviews tabs + Compare button)
│   ├── new-cars.tsx             # New cars listing
│   ├── used-cars.tsx            # Used cars listing
│   ├── comparison.tsx           # Side-by-side car comparison (up to 3)
│   ├── reviews/
│   │   ├── index.tsx            # Car reviews list (rating breakdown, brand filter)
│   │   └── [id].tsx             # Individual review detail
│   ├── dealers/
│   │   ├── index.tsx            # Dealer directory (city filter, Call + View Inventory)
│   │   └── [id].tsx             # Dealer profile + inventory
│   ├── chat/[id].tsx            # Chat screen (per conversation)
│   ├── notifications.tsx
│   ├── offers.tsx
│   ├── top-deals.tsx
│   ├── orders/
│   │   ├── index.tsx            # Order list
│   │   └── track.tsx            # Order tracking timeline
│   └── settings/
│       ├── index.tsx
│       ├── edit-profile.tsx
│       ├── address.tsx
│       ├── notifications.tsx
│       ├── payment.tsx
│       ├── security.tsx
│       ├── language.tsx
│       ├── privacy.tsx
│       ├── invite.tsx
│       └── help.tsx
├── lib/
│   ├── data.ts                  # Mock data (cars, brands, offers, reviews, dealers, conversations, transactions, orders, notifications)
│   ├── theme.ts                 # Colors, typography, spacing
│   └── query-client.ts          # TanStack React Query client
├── components/
│   └── ErrorBoundary.tsx
├── metro.config.js
├── babel.config.js
├── app.json                     # expo-font plugin removed (causes build failure)
└── tsconfig.json
```

## Development
- **Run command:** `node_modules/.bin/expo start --web --port 5000` (not npx — avoids upgrade prompt)
- **Workflow:** "Start application" (configured in Replit)
- **Port:** 5000
- **Install packages:** always use `npm install --legacy-peer-deps`

## Important Notes
- **expo-font removed from app.json plugins** — causes build failure with @expo/config-plugins mismatch
- **Path Aliases:** `@/` is NOT used — all imports use relative paths because Metro doesn't resolve tsconfig path aliases without babel-plugin-module-resolver
- **Web Safe Areas:** Platform.OS === 'web' uses hardcoded `topPad = 67`, `botPad = 34` instead of insets
- **Tab Bar:** 5 visible tabs (Home, Search, Sell, Favorites, Profile); Inbox and Wallet are hidden (`href: null`) and accessible via Profile's "My Account" grid
- **Mock Data:** All data lives in `lib/data.ts` — cars, brands, offers, reviews, dealers, conversations, transactions, orders, notifications
- **Warnings to ignore:** "shadow* style props deprecated" and expo package version mismatch warnings — app still works
