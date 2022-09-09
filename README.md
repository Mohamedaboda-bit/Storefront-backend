# Storefront Backend Project

 ## how to start:

 - ### the app runs on port 3000
 - ### the database  port is  5432


- #### after you download the zip file you will need to run ``` npm i``` in the terminal to download the node packages.

- #### and then you must run the ```npm run create``` in the terminal, this command creates the the database, then go to the database.json file and add fill the empty value of the database on the dev object so you can run the migrations.

- #### run ``` npm run migrate``` to create the talbes

- #### to start the server use the script ``` npm run start``` and the app will run  .

- #### to run the jasmine tests use the script ``` npm run tests1``` which it dose :

  1. ##### set the variable ENV to "test" so the actions will be done to the testing data base
  2. ##### create data base for teating 
  3. ##### run the migrations that creates the 3 table (products,users and orders) for the testing database
  4. ##### compile the ts file  to js files and run jasmine  
  5. ##### finally delete the database after each test


 ## Used Technologies :
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## scripts
```
-    create: "db-migrate db:create store_front",
-    migrate:"db-migrate up --env dev",
-    lint: "npx eslint src/**/*.ts"
-    prettier: "npx prettier --write src/**/*.ts"
-    start: "node dist/server.js",
-    watch: "tsc-watch --esModuleInterop src/server.ts --outDir ./dist --onSuccess \"node ./dist/server.js\"",
-    tests1: "set ENV=test&& db-migrate db:create store_front_test&&db-migrate up --env test &&npm run tests&&db-migrate db:drop store_front_test"
-    build: "npx tsc",
```


## Endpoints :

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape. 
### products :
- #### /products/index (get)
- #### /products/show/id (get)
- #### /products/create (require user's token) (post)
### users :
- #### /users/index   (gives the  user's token) (get)
- #### /users/show/id (require user's token) (get)
- #### /users/create  (require user's token) (post)
### orders :
- #### /orders/create   (require user's token) (post)
- #### /orders/add  (require user's token) (post)
- #### /orders/show  (require user's token) (get)



## The data types based with the requests:
#### note! : for all the incoming listed routes you need to bass the token that you will get when creating a user throw the header as as Bearer Token.

### users routes:
  
- ##### for the  /users/show/id route you only need to pass the id as a param
- ##### for the /users/create route you need to pass first_name,lastName,password in the body

### products routes:
   
- ##### for the /products/show/id route  you only need to pass the id as a param
- ##### for the /products/create route you need to pass the name and the price in the body ,the price must be number

### orders routes:
- ##### for the /orders/add route  you need to pass (productId and quantity ) throw the body (the user's id is passed automatically) note : you need to pass an existing productId
- ##### for the /orders/create route (status) throw the body (the user's id is passed automatically)




