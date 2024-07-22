#!/bin/bash
echo $(echo -n $1 | md5sum) > 2_hash.txt