#!/bin/sh -e

if [ "$environment" == "ci" ]
then
    echo "Setting up project $app:$environment"

    echo "Starting Web Server ..."
    nginx -g 'daemon off;'

elif [ "$environment" == "ci2" ]
then
    echo "Setting up project $app:$environment"


    echo "Starting Web Server ..."
    nginx -g 'daemon off;'

elif [ "$environment" == "qa" ]
then
    echo "Setting up project $app:$environment"



    echo "CONTENTFUL CONFIG Settings for CIQA enviroment"
    sed -i -e 's/environment:"develop"/environment:"UAT"/g' /usr/share/nginx/html/main*.js
    sed -i -e 's/lRJsUxGhkBIAV5QNk-5lB7I1e51kod_pQbZm_eu3xaQ/M7z44pJlDaQPRM3__pjFwCunPWuv6suOxsnibluRkRg/g' /usr/share/nginx/html/main*.js

    echo "Starting Web Server ..."
    nginx -g 'daemon off;'

elif [ "$environment" == "qa2" ]
then
    echo "Setting up project $app:$environment"




    echo "CONTENTFUL CONFIG Settings for CIQA enviroment"
    sed -i -e 's/environment:"develop"/environment:"UAT"/g' /usr/share/nginx/html/main*.js
    sed -i -e 's/lRJsUxGhkBIAV5QNk-5lB7I1e51kod_pQbZm_eu3xaQ/M7z44pJlDaQPRM3__pjFwCunPWuv6suOxsnibluRkRg/g' /usr/share/nginx/html/main*.js

    echo "Starting Web Server ..."
    nginx -g 'daemon off;'

  elif [ "$environment" == "uat" ]
  then
      echo "Setting up project $app:$environment"



      echo "Starting Web Server"
      nginx -g 'daemon off;'

elif [ "$environment" == "prd" ]
then

    echo "Setting up project $app:$environment"



      echo "Starting Web Server"
      nginx -g 'daemon off;'
else
    echo "Please enter a valid environment option [ ci, ci2, qa, qa2, prod]"
fi
