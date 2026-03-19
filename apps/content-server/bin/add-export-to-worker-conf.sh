#!/usr/bin/env sh

set -eu

TARGET_FILE='worker-configuration.d.ts'

if [ ! -f "$TARGET_FILE" ]; then
  echo "TARGET_FILE $TARGET_FILE does not exist."
  exit 1
fi

TMP_FILE="$(mktemp)"
sed 's/^interface Bindings {$/export interface Bindings {/' "$TARGET_FILE" > "$TMP_FILE"
mv "$TMP_FILE" "$TARGET_FILE"
vp fmt "$TARGET_FILE"
