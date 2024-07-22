#!/bin/bash
hashcat -a 0 -m 0 $1 wordlist1.txt wordlist2.txt > 9-password.txt