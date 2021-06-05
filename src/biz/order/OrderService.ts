import OrderRepository from "@/biz/order/OrderRepository";
import { ErrorDTO, ResponseDTO } from "@/common/dto/ResponseDTO";
import getSeqAutoincrement from "@/common/helper/getSeqAutoincrement";
import { logger } from "@/common/utils/logger";
import { OrderDTO } from "./OrderDTO";
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
      if (1 === 1) {
        throw new Error('강제조회 종료');
      }
      logger.info(`OrderService::findByUserId in => ${userId}`);
      const orderOne = await this.orderRepository.findOne({ userId: userId });
      logger.info(`OrderService::findByUserId out => ${orderOne}`);
      return orderOne;
    } catch (e) { // 비정상 케이스
      let response = new ResponseDTO();
      let errorDTO = new ErrorDTO();

      // 응답코드
      response.code = "500"; // 200, 400, 500...
      response.msg = "DB조회 실패";

      const active = process.env.NODE_ENV;
      if (active !== "product") {
        // 에러코드 정의
        errorDTO.code = "ORDER_ERR_002"; // 프로젝트에서 정한 에러코드
        errorDTO.msg = JSON.stringify(e); // 프로젝트에서 정한 에러메세지
        response.error = errorDTO;
      } else {
        // 에러코드 정의
        errorDTO.code = "ORDER_ERR_002"; // 프로젝트에서 정한 에러코드
        errorDTO.msg = "01x-0000-0000 관리자에게 문의 하세요.[ORDER_ERR_002]"; 
        response.error = errorDTO;
      }

      // 추적하는 유니크 아이디 = ObjectId
      response.transId = getSeqAutoincrement("findByUserId");
      throw new Error(JSON.stringify(response));
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
    const createResult = await this.orderRepository.create(orderDTO);
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
