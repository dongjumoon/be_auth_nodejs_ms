import PointException from '@/exceptions/PointException';
import { PointDTO } from './PointDTO';
import PointRepository from './PointRepository';

export default class PointService {
  private pointRepository = PointRepository;
  public findByUserIdPoint = async (userId: string) => {
    return await this.pointRepository.findOne({ userId: userId });
  };

  public addUserIdPoint = async (pointDTO: PointDTO) => {
    // 기존 포인트 조회
    const updatePointUser = await this.pointRepository.findOne({ userId: pointDTO.userId });

    if (updatePointUser) {
      // 기존
      // 기존 포인트 + 오늘 포인트 합산
      const addScore = updatePointUser.score + 30;
      updatePointUser.score = addScore;
      // 포인트 업데이트
      return await this.pointRepository.update({ userId: pointDTO.userId }, updatePointUser);
    } else {
      // 신규
      pointDTO.score = 30;
      return await this.pointRepository.create(pointDTO);
    }
  };

  public useUserIdPoint = async (pointDTO: PointDTO) => {
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
      return await this.pointRepository.update({ userId: pointDTO.userId }, updatePointUser);
    } else {
      throw new PointException(401, '유저 포인트 사용 불가이며, 신규가입자는 포인트가 없습니다.');
      return 0;
    }
  };
}
