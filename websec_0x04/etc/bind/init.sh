#!/bin/bash
# Proudly Written by ahmedbelhaj.it@gmail.com
echo "[!] First init Fuzz for: $github_username"
listofkey=(
	"hq" "school" "2019" "2020" "2023" "2024"

)

listofkey_length=${#listofkey[@]}
listofkeyrandom_index=$((RANDOM % listofkey_length))
keyparam=${listofkey[$listofkeyrandom_index]}
sed -i "s/##RANDOM_PARAM##/$keyparam/" /var/www/wordpress/fuzz/index.php

echo "[!] First init BIND9 for: $github_username"
subdomains=(
	"lakeinsurveyor"
	"lakekindred"
	"lakelandcenter.place"
	"lakelandledger.fl"
	"lakemary.place"
	"lakemaryprep.learning"
	"lakemaster.blog"
	"lake-michigan"
	"lakemonsters"
	"lakenozori.web"
	"lakeoconeeacademy"
	"lake-of-the-ozarks"
	"lakeofthetorches"
	"lakeorion"
	"lakeoswegoor")





subdomains_length=${#subdomains[@]}
random_index=$((RANDOM % subdomains_length))
SUBDOMAIN=${subdomains[$random_index]}
sed -i "s/#SUBDOMAIN/$SUBDOMAIN/" /etc/bind/zones/db.web0x04.hbtn
sed -i "s/#FLAG/$FLAG_5/" /etc/bind/zones/db.web0x04.hbtn # 5. The Buster Series - Unveiling Hidden Subdomains `dns mode`

if ! grep -q "zone \"db.web0x04.hbtn\"" /etc/bind/named.conf.local; then
    echo "zone \"db.web0x04.hbtn\" {" >> /etc/bind/named.conf.local
    echo "    type master;" >> /etc/bind/named.conf.local
    echo "    file \"/etc/bind/zones/db.web0x04.hbtn\";" >> /etc/bind/named.conf.local
    echo "};" >> /etc/bind/named.conf.local
else
    echo "Zone configuration for db.web0x04.hbtn already exists in named.conf.local."
fi


touch /etc/bind/zones/init.lock
rm /etc/bind/init.sh
service named start