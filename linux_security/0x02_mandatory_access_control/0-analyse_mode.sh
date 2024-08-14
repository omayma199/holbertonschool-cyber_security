#!/bin/bash
sestatus | grep "SELinux status:" | awk '{print "SELinux status: " $3}'
