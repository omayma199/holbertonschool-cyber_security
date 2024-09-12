#!/bin/bash
nmap -sV -A -p- --script default,banner,ssl-enum-ciphers,http-vuln*,smb-enum-domains -oN service_enumeration_results.txt "$1"
