#!/bin/bash
distributor_id=$(lsb_release -i | awk -F':' '{print $2}' | sed 's/^[ \t]*//'); { echo "Distributor ID: $distributor_id"; } > temp.txt && cat temp.txt && rm temp.txt