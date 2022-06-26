import ProductModel from '../../models/product.js';

export default {
  Query: {
    getProducts: async () => {
      try {
        return await ProductModel.find();
      } catch (err) {
        return new Error(err.message);
      }
    },
    getProductBySlug: async (_, args) => {
      try {
        return await ProductModel.findOne({ slug: args.slug });
      } catch (err) {
        return new Error(err.message);
      }
    },
    getProductById: async (_, args) => {
      try {
        return await ProductModel.findById(args.id);
      } catch (err) {
        return new Error(err.message);
      }
    }
  }
};
