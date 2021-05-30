import { Router } from 'express';
import Route from '@/common/entity/routes.interface';
import PointController from '@/biz/point/PointController';
import PointService from './PointService';

class PointRoute implements Route {
  public path = '/api/point';
  public router = Router();
  public PointController = new PointController(new PointService());

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // 포인트 조회
    this.router.get(`${this.path}/:userId`, this.PointController.findByUserIdPoint);
    // 포인트 누적
    this.router.put(`${this.path}`, this.PointController.addUserIdPoint);
  }
}

export default PointRoute;
