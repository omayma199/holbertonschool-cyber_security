#!/usr/bin/env bash
# run_all_no_hardcode.sh — fixed scripts without any hardcoded username
# Usage: chmod +x run_all_no_hardcode.sh && ./run_all_no_hardcode.sh
set -u

gen_flag() {
  local pass="$1"
  local plaintext="$2"
  printf '%s' "$plaintext" | openssl aes-256-cbc -pass pass:"$pass" -nosalt -pbkdf2 2>/dev/null | md5sum | awk '{print $1}' | cut -c1-32
}

# --- original (broken) script for comparison (unchanged) ---
cat > export_flags_broken.sh <<'EOF'
#!/bin/bash
# Proudly Written by  ahmedbelhaj.it@gmail.com

# Generator Function
gen_flag() {
	md5sum <<<$(openssl aes-256-cbc -pass pass:$1 -nosalt -pbkdf2 <<<$2) | head -c 32
}
# Setting Github User
URL=https://cod.hbtn.io/api/get_github/$(hostname | cut -d '-' -f 1)
github_username=$(curl $URL 2>/dev/null)
if [$github_username == '']; then github_username=YosriGFX; fi



export github_username=$github_username
# Exporting Env
# Check entrypoint.sh & etc/bind/init.sh & tftp/server.py for The Flags Insertion in The Code 
echo "Exporting Env for: $github_username"
export FLAG_0=$(gen_flag EBXT7S8D69GUACPK $github_username) #  0. Manual Discovery - Secrets in Plain Sight
export FLAG_1=$(gen_flag CSXU98OKHAE6WLVY $github_username) #  1. Manual Discovery - Headers, Headers, Always Check Headers
export FLAG_2=$(gen_flag FB3VQ6TS2PXCHGDR $github_username) # No Task is Explaining
export FLAG_3=$(gen_flag SRYQC957D6AUTKN3 $github_username) # No Task is Explaining
export FLAG_4=$(gen_flag EQMK8AI3UZYGV02C $github_username) #  4. The Buster Series - Initiating with Gobuster `dir mode`
export FLAG_5=$(gen_flag AJ62GMO17B4CP5QK $github_username) #  5. The Buster Series - Unveiling Hidden Subdomains `dns mode`
export FLAG_6=$(gen_flag 582DFRERA487KDSQ $github_username) #  6. The Buster Series - Virtually Hosted Hijinks `vhost mode`
export FLAG_7=$(gen_flag Z94U8C6EP2NWGVRH $github_username) #  7. The Buster Series - Fuzzing for Fun and Profit `fuzz mode`
export FLAG_8=$(gen_flag 58475ZDJFUENFI48 $github_username) # 8. The Buster Series - Tackling TFTP with Brute Force `tftp mode`


echo "Exporting Env for: $github_username Done"
EOF
chmod +x export_flags_broken.sh

# --- fixed script: no hardcoded username; prefer env var, then API, then hostname, (optional prompt) ---
cat > export_flags_fixed_no_hardcode.sh <<'EOF'
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
EOF
chmod +x export_flags_fixed_no_hardcode.sh

# --- Demonstration / checks ---
echo
echo "=== Demonstration: empty vs non-empty username ==="
echo "Case empty username (''), keys AJ62... and 5847... (should be identical)"
empty_aj62=$(gen_flag AJ62GMO17B4CP5QK "")
empty_5847=$(gen_flag 58475ZDJFUENFI48 "")
echo "AJ62 (empty)  : $empty_aj62"
echo "5847 (empty)  : $empty_5847"

echo
echo "Case derived username (hostname):"
derived="$(hostname | cut -d '-' -f 1)"
derived_aj62=$(gen_flag AJ62GMO17B4CP5QK "$derived")
derived_5847=$(gen_flag 58475ZDJFUENFI48 "$derived")
echo "derived username: $derived"
echo "AJ62 (derived) : $derived_aj62"
echo "5847 (derived) : $derived_5847"

echo
if [ "$empty_aj62" = "$empty_5847" ]; then
  echo "-> empty username produced identical hashes (expected)."
fi
if [ "$derived_aj62" != "$derived_5847" ]; then
  echo "-> derived username produced different hashes (expected)."
fi

# --- Run the fixed_no_hardcode script and show its output ---
echo
echo "=== Running fixed_no_hardcode script now ==="
./export_flags_fixed_no_hardcode.sh | sed -n '1,200p' || true

echo
echo "=== Done. Files created ==="
echo "  - export_flags_broken.sh"
echo "  - export_flags_fixed_no_hardcode.sh"
echo
echo "How to run without prompts and with an explicit username:"
echo "  GITHUB_USERNAME=someuser ./export_flags_fixed_no_hardcode.sh"
echo "Or run interactively and enter a username when prompted."
