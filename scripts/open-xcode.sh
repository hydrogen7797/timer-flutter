#!/usr/bin/env bash
# Generate the native iOS project and open it in Xcode (Mac only).
# Run from project root: npm run xcode

set -e
cd "$(dirname "$0")/.."

echo "Generating iOS native project..."
npx expo prebuild -p ios

if [[ ! -d ios ]]; then
  echo "Error: ios/ folder was not created."
  exit 1
fi

WORKSPACE=$(find ios -maxdepth 1 -name "*.xcworkspace" 2>/dev/null | head -1)
if [[ -n "$WORKSPACE" ]]; then
  echo "Opening $WORKSPACE in Xcode..."
  open "$WORKSPACE"
else
  echo "No .xcworkspace found in ios/. Opening ios/ folder."
  open ios
fi
