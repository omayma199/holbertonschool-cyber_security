#!/bin/bash
grep -i -E 'ssh|ftp|httpd|nginx' auth.log | awk '{print $6}' | sort | uniq