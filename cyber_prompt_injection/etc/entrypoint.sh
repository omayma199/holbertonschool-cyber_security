#!/bin/bash
# Proudly Written by Ahmed Belhaj

set -e

# Hostname Logic (from client)
if [ -n "$ECS_CONTAINER_METADATA_URI_V4" ]; then
    RUNTIME_ID=$(echo "$ECS_CONTAINER_METADATA_URI_V4" | cut -d '/' -f 5)
    export HOSTNAME="$RUNTIME_ID"
else
    export HOSTNAME="sandbox"
fi

echo "$HOSTNAME" > /etc/hostname
echo "127.0.0.1 $HOSTNAME" >> /etc/hosts

# Set root password based on hostname
echo root:echo $HOSTNAME | cut -d '-' -f 1 | chpasswd

# Source Flags
source /etc/flags.sh
echo "FLAG_1 is set to: $FLAG_1"

# Start Nginx - use direct nginx command instead of service
echo "Testing nginx configuration..."
nginx -t
echo "Starting nginx..."
nginx

# Disable glances for now due to terminal/curses issues in Docker
# glances -t 5 &

mkdir -p /var/log/gunicorn/
touch /var/log/gunicorn/error.log
touch /var/log/gunicorn/access.log

# Start Gunicorn with Environment Variables
echo "Starting Gunicorn..."
env FLAG_1=$FLAG_1 FLAG_2=$FLAG_2 FLAG_3=$FLAG_3 FLAG_4=$FLAG_4 \
    FLAG_5=$FLAG_5 FLAG_6=$FLAG_6 FLAG_7=$FLAG_7 FLAG_8=$FLAG_8 \
    FLAG_9=$FLAG_9 FLAG_10=$FLAG_10 FLAG_11=$FLAG_11 \
    gunicorn --preload --workers 1 --threads 4 --bind unix:/run/flask/webapp.sock --chdir=/run/flask app:app \
    --access-logfile /var/log/gunicorn/access.log --error-logfile /var/log/gunicorn/error.log

# Remove flags script after successful execution
rm -f /etc/flags.sh

tail -f /dev/null 