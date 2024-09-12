#!/bin/bash
sudo semanage boolean -l | awk '{print $1}'
