import { OrderDTO } from './OrderDTO';
import OrderRepository from '@/biz/order/OrderRepository';
import { logger } from '@/common/utils/logger';
// import getSeqAutoincrement from '@/common/helper/getSeqAutoincrement';

class OrderService {
  // 의존성 주입
  private orderRepository = OrderRepository;

  /**
   * 유저ID별 주문조회
   * @param userId
   * @returns
   */
  public findByUserId = async (userId: string) => {
    const orderOne = await this.orderRepository.findOne({ userId: userId });
    logger.debug(orderOne);
    return orderOne;
  };

  /**
   * 유저ID별 주문등록
   * @param orderDTO
   * @returns
   */
  public createOrderId = async (orderDTO: OrderDTO) => {
    // orderDTO.productId = getSeqAutoincrement('OR');
    const createResult = await this.orderRepository.create(orderDTO);
    return createResult;
  };

  /**
   * 유저ID별 주문결제
   * @param userId
   */
  public payOrder = (userId: string) => {
    logger.info(`결제 userId: ${userId}`);
  };
}

export default OrderService;
