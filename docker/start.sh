#!/bin/bash

[[ -z "$PORT" ]] && export PORT=8080
envsubst '$PORT $PROXYPASS' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

exec nginx -c /etc/nginx/nginx.conf
