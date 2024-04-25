FROM node:20.11.1

WORKDIR /am-store-server

COPY package.json .

ARG NODE_ENV

RUN \
    if ["$NODE_ENV" = "production"]; \
    then npm install --only=production; \
    else npm install; fi

COPY . .

EXPOSE 7000

CMD [ "npm", "start" ]