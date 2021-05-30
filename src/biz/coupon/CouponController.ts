// todo: 쿠폰 정보
import BasicController from '@/common/controllers/BasicController';
import { logger } from '@/common/utils/logger';
import { NextFunction, Request, Response } from 'express';

class CouponController extends BasicController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    logger.debug('CouponController:index');
    try {
      res.status(200).json({
        tranId: '01',
        code: 200,
        msg: '쿠폰 조회 정상 처리 되었습니다.',
        body: {},
        error: {
          code: 0,
          msg: '',
        },
      });
    } catch (error) {
      next(error);
    }
  };
}

export default CouponController;
