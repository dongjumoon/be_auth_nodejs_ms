import { Router } from 'express';
import Route from '@/common/entity/routes.interface';
import OrderController from '@/biz/order/OrderController';
import OrderService from '@/biz/order/OrderService';

class OrderRoute implements Route {
  public path = '/api/order';
  public router = Router();
  public OrderController = new OrderController(new OrderService());

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.OrderController.findByUserId); // 주문조회
    this.router.post(`${this.path}`, this.OrderController.createOrderId); // 주문등록
  }
}

export default OrderRoute;
