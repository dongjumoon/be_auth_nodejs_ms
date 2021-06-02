import { NextFunction, Request, Response } from 'express';
import ProductService from './ProductService';

class ProductController {
  public productService: ProductService;
  constructor(productService: ProductService) {
    this.productService = productService;
  }
  /**
   * 상품등록
   * @param req
   * @param res
   * @param next
   */
  public createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.productService.createProduct(req.body);
      res.status(200).json({
        tranId: '01',
        code: 200,
        msg: '상품 등록 성공',
        body: {},
        error: {
          code: 0,
          msg: '',
        },
      });
    } catch (error) {
      next(error);
    }
  };
  /**
   * 상품전체 조회
   * @param req
   * @param res
   * @param next
   */
  public findByProdAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const prodAll = await this.productService.findByProdAll();
      res.status(200).json({
        tranId: '01',
        code: 200,
        msg: '상품 조회 성공',
        body: { prodAll },
        error: {
          code: 0,
          msg: '',
        },
      });
    } catch (error) {
      next(error);
    }
  };
  /**
   * 상품상세조회
   * @param req
   * @param res
   * @param next
   */
  public findByProdId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const prod = this.productService.findByProdId(req.params.prodId);
      res.status(200).json({
        tranId: '01',
        code: 200,
        msg: '상품 상세 조회 성공 ',
        body: { prod },
        error: {
          code: 0,
          msg: '',
        },
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductController;
