FROM node:alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

# If you are building your code for production
RUN npm install --legacy-peer-deps

# Bundle app source
COPY . .

# Expose port 3000
EXPOSE 3000

