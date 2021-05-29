import { Router } from 'express';
import AuthController from '@/common/controllers/auth.controller';
import { CreateUserDto } from '@/biz/user/users.dto';
import Route from '@/common/entity/routes.interface';
import authMiddleware from '@/common/middlewares/auth.middleware';
import validationMiddleware from '@/common/middlewares/validation.middleware';

class AuthRoute implements Route {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    this.router.post(`${this.path}login`, validationMiddleware(CreateUserDto, 'body'), this.authController.logIn);
    this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut);
  }
}

export default AuthRoute;
