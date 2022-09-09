# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index  /products/index (get)
- Show  /products/show/id (get)
- Create [token required] /products/create (require user's token) (post)
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required] /users/index   (gives the  user's token) (get)
- Show [token required]  /users/show/id (require user's token) (get)
- Create N[token required] /users/create  (require user's token) (post)

#### Orders
- add new prodcuts to the order list  (require user's token) /orders/add (post)
- create order list  (require user's token)  /orders/create (post)
- Current Order by user (args: user id)[token required] (require user's token) (get)
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product    
 id | name | price
 
----+------+-------
-  id
- name
- price
- [OPTIONAL] category

#### User
 id |  first_name  |  lastname  |                           password
 
----+--------------+------------+--------------------------------------------------------------
- id
- firstName
- lastName
- password

#### Orders
 id | status | user_id | quantity | product_id
 
----+--------+---------+----------+------------
- id
- user_id
- status of order (active or complete)

#### orders_products
 id | quantity | order_id | product_id

----+----------+----------+------------
- id
- id of each product in the order
- quantity of each product in the order
- id of the order table
