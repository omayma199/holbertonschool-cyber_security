#!/bin/bash
distributor_id=$(lsb_release -i | awk -F':' '{print $2}' | sed 's/^[ \t]*//'); distributor_id="Distributor ID: $distributor_id"; cat <<< "$distributor_id"