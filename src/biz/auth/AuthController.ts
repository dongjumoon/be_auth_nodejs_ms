import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@/biz/user/UserDTO';
import { User } from '@/biz/user/UserEntity';
import { RequestWithUser } from './AuthEntity';
import AuthService from './AuthService';
import bcrypt from 'bcrypt';
import { ResponseDTO } from '@/common/dto/ResponseDTO';
import { ErrorMsgConst } from '@/common/const/ErrorMsgConst';
import _ from 'lodash';

class AuthController {
  public authService = new AuthService();

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //const password = req.body.password;
      //const encryptedPassowrd = bcrypt.hashSync(password, 10); // sync
      let { cookie, findUser } = await this.authService.login(req.body);
      if (_.isEmpty(cookie)){

        const response = ResponseDTO.errorProc({
          title: 'logIn',
          error: {
            code: ErrorMsgConst.AUTH_ERROR.RD_1.CODE,
            msg: ErrorMsgConst.AUTH_ERROR.RD_1.MSG,
          },
          result: findUser,
        });
        res.status(500).json(response);

      } else {
        res.setHeader('Set-Cookie', cookie);
        let response : ResponseDTO = ResponseDTO.successProc(findUser);
        response.token = cookie;
        res.status(200).json(response);
      }
    } catch (e) {
      next(e);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);
      if (_.isEmpty(logOutUserData)) {
        const response = ResponseDTO.errorProc({
          title: 'logOut',
          error: {
            code: ErrorMsgConst.AUTH_ERROR.RD_2.CODE,
            msg: ErrorMsgConst.AUTH_ERROR.RD_2.MSG,
          },
          result: logOutUserData,
        });
        res.status(500).json(response);
      } else {
        res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
        const response = ResponseDTO.successProc(logOutUserData);
        console.log('로그아웃 성공!~!!!!!!!');
        res.status(200).json(response);
      }
    } catch (e) {
      next(e);
    }
  };
}
export default AuthController;
