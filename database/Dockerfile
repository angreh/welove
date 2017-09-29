FROM node:boron

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update \
  && apt-get install -y mysql-server mysql-client libmysqlclient-dev nano \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
RUN /etc/init.d/mysql start

RUN npm install
RUN npm install -g sequelize-cli

EXPOSE 3306
