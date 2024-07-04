#!/bin/bash
[ -z "$1" ] && { printf "Usage: $0 <key-name>\n"; exit 1; } || ssh-keygen -t rsa -b 4096 -f "$1" -N ""