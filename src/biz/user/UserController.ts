import { NextFunction, Request, Response } from 'express';
import userService from './UserService';
import { User } from './UserEntity';
import { CreateUserDto } from './UserDTO';
import bcrypt from 'bcrypt';
import { ErrorDTO, ResponseDTO } from '@/common/dto/ResponseDTO';
import { ErrorMsgConst } from '@/common/const/ErrorMsgConst';
import { ResponseMsgConst } from '@/common/const/ResponseMsgConst';
import getSeqAutoincrement from '@/common/helper/getSeqAutoincrement';
import UserRepository from './UserRepository';


class UsersController {
  public userService = new userService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: User[] = await this.userService.findAllUser();
      let response = new ResponseDTO();
      let errorDTO = new ErrorDTO();
      if (!result) { // 비정상 조회 일때
        // 응답코드 
        response.code = ResponseMsgConst.USER01_400_CODE; // 200, 400, 500...
        response.msg = ResponseMsgConst.USER01_400_MSG;
        response.error = errorDTO;

        // 추적하는 유니크 아이디 = ObjectId
        response.transId = getSeqAutoincrement('getUsers');
        res.status(200).json(response);

      } else { // 정상일때

        response.code = "200";
        response.msg = "정상 조회 되었습니다.";

        errorDTO.code = "";
        errorDTO.msg = "";
        response.error = errorDTO;

        response.transId = result.map(transId => transId._id).join(";");
        //response.transId = result._id;
        response.body = result;
        res.status(200).json(response);
      }
    } catch (e) {
      next(e);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const result: User = await this.userService.findUserById(userId);
      let response = new ResponseDTO();
      let errorDTO = new ErrorDTO();
      if (!result) {//비정상 조회 일때
        //응답코드
        response.code = ResponseMsgConst.USER01_400_CODE;
        response.msg = ResponseMsgConst.USER01_400_MSG;

        //에러코드
        errorDTO.code = ErrorMsgConst.USER_ERROR.RD_4.CODE // 프로젝트에서 정한 에러코드 
        errorDTO.msg = ErrorMsgConst.USER_ERROR.RD_4.MSG; // 프로젝트에서 정한 에러메세지 
        response.error = errorDTO;

        // 추적하는 유니크 아이디 = ObjectId
        response.transId = getSeqAutoincrement('getUserById');
        res.status(200).json(response);

      } else { // 정상일때

        response.code = "200";
        response.msg = "정상 조회 되었습니다.";

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

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const result: User = await this.userService.deleteUser(userId);
      let response = new ResponseDTO();
      let errorDTO = new ErrorDTO();
      if (!result) {//비정상 조회 일때
        //응답코드
        response.code = ResponseMsgConst.USER01_400_CODE;
        response.msg = ResponseMsgConst.USER01_400_MSG;

        //에러코드
        errorDTO.code = ErrorMsgConst.USER_ERROR.D0_5.CODE // 프로젝트에서 정한 에러코드 
        errorDTO.msg = ErrorMsgConst.USER_ERROR.D0_5.MSG; // 프로젝트에서 정한 에러메세지 
        response.error = errorDTO;

        // 추적하는 유니크 아이디 = ObjectId
        response.transId = getSeqAutoincrement('getUserById');
        res.status(200).json(response);

      } else { // 정상일때

        response.code = "200";
        response.msg = "정상 삭제 되었습니다.";

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

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: User = await this.userService.createUser(req.body);
      let response = new ResponseDTO();
      let errorDTO = new ErrorDTO();
      if (!result) {//비정상 조회 일때
        //응답코드
        response.code = ResponseMsgConst.USER01_400_CODE;
        response.msg = ResponseMsgConst.USER01_400_MSG;

        //에러코드
        errorDTO.code = ErrorMsgConst.USER_ERROR.C0_2.CODE // 프로젝트에서 정한 에러코드 
        errorDTO.msg = ErrorMsgConst.USER_ERROR.C0_2.MSG; // 프로젝트에서 정한 에러메세지 
        response.error = errorDTO;

        // 추적하는 유니크 아이디 = ObjectId
        response.transId = getSeqAutoincrement('createUser');
        res.status(200).json(response);
      } else { // 정상일때

        response.code = "200";
        response.msg = "정상 등록 되었습니다.";

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

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.body.user_id;
      const userData: CreateUserDto = {
        password: String(req.body.password),
      };
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
      const result: User = await this.userService.updateUser(userId, req.body);
      let response = new ResponseDTO();
      let errorDTO = new ErrorDTO();
      if (!result) { // 비정상 조회 일때
        response.code = ResponseMsgConst.ORDER_400_CODE; // 200, 400, 500...
        response.msg = ResponseMsgConst.ORDER_400_MSG;

        //에러코드
        errorDTO.code = ErrorMsgConst.USER_ERROR.U0_3.CODE // 프로젝트에서 정한 에러코드 
        errorDTO.msg = ErrorMsgConst.USER_ERROR.U0_3.MSG; // 프로젝트에서 정한 에러메세지 
        response.error = errorDTO;

      } else { // 정상일때
        response.code = "200";
        response.msg = "정상 등록 되었습니다.";

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
export default UsersController;
