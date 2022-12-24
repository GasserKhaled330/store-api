import client from '../database';
import { Order } from '../models/order';
class OrderRepository {
  async getOrderByUser(userId: number): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM orders O WHERE status = \'active\' AND user_id = ($1);';
      const result = await connection.query(sql, [userId]);
      connection.release();
      return result.rows[0];
    } catch (ex) {
      throw new Error(`An Error occurred while getting user order: ${ex}`);
    }
  }
}

export default new OrderRepository();
