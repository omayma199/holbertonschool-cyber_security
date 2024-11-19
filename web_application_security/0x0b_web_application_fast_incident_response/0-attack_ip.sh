#!/bin/bash

# Extract IP addresses, count their occurrences, sort by frequency, and print only the IP address
grep -Eo '^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+' logs.txt | sort | uniq -c | sort -nr | awk '{print $2}' | head -n 1
