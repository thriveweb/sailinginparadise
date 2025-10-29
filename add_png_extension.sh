#!/bin/bash
# Set your target directory
TARGET_DIR="./static/uploads"  # Change this to your folder path
# Loop through files in the directory
for file in "$TARGET_DIR"/*; do
  # Check if it's a regular file (not a directory)
  if [ -f "$file" ]; then
    # Extract filename and extension
    filename=$(basename "$file")

    # If the filename has no dot, or starts with dot (hidden files), skip
    if [[ "$filename" != *.* ]]; then
      mv "$file" "$file.png"
      echo "Renamed: $filename -> $filename.png"
    fi
  fi
done
