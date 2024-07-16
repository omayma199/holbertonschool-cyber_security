#!/bin/bash

password="$1"
password="${password#'{xor}'}"
decoded_password=$(echo "$password" | base64 -d)

#Mot de passe décodé : +:,+

# XOR chaque caractère avec la valeur ASCII de '_'
decoded_password_xor=""
for ((i = 0; i < ${#decoded_password}; i++)); do
    char="${decoded_password:$i:1}" # decoded_password[i] de length 1
    ascii_value=$(printf "%d" "'$char") # convertir le caractère en valeur ASCII décimal at l'attribuer à la variable ascii_value
    xor_result=$(( ascii_value ^ 95 )) # decode le caractère avec la valeur ASCII de '_' en binaire
    decoded_password_xor+="$(printf "$(printf '\\x%x' $xor_result)")" #Version avec conversion en hexadécimal
    # decoded_password_xor+="$(printf "\\$(printf '%03o' $xor_result)")" #Version avec conversion en octal
    
done
echo "$decoded_password_xor"
