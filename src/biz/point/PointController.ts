// todo: 포인트 정보
import { NextFunction, Request, Response } from 'express';
import PointService from './PointService';

class PointController {
  private pointService: PointService;
  constructor(pointService: PointService) {
    this.pointService = pointService;
  }
  public findByUserIdPoint = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pointUser = await this.pointService.findByUserIdPoint(req.params.userId);
      res.status(200).json({
        tranId: '01',
        code: 200,
        msg: '포인트 조회 정상 처리 되었습니다.',
        body: { pointUser },
        error: {
          code: 0,
          msg: '',
        },
      });
    } catch (error) {
      next(error);
    }
  };
  public addUserIdPoint = (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = this.pointService.addUserIdPoint(req.body);
      res.status(200).json({
        tranId: '01',
        code: 200,
        msg: '포인트 조회 정상 처리 되었습니다.',
        body: { result },
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

export default PointController;
