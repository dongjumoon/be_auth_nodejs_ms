import { ResponseDTO } from '@/common/dto/ResponseDTO';
// todo: 쿠폰 정보
import { NextFunction, Request, Response } from 'express';
import { networkInterfaces } from 'os';
import { CouponDTO } from './CouponDTO';
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
  public add = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const couponDTO = req.body as unknown as CouponDTO;
      const result = await this.couponService.add(couponDTO);
      const response = ResponseDTO.successProc(result);
      res.status(200).json(response);
    } catch(e) {
      next(e);
    }
  };
  /**
   * 쿠폰 사용하기 
   * @param req 
   * @param res 
   * @param next 
   */
  public use = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const couponDTO = req.body as unknown as CouponDTO;
      const result = await this.couponService.use(couponDTO);
      const response = ResponseDTO.successProc(result);
      res.status(200).json(response);
    } catch(e) {
      next(e);
    }
  };
  /**
   * 사용자별 쿠폰 조회 
   * @param req 
   * @param res 
   * @param next 
   */
  public findByUserIdCoupon = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
      const result = await this.couponService.findByUserId(userId);
      const response = ResponseDTO.successProc(result);
      res.status(200).json(response);
    } catch(e) {
      next(e);
    }
  };
  /**
   * 사용자별 + 시작일자별 쿠폰 조회 
   * @param req 
   * @param res 
   * @param next 
   */
  public findByUserIdAndDate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
      const regDate = req.params.regDate;
      const result = await this.couponService.findByUserIdAndDate(userId, regDate);
      const response = ResponseDTO.successProc(result);
      res.status(200).json(response);
    } catch(e) {
      next(e);
    }
  };
  /**
   * 사용유무 업데이트 
   * @param req 
   * @param res 
   * @param next 
   */
  public useYnUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const couponDTO = req.body as unknown as CouponDTO;
      const result = await this.couponService.useYnUpdate(couponDTO);
      const response = ResponseDTO.successProc(result);
      res.status(200).json(response);
    } catch(e) {
      next(e);
    }
  };
}

export default CouponController;
