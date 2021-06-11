
import Route from '@/common/entity/routes.interface';
import { Router } from 'express';
import MainController from './MainController';
import MainService from './MainService';

class MainRoute implements Route {
  public path = '/api/Main';
  public router = Router();
  public MainController = new MainController(new MainService());

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/all/:startDate`, this.MainController.list);
    
  }
}

export default MainRoute;
