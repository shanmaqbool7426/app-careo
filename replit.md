# Carea — Car Marketplace App

## Overview
A comprehensive car marketplace mobile app built with Expo/React Native, targeting both iOS/Android and web. The app covers the full car-buying lifecycle: onboarding, authentication, browsing cars, viewing details, messaging dealers, managing a wallet, tracking orders, and more.

## Tech Stack
- **Framework:** Expo SDK 53 + React Native 0.79
- **Navigation:** Expo Router (file-based, v4)
- **Language:** TypeScript
- **State/Data:** TanStack React Query
- **Fonts:** @expo-google-fonts/inter
- **Icons:** @expo/vector-icons (Ionicons)
- **Gestures:** react-native-gesture-handler
- **Animations:** react-native-reanimated
- **Safe Area:** react-native-safe-area-context
- **Gradients:** expo-linear-gradient
- **Package Manager:** npm

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
│   │   ├── _layout.tsx          # Tab bar (Home/Search/Inbox/Wallet/Profile)
│   │   ├── index.tsx            # Home feed (offers, brands, top deals)
│   │   ├── search.tsx           # Search + filter
│   │   ├── inbox.tsx            # Messages + calls
│   │   ├── wallet.tsx           # Balance + transactions
│   │   └── profile.tsx          # User profile + settings nav
│   ├── car/[id].tsx             # Car detail screen
│   ├── chat/[id].tsx            # Chat screen
│   ├── notifications.tsx
│   ├── wishlist.tsx
│   ├── offers.tsx
│   ├── top-deals.tsx
│   ├── orders/
│   │   ├── index.tsx            # Order list
│   │   └── track.tsx            # Order tracking timeline
│   └── settings/
│       ├── index.tsx            # Redirects to profile
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
│   ├── data.ts                  # Mock data (cars, brands, offers, conversations, transactions, orders, notifications)
│   ├── theme.ts                 # Colors, typography, spacing
│   └── query-client.ts          # TanStack React Query client
├── components/
│   └── ErrorBoundary.tsx
├── metro.config.js              # Metro bundler config
├── babel.config.js              # Babel (expo preset)
├── app.json                     # Expo app config
└── tsconfig.json                # TypeScript (extends expo/tsconfig.base)
```

## Development
- Run: `npx expo start --web --port 5000`
- Workflow: "Start application" (configured in Replit)
- Port: 5000

## Important Notes
- **Path Aliases:** `@/` is NOT used — all imports use relative paths (`../../lib/data`) because Metro doesn't resolve tsconfig paths aliases without babel-plugin-module-resolver
- **Web Safe Areas:** Platform.OS === 'web' uses hardcoded `topPad = 67`, `botPad = 34` instead of insets
- **Tab Bar:** Height 84px on web (50 + 34 padding)
- **Mock Data:** All data is in `lib/data.ts` — 10 cars, 8 brands, 4 special offers, 8 conversations, 8 transactions, 4 orders, 5 notifications
