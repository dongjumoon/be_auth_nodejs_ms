// todo: 쿠폰 정보
import BasicController from '@/common/controllers/BasicController';
import { logger } from '@/common/utils/logger';
import { NextFunction, Request, Response } from 'express';
import CouponService from './CouponService';

class CouponController {
  private couponService: CouponService;
  constructor(couponService: CouponService) {
    this.couponService = couponService;
  }
  public index = (req: Request, res: Response, next: NextFunction) => {
  };
  public add = (req: Request, res: Response, next: NextFunction) => {
  };
  public use = (req: Request, res: Response, next: NextFunction) => {
  };
  public findByUserId = (req: Request, res: Response, next: NextFunction) => {
  };
  public findByUserIdAndDate = (req: Request, res: Response, next: NextFunction) => {
  };
  public useYnUpdate = (req: Request, res: Response, next: NextFunction) => {
  };
}

export default CouponController;
