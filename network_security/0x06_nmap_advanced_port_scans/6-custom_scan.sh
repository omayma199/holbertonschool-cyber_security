#!/bin/bash
sudo nmap --scanflags ALL -p $2 $1 -oN custom_scan.txt >/dev/null 2>&1
