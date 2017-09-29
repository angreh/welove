#!/bin/bash

# current folder
prename=${PWD##*/}
# current folder in lower case
name=`echo "$prename" | awk '{print tolower($0)}'`
# current directory
currentdir=${PWD}

docker build -t 'welove/'$name .
docker run -d -p 3034:3034 -v $currentdir':/usr/src/app' --name 'welove'$name 'welove/'$name
docker stop 'welove'$name
echo 'controls "docker start welove'$name'", "docker stop welove'$name'"'
