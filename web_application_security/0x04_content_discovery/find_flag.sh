#!/bin/bash

DNS_SERVER="10.42.85.14"
DOMAIN="db.web0x04.hbtn"
WORDLIST="dns_wordlist.txt"

while read sub; do
    fqdn="${sub}.${DOMAIN}"
    echo "[*] Testing $fqdn"

    result=$(dig +short @$DNS_SERVER "$fqdn" TXT)

    if [[ -n "$result" ]]; then
        echo "[+] FOUND: $fqdn --> $result"
    fi
done < "$WORDLIST"
