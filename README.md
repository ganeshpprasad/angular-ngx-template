<<<<<<< HEAD
# NGX-INFINITY-APP
=======
# README FOR NGX-INFINITY-APP


### Pre-requisites 
Node version 12+
Npm version 6+ 
Use NVM (Node version manager) `nvm list` to manage local node versions.

---
App Dev command
 *   `npm start `
---
### Steps For Prod run

1. Build ```npm run build:prod```
2. Run the following commands:

```
chmod +x *.sh
./nginx-start.sh
```

* ```nginx -s stop```
___

#### Docker

* ```docker build --tag ngx-ldso-app .```
* ```docker network create <network_name>```
* ```docker run -d -p 8080:8080 --network=<network_name> --name ngx-ldso-app-1 ngx-ldso-app```


##### NOTES 
* On Nginx errors with css, check the system path for mime.types (ref https://stackoverflow.com/questions/10075304/nginx-fails-to-load-css-files).
By default it should point to /etc/nginx/mime.types or /usr/local/etc/nginx/mime.types

* tsconfig.js -> https://angular.io/guide/deployment#differential-loading
