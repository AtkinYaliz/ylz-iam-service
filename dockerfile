# Docker allows you to package an application with all of its dependencies into a standardized unit,
# called a container, for software development.
# A container is a stripped-to-basics version of a Linux operating system.
# An image is software you load into a container.

# Use latest node version 9.x
# FROM node:10.13.0-alpine
FROM tarampampam/node:10.13-alpine

# Create app directory
WORKDIR /usr/app

RUN pwd

# Only copy package.json initially so that `RUN yarn` layer is recreated only
# if there are changes in package.json
COPY package.json ./
COPY yarn.lock ./

# If you are building your code for production
# RUN npm install --only=production --no-cache git
RUN yarn install

# To bundle your app's source code inside the Docker image, use the COPY instruction:
COPY ./src ./src
COPY jest.config.js .
COPY tsconfig.json .
COPY tslint.json .

# Build and create /dist folder
RUN yarn build

# RUN echo "PORT=4001" >> .env
# RUN echo "MONGO=..." >> .env

RUN pwd
RUN ls -al

# Your app binds to port 8080 so you'll use the EXPOSE instruction to have it mapped by the docker daemon:
EXPOSE 9000

# Last but not least, define the command to run your app using CMD which defines your runtime.
# Here we will use the basic npm start which will run node server.js to start your server:
CMD [ "yarn", "start" ]
