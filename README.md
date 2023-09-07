<p align="center">
  <img src="./xyz_logo.png" width="200" alt="XYZ Logo">
</p>

# XYZ: Real-time Encrypted Messaging Service

[![Join Discord](https://img.shields.io/badge/Discord-Join%20Server-blue?style=for-the-badge&logo=discord)](https://discord.gg/gt8VTZfn6h)

---

## Table of Contents

- [Description](#description)
- [Environment Setup](#environment-setup)
  - [Node and Yarn](#node-and-yarn)
  - [NestJS](#nestjs)
  - [Prisma](#prisma)
  - [PostgreSQL](#postgresql)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Test](#test)
- [Acknowledgements](#acknowledgements)

---

## Description

This repository contains the code for XYZ, a server-side real-time encrypted messaging service built using NestJS, Prisma ORM, and PostgreSQL.

---

## Environment Setup

Before setting up the project, you need to install several dependencies:

### Node and Yarn

Firstly, ensure that Node.js and Yarn are installed on your system.

```bash
brew install node
npm install yarn
```

Notice that this step assumes that you have [Homebrew](linktohonebrew) setup on your device. If you don't have that installed, please look at their documentation to get that set up. 

Next you need to install NestJS. Nest (NestJS) is a framework for building efficient, scalable Node.js server-side applications. We will be using this framework to build our webapp. To install run the following command.

```bash
yarn global add @nestjs/cli
```

Next, you need to install the Prisma CLI. Prisma is the Object Relational Mapping (ORM) that we will be using to connect to our database. To install Prisma CLI:

```bash
yarn global add prisma
```
Finally, you need to install PostgreSql. This is the relational-database management system that we will be using. To install,

```bash
sudo apt update
sudo apt install postgresql
```
Now, your enviornmnet is all set up!

## Installation

To setup the develpment build for the repository follow the follwing instructions:
1. Clone the repository
```bash 
git clone https://github.com/xyz-hq/xyz.git
```
2. Install all dependencies
```bash
cd xyz
yarn install
```

3. Initiaize Prisma
```bash
prisma:generate
```

4. Start and Setup a PostgreSQL database server, 

```bash
$ sudo service postgresql start
$ sudo -u postgres psql
  CREATE DATABASE julia;
  CREATE USER mostvaluableship WITH PASSWORD 'friendship';
  GRANT ALL PRIVILEGES ON DATABASE julia TO mostvaluableship;
```

Now you are ready to run the app!

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

We will be using [jest](linktojest) to run our unit and integration tests. Use the [following guide](linktoguide) to learn how to use jest to write tests. To run them use the commands given below:

```bash
# unit tests
$ yarn test

# test coverage
$ yarn test:cov

# e2e tests
$ yarn run test:e2e

```

## Aknowledgements

This project is developed using NestJS. NestJS is an MIT-licensed open source backend Framework

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

<p align="center">
<a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>
