import ProductsServices from "../../services/productsServices.js";

const productsServices = new ProductsServices();
export default {
  Query: {
    getProducts: async () => {
      const products = await productsServices.findAll();
      return products;
    },
    getProductBySlug: async (_, args) => {
      const product = await productsServices.findBySlug(args.slug);
      return product;
    },
    getProductById: async (_, args) => {
      const product = await productsServices.findById(args.id);
      return product;
    }
  }
};
