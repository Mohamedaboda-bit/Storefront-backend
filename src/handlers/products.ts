import { Request, Response } from 'express';
import { products } from '../model/products';
import express from 'express';
import verifyAuthToken from '../middleware/tokenValdite';

const store = new products();

/*******************     handles the incoming http Request and then shows all products.         ***************/
const index = async (req: Request, res: Response) => {
  // show all products
  try {
    const insert = await store.index();
    return res.json(insert);
  } catch (err) {
    res.status(400);
    return res.json(err);
  }
};

/*******************     handles the incoming http Request and then shows specific product.         ***************/
const show = async (req: Request, res: Response) => {
  // show specific product
  const id = parseInt(req.params.id);
  try {
    const insert = await store.show(id);
    return res.json(insert);
  } catch (err) {
    res.status(400);
    return res.json(err);
  }
};

/*******************     handles the incoming http Request and then adds new product to the products table.        ***************/
const create = async (req: Request, res: Response) => {
  // show specific product
  const name = req.body.name;
  const price = parseInt(req.body.price);

  try {
    const insert = await store.insert(name, price);
    return res.json(insert);
  } catch (err) {
    res.status(400);
    return res.json(err);
  }
};

const productHandler = (app: express.Application) => {
  app.get('/products/index', index);
  app.get('/products/show/:id', show);
  app.post('/products/create', verifyAuthToken, create); // need to create user to have access to this route.
};

export default productHandler;
