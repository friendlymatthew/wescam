FROM node:16

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install

# Copying all other files from your local file system to the image
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application using yarn
CMD ["yarn", "start"]
