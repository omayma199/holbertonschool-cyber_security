#!/bin/bash
whois "$1" | awk 'BEGIN{OFS=","} /Registrant|Admin|Tech/{gsub(/^[ \t]+|[ \t]+$/,"",$2); print $1,$2}' > "$1.csv"
