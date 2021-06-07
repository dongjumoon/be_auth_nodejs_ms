
import Route from '@/common/entity/routes.interface';
import { Router } from 'express';
import BannerController from './BannerController';
import BannerService from './BannerService';

class BannerRoute implements Route {
  public path = '/api/banner';
  public router = Router();
  public BannerController = new BannerController(new BannerService());

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/all/:startDate`, this.BannerController.list);
    this.router.get(`${this.path}/detail/:bannerId`, this.BannerController.detail);
    this.router.post(`${this.path}`, this.BannerController.reg);
    this.router.put(`${this.path}`, this.BannerController.edit);
    this.router.delete(`${this.path}`, this.BannerController.remove);
    this.router.put(`${this.path}/deploy`, this.BannerController.deploy);
    this.router.put(`${this.path}/cancelDeploy`, this.BannerController.cancelDeploy);
  }
}

export default BannerRoute;
