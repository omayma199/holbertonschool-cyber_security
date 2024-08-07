#!/bin/bash
LOG_FILE="logs.txt"
awk -F' ' '{print $7}' "$LOG_FILE" | sort | uniq -c | sort -nr | awk '{print $2}' | head -n 1
