import { NextFunction, Request, Response } from 'express';
import BoardService from '@/biz/board/BoardService';
import { ResponseDTO } from '@/common/dto/ResponseDTO';
import { ErrorMsgConst } from '@/common/const/ErrorMsgConst';
import _ from 'lodash';

export default class BoardController {
  private boardService: BoardService;
  constructor(boardService: BoardService) {
    this.boardService = boardService;
  }

  public createBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.boardService.createBoard(req.body);
      if (_.isEmpty(result)) {
        const response = ResponseDTO.errorProc({
          title: 'createBoard',
          error: {
            code: ErrorMsgConst.BOARD_ERROR_DEFINE.C0_1.CODE,
            msg: ErrorMsgConst.BOARD_ERROR_DEFINE.C0_1.MSG,
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

  public getBoardList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.boardService.getBoardList();
      if (_.isEmpty(result)) {
        const response = ResponseDTO.errorProc({
          title: 'getBoardList',
          error: {
            code: ErrorMsgConst.BOARD_ERROR_DEFINE.RL_2.CODE,
            msg: ErrorMsgConst.BOARD_ERROR_DEFINE.RL_2.MSG,
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

  public getBoardSearchList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.boardService.getBoardSearchList(req.query);
      if (_.isEmpty(result)) {
        const response = ResponseDTO.errorProc({
          title: 'getBoardSearchList',
          error: {
            code: ErrorMsgConst.BOARD_ERROR_DEFINE.RL_2.CODE,
            msg: ErrorMsgConst.BOARD_ERROR_DEFINE.RL_2.MSG,
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

  public getBoardDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.boardService.getBoardDetail(req.params.bno);
      if (_.isEmpty(result)) {
        const response = ResponseDTO.errorProc({
          title: 'getBoardDetail',
          error: {
            code: ErrorMsgConst.BOARD_ERROR_DEFINE.RD_3.CODE,
            msg: ErrorMsgConst.BOARD_ERROR_DEFINE.RD_3.MSG,
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

  public updateBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.boardService.updateBoard(req.body);
      if (_.isEmpty(result)) {
        const response = ResponseDTO.errorProc({
          title: 'updateBoard',
          error: {
            code: ErrorMsgConst.BOARD_ERROR_DEFINE.U0_5.CODE,
            msg: ErrorMsgConst.BOARD_ERROR_DEFINE.U0_5.MSG,
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

  public deleteBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.boardService.deleteBoard(req.params.bno);
      if (_.isEmpty(result)) {
        const response = ResponseDTO.errorProc({
          title: 'deleteBoard',
          error: {
            code: ErrorMsgConst.BOARD_ERROR_DEFINE.D0_4.CODE,
            msg: ErrorMsgConst.BOARD_ERROR_DEFINE.D0_4.MSG,
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
}
