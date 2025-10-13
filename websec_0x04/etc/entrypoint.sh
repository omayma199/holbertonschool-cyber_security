#!/bin/bash
# Proudly Written by  ahmedbelhaj.it@gmail.com

set -e
# Generating Flags
. /etc/flags.sh
source /etc/flags.sh
echo "[!] Preparing Env for: $github_username"

# Starting Nginx
service nginx start
. /etc/flags.sh
# Starting Fpm Service
mkdir /tmp/flags
echo "Congratulations! FLAG: $FLAG_0" > /tmp/sitemap_flag.txt # 0. Manual Discovery - Secrets in Plain Sight
echo "Congratulations! FLAG: $FLAG_6" > /tmp/vhost_flag.txt # 6. The Buster Series - Virtually Hosted Hijinks `vhost mode`

sed -i "s/##FLAG_7##/$FLAG_7/g" /var/www/wordpress/fuzz/index.php # Sure  7. The Buster Series - Fuzzing for Fun and Profit `fuzz mode`
sed -i "s/##FLAG_4##/$FLAG_4/g"     /var/www/wordpress/create/hiddenflag.php # 4. The Buster Series - Initiating with Gobuster `dir mode`
sed -i "s/##FLAG_4##/$FLAG_4/g"     /var/www/wordpress/payment_gateway/hiddenflag.php # 4. The Buster Series - Initiating with Gobuster `dir mode`

sed -i "s/##FLAG_1##/$FLAG_1/g"     /var/www/wordpress/wp-content/themes/twentytwentyfour/functions.php # 1. Manual Discovery - Headers, Headers, Always Check Headers

service php8.2-fpm start
. /etc/flags.sh

# Starting DNS server
. /etc/bind/init.sh
. /etc/flags.sh

# Starting TFTP Server
/etc/tftp/server
# Cleaning up
rm /etc/entrypoint.sh
