#!/bin/bash

# Define the log file path
LOG_FILE="logs.txt"

# Extract IP addresses from the log file, count their occurrences, and sort by frequency
awk '{print $1}' "$LOG_FILE" | grep -Eo '^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+' | sort | uniq -c | sort -nr | head -n 1
