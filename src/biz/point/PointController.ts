// todo: 포인트 정보
import { ErrorMsgConst } from '@/common/const/ErrorMsgConst';
import { ResponseDTO } from '@/common/dto/ResponseDTO';
import { NextFunction, Request, Response } from 'express';
import { PointEntity } from './PointEntity';
import PointService from './PointService';

class PointController {
  public pointService: PointService;
  constructor(pointService: PointService) {
    this.pointService = pointService;
  }
  public findByUserIdPoint = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: PointEntity = await this.pointService.findByUserIdPoint(req.params.userId);
      if (!result) {
        const response = ResponseDTO.errorProc({
          title: 'findByUserIdPoint',
          error: {
            code: ErrorMsgConst.POINT_ERROR_DEFINE.RD_3.CODE,
            msg: ErrorMsgConst.POINT_ERROR_DEFINE.RD_3.MSG,
          },
          result: result,
        });
        res.status(500).json(response);
      } else {
        const response = ResponseDTO.successProc(result);
        res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  };
  public addUserIdPoint = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: any | PointEntity = await this.pointService.addUserIdPoint(req.body);
      const response = ResponseDTO.successProc(result);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
  public useUserIdPoint = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: any | PointEntity = await this.pointService.useUserIdPoint(req.body);
      const response = ResponseDTO.successProc(result);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export default PointController;
