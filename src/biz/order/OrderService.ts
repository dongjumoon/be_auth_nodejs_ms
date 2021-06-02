import OrderRepository from '@/biz/order/OrderRepository';
import { logger } from '@/common/utils/logger';
import { OrderDTO } from './OrderDTO';
// import getSeqAutoincrement from '@/common/helper/getSeqAutoincrement';

class OrderService {
  // 의존성 주입
  public orderRepository = OrderRepository;

  /**
   * 유저ID별 주문조회
   * @param userId
   * @returns
   */
  public findByUserId = async (userId: string) => {
    logger.info(`OrderService::findByUserId in => ${userId}`);
    const orderOne = await this.orderRepository.findOne({ userId: userId });
    logger.info(`OrderService::findByUserId out => ${orderOne}`);
    return orderOne;
  };

  /**
   * 유저ID별 주문등록
   * @param orderDTO
   * @returns
   */
  public createOrderId = async (orderDTO: OrderDTO) => {
    logger.info(`OrderService::createOrderId in => ${JSON.stringify(orderDTO)}`);
    const createResult = await this.orderRepository.create(orderDTO);
    logger.info(`OrderService::createOrderId out => ${JSON.stringify(createResult)}`);
    return createResult;
  };

  /**
   * 주문등록 푸시 알람 보내기 
   * @param orderDTO 
   */
  public orderPushSend = async (orderDTO: OrderDTO) => {
    logger.info(`OrderService::orderPushSend in => ${orderDTO}`);
    logger.info(`주문등록 푸시 알람 보내기 : ${orderDTO} send`);
    logger.info(`OrderService::orderPushSend out => ${orderDTO}`);
  };

  /**
   * 유저ID별 주문결제
   * @param userId
   */
  public payOrder = (userId: string) => {
    logger.info(`OrderService::payOrder in => ${userId}`);
    logger.info(`유저ID별 주문결제 : ${userId}`);
    logger.info(`OrderService::payOrder out => ${userId}`);
  };
}

export default OrderService;
