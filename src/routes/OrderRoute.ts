import { Router } from 'express';
import Route from '@/entity/routes.interface';
import OrderController from '@/controllers/OrderController';

class OrderRoute implements Route {
  public path = '/api/order';
  public router = Router();
  public OrderController = new OrderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.OrderController.findBy);
  }
}

export default OrderRoute;
