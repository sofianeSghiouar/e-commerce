import SeedController from './seedController.js';
import { createRouter } from '../../utils/createRouter.js';
const seedController = new SeedController();
const routes = [
  {
    path: '/seed/reset',
    method: 'PUT',
    handler: seedController.resetDB.bind(seedController)
  }
];
export default createRouter(routes);
