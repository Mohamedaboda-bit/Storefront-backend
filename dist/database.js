"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var _a = process.env, 
/**********************     importing the variables from .env file.                 **********************/
POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, POSTGRES_DB_TEST = _a.POSTGRES_DB_TEST, ENV = _a.ENV;
console.log("you are performing an action on the ".concat(ENV, " database "));
var client; //client has the type 'any' because it used for a lot of types in the model file and it exists in two if conditions where its variable will change.
if (ENV === 'test') {
    /**********************       for testing.                **********************/
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}
if (ENV === 'dev') {
    /**********************       for testing development.              **********************/
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}
exports["default"] = client;
