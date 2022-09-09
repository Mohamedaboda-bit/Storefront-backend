import { Request, Response } from 'express';
import { orders } from '../model/orders';
import express from 'express';
import jwt from 'jsonwebtoken';

type store  =  {
  user: [{
    id: number;
    first_name: string;
    lastname: string;
    password: string;
  }],
  iat:number
};
type user  =  [{

    id: number;
    first_name: string;
    lastname: string;
    password: string;

}];




const stores = new orders();

/*******************     handles the incoming http Request and then add products to the order list in  orders_products.          ***************/
const add = async (req: Request, res: Response) => {
  const productId = parseInt(req.body.productId) as number;
  const quantity = parseInt(req.body.quantity) as number;

  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.secret as string);
    const store = decoded as store;
    const id = store.user[0].id;
    const show  =  await stores.check(id) // checks if the user has a order list first before add to it
    if(show.length){
      try {
        const add = await stores.addProduct(productId, show[0].id, quantity);
        return res.json(add);
      } catch (err) {
        res.status(400);
        return res.json(err);
      }
    }else{
      console.log('you need to create order list first before adding to it')
        res.send('you need to create order list first before adding to it')
        res.status(400);

    }
    
  } catch (error) {

    res.status(401);
    res.send('invaled token');
    return;
  }
};

/*******************     handles the incoming http Request and then create order list on the order table.          ***************/
const create = async(req:Request,res:Response)=>{
  const status = req.body.status
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.secret as string);
    const store = decoded as store;
    const iuser :user = store.user
    const id  = iuser[0].id 

    try {
      const add = await stores.create(status, id );
      return res.json(add);
    } catch (err) {
      res.status(400);
      return res.json(err);
    }
  } catch (error) {
    res.status(401);
    res.send('invaled token');
    return;
  }
}

/*******************     handles the incoming http Request and then show the user's order list with the user's id sent in the token header.          ***************/
const show = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.secret as string);
    const store = decoded as store;
    const id = store.user[0].id;
    const shows  =  await stores.check(id) 

    try {
      const show = await stores.show(shows[0].id);
      return res.json(show);
    } catch (err) {
      return res.json(err);
    }
  } catch (error) {
    res.status(401);
    res.send('invaled token');
    return;
  }
};

/*******************    i didn't need to call the the token verify function because i'm using it in the handler function above.        ***************/
const orderHandler = (app: express.Application) => {
  app.post('/orders/create',create);
  app.post('/orders/add',add);
  app.get('/orders/show',show );
};

export default orderHandler;
