import { Router } from 'express';
import UserController from '../controllers/UserController';
import { verifyAuthenticateToken } from '../middelwares/auth';
import OrderController from '../controllers/OrderController';

const user = Router();

user.get('/', verifyAuthenticateToken, UserController.getUsers);
user.get('/:id', verifyAuthenticateToken, UserController.getUserById);
user.post('/', verifyAuthenticateToken, UserController.register);
user.get('/:id/current-order', verifyAuthenticateToken, OrderController.getUserOrder);

export default user;
