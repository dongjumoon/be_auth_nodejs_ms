import { Router } from 'express';
import Route from '@/common/entity/routes.interface';
import PointController from '@/biz/point/PointController';

class PointRoute implements Route {
  public path = '/point';
  public router = Router();
  public PointController = new PointController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.PointController.index);
  }
}

export default PointRoute;
