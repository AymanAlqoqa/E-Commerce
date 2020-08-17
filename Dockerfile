FROM node:lts-slim
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
COPY .babelrc ./
COPY .env ./
COPY backend /app/backend
RUN npm i
EXPOSE 5000

