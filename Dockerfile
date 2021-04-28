FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY . ./

USER node

RUN yarn install

COPY --chown=node:node . .

EXPOSE 80

CMD [ "node", "server.js" ]