FROM node:20.1.0-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npx prisma generate

CMD [ "npm", "run", "start:docker" ]