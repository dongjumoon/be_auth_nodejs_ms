import { NextFunction, Request, Response } from 'express';
import OrderService from '@/biz/order/OrderService';

export default class OrderController {
  private orderService: OrderService;
  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }

  public payOrderUserId = (req: Request, res: Response, next: NextFunction) => {
    try {
      this.orderService.payOrder(req.params.userId);
      res.status(200).json({
        body: { msg: '결재성공' },
      });
    } catch (e) {
      next(e);
    }
  };

  public createOrderId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.orderService.createOrderId(req.body);
      res.status(200).json({
        body: result,
      });
    } catch (e) {
      next(e);
    }
  };

  /**
   * 주문조회
   * @param req
   * @param res
   * @param next
   */
  public findByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId as string;
      const result = await this.orderService.findByUserId(userId);
      res.status(200).json({
        body: result,
      });
    } catch (e) {
      next(e);
    }
  };
}
