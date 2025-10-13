# 0. Manual Discovery - Secrets in Plain Sight

* Go http://web0x04.hbtn/sitemap.xml
* Search for Valid Route 
* http://web0x04.hbtn/ta-holbie-malta
* Congratulations! FLAG: 579eea17d42c385d4be6a0750c6b5562

# 1. Manual Discovery - Headers, Headers, Always Check Headers
* curl -I http://web0x04.hbtn  --cookie "name=value"
* X-Secret-Flag: b7cd6cd43fa4614457ca0d8156e9b777

# 2. Manual Discovery - Stalking the Stack: A Template Tale
* Not Related To Lab ,  Target Website: https://cod.hbtn.io
# 3. Manual Discovery - Time Travelers: Unearthing the Past with OSINT
* Not Related To Lab , Target Website: https://www.holbertonschool.com
# 4. The Buster Series - Initiating with Gobuster `dir mode`
* can Be Found Under  http://web0x04.hbtn/payment_gateway/hiddenflag.php
* can Be Found Under http://web0x04.hbtn/create/hiddenflag.php
# 5. The Buster Series - Unveiling Hidden Subdomains `dns mode`
* Check DNS RECORDS  (SOA NS  A and MX Records  ns1.web0x04.hbtn)
* #SUBDOMAIN		IN      TXT		"Holberton Sec Lab - FLAG: "
# 6. The Buster Series - Virtually Hosted Hijinks `vhost mode`
* Check http://sub.web0x04.hbtn
# 7. The Buster Series - Fuzzing for Fun and Profit `fuzz mode`
* Should be in here http://web0x04.hbtn/fuzz/
* Need To Bypass it using this format http://web0x04.hbtn/fuzz/hbtn-{¶}
* 
# 8. The Buster Series - Tackling TFTP with Brute Force `tftp mode`
*  tftp web0x04.hbtn 69
* the Flag Should be in one of this file but this is random  (  "infrared.txt",
                    "OS79XX.TXT",
                    "phbook00e011010455.txt",
                    "sip_4602D01A.txt",
                    "sip_4602D02A.txt",
                    "uniden00e011030397.txt",
                    "unidencom.txt",)