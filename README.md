# AM Store's Server (API)

## Description

This is the server side or the **Back End** of **AM Store** project (e-commerce), <br>
Which is the server that handles the business logic of the e-commerce and provides the services to the clients
([**AM Store** Client site](https://github.com/AbdulrhmanGoni/AM-store-client) and
[**AM Store** Admin Pandel](https://github.com/AbdulrhmanGoni/AM-store-admin)).

## Technologies :hammer_and_wrench:

- JavaScript <img src="./icons_readme/javascript.svg" style="width: 15px;height: 15px; transform: translate(6px, 3px)">
- Node.js <img src="./icons_readme/nodejs.svg" style="width: 50px;height: 16px; transform: translate(6px, 3px)">
- Express.js <img src="./icons_readme/express.jpg" style="width: 50px;height: 15px; transform: translate(6px, 3px)">
- MongoDB <img src="./icons_readme/mongodb.svg" style="width: 16px;height: 16px; transform: translate(6px, 3px)">
- Docker <img src="./icons_readme/docker.svg" style="width: 50px;height: 16px; transform: translate(6px, 3px)">
- Jest <img src="./icons_readme/jest.svg" style="width: 15px;height: 15px; transform: translate(6px, 3px)">

## Architecture :jigsaw:

This **API** is a `RESTful API`, And it follows the `MVC` architectural pattern for separation of concerns and organizing the code to make it more modular, maintainable and easier to test.

## Install and Get Started :rocket:

> [!NOTE]
> This project built with the Javascript Runtime Environment `Node.js`, So you need to have `Node.js` installed in
> your machine to be able to install the project and run it.

Follow these steps to install and run AM Store's Server in your machine :point_down::

### 1. Clone the repository on your machine

Open the terminal on your machine whenever you want and run the following command to clone the repository:

```
git clone https://github.com/AbdulrhmanGoni/AM-store-server.git
```

### 2. Prepare running environment

First open `AM-store-server` folder by running this command

```
cd AM-store-server
```

And then create `.env.secret` and `.env.db.secret.dev` files using the following commands:

If you use **Linux** or **Mac** operating systems run this command:

```
touch .env.secret .env.db.secret.dev
```

If you use **Windows** operating system run this command:

```
ni .env.secret, .env.db.secret.dev
```

Open `.env.secret` file and add these variables to it:

```
HASHING_SALT_ROUNDS=
JWT_SECRET_KEY=""
STORE_EMAIL=""
EMAIL_APP_PASSWORD=""
VERIFY_EMAIL_API_KEY=""
GOOGLE_CLIENT_ID=""
```

A quick description of each variable in `.env.secret` file:
| VARIABLE | DESCRIPTION |
| --- | --- |
| HASHING_SALT_ROUNDS | Number rounds that hashing algorithm needs to encrypt users paswords |
| JWT_SECRET_KEY | The secret key of the tokens that will used to generat users access tokens |
| STORE_EMAIL | The official email of the store |
| EMAIL_APP_PASSWORD | the pasword of the app that should be created from Google cloud platform for store's email |
| VERIFY_EMAIL_API_KEY | The API key of [hunter.io platform](https://hunter.io/) for using **Email Verifier** service to verify users emails existence |
| GOOGLE_CLIENT_ID | The id of Google OAuth 2.0 client that used to sign up users with Google |

  <br>

Also open `.env.db.secret.dev` file and add these variables to it:

```
NODE_ENV=development
DB_USERNAME=""
DB_PASSWORD=""
DB_NAME=""
ATLAS_CLUSTER=""
REDIS_USERNAME=""
REDIS_PASSWORD=""
REDIS_HOST=""
REDIS_PORT=
```

A quick description of each variable in `.env.db.secret.dev` file:
| VARIABLE | DESCRIPTION |
| --- | --- |
| NODE_ENV | Running environment (e.g `development`, `production` ) |
| DB_USERNAME | The name of the user who has access to the mongo database of the project |
| DB_PASSWORD | The password of the user who has access to the mongo database of the project |
| DB_NAME | The name of the mongo database of the project |
| ATLAS_CLUSTER | The name of the atlas cluster that hosts the mongo database|
| REDIS_USERNAME | The name of redis database that used for caching in the project |
| REDIS_PASSWORD | The password of redis database that used for caching in the project |
| REDIS_HOST | The host name of redis database |
| REDIS_PORT | The port that redis database should listen to |

  <br>

> [!NOTE]
> This environment that we just created is `development` environment, You can add `.env.db.secret.prod` file for
> production environment and `.env.db.secret.test` for testing environment.

### 3. Run the server

#### Run directly using node.js

To run the server directly using `node.js` run the following commands:

1. Install the dependencies

```
npm install
```

2. Run the server

```
npm run node-dev
```

And congratulations 🎉, Your AM Store Server is up and running on your http://localhost:7000.

#### Run using Docker

if you have `Docker` already installed on your machine and want to run the server using it,
Run the following command:

```
npm run docker-dev
```

And congratulations 🎉, Your AM Store Server is up and running on your http://localhost:7000.

> [!NOTE]
> If you don't have `Docker` already installed on your machine and want to run the server using it,
> Go to [Docker official website](https://docs.docker.com/engine/install/) and install Docker engine
> and then come back to run the server.

## Endpoints & Documentation :ledger:

You can browse the **Endpoints** and the **documentation** of the **API** on **Postman** :point_down:

[<img src="./icons_readme/postman-button.svg" alt="Run In Postman" style="width: 128px; height: 32px; transform: translateY(4px)">](https://app.getpostman.com/run-collection/27040994-2b37c7cf-3a2d-4022-9dfa-6b850399d269?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D27040994-2b37c7cf-3a2d-4022-9dfa-6b850399d269%26entityType%3Dcollection%26workspaceId%3Db9135996-e8d9-4c02-bc81-d0b278bfc9ff)

## Authentication :key:

This **API** uses **JSON Web Tokens ( JWT <img src="./icons_readme/jwt.svg" alt="JWT Icon" style="width: 15px; height: 15px; transform: translateY(3px)"> )** for users authentication. <br>
Users can log in or sign up with their credentials (e.g., email and password or google authentication)
to obtain a **JWT token**, And then this token will be included in subsequent requests to authenticate the user
and authorize him to access the protected resources (e.g his data, orders, shopping cart, favorites, etc. ).

## Feedbacks :incoming_envelope:

I welcome any feedback or suggestions you might have! <br>
if you faced any problem in the project or you have any suggestion improves it,
or even you have some advices to improve me and my skills, <br>
Please feel free to open an issue and discuss it with me or contact me directly on [my LinkedIn account](https://www.linkedin.com/in/abdulrhman-goni-857a36275/)
or throuth my email abdulrhmangoni@gmail.com

Thank you for stopping by! 🌟
