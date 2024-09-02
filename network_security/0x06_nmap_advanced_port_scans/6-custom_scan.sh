#!/bin/bash
sudo nmap -sA -p $2 $1 > custom_scan.txt 2>&1
