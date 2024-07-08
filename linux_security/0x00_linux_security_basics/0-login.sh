#!/bin/bash

# Check if running as root or sudo
if [ "$(id -u)" -ne 0 ]; then
    echo "Please run this script as root or using sudo."
    exit 1
fi

# Use last command to show last 5 login sessions
last -n 5