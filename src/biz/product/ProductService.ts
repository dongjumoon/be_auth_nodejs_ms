import { ProductDTO } from './ProductDTO';
import ProductRepository from './ProductRepository';

export default class ProductService {
  private productRepository = ProductRepository;
  public createProduct = async (productDTO: ProductDTO) => {
    await this.productRepository.create(productDTO);
  };

  public findByProdAll = async () => {
    return await this.productRepository.find();
  };

  public findByProdId = async (prodId: string) => {
    return await this.productRepository.findOne({ prodId });
  };
}
