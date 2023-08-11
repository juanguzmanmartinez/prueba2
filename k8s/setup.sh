#!/bin/sh -e
echo "Setting up project $app:$environment"

#sed -i -e 's/environment:"develop"/environment:"ci"/g' /usr/share/nginx/html/main*.js
#sed -i -e 's/lRJsUxGhkBIAV5QNk-5lB7I1e51kod_pQbZm_eu3xaQ/M7z44pJlDaQPRM3__pjFwCunPWuv6suOxsnibluRkRg/g' /usr/share/nginx/html/main*.js

echo "Starting Web Server ..."
nginx -g 'daemon off;'

if [ "$environment" == "prd" ]
  echo "Google Tag Manager Settings for PRD enviroment"
  sed -i -e 's/GTM-NT7T793/GTM-MP4HBG7/g' /usr/share/nginx/html/index.html
then
fi
