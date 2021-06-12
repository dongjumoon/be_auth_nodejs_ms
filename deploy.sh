#!/usr/bin/bash 
sudo docker build . -f Dockerfile-Dev -t toyongyeon/be_auth_nodejs_ms_dev:0.1
sudo docker run --name be-auth-nodejs-ms-dev -e MONGO_HOST=$MONGO_HOST -d -p 3000:8888 toyongyeon/be_auth_nodejs_ms_dev:0.1
