#!/bin/bash

# Function to display usage
usage() {
    echo "Usage: $0 <folder_path> [max_files]"
    echo "Example: $0 /path/to/images 5"
    exit 1
}

# Function to get total size of files with specific extension (cross-platform)
get_file_sizes() {
    local folder="$1"
    local extension="$2"
    
    echo "File sizes for $extension files in: $folder"
    echo "----------------------------------------"
    
    # Find files
    local files=$(find "$folder" -type f -iname "*.$extension")
    
    # Count files (handle empty results)
    local count=0
    if [ -n "$files" ]; then
        count=$(echo "$files" | wc -l | tr -d ' ')
    fi
    
    if [ "$count" -eq 0 ]; then
        echo "No $extension files found."
        echo "Total $extension files: 0"
        echo "Total size: 0.00 B (0 bytes)"
        echo ""
        echo "0" # Return 0 bytes for calculations
        return
    fi
    
    # Get total size in bytes
    local total_bytes=0
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS/BSD: use stat -f%z
        total_bytes=$(echo "$files" | xargs stat -f%z 2>/dev/null | awk '{s+=$1} END {print s+0}')
    else
        # Linux: use stat -c%s
        total_bytes=$(echo "$files" | xargs stat -c%s 2>/dev/null | awk '{s+=$1} END {print s+0}')
    fi
    
    # Convert to human readable
    local human_size=$(echo $total_bytes | awk '{
        split("B KB MB GB TB", units);
        i=1; size=$1;
        while (size>=1024 && i<5) {size/=1024; i++}
        printf "%.2f %s", size, units[i]
    }')
    
    echo "Total $extension files: $count"
    echo "Total size: $human_size ($total_bytes bytes)"
    echo ""
    
    # Return bytes for calculations
    echo "$total_bytes"
}

