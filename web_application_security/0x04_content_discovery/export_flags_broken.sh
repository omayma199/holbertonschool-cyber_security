#!/bin/bash
# Proudly Written by  ahmedbelhaj.it@gmail.com

# Generator Function
gen_flag() {
	md5sum <<<$(openssl aes-256-cbc -pass pass:$1 -nosalt -pbkdf2 <<<$2) | head -c 32
}
# Setting Github User
URL=https://cod.hbtn.io/api/get_github/$(hostname | cut -d '-' -f 1)
github_username=$(curl $URL 2>/dev/null)
if [$github_username == '']; then github_username=YosriGFX; fi



export github_username=$github_username
# Exporting Env
# Check entrypoint.sh & etc/bind/init.sh & tftp/server.py for The Flags Insertion in The Code 
echo "Exporting Env for: $github_username"
export FLAG_0=$(gen_flag EBXT7S8D69GUACPK $github_username) #  0. Manual Discovery - Secrets in Plain Sight
export FLAG_1=$(gen_flag CSXU98OKHAE6WLVY $github_username) #  1. Manual Discovery - Headers, Headers, Always Check Headers
export FLAG_2=$(gen_flag FB3VQ6TS2PXCHGDR $github_username) # No Task is Explaining
export FLAG_3=$(gen_flag SRYQC957D6AUTKN3 $github_username) # No Task is Explaining
export FLAG_4=$(gen_flag EQMK8AI3UZYGV02C $github_username) #  4. The Buster Series - Initiating with Gobuster `dir mode`
export FLAG_5=$(gen_flag AJ62GMO17B4CP5QK $github_username) #  5. The Buster Series - Unveiling Hidden Subdomains `dns mode`
export FLAG_6=$(gen_flag 582DFRERA487KDSQ $github_username) #  6. The Buster Series - Virtually Hosted Hijinks `vhost mode`
export FLAG_7=$(gen_flag Z94U8C6EP2NWGVRH $github_username) #  7. The Buster Series - Fuzzing for Fun and Profit `fuzz mode`
export FLAG_8=$(gen_flag 58475ZDJFUENFI48 $github_username) # 8. The Buster Series - Tackling TFTP with Brute Force `tftp mode`


echo "Exporting Env for: $github_username Done"
