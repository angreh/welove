FROM node:boron

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .

RUN npm install
RUN npm install -g http-server

EXPOSE 3034
CMD [ "npm", "start" ]
