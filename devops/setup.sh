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

    sed -i -e 's/https:\/\/4kz2r4t838.execute-api.us-east-1.amazonaws.com\/CI02/https:\/\/4kz2r4t838.execute-api.us-east-1.amazonaws.com\/QA01/g' /usr/share/nginx/html/main*.js
    sed -i -e 's/https:\/\/28c9y4dvs8.execute-api.us-east-1.amazonaws.com\/CI02/https:\/\/28c9y4dvs8.execute-api.us-east-1.amazonaws.com\/QA01/g' /usr/share/nginx/html/main*.js
    sed -i -e 's/authPassword:"12345"/authPassword:"ypej47Qm14QhjB93Sf"/g' /usr/share/nginx/html/main*.js

    echo "Starting Web Server ..."
    nginx -g 'daemon off;'

elif [ "$environment" == "qa2" ]
then
    echo "Setting up project $app:$environment"

    sed -i -e 's/https:\/\/4kz2r4t838.execute-api.us-east-1.amazonaws.com\/CI02/https:\/\/4kz2r4t838.execute-api.us-east-1.amazonaws.com\/QA02/g' /usr/share/nginx/html/main*.js
    sed -i -e 's/https:\/\/28c9y4dvs8.execute-api.us-east-1.amazonaws.com\/CI02/https:\/\/28c9y4dvs8.execute-api.us-east-1.amazonaws.com\/QA02/g' /usr/share/nginx/html/main*.js
    sed -i -e 's/authPassword:"12345"/authPassword:"ypej47Qm14QhjB93Sf"/g' /usr/share/nginx/html/main*.js

    echo "Starting Web Server ..."
    nginx -g 'daemon off;'

elif [ "$environment" == "uat" ]
then
    echo "Setting up project $app:$environment"

    sed -i -e 's/https:\/\/4kz2r4t838.execute-api.us-east-1.amazonaws.com\/CI02/https:\/\/4kz2r4t838.execute-api.us-east-1.amazonaws.com\/UAT/g' /usr/share/nginx/html/main*.js
    sed -i -e 's/https:\/\/28c9y4dvs8.execute-api.us-east-1.amazonaws.com\/CI02/https:\/\/28c9y4dvs8.execute-api.us-east-1.amazonaws.com\/UAT/g' /usr/share/nginx/html/main*.js
    sed -i -e 's/authPassword:"12345"/authPassword:"sgrg75498485kojjk54547jjkl"/g' /usr/share/nginx/html/main*.js
    sed -i -e 's/6ac0e5bb-786a-4371-98f2-5a2e8035d871/e429f7d9-7476-4165-aa13-f4d13b550504/g' /usr/share/nginx/html/main*.js

    echo "Starting Web Server"
    nginx -g 'daemon off;'

elif [ "$environment" == "prd" ]
then

    echo "Setting up project $app:$environment"

    sed -i -e 's/https:\/\/4kz2r4t838.execute-api.us-east-1.amazonaws.com\/CI02/https:\/\/4kz2r4t838.execute-api.us-east-1.amazonaws.com\/PRD/g' /usr/share/nginx/html/main*.js
    sed -i -e 's/https:\/\/28c9y4dvs8.execute-api.us-east-1.amazonaws.com\/CI02/https:\/\/28c9y4dvs8.execute-api.us-east-1.amazonaws.com\/PRD/g' /usr/share/nginx/html/main*.js
    sed -i -e 's/authPassword:"12345"/authPassword:"jqwPor428Hscx72lhKms"/g' /usr/share/nginx/html/main*.js
    sed -i -e 's/6ac0e5bb-786a-4371-98f2-5a2e8035d871/e429f7d9-7476-4165-aa13-f4d13b550504/g' /usr/share/nginx/html/main*.js

    echo "Starting Web Server"
    nginx -g 'daemon off;'
else
    echo "Please enter a valid environment option [ ci, ci2, qa, qa2, prod]"
fi
