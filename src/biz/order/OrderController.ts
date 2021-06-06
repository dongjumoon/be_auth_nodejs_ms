import OrderService from '@/biz/order/OrderService';
import { ErrorMsgConst } from '@/common/const/ErrorMsgConst';
import { ResponseDTO } from '@/common/dto/ResponseDTO';
import { NextFunction, Request, Response } from 'express';
import { OrderEntity } from './OrderEntity';

export default class OrderController {
  public orderService: OrderService;
  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }

  /**
   * 유저별ID 주문 결제 
   * @param req 
   * @param res 
   * @param next 
   */
  public payOrderUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: {} | OrderEntity = await this.orderService.payOrder(req.params.userId);
      if (!result) {
        const response = ResponseDTO.errorProc({
          title: 'payOrderUserId',
          error: {
            code: ErrorMsgConst.ORDER_ERROR_DEFINE.C1_7.CODE,
            msg: ErrorMsgConst.ORDER_ERROR_DEFINE.C1_7.MSG,
          },
          result: result,
        });
        res.status(500).json(response);
      } else {
        const response = ResponseDTO.successProc(result);
        res.status(200).json(response);
      }
    } catch (e) {
      next(e);
    }
  };

  /**
   * 유저별 주문 등록 
   * @param req 
   * @param res 
   * @param next 
   */
  public createOrderId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: {} | OrderEntity = await this.orderService.createOrderId(req.body);
      if (!result) { // 비정상 
        const response = ResponseDTO.errorProc({
          title: 'createOrderId',
          error: {
            code: ErrorMsgConst.ORDER_ERROR_DEFINE.C0_1.CODE,
            msg: ErrorMsgConst.ORDER_ERROR_DEFINE.C0_1.MSG,
          },
          result: result,
        });
        res.status(500).json(response);
      } else { // 정상
        const response = ResponseDTO.successProc(result);
        res.status(200).json(response);
      }
    } catch (e) {
      next(e);
    }
  };

  /**
   * 유저별 ID 주문 조회
   * @param req
   * @param res
   * @param next
   */
  public findByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId as string;
      const result: {} | OrderEntity = await this.orderService.findByUserId(userId);
      if (!result) { // 비정상 조회 일때
        const response = ResponseDTO.errorProc({
          title: 'findByUserId',
          error: {
            code: ErrorMsgConst.ORDER_ERROR_DEFINE.RD_3.CODE,
            msg: ErrorMsgConst.ORDER_ERROR_DEFINE.RD_3.MSG,
          },
          result: result,
        });
        res.status(500).json(response);
      } else { // 정상일때
        const response = ResponseDTO.successProc(result);
        res.status(200).json(response);
      }
    } catch (e) {
      next(e);
    }
  };
}
