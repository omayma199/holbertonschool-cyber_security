#!/bin/bash
[ "$#" -ne 3 ] && exit 1; curl -s -X POST "$2" -H "Host: $1" -d "$3"