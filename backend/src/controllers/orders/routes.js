import { createRouter } from '../../utils/createRouter.js';
import OrdersController from './ordersController.js';
import isAuth from '../../utils/isAuth.js';

const ordersController = new OrdersController();

const routes = [
  {
    path: '/order',
    method: 'POST',
    pre: [isAuth],
    handler: ordersController.handleCreateOrder.bind(ordersController)
  }
];

export default createRouter(routes);
