FROM node:15-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

EXPOSE 8080 

ENTRYPOINT [ "node", "index.js" ]