#!/bin/bash
[ -z "$1" ] && exit 1; nmap --script default "$1"
