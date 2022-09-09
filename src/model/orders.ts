import client from '../database';

type order = [{
  id: number;
  quantity: number;
  order_id: number;
  product_id: number;
}];
type addorder = [{
  id: number;
  quantity: number;
  order_id: number;
  product_id: number;
}];
export class orders {
  /*******************       add new order to the  orders orders_products.              ***************/
  async addProduct(
    productId: number,
    orderId: number,
    quantity: number
  ): Promise<order> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders_products (quantity,order_id,product_id) VALUES ($1,$2,$3)  RETURNING id , quantity , order_id, product_id';
      const res = await conn.query(sql, [ quantity, orderId, productId]);
      const order = res.rows;
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`unable to create order ${err}`);
    }
  }


  /*******************       add new order list on the orders table.              ***************/
  async create(status: string,userId: number):Promise<order> {
    try {
      const conn = await client.connect();
      const sql = 'INSERT INTO orders (status,user_id) VALUES($1,$2) RETURNING id,status,user_id ';
      const res = await conn.query(sql, [status,userId]);
      const order = res.rows;
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`unable to create order ${err}`);
    }
  }



  /*******************       showing the user's orders            ***************/
  
  async show (userId: number):Promise<order> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders INNER JOIN orders_products ON orders_products.order_id=orders.id WHERE order_id = $1' ;
      const res = await conn.query(sql, [userId]);
      const order = res.rows;
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`unable to get orders_products ${err}`);
    }
  }




/*******************      get some the id of the order that associated to the user         ***************/
  async check(userId: number):Promise<order> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id = $1';
      const res = await conn.query(sql, [userId]);
      const order = res.rows;
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`unable to get orders ${err}`);
    }
  }


}
