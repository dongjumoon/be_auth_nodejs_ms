import { NextFunction, Request, Response } from 'express';
import BoardService from '@/biz/board/BoardService';
import { ErrorDTO, ResponseDTO } from '@/common/dto/ResponseDTO';
import { ResponseMsgConst } from '@/common/const/ResponseMsgConst';
import { ErrorMsgConst } from '@/common/const/BoardErrorMsgConst';
import getSeqAutoincrement from '@/common/helper/getSeqAutoincrement';

export default class BoardController {
  private boardService: BoardService;
  constructor(boardService: BoardService) {
    this.boardService = boardService;
  }

  public createBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.boardService.createBoard(req.body);
      let response = new ResponseDTO();
      let errorDTO = new ErrorDTO();
      if (!result) { // 비정상 조회 일때

        // 응답코드
        response.code = ResponseMsgConst.BOARD_400_CODE; // 200, 400, 500...
        response.msg =  ResponseMsgConst.BOARD_400_MSG;

        // 에러코드 정의
        errorDTO.code = ErrorMsgConst.BOARD_001_CODE; // 프로젝트에서 정한 에러코드
        errorDTO.msg = ErrorMsgConst.BOARD_001_MSG; // 프로젝트에서 정한 에러메세지
        response.error = errorDTO;

        // 추적하는 유니크 아이디 = ObjectId
        response.transId = getSeqAutoincrement('createBoard');
        res.status(200).json(response);

      } else { // 정상일때

        response.code = ResponseMsgConst.BOARD_200_CODE;
        response.msg =  ResponseMsgConst.BOARD_200_MSG;

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

  public getBoardList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.boardService.getBoardList();
      res.status(200).json({
        body: result,
      });
    } catch (e) {
      next(e);
    }
  };

  public updateBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.boardService.updateBoard(req.body);
      res.status(200).json({
        body: result,
      });
    } catch (e) {
      next(e);
    }
  };

  public deleteBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.boardService.deleteBoard(req.query.bno);
      res.status(200).json({
        body: result,
      });
    } catch (e) {
      next(e);
    }
  };
}
