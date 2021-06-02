import { logger } from '@/common/utils/logger';
import PointException from '@/exceptions/PointException';
import { PointDTO } from './PointDTO';
import PointRepository from './PointRepository';

export default class PointService {
  private pointRepository = PointRepository;
  public findByUserIdPoint = async (userId: string) => {
    logger.info(`PointService::findByUserIdPoint in => ${userId}`);
    const result = await this.pointRepository.findOne({ userId: userId });
    logger.info(`PointService::findByUserIdPoint out => ${result}`);
  };

  public addUserIdPoint = async (pointDTO: PointDTO) => {
    logger.info(`PointService::addUserIdPoint in => ${JSON.stringify(pointDTO)}`);
    // 기존 포인트 조회
    const updatePointUser = await this.pointRepository.findOne({ userId: pointDTO.userId });

    if (updatePointUser) {
      // 기존
      // 기존 포인트 + 오늘 포인트 합산
      const addScore = updatePointUser.score + 30;
      updatePointUser.score = addScore;
      // 포인트 업데이트
      const result = await this.pointRepository.update({ userId: pointDTO.userId }, updatePointUser);
      logger.info(`PointService::addUserIdPoint out => ${result}`);
      return result;
    } else {
      // 신규
      pointDTO.score = 30;
      const result = await this.pointRepository.create(pointDTO);
      logger.info(`PointService::addUserIdPoint out => ${result}`);
      return result;
    }
  };

  public useUserIdPoint = async (pointDTO: PointDTO) => {
    logger.info(`PointService::useUserIdPoint in => ${JSON.stringify(pointDTO)}`);
    // 기존 포인트 조회
    const updatePointUser = await this.pointRepository.findOne({ userId: pointDTO.userId });

    if (updatePointUser) {
      // 기존
      // 기존 포인트 + 오늘 포인트 합산
      const addScore = updatePointUser.score - 30;
      if (addScore < 0) {
        throw new PointException(401, '포인트 점수가 있으나 포인트 점수가 너무 작습니다. 더 모으세요.');
      }
      updatePointUser.score = addScore;
      // 포인트 업데이트
      const result = await this.pointRepository.update({ userId: pointDTO.userId }, updatePointUser);
      logger.info(`PointService::useUserIdPoint out => ${result}`);
      return result;
    } else {
      throw new PointException(401, '유저 포인트 사용 불가이며, 신규가입자는 포인트가 없습니다.');
    }
  };
}
