#!/bin/bash
[ -z "$1" ] && exit 1; nmap -sC "$1"
