FROM node:lts-slim
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
COPY ./public ./public
COPY ./src ./src
RUN npm i
EXPOSE 3000
