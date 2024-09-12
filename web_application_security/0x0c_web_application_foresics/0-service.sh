#!/bin/bash
grep -i -E 'sshd|ftp|httpd|nginx' auth.log | awk '{print $6}' | sort | uniq