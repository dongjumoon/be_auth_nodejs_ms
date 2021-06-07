import { logger } from '@/common/utils/logger';
import HttpException from '@/exceptions/HttpException';
import _ from 'lodash';
import { startSession } from 'mongoose';
import { BannerDTO } from './BannerDTO';
import BannerRepository from './BannerRepository';

export default class BannerService {
    private bannerRepo = BannerRepository;

    // todo: 배너 목록 가져오기
    public list(bannerDTO: BannerDTO) {
        if (_.isEmpty(bannerDTO.startDate)) {
            throw new HttpException(409, '시작일자는 필수값 입니다.');
        }
        return this.bannerRepo.find({ startDate: bannerDTO.startDate });
    }
    // todo: 배너 상세 보기
    public detail(bannerDTO: BannerDTO) {
        if (_.isEmpty(bannerDTO.bannerId)) {
            throw new HttpException(409, '배너 아이디는 필수 입니다.');
        }
        return this.bannerRepo.findOne({ bannerId: bannerDTO.bannerId });
    }
    // todo: 배너 등록 하기
    public async reg(bannerDTO: BannerDTO) {
        const session = await startSession();
        try {
            session.startTransaction();
            if (_.isEmpty(bannerDTO.startDate) && _.isEmpty(bannerDTO.endDate)) {
                throw new HttpException(409, '시작일자와 종료일자는 필수값 입니다.');
            }
            const result = this.bannerRepo.create(bannerDTO);
            session.endSession();
            return result;
        } catch(e) {
            await session.abortTransaction();
            session.endSession();
            logger.error('BannerService::reg exception => ', e);
            throw new Error(e);
        }
    }
    // todo: 배너 수정 하기
    public async edit(bannerDTO: BannerDTO) {
        const session = await startSession();
        try {
            session.startTransaction();
            if (_.isEmpty(bannerDTO.bannerId)) {
                throw new HttpException(409, '배너 아이디는 필수 입니다.');
            }
            const banner = await this.bannerRepo.findOne({ bannerId: bannerDTO.bannerId });
            if (_.isEmpty(banner)) {
                throw new HttpException(401, '배너 정보가 없습니다.');
            } else {
                await this.bannerRepo.updateOne({ bannerId: bannerDTO.bannerId }, bannerDTO);
            }
            session.endSession();

        } catch(e) {
            await session.abortTransaction();
            session.endSession();
            logger.error('OrderService::edit exception => ', e);
            throw new Error(e);
        }
    }
    // todo: 배너 삭제 하기
    public async remove(bannerDTO: BannerDTO) {
        const session = await startSession();
        try {
            session.startTransaction();
            if (_.isEmpty(bannerDTO.bannerId)) {
                throw new HttpException(409, '배너 아이디는 필수 입니다.');
            }
            const result = this.bannerRepo.remove({ bannerId: bannerDTO.bannerId });
            session.endSession();
            return result;
            
        }catch(e) {
            await session.abortTransaction();
            session.endSession();
            logger.error('OrderService::remove exception => ', e);
            throw new Error(e);
        }
    }
    // todo: 배너 배포 하기 => 캐시 올리기(로컬, 글로벌)
    public async deploy(bannerDTO: BannerDTO) {
        const session = await startSession();
        try {
            session.startTransaction();
            if (_.isEmpty(bannerDTO.bannerId)) {
                throw new HttpException(409, '배너 아이디는 필수 입니다.');
            }
            const banner = await this.bannerRepo.findOne({ bannerId: bannerDTO.bannerId });
            if (_.isEmpty(banner)) {
                throw new HttpException(401, '배너 정보가 없습니다.');
            } else {
                bannerDTO.deployYn = 'Y';
                const result = await this.bannerRepo.updateOne({ _id: bannerDTO._id }, bannerDTO);
                session.endSession();
                return result;
            }

        } catch(e) {
            await session.abortTransaction();
            session.endSession();
            logger.error('OrderService::deploy exception => ', e);
            throw new Error(e);
        }
    }
    // todo: 배너 배포 취소하기 => 사용유무 내리고 레디스 취소 하기
    public async cancelDeploy(bannerDTO: BannerDTO) {
        const session = await startSession();
        try {
            session.startTransaction();
            if (_.isEmpty(bannerDTO.bannerId)) {
                throw new HttpException(409, '배너 아이디는 필수 입니다.');
            }
            const banner = await this.bannerRepo.findOne({ bannerId: bannerDTO.bannerId });
            if (_.isEmpty(banner)) {
                throw new HttpException(401, '배너 정보가 없습니다.');
            } else {
                bannerDTO.deployYn = 'N';
                const result = await this.bannerRepo.updateOne({ bannerId: bannerDTO.bannerId }, bannerDTO);
                session.endSession();
                return result;
            }
        }catch(e) {
            await session.abortTransaction();
            session.endSession();
            logger.error('OrderService::cancelDeploy exception => ', e);
            throw new Error(e);
        }
    }
}
