#!/bin/bash

# current folder
prename=${PWD##*/}
# current folder in lower case
name=`echo "$prename" | awk '{print tolower($0)}'`
# current directory
currentdir=${PWD}

docker start -i 'welove'$name
