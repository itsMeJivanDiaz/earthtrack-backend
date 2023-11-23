FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY .env ./

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:dev"]