#FROM node:13.3.0 AS build
#
#COPY package.json /usr/angular-workdir/
#WORKDIR /usr/angular-workdir
#RUN npm install
#
#COPY ./ /usr/angular-workdir
#RUN npm run build:prod

FROM nginx:alpine

## Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY ./docker/nginx.conf /etc/nginx/nginx.conf

COPY ./dist /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]