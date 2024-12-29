#!/env/sh

TARGET_FILE="worker-configuration.d.ts"

if [ -f $TARGET_FILE ]; then
  sed -i '' 's/interface Bindings {/export interface Bindings {/' $TARGET_FILE
else
  echo "TARGET_FILE $TARGET_FILE does not exist."
fi
