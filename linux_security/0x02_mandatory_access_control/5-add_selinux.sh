#!/bin/bash
[ -z "$1" ] && echo "Usage: $0 <new_login_name>" && exit 1; sudo semanage login -a -s user_u "$1"
