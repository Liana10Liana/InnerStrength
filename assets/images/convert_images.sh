#!/bin/bash

# Set the input and output folders
input_folder="."
output_folder="."

# Create the output folder if it doesn't exist
mkdir -p "$output_folder"

# Iterate through each JPEG file in the input folder
for file in "$input_folder"/*.jpg; do
    # Check if the file is a regular file
    if [ -f "$file" ]; then
        # Get the file name without the extension
        filename=$(basename -- "$file")
        filename_no_extension="${filename%.*}"

        # Construct the output file path with the WebP extension
        output_file="$output_folder/$filename_no_extension.webp"

        # Convert the JPEG file to WebP using ImageMagick
        magick convert "$file" "$output_file"

        echo "Processing: $file"

        echo "Converted: $file to $output_file"
    fi
done

echo "Conversion complete."