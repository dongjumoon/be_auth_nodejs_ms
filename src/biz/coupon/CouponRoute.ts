import { Router } from 'express';
import Route from '@/common/entity/routes.interface';
import CouponController from '@/biz/coupon/CouponController';

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
