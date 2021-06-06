import OrderRepository from "@/biz/order/OrderRepository";
import { logger } from "@/common/utils/logger";
import { orderStartDateTime, regDate } from "@/common/utils/util";
import { OrderDTO } from "./OrderDTO";
import { OrderEntity } from "./OrderEntity";
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
    try { // 정상 케이스
      logger.info(`OrderService::findByUserId in => ${userId}`);
      const orderOne = await this.orderRepository.findOne({ userId: userId });
      logger.info(`OrderService::findByUserId out => ${orderOne}`);
      return orderOne;
    } catch (e) { // 비정상 케이스
      logger.error('OrderService::findByUserId exception => ', e);
      return null;
    }
  };

  /**
   * 유저ID별 주문등록
   * @param orderDTO
   * @returns
   */
  public createOrderId = async (orderDTO: OrderDTO) => {
    logger.info(
      `OrderService::createOrderId in => ${JSON.stringify(orderDTO)}`,
    );
    let createResult: OrderEntity = new OrderDTO();
    try {
      orderDTO.startDateTime = orderStartDateTime();
      orderDTO.orderState = 'ORDER_REG_SUCCESS'; // 주문등록성공  
      createResult = await this.orderRepository.create(orderDTO);
    } catch (e) {
      logger.error('OrderService::createOrderId exception => ', e);
      return null;
    }
    logger.info(
      `OrderService::createOrderId out => ${JSON.stringify(createResult)}`,
    );
    return createResult;
  };

  /**
   * 주문등록 푸시 알람 보내기
   * @param orderDTO
   */
  public orderPushSend = async (orderDTO: OrderDTO) => {
    logger.info(`OrderService::orderPushSend in => ${orderDTO}`);
    logger.info(`주문등록 푸시 알람 보내기 : ${orderDTO} send`);
    let orderOne: OrderEntity = new OrderDTO();
    try {
      orderOne = await this.orderRepository.findOne({ userId: orderDTO.userId });
      if (!orderOne) {
        return null;
      } else {
        orderOne.orderState = "PUSH_SUCCESS"; // 푸시성공 
        return this.orderRepository.create(orderOne);
      }
    } catch(e) {
      logger.error('OrderService::orderPushSend exception => ', e);
      return null;
    }
   
  };

  /**
   * 유저ID별 주문결제
   * @param userId
   */
  public payOrder = async (userId: string) => {
    logger.info(`OrderService::payOrder in => ${userId}`);
    logger.info(`유저ID별 주문결제 : ${userId}`);
    let orderOne: OrderEntity = new OrderDTO();
    try {
      orderOne = await this.orderRepository.findOne({ userId: userId });
      if (!orderOne) {
        return null;
      } else {
        orderOne.orderState = "PAY_COMPLETE"; // 주문결제 성공
        return this.orderRepository.create(orderOne);
      }
    } catch (e) {
      logger.error('OrderService::payOrder exception => ', e);
      return null;
    }
  };
}

export default OrderService;
