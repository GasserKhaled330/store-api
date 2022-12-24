import OrderRepository from '../repositories/OrderRepository';
import client from '../database';
describe('Order Model', () => {
  beforeAll(async () => {
    try {
      const conn = await client.connect();
      const sql = `TRUNCATE users RESTART IDENTITY CASCADE;
                   INSERT INTO users (first_name, last_name, email, password) VALUES ('Ahmed', 'Fathy', 'Ahmed@gmail.com', '123456');
                   INSERT INTO orders (status, user_id) VALUES('active', 1);`;
      await conn.query(sql);
    } catch (e) {
      console.log('Error occurred while setting up database for Order Model tests');
    }
  });

  it('should have a getByUser method', () => {
    expect(OrderRepository.getOrderByUser).toBeDefined();
  });
  it('should get the user order', async () => {
    try {
      const orderByUser = await OrderRepository.getOrderByUser(1);
      expect(orderByUser).toEqual({ id: 1, status: 'active', user_id: 1 });
    } catch (e) {
      console.log('Error occurred wile getting order in tests', e);
    }
  });
});
