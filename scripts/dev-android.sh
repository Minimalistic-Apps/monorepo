#!/usr/bin/env bash
set -euo pipefail

PORT=$(grep 'devPort' config.ts | grep -oP '\d+')

if [[ -z "$PORT" ]]; then
    echo "Could not read devPort from config.ts"
    exit 1
fi

IP=$(hostname -I | awk '{print $1}')

CAP_SERVER_URL="http://${IP}:${PORT}" npx cap run android
