// todo: 상품정보
import BasicController from '@/common/BasicController';
import { Logger } from '@/common/helper/Logger';
import { NextFunction, Request, Response } from 'express';

class ProductController extends BasicController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    Logger.debug('ProductController:index');
    try {
      res.status(200).json({
        tranId: '01',
        code: 200,
        msg: '포인트 조회 정상 처리 되었습니다.',
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

export default ProductController;
