import OrderRepository from '../repositories/OrderRepository';
import { Order } from '../models/order';

class OrderService {
  async getUserOrder(userId: number): Promise<Order> {
    return await OrderRepository.getOrderByUser(userId);
  }
}

export default new OrderService();
