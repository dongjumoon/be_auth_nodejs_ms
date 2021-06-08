import { logger } from "@/common/utils/logger";
import HttpException from "@/exceptions/HttpException";
import _ from "lodash";
import { startSession } from "mongoose";
import { CategoryDTO } from "./CategoryDTO";
import CategoryRepository from "./CategoryRepository";

export default class CategoryService {
  private categoryRepository = CategoryRepository;

  // todo: 카테고리 타입별 조회 
  public listByType(type: string) {
    if(_.isEmpty(type)) {
      throw new HttpException(409, '타입은 필수값 입니다.');
    }
    return this.categoryRepository.find({type: type});
  }
  // todo: 카테고리 상세조회 
  public detailByCode(code: string) {
    if(_.isEmpty(code)) {
      throw new HttpException(409, '코드는 필수값 입니다.');
    }
    return this.categoryRepository.findOne({code: code});
  }

  // todo: 카테고리 등록
  public async reg(categoryDTO: CategoryDTO) {
    const session = await startSession();
    try {
      session.startTransaction();
      const result = await this.categoryRepository.create(categoryDTO);
      session.endSession();
      return result;
    } catch (e) {
      await session.abortTransaction();
      session.endSession();
      logger.error('CategoryService::reg exception => ', e);
      throw new Error(e);
    }

  }

  // todo: 카테고리 수정
  public async edit(categoryDTO: CategoryDTO) {
    const session = await startSession();
    try {
      session.startTransaction();
      const result = await this.categoryRepository.updateOne({code: categoryDTO.code}, categoryDTO);
      session.endSession();
      return result;
    } catch (e) {
      await session.abortTransaction();
      session.endSession();
      logger.error('CategoryService::edit exception => ', e);
      throw new Error(e);
    }
  }

  // todo: 카테고리 삭제 
  public async remove(categoryDTO: CategoryDTO) {
    const session = await startSession();
    try {
      session.startTransaction();
      categoryDTO.useYn = 'N';
      const result = await this.categoryRepository.updateOne({code: categoryDTO.code}, categoryDTO);
      session.endSession();
      return result;
    } catch (e) {
      await session.abortTransaction();
      session.endSession();
      logger.error('CategoryService::remove exception => ', e);
      throw new Error(e);
    }
  }

  // todo: 카테고리 완전삭제 
  public async delete(categoryDTO: CategoryDTO) {
    const session = await startSession();
    try {
      session.startTransaction();
      const result = await this.categoryRepository.remove({code: categoryDTO.code});
      session.endSession();
      return result;
    } catch (e) {
      await session.abortTransaction();
      session.endSession();
      logger.error('CategoryService::delete exception => ', e);
      throw new Error(e);
    }
  }

}