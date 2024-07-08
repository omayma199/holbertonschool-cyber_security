#!/bin/bash
echo "$2  $1" | sha256sum -c - >/dev/null && echo "$1: OK"