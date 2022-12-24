import { Request, Response } from 'express';
import OrderService from '../services/OrderService';

class OrderController {
  async getUserOrder(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userOrder = await OrderService.getUserOrder(parseInt(id));
      res.json(userOrder);
    } catch (ex) {
      console.log(ex);
      res.status(500).send({ message: "An Error occurred while getting user's order" });
    }
  }
}

export default new OrderController();
