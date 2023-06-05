FROM nginx:1.19.1-alpine

COPY /k8s/setup.sh /root

RUN chmod 777 /root/setup.sh

RUN apk add --no-cache tzdata
ENV TZ='America/Lima'
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN rm -r /etc/nginx/nginx.conf && rm -r /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf

COPY dist/app /usr/share/nginx/html

CMD ["/root/setup.sh"]