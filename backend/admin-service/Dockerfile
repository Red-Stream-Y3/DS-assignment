# syntax=docker/dockerfile:1

FROM node:alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]
EXPOSE 3119