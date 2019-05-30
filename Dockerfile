FROM node:10.15.3-alpine

ARG NODE_ENV

RUN apk update

# Install base and dev packages
RUN apk add --no-cache --virtual .build-deps

# Install prod dependencies
RUN apk -Uuv add --no-cache \
  make \
  curl \
  groff \
  less \
  nodejs-npm \
  bash \
  python \
  ruby

# Set timezone to UTC by default
RUN ln -sf /usr/share/zoneinfo/Etc/UTC /etc/localtime

# Update npm
RUN npm install -g npm

WORKDIR /usr/src/app

# Copy Package.json and lock
COPY package* ./

# Install NodeJS Dependencies
RUN npm install

# Copy code
COPY . .

# Run tests
RUN npm run test
