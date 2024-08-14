#!/bin/bash
sudo getsebool -a | awk '{print $1}'
