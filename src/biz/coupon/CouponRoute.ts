import { Router } from 'express';
import Route from '@/common/entity/routes.interface';
import CouponController from '@/biz/coupon/CouponController';
import CouponService from './CouponService';

class CouponRoute implements Route {
  public path = '/api/coupon';
  public router = Router();
  public CouponController = new CouponController(new CouponService());

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:userId`, this.CouponController.findByUserIdCoupon);
    this.router.get(`${this.path}/:userId/:regDate`, this.CouponController.findByUserIdAndDate);
    this.router.post(`${this.path}/add`, this.CouponController.add);
    this.router.post(`${this.path}/use`, this.CouponController.use);
    this.router.put(`${this.path}/useYnUpdate`, this.CouponController.useYnUpdate);
  }
}

export default CouponRoute;
