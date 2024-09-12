#!/bin/bash

if [ ! -f "auth.log" ] || [ ! -f "dmesg" ]; then
    echo "Les fichiers auth.log et dmesg doivent exister dans le répertoire courant."
    exit 1
fi


echo "Recherche des services dans auth.log :"
grep -i -E 'sshd|ftp|httpd|nginx' auth.log | awk '{print $6}' | sort | uniq