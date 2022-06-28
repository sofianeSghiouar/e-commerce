    import ProductsServices from '../../services/productsServices.js';

const productsServices = new ProductsServices();
export default {
  Query: {
    getProducts: async () => {
      const result = await productsServices.findAll();
      return result;
    },
    getProductBySlug: async (_, args) => {
      const product = await productsServices(args.slug);
      return product;
    },
    getProductById: async (_, args) => {
      const product = await productsServices.findById(args.id);
      return product;
    }
  }
};
