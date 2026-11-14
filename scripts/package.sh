#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"
mkdir -p dist
rm -f dist/risklens-cn-free.zip
# Explicit files only: never recursively include future commercial resources.
files=(index.html src/app.js src/styles.css src/engine.js src/rules.js src/report.js README.md LICENSE docs/pro-plan.md docs/release-scope.md docs/upload-guide.md)
zip -q dist/risklens-cn-free.zip "${files[@]}"
python3 - <<'PY'
from zipfile import ZipFile
allowed = {'index.html','src/app.js','src/styles.css','src/engine.js','src/rules.js','src/report.js','README.md','LICENSE','docs/pro-plan.md','docs/release-scope.md','docs/upload-guide.md'}
with ZipFile('dist/risklens-cn-free.zip') as z:
    assert set(z.namelist()) == allowed, 'Unexpected free-package contents'
print('Verified dist/risklens-cn-free.zip')
PY
