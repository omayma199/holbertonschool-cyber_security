#!/bin/bash

# Check if the correct number of arguments are provided
if [ "$#" -ne 3 ]; then
    echo "Usage: $0 <NEW_HOST> <TARGET_URL> <FORM_DATA>"
    exit 1
fi

NEW_HOST="$1"
TARGET_URL="$2"
FORM_DATA="$3"

# Perform the request with the Host header injection
response=$(curl -s -X POST "$TARGET_URL" \
    -H "Host: $NEW_HOST" \
    -d "$FORM_DATA")

# Print the response
echo "Response from the server:"
echo "$response"

