import { logger } from '@/common/utils/logger';
import HttpException from '@exceptions//HttpException';
import _ from 'lodash';
import { startSession } from 'mongoose';
import { MenuDTO } from './MenuDTO';
import MenuRepository from './MenuRepository';

export default class MenuService {
  private menuRepo = MenuRepository;

  public list() {
    const result = this.menuRepo.find();
    if (_.isEmpty(result)) {
      throw new HttpException(401, '데이터가 없습니다.');
    }
    return result;
  }

  public async reg(menuDTO: MenuDTO) {
    console.log('진짜 서비스 진입');
    const session = await startSession();
    try {
      session.startTransaction();
      if (_.isEmpty(menuDTO)) {
        throw new HttpException(409, '데이터가 없습니다.');
      }
      const result = this.menuRepo.create(menuDTO);
      session.endSession();
      return result;
    } catch (e) {
      await session.abortTransaction();
      session.endSession();
      logger.error('MenuService::reg exception => ', e);
      throw new Error(e);
    }
  }
}
