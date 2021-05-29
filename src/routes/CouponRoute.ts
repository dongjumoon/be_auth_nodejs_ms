import { Router } from 'express';
import Route from '@/entity/routes.interface';
import CouponController from '@/controllers/CouponController';

class CouponRoute implements Route {
  public path = '/coupon';
  public router = Router();
  public CouponController = new CouponController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.CouponController.index);
  }
}

export default CouponRoute;
