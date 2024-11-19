#!/bin/bash

# Define the log file path
#LOG_FILE="logs.txt"

# Extract IP addresses, count their occurrences, sort by frequency, and print only the IP address
awk '{print $1}' $1 | grep -Eo '^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+' | sort | uniq -c | sort -nr | awk '{print $2}' | head -n 1
