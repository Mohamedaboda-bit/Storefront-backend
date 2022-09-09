import express from 'express';
import bodyParser from 'body-parser';
import productHandler from './handlers/products';
import userhandler from './handlers/users';
import orderHandler from './handlers/orders';
import cors from 'cors';

const app: express.Application = express();
const address = '0.0.0.0:3S000';
const corsConfig = {
  origin: 'http://someotherdomain.com',
  optionsSuccessStatus: 200,
};

app.use(cors(corsConfig));
app.use(bodyParser.json());

/****************** call the get and post function from all handlers.      ********************/
orderHandler(app);
userhandler(app);
productHandler(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
