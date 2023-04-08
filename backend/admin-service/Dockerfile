# syntax=docker/dockerfile:1

FROM node:alpine

WORKDIR /app

COPY ./package*.json ./
RUN npm install

COPY . .
RUN ls

EXPOSE 3119