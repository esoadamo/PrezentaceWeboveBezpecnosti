FROM node:16-bullseye
RUN apt-get update && \
    apt-get install -y iproute2 iptables sudo libluajit-5.1-2 && \
    apt-get clean

RUN useradd --uid 991 --system --create-home server

ADD entrypoint.sh /entrypoint.sh
ADD ip_killswitch.sh /usr/bin/ip-killswitch-activate
ADD . /app/

RUN chmod 700 /entrypoint.sh &&\
    chmod 755 /usr/bin/ip-killswitch-activate &&\
    chown root:server -R /app &&\
    chmod 640 -R /app &&\
    chmod og+X -R /app

EXPOSE 8224

ENTRYPOINT ["/bin/bash"]
CMD ["/entrypoint.sh"]

