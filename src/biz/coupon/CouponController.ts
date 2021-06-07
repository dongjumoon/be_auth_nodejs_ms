// todo: 쿠폰 정보
import { NextFunction, Request, Response } from 'express';
import CouponService from './CouponService';

class CouponController {
  private couponService: CouponService;

  constructor(couponService: CouponService) {
    this.couponService = couponService;
  }

  /**
   * 쿠폰 누적하기
   * @param req 
   * @param res 
   * @param next 
   */
  public add = (req: Request, res: Response, next: NextFunction) => {
  };
  /**
   * 쿠폰 사용하기 
   * @param req 
   * @param res 
   * @param next 
   */
  public use = (req: Request, res: Response, next: NextFunction) => {
  };
  /**
   * 사용자별 쿠폰 조회 
   * @param req 
   * @param res 
   * @param next 
   */
  public findByUserId = (req: Request, res: Response, next: NextFunction) => {
  };
  /**
   * 사용자별 + 시작일자별 쿠폰 조회 
   * @param req 
   * @param res 
   * @param next 
   */
  public findByUserIdAndDate = (req: Request, res: Response, next: NextFunction) => {
  };
  /**
   * 사용유무 업데이트 
   * @param req 
   * @param res 
   * @param next 
   */
  public useYnUpdate = (req: Request, res: Response, next: NextFunction) => {
  };
}

export default CouponController;
