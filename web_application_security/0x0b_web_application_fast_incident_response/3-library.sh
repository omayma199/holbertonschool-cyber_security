#!/bin/bash
cat logs.txt |awk '{print $12}' | sort | uniq -c | sort -nr | head -n 1 | awk '{print $2}' | tr -d '"'