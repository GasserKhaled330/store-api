import { Request, Response } from 'express';
import productService from '../services/ProductService';
import { Product } from '../models/product';

class ProductController {
  async getProducts(req: Request, res: Response) {
    try {
      const products: Product[] = await productService.getProducts();
      res.json(products);
    } catch (ex) {
      console.log(ex);
      res.status(500).send({ message: 'An Error occurred while getting all products' });
    }
  }

  async getProduct(req: Request, res: Response) {
    const productId: number = parseInt(req.params.id);
    try {
      const product = await productService.getProduct(productId);
      res.json(product);
    } catch (ex) {
      console.log(ex);
      res
        .status(500)
        .send({ message: `An Error occurred while getting product with id=${productId}` });
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const { name, price, category } = req.body;
      const newProduct = { category, name, price };
      const product = await productService.createProduct(newProduct);
      res.json(product);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: `An Error occurred while insert new product` });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    const productId = parseInt(req.params.id);
    try {
      const product = await productService.deleteProduct(productId);
      res.json(product);
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: `An Error occurred while delete product with id=${productId}` });
    }
  }

  async getProductsByCategory(req: Request, res: Response) {
    const category = req.params.category;
    try {
      const products = await productService.getProductsByCategory(category);
      res.json(products);
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({
          message: `An Error occurred while getting products with its category=${category}`
        });
    }
  }
}

export default new ProductController();
