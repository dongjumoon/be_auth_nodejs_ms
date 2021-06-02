import getSeqAutoincrement from '@/common/helper/getSeqAutoincrement';
import { logger } from '@/common/utils/logger';
import { ProductDTO } from './ProductDTO';
import ProductRepository from './ProductRepository';

export default class ProductService {
  public productRepository = ProductRepository;
  public createProduct = async (productDTO: ProductDTO) => {
    logger.info(`ProductService::createProduct in => ${productDTO}`);
    productDTO.prodId = getSeqAutoincrement('PD');
    const result = await this.productRepository.create(productDTO);
    logger.info(`ProductService::createProduct out => ${result}`);
  };

  public findByProdAll = async () => {
    logger.info(`ProductService::findByProdAll in => {}`);
    const result = await this.productRepository.find();
    logger.info(`ProductService::findByProdAll out => ${result}`);
    return result;
  };

  public findByProdId = async (prodId: string) => {
    logger.info(`ProductService::findByProdId in => ${prodId}`);
    const result = await this.productRepository.findOne({ prodId });
    logger.info(`ProductService::findByProdId out => ${result}`);
    return result;
  };
}
