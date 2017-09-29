FROM node:boron

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .

RUN apt-get update -qq && apt-get install -y build-essential
RUN mkdir -p node_modules/node-sass/vendor/linux-x64-51
RUN curl -L https://github.com/sass/node-sass/releases/download/v4.5.0/linux-x64-51_binding.node -o node_modules/node-sass/vendor/linux-x64-51/binding.node

RUN npm install
RUN npm install -g gulp gulp-cli node-sass

RUN npm rebuild node-sass --force

EXPOSE 3030
CMD [ "gulp", "default" ]
