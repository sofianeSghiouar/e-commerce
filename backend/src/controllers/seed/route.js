import { SeedController } from './seedController.js';
import { createRouter } from '../../utils/createRouter.js';

const seedController = new SeedController();
const routes = [
  {
    path: '/seed',
    method: 'GET',
    handler: seedController.resetDatabase.bind(seedController)
  }
];

export default createRouter(routes);
