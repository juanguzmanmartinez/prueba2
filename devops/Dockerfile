FROM 519901771307.dkr.ecr.us-west-2.amazonaws.com/nginx-1.13.12-alpine

COPY /devops/setup.sh /root

RUN chmod 777 /root/setup.sh

ENV TZ=America/Lima
RUN unlink /etc/localtime
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY /devops/nginx.conf /etc/nginx/nginx.conf
COPY /dist/WEB-admin-operaciones /usr/share/nginx/html

CMD ["/root/setup.sh"]
