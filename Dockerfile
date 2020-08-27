#FROM node:13.3.0 AS build
#
#COPY package.json /usr/angular-workdir/
#WORKDIR /usr/angular-workdir
#RUN npm install
#
#COPY ./ /usr/angular-workdir
#RUN npm run build:prod

FROM nginx:alpine
RUN apk add --no-cache bash
## Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

#COPY FILES
COPY ./dist /usr/share/nginx/html
COPY ./docker/start.sh /etc/nginx/
COPY ./docker/nginx.conf /etc/nginx/nginx.conf.template
#RUN START
CMD ["/etc/nginx/start.sh"]