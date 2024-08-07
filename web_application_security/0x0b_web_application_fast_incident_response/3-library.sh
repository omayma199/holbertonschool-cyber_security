#!/bin/bash

# Define the log file path
LOG_FILE="logs.txt"

# Find the IP address with the most requests
ATTACKER_IP=$(awk '{print $1}' "$LOG_FILE" | grep -Eo '^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+' | sort | uniq -c | sort -nr | head -n 1 | awk '{print $2}')

# Extract user-agent strings for the attacker's IP address and find the most frequent one
grep "$ATTACKER_IP" "$LOG_FILE" | awk -F'"' '{print $6}' | sort | uniq -c | sort -nr | head -n 1 | awk '{$1=""; print $0}' | sed 's/^ *//; s/ *$//'
