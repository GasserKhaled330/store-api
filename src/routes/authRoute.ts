import { Router } from 'express';
import UserController from '../controllers/UserController';

const auth = Router();

auth.post('/register', UserController.register);
auth.post('/login', UserController.authenticate);

export default auth;
