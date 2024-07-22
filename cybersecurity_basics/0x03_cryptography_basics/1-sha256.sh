#!/bin/bash
echo -n "$1" | sha256sum | cut -d ' ' -f 1 > 1_hash.txt