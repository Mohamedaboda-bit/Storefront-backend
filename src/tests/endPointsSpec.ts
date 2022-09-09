import app from '../server';
import supertest from 'supertest';
import  Jwt  from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config()
const secret = process.env.secret as string
const endpoints = supertest(app);

/*******************       testing the products routes               ***************/

describe('test the endpoints of the products route ', () => {
  it('tests the "product/show" endpoint response', async () => {
    //expect to return status of 200 because this route does not require token

    const response = await endpoints.get('/products/show/1');
    expect(response.status).toEqual(200);
  });

  it('tests the "product/index" endpoint response', async () => {
    //expect to return status of 200 because this route does not require token

    const response = await endpoints.get('/products/index');
    expect(response.status).toEqual(200);
  });



  it('tests the "product/create" endpoint response and authorization', async () => {
    //expect to return status of 200 because this route does not require token

    const user = {}
    const token = Jwt.sign({ user: user }, secret);
    const response = await endpoints.post('/products/create').auth(token, {type:'bearer'} ).send({ name:"testinjas",price:155});



    expect(response.status).toEqual(200);
  });
});

/*******************       testing the users routes               ***************/

describe('test the endpoints of the users route ', () => {
  it('tests the "users/create" endpoint response', async () => {
    //expect to return status of 200 because this route does not require token

    const response = await endpoints.post('/users/create');
    expect(response.status).toEqual(200);
  });

  it('tests the "users/show" endpoint response and authorization', async () => {
    //expect to return status of 200 because this route does not require token
    
    const user = {}
    const token = Jwt.sign({ user: user }, secret);
    const response = await endpoints.get('/users/show/1').auth(token, {type:'bearer'} );
    expect(response.status).toEqual(200);
  });

  it('tests the "users/index" endpoint response and authorization', async () => {
    //expect to return status of 200 because this route does not require token

    const user = {}
    const token = Jwt.sign({ user: user }, secret);
    const response = await endpoints.get('/users/index').auth(token, {type:'bearer'} );
    expect(response.status).toEqual(200);
  });
});

/*******************       testing the orders routes               ***************/

describe('test the endpoints of the orders route ', () => {
  it('tests the "orders/create" endpoint response and authorization', async () => {
    //expect to return status of 200 because this route does not require token

    const user = [{
      id:1
    }]
    const token = Jwt.sign({ user: user }, secret);
    const response = await endpoints.post('/orders/create').auth(token, {type:'bearer'}).send({id:1});
    expect(response.status).toEqual(200);
  });

  it('tests the "orders/show" endpoint response and authorization', async () => {
    //expect to return status of 200 because this route does not require token

    const user = [{
      id:1,
      productId:1,
      quantity:4
    }]
    const token = Jwt.sign({ user: user }, secret);
    const response = await endpoints.get('/orders/show').auth(token, {type:'bearer'} );
    expect(response.status).toEqual(200);
  });

  it('tests the "orders/add" endpoint response and authorization', async () => {
    //expect to return status of 200 because this route does not require token

    const user = [{
      id:1
    }]
    const token = Jwt.sign({ user: user }, secret);
    const response = await endpoints.post('/orders/add').auth(token, {type:'bearer'} ).send({ 
      productId:1,
      quantity:4
    });
    expect(response.status).toEqual(200);
  });
});
