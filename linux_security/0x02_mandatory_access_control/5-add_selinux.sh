#!/bin/bash
if [ -z "$1" ]; then
    echo "Usage: $0 <new_login_name>"
    exit 1
fi
sudo semanage login -a -s user_u "$1"