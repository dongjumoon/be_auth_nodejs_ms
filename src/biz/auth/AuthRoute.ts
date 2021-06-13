import { Router } from 'express';
import AuthController from '@/biz/auth/AuthController';
import { CreateUserDto } from '@/biz/user/UserDTO';
import Route from '@/common/entity/routes.interface';
import authMiddleware from '@/common/middlewares/auth.middleware';
import validationMiddleware from '@/common/middlewares/validation.middleware';

class AuthRoute implements Route {
  public path = '/api/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, validationMiddleware(CreateUserDto, 'body'), this.authController.logIn);
    this.router.get(`${this.path}/logout/:userId`, authMiddleware, this.authController.logOut); // TODO: 로그아웃 아이디 받아서 처리 기능 개선

    // TODO: OAuth2[카카오,네이버,구글] 로그인 붙이기 : GET, OPEN API

    // TODO: 새로운 비밀번호 요청 [기존비밀번호,새로운비밀번호] : POST 

    // TODO: 푸시 알림 설정 유무 : 프로모션/이벤트 알림 수신, 위치정보 서비스 이용약관 동의 

    // TODO: 약관보기  

  }
}

export default AuthRoute;
