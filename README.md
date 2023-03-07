## Blog Application

This is a simple blog application built using Node.js, MongoDB, and the Express framework. It allows users to create, read, update, and delete blog posts. The application also supports user authentication and authorization.

1. [Instalation](#install)

2. [Configuration](#conf)

3. [Usage](#usage)

4. [Endpoints](#endpoints)

5. [Authentication](#auth)

5. [Authorization](#authoriz)

6. [Credits](#credits)

7. [License](#license)

### <a id='install'></a>Installation

To install the application, clone the repository and run the following command:
```
npm install
```
This will install all the required dependencies.

### <a id='conf'></a>Configuration

The application requires a MongoDB database to store data. 
Create `config.json` file with object of configuration data.
```json
{
  "development": {
    "username": "username",
    "password": "password",
    "db_name": "database",
    "ACCESS_TOKEN_SECRET": "secret",
    "port": "8000"
  }
}
```

### <a id='usage'></a>Usage

To start the application, run the following command:

```cmd
cd ./server
npm start
```
This will start the server at http://localhost:8000. You can access the application by opening this URL in your web browser.

### <a id='endpoints'></a>Endpoints

The application exposes the following endpoints:

`/login`: User login to the app

`/register`: User registration

`/me`: Get self data

`/users`: Get all allowed data from API

`/users/:id`: Get data by id

`/users/access`: Give `admin` access for `user` to more ids

### <a id='auth'></a>Authentication

The application uses JSON Web Tokens (JWT) for user authentication. When a user logs in, the server generates a JWT and sends it back to the client. The client must include this token in the Authorization header for all subsequent requests that require authentication.

### <a id='authoriz'></a>Authorization

The application supports authorization based on user roles. There are two roles: `user` and `admin`. By default, all users have the user role. Users with the admin role have additional privileges, such as the ability to give access to ids in API.

### <a id='credits'></a>Credits

The application was built by [therealtoresto](https://github.com/therealtoresto).

### <a id='license'></a>License

This application is licensed under the MIT License. See [LICENSE](./LICENSE) for more information.