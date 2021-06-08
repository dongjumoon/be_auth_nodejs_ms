import Route from '@/common/entity/routes.interface';
import { Router } from 'express';
import MenuController from './MenuController';
import MenuService from './MenuService';

class MenuRoute implements Route {
  public path = '/api/menu';
  public router = Router();
  public MenuController = new MenuController(new MenuService());

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}`, this.MenuController.listMenu);
    this.router.post(`${this.path}`, this.MenuController.regMenu);
    this.router.delete(`${this.path}/:id`, this.MenuController.deleteMenu);
    this.router.put(`${this.path}`, this.MenuController.editMenu);
    
  }
}

export default MenuRoute;
