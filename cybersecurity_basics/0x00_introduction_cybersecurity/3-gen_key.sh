#!/bin/bash

# Check if the user provided a key name
if [ -z "$1" ]; then
  echo "Usage: $0 <key-name>"
  exit 1
fi

# Set the key name
KEY_NAME=$1

# Generate the RSA SSH key pair
ssh-keygen -t rsa -b 4096 -f "$KEY_NAME" -N ""

# Check if the key generation was successful
if [ $? -eq 0 ]; then
  echo "RSA SSH key pair generated successfully."
  echo "Private key: $KEY_NAME"
  echo "Public key: $KEY_NAME.pub"
else
  echo "An error occurred during key generation."
  exit 1
fi
