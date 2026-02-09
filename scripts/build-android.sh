#!/usr/bin/env bash
set -euo pipefail

WORKSPACE_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "Building web assets…"
vite build

echo "Syncing Capacitor…"
npx cap sync android

echo "Generating icons…"
(cd "$WORKSPACE_ROOT" && requirements-fix)

echo "Building APK…"
cd android
chmod +x gradlew
./gradlew assembleRelease
