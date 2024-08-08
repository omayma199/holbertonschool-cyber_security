#!/bin/bash
sudo tr -dc '[:alnum:]' < /dev/urandom | head -c "$1"