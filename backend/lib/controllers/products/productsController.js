import ProductsServices from '../../services/productsServices.js';
export class ProductsController {
  productServices = new ProductsServices();

  async getProducts() {
    try {
      const products = await this.productServices.getProducts();
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProductBySlug({ params: { slug } }) {
    try {
      const product = await this.productServices.getProductBySlug(slug);
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProductById({ params: { id } }) {
    try {
      const product = await this.productServices.getProductById(id);
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }
}
