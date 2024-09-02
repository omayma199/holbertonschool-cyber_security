#!/bin/bash
sudo nmap --scanflags ALL -p $2 $1 > custom_scan.txt 2>&1
