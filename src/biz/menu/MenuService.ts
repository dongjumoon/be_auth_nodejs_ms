import { logger } from '@/common/utils/logger';
import HttpException from '@exceptions//HttpException';
import _ from 'lodash';
import { startSession } from 'mongoose';
import { MenuDTO } from './MenuDTO';
import { MenuEntity } from './MenuEntity';
import MenuRepository from './MenuRepository';

export default class MenuService {
  private menuRepo = MenuRepository;

  public async list() {
    const result = this.menuRepo.find();
    if (_.isEmpty(result)) {
      throw new HttpException(401, '데이터가 없습니다.');
    }
    return result;
  }

  public async delete(MenuDTO: string) {
    try {
        if (_.isEmpty(MenuDTO)) {
            throw new HttpException(409, '매뉴 아이디는 필수 입니다.');
        }
        const result = this.menuRepo.remove( {menuId : MenuDTO} );
        return result;
        
    }catch(e) {
        logger.error('MenuService::remove exception => ', e);
        throw new Error(e);
    }
}

  public async reg(menuDTO: MenuDTO) {
    try {
      if (_.isEmpty(menuDTO)) {
        throw new HttpException(409, '데이터가 없습니다.');
      }
      const result = this.menuRepo.create(menuDTO);
      return result;
    } catch (e) {
      logger.error('MenuService::reg exception => ', e);
      throw new Error(e);
    }
  }

  public async edit(menuDTO: MenuDTO) {
    //const findMenu: MenuDTO = await this.menuRepo.findOne({ user_id: menuDTO.menuId });
    try {
      // if(!findMenu){
      //   throw new HttpException(409, '해당 매뉴 아이디가 없습니다.');
      // }
      if (_.isEmpty(menuDTO.menuId)) {
        throw new HttpException(409, '매뉴 아이디는 필수 입니다.');
      }
      const menu = await this.menuRepo.findOne({ menuId: menuDTO.menuId });
      if (_.isEmpty(menuDTO.menuId)) {
        throw new HttpException(401, '매뉴 정보가 없습니다.');
      } else {
        await this.menuRepo.updateOne({ menuId: menuDTO.menuId }, menuDTO);
      }
    } catch (e) {
      logger.error('MenuService::reg exception => ', e);
      throw new Error(e);
    }
  }

}
