import SeedController from "./seedController.js";
import { createRouter } from "../../utils/createRouter.js";

const seedController = new SeedController();
const routes = [
  {
<<<<<<< HEAD
    path: "/seed/reset",
    method: "GET",
=======
    path: '/seed/reset',
    method: 'GET',
>>>>>>> ec17d9b (ci: update backend seed route)
    handler: seedController.resetDB.bind(seedController)
  }
];

export default createRouter(routes);
