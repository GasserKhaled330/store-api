import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  async getUsers(_req: Request, res: Response) {
    try {
      const users = await UserService.getUsers();
      res.send(users);
    } catch (e) {
      console.log('Error while getting users');
      res.status(500).send({ message: 'An Error occurred while getting users' });
    }
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await UserService.getUser(parseInt(id));
      res.send(user);
    } catch (e) {
      console.log('Error while getting user');
      res.status(500).send({ message: 'An Error occurred while getting user' });
    }
  }

  async register(req: Request, res: Response) {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).send({
        message: 'first_name, last_name, email, and password are required'
      });
    }

    try {
      const checkUser = await UserService.getByEmail(email);
      if (checkUser) {
        return res.status(400).send({ message: 'User already exists' });
      }
    } catch (e) {
      console.log('Error while validating user');
      res.status(500).send({ message: 'An Error occurred while validating user' });
    }

    try {
      const hashedPassword = UserService.generateHash(password);
      const newUser = {
        first_name,
        last_name,
        email,
        password: hashedPassword
      };
      const createdUser = await UserService.createUser(newUser);
      delete createdUser['password'];
      const token = UserService.generateJWT(createdUser);
      res.status(200).send(token);
    } catch (e) {
      console.log('Error while registering user');
      res.status(500).send({ message: 'An Error occurred while registering user' });
    }
  }

  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;
    const pepper = process.env.PEPPER;
    if (!email || !password) {
      return res.status(400).send({
        message: 'email, and password are required'
      });
    }
    try {
      const checkUser = await UserService.getByEmail(email);
      if (!checkUser) {
        return res.status(400).send({ message: 'email or password is not correct' });
      }

      const isTruePass = UserService.comparePass(password + pepper, checkUser.password as string);
      console.log(isTruePass);
      if (!isTruePass) {
        return res.status(400).send({ message: 'email or password is not correct' });
      }
      delete checkUser['password'];
      const token = UserService.generateJWT(checkUser);
      return res.send(token);
    } catch (e) {
      console.log('Error while checking user');
      res.status(500).send({ message: 'An Error occurred while checking user' });
    }
  }
}

export default new UserController();
