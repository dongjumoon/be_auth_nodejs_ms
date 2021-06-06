import { logger } from '@/common/utils/logger';
import HttpException from '@exceptions/HttpException';
import { NextFunction, Request, Response } from 'express';
import { ResponseMsgConst } from '../const/ResponseMsgConst';
import { ResponseDTO } from '../dto/ResponseDTO';
import getSeqAutoincrement from '../helper/getSeqAutoincrement';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    let message: string = error.message || 'Something went wrong';
    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);

    const response: ResponseDTO = {
      transId: getSeqAutoincrement('error'), // 출력예상모양: error_uuidsdxxkljslkfjsl
      code: ResponseMsgConst.RESP_5XX.CODE,
      msg: ResponseMsgConst.RESP_5XX.MSG,
      body: '서비스 에러 입니다.',
      error: {
        code: status + '',
        msg: message,
      },
    };
    
    res.status(status).json(response);

  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
