# AM Store's Server (API)

## Description

This is the server side or the **Back End** of **AM Store** (e-commerce) project which is The **API**
that handles the business logic of the e-commerce and provides the services to the clients.

## Technologies

- JavaScript <img src="./icons_readme/javascript.svg" style="width: 15px;height: 15px; transform: translate(6px, 3px)">
- Node.js <img src="./icons_readme/nodejs.svg" style="width: 50px;height: 16px; transform: translate(6px, 3px)">
- Express.js <img src="./icons_readme/express.jpg" style="width: 50px;height: 15px; transform: translate(6px, 3px)">
- MongoDB <img src="./icons_readme/mongodb.svg" style="width: 16px;height: 16px; transform: translate(6px, 3px)">
- Docker <img src="./icons_readme/docker.svg" style="width: 50px;height: 16px; transform: translate(6px, 3px)">
- Jest <img src="./icons_readme/jest.svg" style="width: 15px;height: 15px; transform: translate(6px, 3px)">

## Architecture

This **API** is a `RESTful API`, <br>
It provides endpoints for creating, retrieving, updating, and deleting resources
related to our e-commerce system (products, orders, users, etc.), <br>
It Uses `HTTP` methods `GET`, `POST`, `PUT`, `PATCH` and `DELETE` to signify the desired operation, <br>
It follows the `MVC` architectural pattern for separation of concerns principle,
and organizing the code to make it more modular, maintainable and easier to test.

## Endpoints & Documentation

You can browse the **Endpoints** and the **documentation** of the **API** on **Postman** 👇

[<img src="./icons_readme/postman-button.svg" alt="Run In Postman" style="width: 128px; height: 32px; transform: translateY(4px)">](https://app.getpostman.com/run-collection/27040994-2b37c7cf-3a2d-4022-9dfa-6b850399d269?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D27040994-2b37c7cf-3a2d-4022-9dfa-6b850399d269%26entityType%3Dcollection%26workspaceId%3Db9135996-e8d9-4c02-bc81-d0b278bfc9ff)

## Authentication

This API utilizes **JSON Web Tokens ( JWT <img src="./icons_readme/jwt.svg" alt="JWT Icon" style="width: 15px; height: 15px; transform: translateY(3px)"> )** for users authentication. <br>
Users can log in or sign up with their credentials (e.g., email and password or google authentication)
to obtain a **JWT token**.
This token is then included in subsequent requests to authenticate the user and authorize him to access
the protected resources (like his data, orders, shopping cart, favorites, etc. ).

## Feedbacks

I welcome any feedback or suggestions you might have! <br>
if you faced any problem in the project or you have any suggestion improves it,
or even you have some advices to improve me and my skills, <br>
Please feel free to open an issue and discuss it with me or contact me directly on [my LinkedIn account](https://www.linkedin.com/in/abdulrhman-goni-857a36275/)
or throuth my email abdulrhmangoni@gmail.com

Thank you for stopping by! 🌟
