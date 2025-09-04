#!/bin/bash
whois "$1" | awk -F': ' '/Registrant|Admin|Tech/ && /Organization|State\/Province|Country|Email/ {gsub(/^[ \t]+/,"",$2); data[$1]=$2} END{for(i in data) print i "," data[i]}' > "$1".csv
