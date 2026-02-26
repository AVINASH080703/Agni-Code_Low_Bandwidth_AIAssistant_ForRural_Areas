# Use a base image with Node.js for JavaScript applications
   FROM node:14

   # Set the working directory
   WORKDIR /app

   # Copy package.json and package-lock.json (if available)
   COPY package*.json ./

   # Install dependencies
   RUN npm install

   # Copy the rest of the application code
   COPY . .

   # Expose the port the app runs on
   EXPOSE 3000

   # Command to run the application
   CMD ["npm", "start"]
