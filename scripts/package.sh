#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

mkdir -p dist
rm -f dist/risklens-cn-free.zip

zip -r dist/risklens-cn-free.zip \
  index.html \
  src \
  docs \
  ops \
  README.md \
  LICENSE \
  .gitignore

echo "Created dist/risklens-cn-free.zip"
