import client from '../database';
import { Product } from '../models/product';

class ProductRepository {
  async index(): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const query = 'SELECT * FROM products;';
      const result = await connection.query(query);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get products: ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const connection = await client.connect();
      const query = 'SELECT * FROM products WHERE id = ($1);';
      const result = await connection.query(query, [id]);
      const product = result.rows[0];
      connection.release();
      return product;
    } catch (err) {
      throw new Error(`Cannot get product: ${err}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const connection = await client.connect();
      const query = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *;';
      const result = await connection.query(query, [product.name, product.price, product.category]);
      const newProduct = result.rows[0];
      connection.release();
      return newProduct;
    } catch (err) {
      throw new Error(`Cannot add product ${product.name}: ${err}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const connection = await client.connect();
      const query = 'DELETE FROM products WHERE id = ($1) RETURNING *;';
      const result = await connection.query(query, [id]);
      const deletedProduct = result.rows[0];
      connection.release();
      return deletedProduct;
    } catch (err) {
      throw new Error(`Cannot delete product: ${err}`);
    }
  }

  async showByCategory(category: string): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const query = 'SELECT * FROM products WHERE category = ($1) RETURNING *;';
      const result = await connection.query(query, [category]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get products by their category: ${err}`);
    }
  }
}

export default new ProductRepository();
