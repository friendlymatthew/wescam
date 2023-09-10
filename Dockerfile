# Using Node.js 16 as the base image
FROM node:16

# Install debugging utilities
RUN apt-get update && apt-get install -y \
    lsb-release \
    gdb \
    && rm -rf /var/lib/apt/lists/*

# Create and set the working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install --verbose

# Copy other files from your local file system to the image
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application using yarn
CMD ["yarn", "start"]
