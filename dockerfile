FROM node:21-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

ENV PORT=3500
EXPOSE 3500

CMD ["npm", "start"]