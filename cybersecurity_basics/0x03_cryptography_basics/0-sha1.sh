#!/bin/bash
echo $(echo -n $1 | sha1sum) > 0_hash.txt