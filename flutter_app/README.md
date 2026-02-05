# Timer – Flutter

This is the **Flutter** version of the timer app (converted from React Native Expo).

## Prerequisites

- [Flutter SDK](https://docs.flutter.dev/get-started/install) installed and on your PATH.

## Generate platform folders (first time)

If the `android/` and `ios/` folders are missing, generate them from this directory:

```bash
cd flutter_app
flutter create .
```

Answer **n** when asked to overwrite existing files (so your `lib/` and `pubspec.yaml` are kept).

## Run the app

```bash
cd flutter_app
flutter pub get
flutter run
```

- **Android:** `flutter run` or open `android/` in Android Studio.
- **iOS:** `flutter run` (on macOS with Xcode) or open `ios/` in Xcode.

## App type (END / SLEEP / DECIDE)

The app variant is chosen at **build time** via `--dart-define`:

```bash
# DECIDE (default) – "NOW NOT DECIDE"
flutter run

# END – "END 3min"
flutter run --dart-define=APP_TYPE=END

# SLEEP – "SLEEP 3min"
flutter run --dart-define=APP_TYPE=SLEEP
```

For release builds:

```bash
flutter build apk --dart-define=APP_TYPE=DECIDE
flutter build ios --dart-define=APP_TYPE=SLEEP
```

To ship three separate apps (different bundle IDs), configure **build flavors** in `android/app/build.gradle` and Xcode schemes, and pass the matching `APP_TYPE` for each flavor.

## Project layout

- `lib/main.dart` – App entry and `MaterialApp`.
- `lib/config/app_config.dart` – END / SLEEP / DECIDE texts and bundle IDs.
- `lib/screens/timer_screen.dart` – Launch → Execution (3 min timer) → End, with haptics and back-button disabled.

Behavior matches the React Native version: 0.75s launch screen, 30+90+30+30 second intervals with per-interval text, then end screen.
