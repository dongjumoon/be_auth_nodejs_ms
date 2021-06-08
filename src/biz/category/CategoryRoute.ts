
import Route from '@/common/entity/routes.interface';
import { Router } from 'express';
import CategoryController from './CategoryController';
import CategoryService from './CategoryService';

class CategoryRoute implements Route {
  public path = '/api/category';
  public router = Router();
  public CategoryController = new CategoryController(new CategoryService());

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/type/:type`, this.CategoryController.listByType);
    this.router.get(`${this.path}/detail/:code`, this.CategoryController.detailByCode);
    this.router.post(`${this.path}`, this.CategoryController.regCate);
    this.router.put(`${this.path}/edit`, this.CategoryController.editCate);
    this.router.put(`${this.path}/remove`, this.CategoryController.removeCate);
    this.router.delete(`${this.path}`, this.CategoryController.deleteCate);
    
  }
}

export default CategoryRoute;
