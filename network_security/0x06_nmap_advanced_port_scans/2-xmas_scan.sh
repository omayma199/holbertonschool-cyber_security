#!/bin/bash
nmap -sX -p 440-450 --open --reason -v "$1"
