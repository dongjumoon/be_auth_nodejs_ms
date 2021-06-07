import { logger } from "@/common/utils/logger";
import { regDate } from "@/common/utils/util";
import HttpException from "@/exceptions/HttpException";
import _ from "lodash";
import { startSession } from "mongoose";
import { CouponDTO } from "./CouponDTO";
import { CouponEntity } from "./CouponEntity";
import CouponRepository from "./CouponRepository";

export default class CouponService {
  private couponRepository = CouponRepository;

  // todo: 쿠폰 누적하기
  public async add(couponDTO: CouponDTO) {
    const session = await startSession();
    if (_.isEmpty(couponDTO.userId)) {
      throw new HttpException(409, '사용자 아이디는 필수값 입니다.');
    }
    try {
      session.startTransaction();
      const coupon: CouponEntity = await this.couponRepository.findOne({userId: couponDTO.userId});
      
      let result: CouponEntity | CouponDTO = new CouponDTO();
      if (_.isEmpty(coupon)) { // 신규 최초 쿠폰 등록 
        couponDTO.useYn = 'Y';
        couponDTO.couponScore = 1;
        couponDTO.regDate = regDate();
        result = await this.couponRepository.create(couponDTO);
      } else { // 기존 쿠폰 누적 
        result = await this.couponRepository.updateOne({userId: couponDTO.userId}, {
          couponScore: coupon.couponScore + 1, 
          regDate: regDate(),
          useYn: 'Y'
        });
      }
      
      session.endSession();
      return result;
    } catch(e) {
      await session.abortTransaction();
      session.endSession();
      logger.error('CouponService::add exception => ', e);
      throw new Error(e);
    }
  }
  // todo: 쿠폰 사용하기 
  public async use(couponDTO: CouponDTO) {
    const session = await startSession();
    if (_.isEmpty(couponDTO.userId)) {
      throw new HttpException(409, '사용자 아이디는 필수값 입니다.');
    }
    try {
      session.startTransaction();
      const coupon: CouponEntity = await this.couponRepository.findOne({userId: couponDTO.userId, useYn: 'Y'});

      if (_.isEmpty(coupon)) {
        throw new HttpException(500, '사용할 수 있는 쿠폰 점수가 없습니다.');
      }
      if (coupon.couponScore <= 0) {
        throw new HttpException(500, '사용할 수 있는 쿠폰점수가 0이거나 0보다 작아 사용할 수 없습니다.');
      }
      if (coupon.couponScore < couponDTO.couponScore) {
        throw new HttpException(500, '사용할 수 있는 쿠폰점수를 초과 하여 사용할 수 없습니다.');
      }

      const result = this.couponRepository.updateOne({userId: couponDTO.userId}, {
        couponScore: coupon.couponScore - couponDTO.couponScore, 
        useDate: regDate()
      });
      session.endSession();
      return result;
    } catch(e) {
      await session.abortTransaction();
      session.endSession();
      logger.error('CouponService::use exception => ', e);
      throw new Error(e);
    }
  }

  // todo: 쿠폰 사용자별 목록 조회
  public async findByUserId(userId: string) {
    if (_.isEmpty(userId)) {
      throw new HttpException(409, '유저 아이디는 필수값 입니다.');
    }
    return await this.couponRepository.findOne({userId: userId});
  }
  
  // todo: 쿠폰 사용자별 + 날짜별 상세 조회 
  public async findByUserIdAndDate(userId: string, regDate: string) {
    if (_.isEmpty(userId)) {
      throw new HttpException(409, '유저 아이디는 필수값 입니다.');
    }
    return await this.couponRepository.findOne({userId: userId, regDate: regDate});
  }

  // todo: 쿠폰 사용유무 수정
  public async useYnUpdate(couponDTO: CouponDTO) {
    const session = await startSession();
    if (_.isEmpty(couponDTO.userId)) {
      throw new HttpException(409, '유저 아이디는 필수값 입니다.');
    }
    try {
      session.startTransaction();
      const result = await this.couponRepository.updateOne({userId: couponDTO.userId}, couponDTO);
      session.endSession();
      return result;
    }catch(e) {
      session.endSession();
      logger.error('CouponService::useYnUpdate exception => ', e);
      throw new Error(e);
    }
  }




}

