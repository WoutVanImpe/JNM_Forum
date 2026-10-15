FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i --quiet

COPY . .

EXPOSE $FRONTEND_PORT

CMD ["npm", "run", "dev"]