import productRouter from '@modules/products/routes/products.routes';
import sessionRouter from '@modules/user/routes/session.routes';
import userRoutes from '@modules/user/routes/users.routes';
import { Router } from 'express';

const routes = Router();
routes.use('/products', productRouter);
routes.use('/user', userRoutes);
routes.use('/session', sessionRouter);

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello!' });
});

export default routes;
