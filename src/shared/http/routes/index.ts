import productRouter from '@modules/products/routes/products.routes';
import { Router } from 'express';

const routes = Router();
routes.use('/products', productRouter);

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello!' });
});

export default routes;
