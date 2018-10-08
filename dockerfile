
# Use latest node version 8.x
FROM node:8 #9.11.2-alpine

# Create app directory
WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN yarn install --only=production

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "yarn", "start" ]


################################################################
# $ docker build -t <your username>/node-web-app .
# $ docker run -p 49160:8080 -d <your username>/node-web-app
#
# # Get container ID
# $ docker ps
#
# # Print app output
# $ docker logs <container id>
#
# # Example
# Running on http://localhost:8080
#
# # TEST
# $ docker ps
#
# $ curl -i localhost:49160
################################################################
