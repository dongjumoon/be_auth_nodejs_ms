/*
  박진우가 만듦
*/
import { ErrorMsgConst } from '@/common/const/ErrorMsgConst';
import { ResponseDTO } from '@/common/dto/ResponseDTO';
import HttpException from '@/exceptions/HttpException';
import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import { CreateUserDto } from './UserDTO';
import { User } from './UserEntity';
import userService from './UserService';

class UsersController {
  public userService = new userService();
  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: {} | User[] = await this.userService.findAllUser();
      //service 처리 결과 실패 시 성공 시
      if (_.isEmpty(result)) {
        // 실패(lodash사용)
        // 응답코드
        const response = ResponseDTO.errorProc({
          title: 'getUsers',
          error: {
            code: ErrorMsgConst.USER_ERROR.RL_1.CODE, // 200, 400, 500...
            msg: ErrorMsgConst.USER_ERROR.RL_1.MSG,
          },
          result: result,
        });
        res.status(500).json(response);
      } else {
        //성공
        const response = ResponseDTO.successProc(result);
        res.status(200).json(response);
      }
    } catch (e) {
      next(e);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: {} | User = await this.userService.findUserById(req.params.id);
      //service 처리 결과 실패 시 성공 시
      if (_.isEmpty(result)) {
        //실패(lodash사용)
        const response = ResponseDTO.errorProc({
          title: 'getUserById',
          error: {
            code: ErrorMsgConst.USER_ERROR.RD_4.CODE,
            msg: ErrorMsgConst.USER_ERROR.RD_4.MSG,
          },
          result: result,
        });
        res.status(500).json(response);
      } else {
        //성공
        const response = ResponseDTO.successProc(result);
        res.status(200).json(response);
      }
    } catch (e) {
      next(e);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const result: {} | User = await this.userService.deleteUser(userId);
      if (_.isEmpty(result)) {
        const response = ResponseDTO.errorProc({
          title: 'deleteUser',
          error: {
            code: ErrorMsgConst.USER_ERROR.D0_5.CODE,
            msg: ErrorMsgConst.USER_ERROR.D0_5.MSG,
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

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: {} | User = await this.userService.createUser(req.body);
      if (_.isEmpty(result)) {
        //실패(lodash사용)
        const response = ResponseDTO.errorProc({
          title: 'createUser',
          error: {
            code: ErrorMsgConst.USER_ERROR.C0_2.CODE,
            msg: ErrorMsgConst.USER_ERROR.C0_2.MSG,
          },
          result: result,
        });
        res.status(500).json(response);
      } else {
        // 정상일때
        const response = ResponseDTO.successProc(result);
        res.status(200).json(response);
      }
    } catch (e) {
      next(e);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //const userId: string = req.body.user_id;
      // const userData: CreateUserDto = {
      //   password: String(req.body.password),
      // };
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
      const result: User | {} = await this.userService.updateUser(req.body);
      if (_.isEmpty(result)) {
        const response = ResponseDTO.errorProc({
          title: 'updateUser',
          error: {
            code: ErrorMsgConst.USER_ERROR.U0_3.CODE,
            msg: ErrorMsgConst.USER_ERROR.U0_3.MSG,
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
  public isDuplicateUserId = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    try {
      let userData: User = new CreateUserDto();
      const userId = req.params.userId;
      userData.user_id = userId;

      const isDuplicateUserIdData: {} | User = await this.userService.isDuplicateUserId(userData);
      const response = ResponseDTO.successProc(isDuplicateUserIdData);
      res.status(200).json(response);
    } catch (e) {
      throw new HttpException(500, e);
    }
  };
}
export default UsersController;
