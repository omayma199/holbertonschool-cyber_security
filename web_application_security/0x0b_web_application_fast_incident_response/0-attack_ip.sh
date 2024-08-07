#!/bin/bash

# Define the log file path
LOG_FILE="logs.txt"

# Extract IP addresses, count their occurrences, and sort by frequency
awk '{print $1}' "$LOG_FILE" | sort | uniq -c | sort -nr | head -n 1
