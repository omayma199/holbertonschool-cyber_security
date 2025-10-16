#!/bin/bash
# Proudly Written by Ahmed Belhaj

set -e

# Source Flags
source /etc/flags.sh
echo "FLAG_1 is set to: $FLAG_1"

# Start Nginx
nginx -t
service nginx restart

glances -w &

mkdir -p /var/log/gunicorn/
touch /var/log/gunicorn/error.log
touch /var/log/gunicorn/access.log

# Start Gunicorn with Environment Variables
env FLAG_1=$FLAG_1 FLAG_2=$FLAG_2 FLAG_3=$FLAG_3 FLAG_4=$FLAG_4 \
    FLAG_5=$FLAG_5 FLAG_6=$FLAG_6 FLAG_7=$FLAG_7 FLAG_8=$FLAG_8 \
    FLAG_9=$FLAG_9 FLAG_10=$FLAG_10 FLAG_11=$FLAG_11 \
    gunicorn --preload --workers 1 --threads 4 --bind unix:/run/flask/webapp.sock --chdir=/run/flask app:app \
    --access-logfile /var/log/gunicorn/access.log --error-logfile /var/log/gunicorn/error.log

# Remove flags script after successful execution
rm -f /etc/flags.sh

tail -f /dev/null
