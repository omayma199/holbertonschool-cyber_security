#!/bin/bash
[ "$#" -ne 3 ] && { echo "Usage: $0 <NEW_HOST> <TARGET_URL> <FORM_DATA>"; exit 1; } || curl -s -X POST "$2" -H "Host: $1" -d "$3"