FROM python:3.11.8-slim-bookworm

RUN apt-get update && \
    apt-get -y upgrade && \
    apt-get install -y dos2unix  gettext-base curl nginx wget git unzip curl redis gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils sqlite3 && \
    apt-get clean && \
    apt-get autoremove && \
    apt-get remove -y


COPY /tmp/requirements.txt /tmp/
RUN pip install -r /tmp/requirements.txt && rm /tmp/requirements.txt
RUN python3 -c "from requests_html import HTML; HTML(html='<html></html>').render()"

RUN apt-get clean && apt-get autoremove && apt-get remove -y

COPY etc /etc

RUN chmod +x /etc/entrypoint.sh
RUN chmod +x /etc/flags.sh
RUN dos2unix /etc/flags.sh


COPY webapp /run/flask
COPY webapp/routes/a3_sql_injection/init.sh /run/flask/routes/a3_sql_injection/init.sh
RUN chmod +x /run/flask/routes/a3_sql_injection/init.sh

RUN dos2unix /run/flask/routes/a3_sql_injection/init.sh



RUN pip install fastapi uvicorn

RUN pip install glances
EXPOSE 61208


EXPOSE 80

ENTRYPOINT ["/etc/entrypoint.sh"]

