import { NextFunction, Request, Response } from 'express';
import OrderService from '@/services/OrderService';

export default class OrderController {
  private orderService: OrderService = new OrderService();

  public findBy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const name = await this.orderService.findBy();
      res.status(200).json({
        body: name,
      });
    } catch (e) {
      next(e);
    }
  };
}
