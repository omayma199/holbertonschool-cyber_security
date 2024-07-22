#!/bin/bash
hashcat --stdout -a 1 "$1" "$2" > combined_wordlist.txt && cat combined_wordlist.txt