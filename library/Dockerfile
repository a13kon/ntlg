FROM node:20.10-alpine

WORKDIR /app

COPY . /app/

ARG NODE_ENV=production

RUN npm install && npm build

CMD ["npm", "run", "server"]