# Check if folder path is provided
if [ $# -lt 1 ]; then
    echo "Error: No folder path specified."
    usage
fi

FOLDER_PATH="$1"
if [ $# -ge 2 ]; then
    MAX_FILES="$2"
else
    MAX_FILES=0   # 0 means process all files
fi

# Check if the specified folder exists
if [ ! -d "$FOLDER_PATH" ]; then
    echo "Error: Folder '$FOLDER_PATH' does not exist."
    exit 1
fi

# Check if ImageMagick v7 is installed (magick command)
if ! command -v magick &> /dev/null; then
    echo "Error: ImageMagick v7 (magick) is not installed. Please install it first."
    exit 1
fi

echo "=== PRE-CONVERSION FILE ANALYSIS ==="
echo ""

# Show sizes for PNG and JPG files before conversion
png_bytes_before=$(get_file_sizes "$FOLDER_PATH" "png")
jpg_bytes_before=$(get_file_sizes "$FOLDER_PATH" "jpg")

echo "=== CONVERSION PROCESS ==="
echo ""

# Counter for processed files and size tracking
count=0
original_size_converted=0
new_size_converted=0

echo "Converting FIRST $MAX_FILES PNG files to JPG in folder: $FOLDER_PATH"
echo "----------------------------------------"

# Collect the first N PNG files (POSIX compatible)
if [ "$MAX_FILES" -gt 0 ]; then
    png_files=$(find "$FOLDER_PATH" -type f -iname "*.png" | head -n "$MAX_FILES")
else
    png_files=$(find "$FOLDER_PATH" -type f -iname "*.png")
fi

# Check if any PNG files were found
if [ -z "$png_files" ]; then
    echo "No PNG files found in the specified folder."
    echo "----------------------------------------"
else
    # Process each PNG file
    for png_file in $png_files; do
        dir=$(dirname "$png_file")
        filename=$(basename "$png_file" .png)
        filename=$(basename "$filename" .PNG)

        jpg_file="$dir/$filename.jpg"
        
        # Get original file size
        if [[ "$OSTYPE" == "darwin"* ]]; then
            original_file_size=$(stat -f%z "$png_file" 2>/dev/null || echo "0")
        else
            original_file_size=$(stat -c%s "$png_file" 2>/dev/null || echo "0")
        fi

        # Use ImageMagick v7 "magick" command
        if magick "$png_file" -quality 75 "$jpg_file"; then 
            # Get new file size
            if [[ "$OSTYPE" == "darwin"* ]]; then
                new_file_size=$(stat -f%z "$jpg_file" 2>/dev/null || echo "0")
            else
                new_file_size=$(stat -c%s "$jpg_file" 2>/dev/null || echo "0")
            fi
            
            echo "✓ Converted: $(basename "$png_file") → $(basename "$jpg_file")"
            echo "  Size: $(echo $original_file_size | awk '{split("B KB MB GB", u); i=1; s=$1; while(s>=1024 && i<4){s/=1024; i++} printf "%.1f %s", s, u[i]}') → $(echo $new_file_size | awk '{split("B KB MB GB", u); i=1; s=$1; while(s>=1024 && i<4){s/=1024; i++} printf "%.1f %s", s, u[i]}')"
            
            # Track totals
            original_size_converted=$((original_size_converted + original_file_size))
            new_size_converted=$((new_size_converted + new_file_size))
            count=$((count + 1))
        else
            echo "✗ Failed to convert: $(basename "$png_file")"
        fi
    done
fi

echo "----------------------------------------"
echo "Conversion completed. Total files processed: $count"
echo ""

echo "=== POST-CONVERSION FILE ANALYSIS ==="
echo ""

# Show updated sizes after conversion
png_bytes_after=$(get_file_sizes "$FOLDER_PATH" "png")
jpg_bytes_after=$(get_file_sizes "$FOLDER_PATH" "jpg")

echo "=== COMPRESSION SAVINGS REPORT ==="
echo ""

if [ "$count" -gt 0 ]; then
    # Calculate actual savings from converted files
    savings_bytes=$((original_size_converted - new_size_converted))
    savings_percent=$(echo "$original_size_converted $new_size_converted" | awk '{
        if ($1 > 0) printf "%.1f", (($1-$2)/$1)*100; else print "0.0"
    }')
    
    original_human=$(echo $original_size_converted | awk '{
        split("B KB MB GB TB", units);
        i=1; size=$1;
        while (size>=1024 && i<5) {size/=1024; i++}
        printf "%.2f %s", size, units[i]
    }')
    
    new_human=$(echo $new_size_converted | awk '{
        split("B KB MB GB TB", units);
        i=1; size=$1;
        while (size>=1024 && i<5) {size/=1024; i++}
        printf "%.2f %s", size, units[i]
    }')
    
    savings_human=$(echo $savings_bytes | awk '{
        split("B KB MB GB TB", units);
        i=1; size=$1;
        while (size>=1024 && i<5) {size/=1024; i++}
        printf "%.2f %s", size, units[i]
    }')
    
    echo "Files converted: $count"
    echo "Original PNG size: $original_human"
    echo "New JPG size: $new_human"
    echo "Space saved: $savings_human ($savings_percent%)"
    
    # Show average compression per file
    avg_original=$((original_size_converted / count))
    avg_new=$((new_size_converted / count))
    
    avg_original_human=$(echo $avg_original | awk '{
        split("B KB MB GB TB", units);
        i=1; size=$1;
        while (size>=1024 && i<5) {size/=1024; i++}
        printf "%.2f %s", size, units[i]
    }')
    
    avg_new_human=$(echo $avg_new | awk '{
        split("B KB MB GB TB", units);
        i=1; size=$1;
        while (size>=1024 && i<5) {size/=1024; i++}
        printf "%.2f %s", size, units[i]
    }')
    
    echo ""
    echo "Average per file:"
    echo "  Original: $avg_original_human"
    echo "  Compressed: $avg_new_human"
else
    echo "No files were converted."
fi

echo ""
echo "=== SUMMARY ==="
echo "Conversion completed successfully!"
if [ "$count" -gt 0 ]; then
    echo "✅ $count PNG files converted to JPG format"
    echo "📁 Check the folder: $FOLDER_PATH"
    echo "💾 Total space saved: $(echo $savings_bytes | awk '{split("B KB MB GB TB", u); i=1; s=$1; while(s>=1024 && i<5){s/=1024; i++} printf "%.2f %s", s, u[i]}')"
else
    echo "❌ No files were processed"
fi