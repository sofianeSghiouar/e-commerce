import ProductModel from '../models/product.js';

export default class ProductsServices {
  findAll = async () => {
    try {
      const products = await ProductModel.find();
      return products;
    } catch (error) {
      throw new Error(error);
    }
  };
  findById = async (id) => {
    try {
      const product = await ProductModel.findById(id);
      return product;
    } catch (err) {
      throw new Error(err);
    }
  };
  findBySlug = async (slug) => {
    try {
      const product = await ProductModel.findOne({ slug: slug });
      return product;
    } catch (error) {
      throw new Error(error);
    }
  };
}
