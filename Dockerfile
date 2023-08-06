# Use an official Node.js runtime as the base image
FROM node:18 as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the production-ready React app
RUN npm run build

# Expose port 3000 to the host machine
EXPOSE 3000

# Start the Node.js server to serve the built app
CMD ["npm", "start"]