import OrderService from '@/biz/order/OrderService';
import { ErrorMsgConst } from '@/common/const/ErrorMsgConst';
import { ResponseMsgConst } from '@/common/const/ResponseMsgConst';
import { ErrorDTO, ResponseDTO } from '@/common/dto/ResponseDTO';
import getSeqAutoincrement from '@/common/helper/getSeqAutoincrement';
import { NextFunction, Request, Response } from 'express';
import { OrderEntity } from './OrderEntity';

export default class OrderController {
  public orderService: OrderService;
  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }

  public payOrderUserId = (req: Request, res: Response, next: NextFunction) => {
    try {
      this.orderService.payOrder(req.params.userId);
      res.status(200).json({
        body: { msg: '결재성공' },
      });
    } catch (e) {
      next(e);
    }
  };

  public createOrderId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.orderService.createOrderId(req.body);
      res.status(200).json({
        body: result,
      });
    } catch (e) {
      next(e);
    }
  };

  /**
   * 주문조회
   * @param req
   * @param res
   * @param next
   */
  public findByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId as string;
      const result: OrderEntity = await this.orderService.findByUserId(userId);
      let response = new ResponseDTO();
      let errorDTO = new ErrorDTO();
      if (!result) { // 비정상 조회 일때

        // 응답코드 
        response.code = ResponseMsgConst.ORDER_400_CODE; // 200, 400, 500...
        response.msg =  ResponseMsgConst.ORDER_400_MSG;

        // 에러코드 정의
        errorDTO.code = ErrorMsgConst.ORDER_001_CODE; // 프로젝트에서 정한 에러코드 
        errorDTO.msg = ErrorMsgConst.ORDER_001_MSG; // 프로젝트에서 정한 에러메세지 
        response.error = errorDTO;
        
        // 추적하는 유니크 아이디 = ObjectId
        response.transId = getSeqAutoincrement('findByUserId');
        res.status(200).json(response);

      } else { // 정상일때

        response.code = "200";
        response.msg =  "정상 조회 되었습니다.";

        errorDTO.code = "";
        errorDTO.msg = "";
        response.error = errorDTO;

        response.transId = result._id;
        response.body = result;
        res.status(200).json(response);
      }
    } catch (e) {
      next(e);
    }
  };
}
