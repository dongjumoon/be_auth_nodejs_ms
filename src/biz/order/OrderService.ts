import OrderRepository from '@/biz/order/OrderRepository';
import { logger } from '@/common/utils/logger';
import { orderStartDateTime } from '@/common/utils/util';
import HttpException from '@/exceptions/HttpException';
import { startSession } from 'mongoose';
import { OrderDTO } from './OrderDTO';
import { OrderEntity } from './OrderEntity';
import _ from 'lodash';

class OrderService {
  // 의존성 주입
  public orderRepository = OrderRepository;

  public findAll = async (orderDTO: OrderDTO) => {
    try {
      logger.info(`OrderService::findAll in => ${orderDTO}`);
      let orderList;
      if (_.isEmpty(orderDTO)) {
        orderList = await this.orderRepository.find({});
      } else {
        orderList = await this.orderRepository.find({...orderDTO});
      }
      logger.info(`OrderService::findByUserId out => ${orderDTO}`);
      return orderList;
      
    } catch (e) {
      // 비정상 케이스
      logger.error('OrderService::findAll exception => ', e);
      throw new Error(e);
    }
  }

  /**
   * 유저ID별 주문조회
   * @param userId
   * @returns
   */
  public findByUserId = async (userId: string) => {
    try {
      // 정상 케이스
      logger.info(`OrderService::findByUserId in => ${userId}`);
      const orderOne = await this.orderRepository.findOne({ userId: userId });
      
      logger.info(`OrderService::findByUserId out => ${orderOne}`);
      return orderOne;
    } catch (e) {
      // 비정상 케이스
      logger.error('OrderService::findByUserId exception => ', e);
      throw new Error(e);
    }
  };

  /**
   * 유저ID별 주문등록
   * @param orderDTO
   * @returns
   */
  public createOrderId = async (orderDTO: OrderDTO) => {
    logger.info(`OrderService::createOrderId in => ${JSON.stringify(orderDTO)}`);
    let createResult: OrderEntity = new OrderDTO();

    // 트랜잭션 세션 획득
    const session = await startSession();

    try {
      // 트랜잭션 시작
      session.startTransaction();

      orderDTO.startDateTime = orderStartDateTime();
      orderDTO.orderState = 'ORDER_REG_SUCCESS'; // 주문등록성공
      createResult = await this.orderRepository.create(orderDTO);

      // 트랜잭션 세션 종료
      session.endSession();

    } catch (e) {
      await session.abortTransaction();
      session.endSession();
      logger.error('OrderService::createOrderId exception => ', e);
      throw new Error(e);
    }
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
    let orderOne: OrderEntity = new OrderDTO();
    const session = await startSession();
    try {
      session.startTransaction();
      orderOne = await this.orderRepository.findOne({ userId: orderDTO.userId });
      if (!orderOne) {
        throw new HttpException(409, '주문한 내역의 유저정보가 존재하지 않습니다.');
      } else {
        orderOne.orderState = 'PUSH_SUCCESS'; // 푸시성공
        const result: OrderEntity | {} = this.orderRepository.create(orderOne);
        session.endSession();
        return result;
      }
      
    } catch (e) {
      await session.abortTransaction();
      session.endSession();
      logger.error('OrderService::orderPushSend exception => ', e);
      throw new Error(e);
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
    const session = await startSession();
    try {
      session.startTransaction();
      orderOne = await this.orderRepository.findOne({ userId: userId });
      if (!orderOne) {
        throw new HttpException(409, '주문한 내역의 유저정보가 존재하지 않습니다.');
      } else {
        orderOne.orderState = 'PAY_COMPLETE'; // 주문결제 성공
        const result: OrderEntity | {} = this.orderRepository.create(orderOne);
        session.endSession();
        return result;
      }
    } catch (e) {
      await session.abortTransaction();
      session.endSession();
      logger.error('OrderService::payOrder exception => ', e);
      throw new Error(e);
    }
  };
}

export default OrderService;
