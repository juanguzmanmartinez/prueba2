#!/bin/sh

#Environment variable
TAG="web-admin-operaciones"
CONTAINER_NAME="web-admin-operaciones"
PORT=8080
APP=inkafarma-web-2
$(aws ecr get-login --region us-west-2 | sed -e 's/-e none//g')
cd ..
#building image
docker build -t $TAG -f devops/Dockerfile .
echo "image created"
#creating container
docker run -d -p $PORT:8080 --name=$CONTAINER_NAME -e environment=ci \
    -e app=$APP $TAG
echo "container created"
read -rsp $'Press any key to continue...\n' -n1 key
