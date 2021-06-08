import Route from '@/common/entity/routes.interface';
import { Router } from 'express';
import MenuController from './MenuController';
import MenuService from './MenuService';

class MenuRoute implements Route {
  public path = 'api/menu';
  public router = Router();
  public MenuController = new MenuController(new MenuService());

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    console.log('라우터 진입');
    this.router.get(`${this.path}`, this.MenuController.list);
    this.router.post(`${this.path}`, this.MenuController.reg);
  }
}

export default MenuRoute;
