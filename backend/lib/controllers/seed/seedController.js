import SeedService from '../../services/seedService.js';
export default class SeedController {
  seedService = new SeedService();

  async resetDB() {
    try {
      await this.seedService.resetDatabase();
    } catch (error) {
      throw new Error(error);
    }
  }
}
