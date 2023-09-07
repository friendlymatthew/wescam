<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This repository contains the code for a server-side real-time encrypted messaging service. 

## Enviornment Setup

Before beginning the process for setting up the project, there are several dependencies you must download. Firstly, you must have Node and yarn installed on your system. 

To install Node run the following commands:
```bash
brew install node
npm install yarn 
```

Notice that this step assumes that you have [Homebrew](linktohonebrew) setup on your device. If not, please look at their documentation to get that set up. 

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

To setup the develpment _______ for the repo follow the follwing instructions:
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

4. Start a PostgreSQL database server

```bash
$ sudo service postgresql start
```

5. Some bullshit regarding PostgreSQL credentials

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

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
