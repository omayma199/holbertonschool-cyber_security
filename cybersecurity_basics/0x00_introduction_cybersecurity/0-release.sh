#!/bin/bash
lsb_release -i | awk -F':' '{print "Distributor ID:" $2}' | sed 's/^[ \t]*//'