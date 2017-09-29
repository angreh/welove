#!/bin/bash

# current folder
prename=${PWD##*/}
# current folder in lower case
name=`echo "$prename" | awk '{print tolower($0)}'`
# current directory
currentdir=${PWD}

docker build --no-cache -t 'welove/'$name .
docker run -d --name 'welove'$name'cp' 'welove/'$name
docker cp 'welove'$name'cp:/usr/src/app/node_modules' $currentdir'/node_modules'
docker rm 'welove'$name'cp'
docker run -i -t -p 3036:3036 -v $currentdir':/usr/src/app' --name 'welove'$name 'welove/'$name /bin/bash

# nano /etc/mysql/my.cfn
# comment line bind-address
# start mysql service
# mysql -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';"
# mysql -e "CREATE DABASE welove;"
# restart mysql service
# for IP docker inspect