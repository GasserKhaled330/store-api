# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints

### Product End points ###
```
GET /products
GET /products/:id
POST /products 
DELETE /products/:id 
GET /products/:category   
```
### authenticate E points ###
```
POST /register
POST /login
```
### User End points ###

#### all of this End points need to be authenticated
```
GET /users
GET /users/:id
POST /users
GET /users/:id/current-order
```

## Data Shapes
#### Product
-  id
- name
- price
- category

| Column   |        Type        |
|----------|:------------------:|
| id       | SERIAL PRIMARY KEY |
| name     |    VARCHAR(50)     |
| price    |      INTEGER       |
| category |    VARCHAR(50)     |

#### User
- id
- email
- firstName
- lastName
- password

| Column     |           Type           |
|------------|:------------------------:|
| id         |    SERIAL PRIMARY KEY    |
| email      | VARCHAR  UNIQUE NOT NULL |
| first_name |       VARCHAR(50)        |
| last_name  |       VARCHAR(50)        |
| password   |  VARCHAR(20)  NOT NULL   |

#### Orders
- id
- user_id
- status of order (active or complete)

| Column  |               Type               |
|---------|:--------------------------------:|
| id      |        SERIAL PRIMARY KEY        |
| status  |           VARCHAR(10)            |
| user_id |   INTEGER REFERENCES users(id)   |

#### order_details
- product_id
- order_id
- quantity of each product in the order

| Column     | Type                            |
|------------|:--------------------------------|
| order_id   | INTEGER REFERENCES orders(id)   |
| product_id | INTEGER REFERENCES products(id) |
| quantity   | INTEGER                         |

