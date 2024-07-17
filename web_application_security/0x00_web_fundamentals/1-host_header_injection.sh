#!/bin/bash
curl -X POST "$2" -H "HOST: $1" -d "$3"