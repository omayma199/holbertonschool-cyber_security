#!/bin/bash
whois "$1" | awk -F: '/Registrant|Admin|Tech/ && $1 !~ /Registry/ {gsub(/^ +| +$/,"",$2); sub(/^$/,"",$2); print $1","$2}' > "$1.csv"
