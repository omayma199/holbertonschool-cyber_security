while read domain; do
  ip=$(dig +short "$domain")
  if [[ -n "$ip" ]]; then
    echo "[+] $domain resolves to $ip"
    # Optional: check HTTP status
    status=$(curl -o /dev/null -s -w "%{http_code}" http://"$domain")
    echo "    HTTP status: $status"
  fi
done < dns_wordlist.txt
