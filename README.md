# Live News TV App - Technical Documentation for AI Agents

## Overview

This is a React Native application built specifically for **Android TV / Google TV platforms**. The purpose is to provide a simple, dead-easy interface for elderly users to watch live YouTube news channels.
This was initialized using `npx create-expo-app -e with-tv`.

## Core Characteristics

- **No Backend**: All channel data is hardcoded in the frontend.
- **TV-First Design**: The interface is navigable entirely using a TV Remote D-Pad (Up, Down, Left, Right, Select, Back). Touch interactions are not the primary focus.
- **Framework**: Built using "Expo with TV support".

## Key Dependencies

- `react-native-tvos` / Expo TV SDK: Provides the core TV-specific focus engine.
- `react-native-youtube-iframe`: Used to embed YouTube Live streams without violating YouTube TOS. This relies on `react-native-webview` under the hood.

## Architecture & Navigation

Because the app only has two states, we do not use a complex navigation library like React Navigation. State-based navigation is handled entirely in `App.tsx`.

1. **`GridScreen` (Channel Selection View)**
   - Uses a `FlatList` with `numColumns=3`.
   - Uses `TouchableHighlight` for remote focus. The crucial TV-specific props are `hasTVPreferredFocus` (to grab initial focus) and tracking the onFocus event (`onFocus={() => setFocusedIndex(index)}`) to visually scale the element and draw a thick white border. This is how the user knows what channel they are currently hovering over.
2. **`PlayerScreen` (Fullscreen YouTube View)**
   - Automatically plays the YouTube stream.
   - Hides YouTube player controls (`initialPlayerParams={{ controls: 0 }}`).
   - Uses `useTVEventHandler` to intercept the D-Pad Up and Down events to sequentially surf through the channel list.
   - Uses `BackHandler` to intercept the hardware back button of the remote to return to the `GridScreen`.

## Important Files

- `src/data/channels.ts`: The source of truth for the available channels. Each entry maps an ID, name, color, and crucially, the active `youtubeId` of the live stream.
- `src/screens/GridScreen.tsx`: The TV selection grid.
- `src/screens/PlayerScreen.tsx`: The TV player component.
- `App.tsx`: Manages the active screen state.

## TV Focus Gotchas

When modifying this app, remember that TV styling must explicitly declare what happens when a component is focused. Normal React Native press events (`onPress`) work with the remote's "Select" button, but you must style the `isFocused` state so the user can visually track the cursor on the screen. Do not rely on touch events (`onPressIn`, `onPressOut`).

## Running & Building

- **Serve**: `npm run start` (can be connected to via Expo Go on Android TV, or by pressing 'a' to launch an Android TV Emulator).
- **Build APK for Sideloading**: Use EAS Build (e.g., `npx eas build -p android --profile preview`). TV apps must be built as APKs to install directly via USB or file transfer on a physical Google TV device.
