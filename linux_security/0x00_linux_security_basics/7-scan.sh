#!/bin/bash
[[ $EUID -ne 0 ]] && { echo "Run as root or sudo."; exit 1; } || { [[ -z "$1" ]] && { echo "Usage: $0 <target>"; exit 1; } || nmap -F -v "$1"; }
