if [ "$environment" == "prd" ]
then
  echo "Google Tag Manager Settings for PRD enviroment"
  sed -i -e 's/GTM-M8T3RJR/TEST/g' /usr/share/nginx/html/index.html

  echo "Starting Web Server Inkafarma"
  nginx -g 'daemon off;'
elif [ "$environment" == "uat" ]
then
  echo "Google Tag Manager Settings for UAT enviroment"
  sed -i -e 's/GTM-M8T3RJR/GTM-M8T3RJR/g' /usr/share/nginx/html/index.html

  echo "Starting Web Server Inkafarma UAT"
  nginx -g 'daemon off;'
else
  echo "Setting up project $app:$environment"
  echo "Starting Web Server"
  nginx -g 'daemon off;'
fi