import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  /**********************     importing the variables from .env file.                 **********************/
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB_TEST,
  ENV,
} = process.env;

console.log(`you are performing an action on the ${ENV} database `);

let client: any; //client has the type 'any' because it used for a lot of types in the model file and it exists in two if conditions where its variable will change.

if (ENV === 'test') {
  /**********************       for testing.                **********************/
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}
if (ENV === 'dev') {
  /**********************       for testing development.              **********************/
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}
export default client;
