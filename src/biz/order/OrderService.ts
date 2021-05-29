import { OrderDTO } from './OrderDTO';
import OrderRepository from '@/biz/order/OrderRepository';
import { logger } from '@/common/utils/logger';

class OrderService {
  // 의존성 주입
  private orderRepository = OrderRepository;

  public findByUserId = async (userId: string) => {
    const orderOne = await this.orderRepository.findOne({ userId: userId });
    logger.debug(orderOne);
    return orderOne;
  };

  public createOrderId = async (orderDTO: OrderDTO) => {
    const createResult = await this.orderRepository.create(orderDTO);
    return createResult;
  };
}

export default OrderService;
