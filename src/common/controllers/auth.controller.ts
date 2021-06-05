import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@/biz/user/UserDTO';
import { RequestWithUser } from '@/common/entity/auth.interface';
import { User } from '@/biz/user/UserEntity';
import AuthService from '@/common/services/auth.service';
import bcrypt from 'bcrypt';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const password = req.body.password;
      const encryptedPassowrd = bcrypt.hashSync(password, 10); // sync
      const { cookie, findUser } = await this.authService.login(req.body, encryptedPassowrd);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: { findUser, cookie }, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);
      console.log('로그아웃 컨트롤러 들어옴');
      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
