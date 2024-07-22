#!/bin/bash
echo $(echo -n "$1"| sha256sum) > 1_hash.txt | cat 1_hash.txt