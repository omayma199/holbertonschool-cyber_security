#!/bin/bash
# stop on error
set -e
# env variable setup
URL=https://cod.hbtn.io/api/get_github/`hostname | cut -d '-' -f 1`
github_username=`curl $URL`
. /tmp/gen_flags.sh $github_username
# Starting system
service nginx restart
# clean up
rm -f /tmp/flags.sh
gunicorn --preload --workers 1 --threads 8 --bind unix:/run/flask/webapp.sock --chdir=/run/flask app:app
