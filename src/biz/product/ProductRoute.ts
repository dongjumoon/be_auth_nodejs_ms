import { Router } from 'express';
import Route from '@/common/entity/routes.interface';
import ProductController from '@/biz/product/ProductController';
import ProductService from './ProductService';

class ProductRoute implements Route {
  public path = '/api/product';
  public router = Router();
  public ProductController = new ProductController(new ProductService());

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // 상품등록
    this.router.post(`${this.path}`, this.ProductController.createProduct);
    // 상품목록조회
    this.router.get(`${this.path}`, this.ProductController.findByProdAll);
    // 상품상세조회
    this.router.get(`${this.path}/:prodId`, this.ProductController.findByProdId);
  }
}

export default ProductRoute;
