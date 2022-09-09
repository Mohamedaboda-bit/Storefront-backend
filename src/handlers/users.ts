import { users } from '../model/users';
import express from 'express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import verifyAuthToken from '../middleware/tokenValdite';

dotenv.config();

const secret = process.env.secret as string;
const store = new users();

/*******************     handles the incoming http Request and then create new user.       ***************/
const create = async (req: Request, res: Response) => {
  const first = req.body.firstName;
  const last = req.body.lastName;
  const password = req.body.password;
  try {
    const add = await store.create(first, last, password);
    const token = jwt.sign({user: add }, secret);
    res.json(token);
  } catch (err) {
    return res.send('can not create user');
  }
};

/*******************     handles the incoming http Request and then show all user's data.       ***************/
const index = async (req: Request, res: Response) => {
  // show all users
  try {
    const insert = await store.index();
    return res.json(insert);
  } catch (err) {
    res.status(400);
    return res.json(err);
  }
};

/*******************     handles the incoming http Request and then specific user data.       ***************/
const show = async (req: Request, res: Response) => {
  // show specific user
  const id = parseInt(req.params.id);
  try {
    const insert = await store.show(id);
    return res.json(insert);
  } catch (err) {
    res.status(400);
    return res.json(err);
  }
};

const userhandler = (app: express.Application) => {
  app.post('/users/create', create);
  app.get('/users/show/:id', verifyAuthToken, show); // need to create user to have access to this route.
  app.get('/users/index', verifyAuthToken, index); // need to create user to have access to this route.
};

export default userhandler;
