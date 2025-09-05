#!/bin/bash
whois "$1" | awk -F: '/Registrant|Admin|Tech/ {section=$1} /^[ \t]*(Name|Organization|Street|City|State|Postal|Country|Phone|Fax|Email)/ {gsub(/^ +| +$/,"",$2); if($1~/Street/) $2=$2" "; if($1~/Ext/) $2=$2; print section " " $1 "," $2}' > "$1.csv"
