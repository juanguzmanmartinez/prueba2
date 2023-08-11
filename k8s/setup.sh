elif [ "$environment" == "uat" ]
then
  echo "Google Tag Manager Settings for UAT enviroment"
  sed -i -e 's/GTM-M8T3RJR/GTM-M8T3RJR/g' /usr/share/nginx/html/index.html

  echo "Starting Web Server Inkafarma UAT"
  nginx -g 'daemon off;'
else
  echo "Starting Web Server"
  nginx -g 'daemon off;'
fi
