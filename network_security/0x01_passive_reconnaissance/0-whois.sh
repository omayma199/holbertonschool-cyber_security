#!/bin/bash
whois "$1" | awk -F: '/Registrant|Admin|Tech/ && $1 !~ /Registry/ {gsub(/^ +| +$/,"",$2); if($1 ~ /Street$/ && substr($2,length($2),1)!=" ") $2=$2" "; if($1 ~ /Phone Ext|Fax Ext/) $1=$1":"; print $1","$2}' > "$1.csv"
