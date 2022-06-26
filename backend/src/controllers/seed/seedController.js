import UserModel from '../../models/user.js';
import ProductModel from '../../models/product.js';
import data from '../../data.js';

export class SeedController {
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
