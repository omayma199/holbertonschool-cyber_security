#!/bin/bash
gen_flag() {
md5sum <<<$(openssl aes-256-cbc -pass pass:$1 -nosalt -pbkdf2 <<<$2) | head -c 32
}
# Setting Github User
URL=https://cod.hbtn.io/api/get_github/$(hostname | cut -d '-' -f 1)
github_username=$(curl $URL 2>/dev/null)
if [ -z "$github_username" ]; then github_username="YosriGFX"; fi


# Exporting Env
export github_username=$github_username
export FLAG_1=$(gen_flag O8BZX5SITN47CNFU $github_username) #Task Hijack session
export FLAG_2=$(gen_flag TAN38YQFK6HR147T $github_username) #Task Crypto encoding
export FLAG_3=$(gen_flag YNPX7TMVI3QU9EKH $github_username) #Task XSS Stored
export FLAG_4=$(gen_flag NX5CUTEP6RJLF8ZO $github_username) #Task XSS Stored
export FLAG_5=$(gen_flag EQOSD8RUMC3A2PLT $github_username) #Task SQLi 01
export FLAG_6=$(gen_flag ZNBF7VJ1YTW2DAGC $github_username) #Task SQLi 02
export FLAG_7=$(gen_flag UA2SIQVGK7F9T384 $github_username) #Task SQLi 03
export FLAG_8=$(gen_flag FZKA8ULWTYSJN0O3 $github_username) #Task SQLi 04
export FLAG_9=$(gen_flag AP2XTKZMIL5V7NS4 $github_username) #Task noSQLi 01
export FLAG_10=$(gen_flag HVDM4Z8NUWYPL659 $github_username) #Task noSQLi 02
export FLAG_11=$(gen_flag GDCFT7RAV8EO5H3L $github_username)

rm /etc/flags.sh
# gunicorn --preload --workers 1 --threads 8 --bind unix:/run/flask/webapp.sock --chdir=/run/flask app:app
