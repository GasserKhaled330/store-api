# Storefront Backend Project

## Introduction ##

This is a REST API simulating an e-commerce backend based on three models: Products, Orders and Users. 
A detailed list of the endpoints and actions available can be found in the [REQUIREMENTS.md](https://github.com/fedeval/storefront-backend-api/blob/main/REQUIREMENTS.md) file.

## Setup ##

### Database config ###

The API connects to a postgres database. As a first step, it is necessary to create two databases (development and test) on your local machine. 
Run the command `psql -U YOUR_DB_USER postgres` in terminal to open the postgres CLI. Then run the following:

```SQL
CREATE USER store_user WITH PASSWORD 'YOUR_PASSWORD_HERE';
CREATE DATABASE online_store_api;
\c online_store_api;
GRANT ALL PRIVILEGES ON DATABASE online_store_api TO store_user;
CREATE DATABASE online_store_api_test;
\c online_store_api_test;
GRANT ALL PRIVILEGES ON DATABASE online_store_api_test TO store_user;
````

To make sure the API can connect to the db it is necessary to create a `database.json` file with the following format

```json
{
  "dev": {
    "driver": "pg",
    "host": "YOUR_DB_HOST",
    "database": "online_store_api",
    "user": "store_user",
    "password": "YOUR_PASSWORD_HERE"
  },
  "test": {
    "driver": "pg",
    "host": "YOUR_DB_HOST",
    "database": "online_store_api_test",
    "user": "store_user",
    "password": "YOUR_PASSWORD_HERE"
  }
}
```


### Environment variables ###

The API relies on several environment variables to function. `dotenv` is already included in the `package.json`file, 
so it is only necessary to create a `.env` file with the following variables:

| Name              |         Value         |                                                                       Notes                                                                       |
|-------------------|:---------------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------:|
| POSTGRES_HOST     |    "YOUR_DB_HOST"     |                                                      Same value as in the database.json file                                                      |
| POSTGRES_DB       |   online_store_api    |                                                      Same value as in the database.json file                                                      |   
| POSTGRES_TEST_DB  | online_store_api_test |                                                      Same value as in the database.json file                                                      |
| POSTGRES_USER     |      store_user       |                                                      Same value as in the database.json file                                                      |
| POSTGRES_PASSWORD |     YOUR_PASSWORD     |                                                      Same value as in the database.json file                                                      |
| ENV               |          dev          |                           Used to set the DB environment. The test script automatically sets it to 'test' when running.                           |
| PORT              |       YOUR_PORT       |         The API will run on http://localhost:3000 by default, but there is the option to select a custom port as an environment variable          |
| SALT_ROUNDS       |          10           |                              Number of salt rounds the password hashing function of the bcrypt package will be using                              |
| PEPPER            |   YOUR_STRING_HERE    |                   A string of your choice that bcrypt will be adding prior to hashing passwords for an extra layer of security                    |
| TOKEN_SECRET      |   YOUR_STRING_HERE    | A string that will be used by jwt to generate authentication tokens. The more complex the better, it should be made of random characters ideally. |

---
## Getting Started ##

### Installing dependencies ###

After cloning the repo, all the project dependencies can be installed using npm:

```
npm install
```
### Scripts ###

The following actions can be executed through npm scripts:

#### Transpiling typescript to javascript ####

```
npm run build
```

#### Testing ####

A set of jasmine testing suites and specs can be used to test both the endpoints and the models.

```
npm run test
```

This script runs migrations and tests on the test database by setting the ENV variable to `test` using the `cross-env` package. 
The script relies on two "child scripts" `npm run jasmine`and `npm run migrate-and-jasmine`. 
Those script have been broken up for readability, but they should never be run.

NOTE: if the test script is interrupted by an NPM Error, 
it will not run to the end, thus potentially leaving data in the test database. 
To fix that it is recommended to reset the test database by running `db-migrate reset -e test` in the terminal before running again any tests. 
For this command to work db-migrate should be globally installed on your machine as such: `npm i -g db-migrate`

#### Watcher To run the server  ####

This will kick off the watcher library and start running the application on the port specified in `server.ts` or the `.env`file.

```
npm run watch
```


#### Formatting ####

The code can be automatically formatted using prettier. The formatting options can be customised by editing the `.prettierrc`file.

```
npm run prettier
```

#### Linting ####

The code can ba automatically linted using Elint. Note that Elint will also use prettier to test for incorrect formatting. Rules, plugins and extensions for Elint can be modified through the `.eslintrc` file.

```
npm run lint
```

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

