import SeedService from '../../services/seedService.js';
export default class SeedController {
  seedService = new SeedService();
  async resetDB() {
    try {
      const result = await this.seedService.resetDatabase();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
