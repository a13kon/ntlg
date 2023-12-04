FROM node:20.10-alpine

WORKDIR /app

ARG NODE_ENV=prodaction

COPY ./package*.json ./

RUN npm install

COPY ./booksFiles booksFiles/
COPY ./middleware middleware/
COPY ./routes routes/
COPY ./src src/
COPY ./storage storage/

CMD ["npm", "run", "server"]