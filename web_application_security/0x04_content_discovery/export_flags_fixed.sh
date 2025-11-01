#!/bin/bash
# Fixed exporter (fallback username = omayma199)
set -u

gen_flag() {
  local pass="$1"
  local plaintext="$2"
  printf '%s' "$plaintext" | openssl aes-256-cbc -pass pass:"$pass" -nosalt -pbkdf2 2>/dev/null | md5sum | awk '{print $1}' | cut -c1-32
}

URL="https://cod.hbtn.io/api/get_github/$(hostname | cut -d '-' -f 1)"
github_username=$(curl -fsS "$URL" 2>/dev/null || true)

if [ -z "$github_username" ]; then
  github_username="omayma199"
fi

export github_username="$github_username"

echo "Exporting Env for: $github_username"

export FLAG_0=$(gen_flag EBXT7S8D69GUACPK "$github_username")
export FLAG_1=$(gen_flag CSXU98OKHAE6WLVY "$github_username")
export FLAG_2=$(gen_flag FB3VQ6TS2PXCHGDR "$github_username")
export FLAG_3=$(gen_flag SRYQC957D6AUTKN3 "$github_username")
export FLAG_4=$(gen_flag EQMK8AI3UZYGV02C "$github_username")
export FLAG_5=$(gen_flag AJ62GMO17B4CP5QK "$github_username")
export FLAG_6=$(gen_flag 582DFRERA487KDSQ "$github_username")
export FLAG_7=$(gen_flag Z94U8C6EP2NWGVRH "$github_username")
export FLAG_8=$(gen_flag 58475ZDJFUENFI48 "$github_username")

echo "Exporting Env for: $github_username Done"
echo "FLAG_0=$FLAG_0"
echo "FLAG_1=$FLAG_1"
echo "FLAG_2=$FLAG_2"
echo "FLAG_3=$FLAG_3"
echo "FLAG_4=$FLAG_4"
echo "FLAG_5=$FLAG_5"
echo "FLAG_6=$FLAG_6"
echo "FLAG_7=$FLAG_7"
echo "FLAG_8=$FLAG_8"
