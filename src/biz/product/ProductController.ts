import { ErrorMsgConst } from '@/common/const/ErrorMsgConst';
import { ResponseDTO } from '@/common/dto/ResponseDTO';
import { NextFunction, Request, Response } from 'express';
import { PointDTO } from '../point/PointDTO';
import { PointEntity } from '../point/PointEntity';
import { ProductEntity } from './ProductEntity';
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

    // 비동기 3가지
    // 1. callback queue function(param, callback) { callback(); }
    // 2. promise pattern function().then(r => console.log(r)).catch(e => console.log(e))
    // 3. async await pattern async function() await function()
    // 4. 반응형 -> rxjs   
    try {
      const result: {} | ProductEntity = await this.productService.createProduct(req.body);
      const response = ResponseDTO.successProc(result);
      res.status(200).json(response);
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
      const result: {} | PointEntity = await this.productService.findByProdAll();
      if (!result) {
        const response = ResponseDTO.errorProc({
          title: 'findByProdAll',
          error: {
            code: ErrorMsgConst.PRODUCT_ERROR_DEFINE.RD_3.CODE,
            msg: ErrorMsgConst.POINT_ERROR_DEFINE.RD_3.MSG,
          },
          result: result,
        });
        res.status(500).json(response);
      } else {
        const response = ResponseDTO.successProc(result);
        res.status(200).json(response);
      }
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
      const result: {} | ProductEntity = await this.productService.findByProdId(req.params.prodId);
      if (!result) {
        const response = ResponseDTO.errorProc({
          title: 'findByProdId',
          error: {
            code: ErrorMsgConst.PRODUCT_ERROR_DEFINE.RD_3.CODE,
            msg: ErrorMsgConst.POINT_ERROR_DEFINE.RD_3.MSG,
          },
          result: result,
        });
        res.status(500).json(response);
      } else {
        const response = ResponseDTO.successProc(result);
        res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default ProductController;
