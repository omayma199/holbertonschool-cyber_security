FROM python:slim-bookworm

# Apt updates
RUN apt-get update

# Install Linux Deps
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get install -yq curl procps

# Install Nginx
RUN apt-get install -yq nginx

# Install PHP
RUN apt-get install -yq php php-mysql php-sqlite3 php-fpm php-xml php-json php-gd php-curl php-zip

# Install Bind9

RUN apt-get install -yq bind9 bind9utils bind9-doc

# Copying /etc
COPY etc /etc
COPY Wordpress /var/www/wordpress
COPY etc/php-fpm.conf /etc/php/8.2/fpm/pool.d/www.conf
RUN chown -R www-data:www-data /var/www/wordpress
EXPOSE 80 
EXPOSE 69
EXPOSE 53
# Entrypoint
ENTRYPOINT /etc/entrypoint.sh
