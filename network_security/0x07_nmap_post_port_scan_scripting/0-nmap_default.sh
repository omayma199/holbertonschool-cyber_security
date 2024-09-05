#!/bin/bash
[ -z "$1" ] && { echo "Usage: $0 <target-host>"; exit 1; }; nmap -sC "$1"
