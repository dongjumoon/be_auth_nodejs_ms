import { Router } from 'express';
import Route from '@/entity/routes.interface';
import ProductController from '@/controllers/ProductController';

class ProductRoute implements Route {
  public path = '/product';
  public router = Router();
  public ProductController = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.ProductController.index);
  }
}

export default ProductRoute;
