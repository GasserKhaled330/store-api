import { User } from '../models/user';
import client from '../database';

class UserRepository {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT id, first_name, last_name, email FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (e) {
      throw new Error(`An Error occurred while getting users: ${e}`);
    }
  }
  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT id, first_name, last_name, email FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`An Error occurred while getting user with id: ${id}: ${e}`);
    }
  }
  async getByEmail(email: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE email=($1)';
      const result = await conn.query(sql, [email]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`An Error occurred while getting user with email: ${email}: ${e}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'INSERT INTO users(first_name, last_name, password, email) VALUES($1, $2, $3, $4) RETURNING id, first_name, last_name, email, password';
      const result = await conn.query(sql, [
        user.first_name,
        user.last_name,
        user.password,
        user.email
      ]);
      await conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`An Error occurred while creating user: ${e}`);
    }
  }
}

export default new UserRepository();
