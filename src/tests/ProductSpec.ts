import ProductRepository from '../repositories/ProductRepository';
import client from '../database';
import { Product } from '../models/product';

beforeAll(async () => {
  try {
    const conn = await client.connect();
    const sql = `TRUNCATE products RESTART IDENTITY CASCADE;
                 INSERT INTO products
                 (name, price, category)
                 VALUES
                 ('bike', 200, 'motorcycles'),
                 ('Ford-Raptor', 50000, 'Ford');`;
    await conn.query(sql);
  } catch (e) {
    console.log('Error occurred while setting up database for Product Model tests');
  }
});

describe('Product Model', () => {
  it('should have an index method', () => {
    expect(ProductRepository.index).toBeDefined();
  });
  it('should have a show method', () => {
    expect(ProductRepository.show).toBeDefined();
  });
  it('should have a create method', () => {
    expect(ProductRepository.create).toBeDefined();
  });
  it('should have a delete method', () => {
    expect(ProductRepository.delete).toBeDefined();
  });
  it('should have a showByCategory method', () => {
    expect(ProductRepository.showByCategory).toBeDefined();
  });
  it('should index returns all products', async () => {
    try {
      const allProducts = await ProductRepository.index();
      expect(allProducts).toEqual([
        { id: 1, name: 'bike', price: 200, category: 'motorcycles' },
        { id: 2, name: 'Ford-Raptor', price: 50000, category: 'Ford' }
      ]);
    } catch (e) {
      console.log('Error occurred while getting all products in tests', e);
    }
  });
  it('should show a product with id', async () => {
    try {
      const productById = await ProductRepository.show(1);
      expect(productById).toEqual({
        id: 1,
        name: 'bike',
        price: 200,
        category: 'motorcycles'
      });
    } catch (e) {
      console.log('Error occurred while getting product by id in tests', e);
    }
  });

  it('should delete a product', async () => {
    try {
      const product: Product = {
        name: 'FIAT-PANDA',
        price: 30000,
        category: 'FAIT'
      };
      const newProduct: Product = await ProductRepository.create(product);
      const deletedProduct: Product = await ProductRepository.delete(3);
      expect(newProduct).toEqual({
        id: 3,
        name: 'FIAT-PANDA',
        price: 30000,
        category: 'FAIT'
      });
      expect(newProduct).toEqual(deletedProduct);
    } catch (e) {
      console.log('Error occurred while creating & deleting product in tests', e);
    }
  });

  it('should get a product by category', async () => {
    try {
      const productByCategory = await ProductRepository.showByCategory('motorcycles');
      expect(productByCategory).toEqual([
        {
          id: 2,
          name: 'bike',
          price: 200,
          category: 'motorcycles'
        }
      ]);
    } catch (e) {
      console.log('Error occurred while get products by category in tests', e);
    }
  });
});
