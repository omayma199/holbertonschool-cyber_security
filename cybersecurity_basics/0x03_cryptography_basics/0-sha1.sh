#!/bin/bash
echo -n $1 | sha1sum | cut -c-40 >> 0_hash.txt