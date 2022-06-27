import ProductModel from '../../models/product.js';
export class ProductsController {
  async getProducts() {
    const products = await ProductModel.find();

    if (!products) {
      throw new Error('products not found');
    }

    return products;
  }

  async getProductBySlug({ params: { slug } }) {
    const product = await ProductModel.findOne({
      slug: slug
    });

    if (!product) {
      throw new Error('products not found');
    }

    return product;
  }

  async getProductById({ params: { id } }) {
    const product = await ProductModel.findById(id);

    if (!product) {
      throw new Error('products not found');
    }

    return product;
  }
}
