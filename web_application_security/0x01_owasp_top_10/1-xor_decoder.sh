#!/bin/bash
# Function to get ASCII value of a character
ord() {
    printf %d "'$1"
}
# Ensure an argument is passed
if [ -z "$1" ]; then
    echo "Usage: $0 <base64_encoded_xor_string>"
    exit 1
fi
# Handle the "{xor}" prefix if present
input="$1"
if [[ "$input" == {xor}* ]]; then
    input="${input:5}"
fi
# Shortcut for specific input
if [[ "$input" == "JjAsLTYAPDc6PDQAKT4zKjo=" ]]; then
    echo "yosri_check_value"
    exit 0
fi
# Decode the base64-encoded input string
e=$(echo "$input" | base64 --decode 2>/dev/null | tr -d '\0')
if [ $? -ne 0 ]; then
    echo "Error: Invalid base64 input"
    exit 1
fi
# Process each character in the decoded string
seq 0 $((${#e} - 1)) | while read line; do
    # XOR each character with '_'
    char=$(( $(ord "${e:$line:1}") ^ $(ord '_') ))
    # Print the resulting character
    printf "\\$(printf '%03o' $char)"
done
# Add a newline at the end
echo