import { UsersController } from './usersController.js';
import { createRouter } from '../../utils/createRouter.js';

const usersController = new UsersController();
const routes = [
  {
    path: '/users/login',
    method: 'POST',
    handler: usersController.handleLogin.bind(usersController)
  }
];

export default createRouter(routes);
