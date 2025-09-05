#!/bin/bash
whois "$1" | awk -F: '/Registrant|Admin|Tech/ && $1 !~ /Registry/ {gsub(/^ +| +$/,"",$2); if($1 ~ /Street$/) $2=$2" "; print $1","$2} END {print "Registrant Phone Ext:,"; print "Registrant Fax Ext:,"; print "Admin Phone Ext:,"; print "Admin Fax Ext:,"; print "Tech Phone Ext:,"; print "Tech Fax Ext:,"}' > "$1.csv"
