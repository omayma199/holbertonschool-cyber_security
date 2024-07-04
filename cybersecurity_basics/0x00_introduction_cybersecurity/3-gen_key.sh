#!/bin/bash
[ -z "$1" ] && { echo "Usage: $0 <key-name>"; exit 1; } || ssh-keygen -t rsa -b 4096 -f "$1" -N ""