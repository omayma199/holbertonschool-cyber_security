#!/bin/bash

domain="web0x04.hbtn"
wordlist="dns_wordlist.txt"

echo "[*] Starting subdomain brute-force on $domain ..."
while read sub; do
    fqdn="${sub}.${domain}"
    ip=$(dig +short "$fqdn" @web0x04.hbtn | grep -E '^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$')
    if [[ -n "$ip" ]]; then
        echo "[+] Found: $fqdn --> $ip"
    fi
done < "$wordlist"

