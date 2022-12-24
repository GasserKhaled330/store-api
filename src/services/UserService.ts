import UserRepository from '../repositories/UserRepository';
import { User } from '../models/user';
import bcrypt from 'bcrypt';
import * as JWT from 'jsonwebtoken';

class UserService {
  async getUsers(): Promise<User[]> {
    return await UserRepository.index();
  }

  async getUser(id: number): Promise<User> {
    return await UserRepository.show(id);
  }

  async createUser(user: User): Promise<User> {
    return await UserRepository.create(user);
  }

  async getByEmail(email: string): Promise<User> {
    return await UserRepository.getByEmail(email);
  }

  generateHash(password: string): string {
    const pepper = process.env.PEPPER as string;
    const saltRounds = process.env.SALT_ROUNDS as string;
    return bcrypt.hashSync(password + pepper, parseInt(saltRounds));
  }

  comparePass(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  generateJWT(user: User): string {
    return JWT.sign(user, process.env.TOKEN_SECRET as string);
  }
}

export default new UserService();
