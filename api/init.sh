#!/bin/bash

# current folder
prename=${PWD##*/}
# current folder in lower case
name=`echo "$prename" | awk '{print tolower($0)}'`
# current directory
currentdir=${PWD}

docker build -t 'welove/'$name .
docker run -d --name 'welove'$name'cp' 'welove/'$name
docker cp 'welove'$name'cp:/usr/src/app/node_modules' $currentdir'/node_modules'
docker rm 'welove'$name'cp'
docker run -d -p 3033:3033 -v $currentdir':/usr/src/app' --name 'welove'$name 'welove/'$name
docker stop 'welove'$name
echo 'controls "docker start welove'$name'", "docker stop welove'$name'"'
