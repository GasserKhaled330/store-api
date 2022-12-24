import client from '../database';
import UserRepository from '../repositories/UserRepository';

describe('User Model', () => {
  beforeAll(async () => {
    try {
      const conn = await client.connect();
      const sql = `TRUNCATE users RESTART IDENTITY CASCADE;
                   INSERT INTO users
                   (first_name, last_name, email, password)
                   VALUES
                   ('amr', 'fathy', 'user@gmail.com', '2133'),
                   ('Adham', 'mokhtar', 'user2@gmail.com', '2533');`;
      await conn.query(sql);
    } catch (ex) {
      console.log('Error occurred while setting up database for User Model tests');
    }
  });
  it('should have an index method', () => {
    expect(UserRepository.index).toBeDefined();
  });
  it('should have a show method', () => {
    expect(UserRepository.show).toBeDefined();
  });
  it('should have a create method', () => {
    expect(UserRepository.create).toBeDefined();
  });
  it('should have a getByEmail method', () => {
    expect(UserRepository.getByEmail).toBeDefined();
  });
  it('should index all users', async () => {
    try {
      const allUsers = await UserRepository.index();
      expect(allUsers).toEqual([
        {
          id: 1,
          first_name: 'amr',
          last_name: 'fathy',
          email: 'user@gmail.com'
        },
        {
          id: 2,
          first_name: 'Adham',
          last_name: 'mokhtar',
          email: 'user2@gmail.com'
        }
      ]);
    } catch (ex) {
      console.log('Error occurred while getting all users in tests', ex);
    }
  });
  it('should show a user with id', async () => {
    try {
      const userById = await UserRepository.show(1);
      expect(userById).toEqual({
        id: 1,
        first_name: 'amr',
        last_name: 'fathy',
        email: 'user@gmail.com'
      });
    } catch (ex) {
      console.log('Error occurred wile getting user by id in tests', ex);
    }
  });
  it('should create a user', async () => {
    try {
      const newUser = await UserRepository.create({
        first_name: 'amr',
        last_name: 'karam',
        email: 'newemail@gmail.com',
        password: '123456'
      });
      expect(newUser).toEqual({
        id: 3,
        first_name: 'amr',
        last_name: 'karam',
        email: 'newemail@gmail.com',
        password: '123456'
      });
    } catch (ex) {
      console.log('Error occurred while creating user in tests', ex);
    }
  });
  it('should getByEmail', async () => {
    try {
      const userByEmail = await UserRepository.getByEmail('user@gmail.com');
      expect(userByEmail).toEqual({
        id: 1,
        first_name: 'amr',
        last_name: 'fathy',
        email: 'user@gmail.com',
        password: '2133'
      });
    } catch (ex) {
      console.log(ex);
    }
  });
});
