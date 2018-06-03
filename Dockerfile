
# https://blog.docker.com/2015/04/tips-for-deploying-nginx-official-image-with-docker/

FROM nginx

RUN rm /etc/nginx/conf.d/default.conf

#RUN rm /etc/nginx/conf.d/examplessl.conf

COPY fonts  /usr/share/nginx/html/fonts
COPY img    /usr/share/nginx/html/img
COPY *.js   /usr/share/nginx/html/
COPY *.html /usr/share/nginx/html/
COPY *.css  /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/conf.d/


