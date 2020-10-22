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

    sed -i -e 's/https:\/\/radxzrb1ok.execute-api.us-east-1.amazonaws.com\/CI02/https:\/\/radxzrb1ok.execute-api.us-east-1.amazonaws.com\/QA01/g' /usr/share/nginx/html/main*.js
    sed -i -e 's/https:\/\/r7540g00k4.execute-api.us-east-1.amazonaws.com\/CI02/https:\/\/r7540g00k4.execute-api.us-east-1.amazonaws.com\/QA01/g' /usr/share/nginx/html/main*.js

    echo "Starting Web Server ..."
    nginx -g 'daemon off;'

elif [ "$environment" == "qa2" ]
then
    echo "Setting up project $app:$environment"

    sed -i -e 's/https:\/\/radxzrb1ok.execute-api.us-east-1.amazonaws.com\/CI02/https:\/\/radxzrb1ok.execute-api.us-east-1.amazonaws.com\/QA02/g' /usr/share/nginx/html/main*.js
    sed -i -e 's/https:\/\/r7540g00k4.execute-api.us-east-1.amazonaws.com\/CI02/https:\/\/r7540g00k4.execute-api.us-east-1.amazonaws.com\/QA02/g' /usr/share/nginx/html/main*.js

    echo "Starting Web Server ..."
    nginx -g 'daemon off;'

elif [ "$environment" == "uat" ]
then
    echo "Setting up project $app:$environment"

    sed -i -e 's/https:\/\/radxzrb1ok.execute-api.us-east-1.amazonaws.com\/CI02/https:\/\/radxzrb1ok.execute-api.us-east-1.amazonaws.com\/UAT/g' /usr/share/nginx/html/main*.js
    sed -i -e 's/https:\/\/r7540g00k4.execute-api.us-east-1.amazonaws.com\/CI02/https:\/\/r7540g00k4.execute-api.us-east-1.amazonaws.com\/UAT/g' /usr/share/nginx/html/main*.js

    echo "Starting Web Server"
    nginx -g 'daemon off;'

elif [ "$environment" == "prd" ]
then

    echo "Setting up project $app:$environment"

    sed -i -e 's/https:\/\/radxzrb1ok.execute-api.us-east-1.amazonaws.com\/CI02/https:\/\/radxzrb1ok.execute-api.us-east-1.amazonaws.com\/PRD/g' /usr/share/nginx/html/main*.js
    sed -i -e 's/https:\/\/r7540g00k4.execute-api.us-east-1.amazonaws.com\/CI02/https:\/\/r7540g00k4.execute-api.us-east-1.amazonaws.com\/PRD/g' /usr/share/nginx/html/main*.js

    echo "Starting Web Server"
    nginx -g 'daemon off;'
else
    echo "Please enter a valid environment option [ ci, ci2, qa, qa2, prod]"
fi
