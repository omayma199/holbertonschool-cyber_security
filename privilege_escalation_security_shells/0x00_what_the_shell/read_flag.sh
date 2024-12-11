#!/bin/bash
# Script to read the /home/user/flag

# Use while loop to read the file line by line
while read -r line; do
  echo "$line"
done < /home/user/flag
