
import Route from '@/common/entity/routes.interface';
import { Router } from 'express';
import BannerController from './BannerController';
import BannerService from './BannerService';

class BannerRoute implements Route {
  public path = '/api/Banner';
  public router = Router();
//   public BannerController = new BannerController(new BannerService());

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.get(`${this.path}/:userId`, this.BannerController.findByUserId); // 주문조회
    // this.router.get(`${this.path}/pay/:userId`, this.BannerController.payBannerUserId); // 주문결제
    // this.router.post(`${this.path}`, this.BannerController.createBannerId); // 주문등록
  }
}

export default BannerRoute;
