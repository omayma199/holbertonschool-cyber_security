#!/bin/bash

# Define the log file path
LOG_FILE="logs.txt"

# Find the IP address with the most requests
ATTACKER_IP=$(awk '{print $1}' "$LOG_FILE" | grep -Eo '^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+' | sort | uniq -c | sort -nr | head -n 1 | awk '{print $2}')

# Count the number of requests from the attacker's IP address
grep "$ATTACKER_IP" "$LOG_FILE" | wc -l
