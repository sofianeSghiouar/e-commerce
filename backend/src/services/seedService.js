import ProductModel from "../models/product.js";
import UserModel from "../models/user.js";
import data from "../utils/data.js";

export default class SeedService {
  async resetDatabase() {
    try {
      if ((await ProductModel.countDocuments()) < 4) {
        await ProductModel.deleteMany({});
        await ProductModel.insertMany(data.products);
      }
      if (!(await UserModel.countDocuments())) {
        await UserModel.deleteMany({});
        await UserModel.insertMany(data.users);
      }
      const countProducts = await ProductModel.countDocuments();
      const countUsers = await UserModel.countDocuments();
      return { countProducts, countUsers };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
