import ProductModel from '../models/product.js';
import UserModel from '../models/user.js';
import data from '../utils/data.js';

export default class SeedService {
  async resetDatabase() {
    try {
      await ProductModel.remove({});

      const createdProducts = await ProductModel.insertMany(data.products);
      await UserModel.remove({});
      const createdUsers = await UserModel.insertMany(data.users);
      return { createdProducts, createdUsers };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
