#!/bin/bash
# Fixed exporter — no hardcoded username
set -u

gen_flag() {
  local pass="$1"
  local plaintext="$2"
  printf '%s' "$plaintext" | openssl aes-256-cbc -pass pass:"$pass" -nosalt -pbkdf2 2>/dev/null | md5sum | awk '{print $1}' | cut -c1-32
}

# Priority: GITHUB_USERNAME env var -> cod.hbtn.io API -> hostname-derived -> interactive prompt (if available)
if [ -n "${GITHUB_USERNAME:-}" ]; then
  github_username="$GITHUB_USERNAME"
else
  URL="https://cod.hbtn.io/api/get_github/$(hostname | cut -d '-' -f 1)"
  github_username=$(curl -fsS "$URL" 2>/dev/null || true)
  # If still empty, derive from hostname (non-specific)
  if [ -z "$github_username" ]; then
    # If we are attached to a tty, ask user; otherwise use hostname-derived fallback
    if [ -t 0 ]; then
      read -p "No username found from env/API — enter username to use (leave empty to use hostname-derived): " user_input
      if [ -n "$user_input" ]; then
        github_username="$user_input"
      else
        github_username="$(hostname | cut -d '-' -f 1)"
      fi
    else
      github_username="$(hostname | cut -d '-' -f 1)"
    fi
  fi
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
# Print the flags
echo "github_username=$github_username"
echo "FLAG_0=$FLAG_0"
echo "FLAG_5=$FLAG_5"
echo "FLAG_8=$FLAG_8"
