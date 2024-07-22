#!/bin/bash
hashcat -m 0 -a 0 -o cracked.txt "$1" /usr/share/wordlists/rockyou.txt --quiet && awk -F: '{print $2}' cracked.txt > 7-password.txt