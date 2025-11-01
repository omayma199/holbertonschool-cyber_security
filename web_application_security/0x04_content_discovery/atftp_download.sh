#!/bin/bash


files=(
  # files commonly transmitted via tftp
infrared.txt
OS79XX.TXT
phbook00e011010455.txt
sip_4602D01A.txt
sip_4602D02A.txt
uniden00e011030397.txt
unidencom.txt
)


for file in "${files[@]}"; do
  echo "[*] Downloading $file..."
  atftp -g -r "$file" web0x04.hbtn && echo "✅ $file downloaded." || echo "❌ Failed to download $file"
done


