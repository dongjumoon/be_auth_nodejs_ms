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
}
