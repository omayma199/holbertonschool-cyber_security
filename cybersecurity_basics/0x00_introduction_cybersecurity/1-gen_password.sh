#!/bin/bash
< /dev/urandom LC_ALL=C tr -dc '[:alnum:]' | fold -w "$1" | head -n 1