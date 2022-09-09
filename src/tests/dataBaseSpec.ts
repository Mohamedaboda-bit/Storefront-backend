import { orders } from '../model/orders';
import { products } from '../model/products';
import { users } from '../model/users';

const product = new products();
const user = new users();
const order = new orders();

/*******************       testing the products table               ***************/

describe('tesing the products table actions', () => {
  it('tests the the return after inserting data ', async () => {
    
    const products = await product.insert('mohamed', 200)
    expect(products[0].id).toEqual(2) //I wrote to Equal "2" because i already inserted an products on the migrations
  });

  it('tests the existence of the function ', async () => {
    const products  = await product.index()  
    expect(products[0].id).toEqual(1)
  });

  it('tests the existence of the function ', async () => {
    const products  = await product.show(1)  
    expect(products[0].id).toEqual(1);
  });
});

/*******************       testing the users table               ***************/

describe('tesing the users table actions', () => {
  it('tests the the return after creating user ', async () => {
    const users = await user.create('mohamed', 'aboda', '123456test')
    expect(users[0].id).toEqual(1);
  });
  it('tests the existence of the function', async () => {
    const users = await user.index()
    expect(users[0].id).toEqual(1);
  });
  it('tests the existence of the function ', async () => {
    const users = await user.show(1)
    expect(users[0].id).toEqual(1);
  });
});

/*******************       testing the orders table and  orders_products table         ***************/

describe('tesing the orders table actions', () => {

  it('tests the existence of the function', async () => {
    const orders = await order.create('active',1,)
    expect(orders[0].id).toEqual(1);
  });

  it('tests the existence of the function', async () => {
    const orders = await order.check(1)
    expect(orders[0].id).toEqual(1);
  });

  it('tests the existence of the function ', async () => {
    const orders = await order.addProduct(1,1,1)
    expect(orders[0].id).toEqual(1);
  });

  it('tests the existence of the function ', async () => {
    const orders = await order.show(1)
    expect(orders[0].id).toEqual(1);
  });
 
});
