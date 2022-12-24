import ProductRepository from '../repositories/ProductRepository';
import { Product } from '../models/product';
class ProductService {
  async getProducts() {
    return await ProductRepository.index();
  }

  async getProduct(productId: number) {
    return await ProductRepository.show(productId);
  }

  async createProduct(product: Product) {
    return await ProductRepository.create(product);
  }

  async deleteProduct(productId: number) {
    return await ProductRepository.delete(productId);
  }

  async getProductsByCategory(category: string) {
    return await ProductRepository.showByCategory(category);
  }
}

export default new ProductService();
