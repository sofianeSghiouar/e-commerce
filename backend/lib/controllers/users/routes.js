import { UsersController } from './usersController.js';
import { createRouter } from '../../utils/createRouter.js';
const usersController = new UsersController();
const routes = [
  {
    path: '/users/login',
    method: 'POST',
    handler: usersController.loginService.bind(usersController)
  },
  {
    path: '/users/register',
    method: 'POST',
    handler: usersController.registerService.bind(usersController)
  }
];
export default createRouter(routes);
