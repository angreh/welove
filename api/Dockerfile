FROM node:boron

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .

RUN npm install
RUN npm install -g gulp gulp-cli



EXPOSE 3033
CMD [ "gulp", "default" ]

# docker build -t welove/api .
# docker run -p 3033:3033 --name weloveapicp welove/api
# docker cp weloveapicp:/usr/src/app/node_modules /home/greh/projects/welovefestivals/api/node_modules
# docker rm weloveapicp
# docker run -p 3033:3033 -v /home/greh/projects/welovefestivals/api:/usr/src/app --name weloveapi welove/api
# controls "docker start weloveapi", "docker stop weloveapi"
