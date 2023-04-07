FROM node:16

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

# If you are building your code for production
RUN npm install

# Bundle app source
COPY . .

# Expose port 3000
CMD ["npm", "start"]
