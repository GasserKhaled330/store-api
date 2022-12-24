import { Router } from 'express';
import productController from '../controllers/ProductController';
import { verifyAuthenticateToken } from '../middelwares/auth';
const product = Router();

product.get('/', productController.getProducts);
product.get('/:id', productController.getProduct);
product.post('/', verifyAuthenticateToken, productController.createProduct);
product.delete('/:id', verifyAuthenticateToken, productController.deleteProduct);
product.get('/:category', productController.getProductsByCategory);

export default product;
