#!/bin/bash
sudo groupadd "$1" && sudo chown :$1 "$2" && sudo chmod g+rx "$2"
grep "$1" /etc/group
ls -l "$2"