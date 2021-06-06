import HttpException from '@/exceptions/HttpException';
import { IS_ISBN } from 'class-validator';
import _ from 'lodash';
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
        if (_.isEmpty(bannerDTO._id)) {
            throw new HttpException(409, '배포 기본키는 필수 입니다.');
        }
        return this.bannerRepo.findOne({ _id: bannerDTO._id });
    }
    // todo: 배너 등록 하기
    public reg(bannerDTO: BannerDTO) {
        if (_.isEmpty(bannerDTO.startDate) && _.isEmpty(bannerDTO.endDate)) {
            throw new HttpException(409, '시작일자와 종료일자는 필수값 입니다.');
        }
        return this.bannerRepo.create(bannerDTO);
    }
    // todo: 배너 수정 하기
    public async edit(bannerDTO: BannerDTO) {
        if (_.isEmpty(bannerDTO._id)) {
            throw new HttpException(409, '배포 기본키는 필수 입니다.');
        }
        const banner = await this.bannerRepo.findOne({ _id: bannerDTO._id });
        if (_.isEmpty(banner)) {
            throw new HttpException(401, '배너 정보가 없습니다.');
        } else {
            await this.bannerRepo.updateOne({ _id: bannerDTO._id }, bannerDTO);
        }
    }
    // todo: 배너 삭제 하기
    public remove(bannerDTO: BannerDTO) {
        if (_.isEmpty(bannerDTO._id)) {
            throw new HttpException(409, '배포 기본키는 필수 입니다.');
        }
        return this.bannerRepo.remove({ _id: bannerDTO._id });
    }
    // todo: 배너 배포 하기 => 캐시 올리기(로컬, 글로벌)
    public async deploy(bannerDTO: BannerDTO) {
        if (_.isEmpty(bannerDTO._id)) {
            throw new HttpException(409, '배포 기본키는 필수 입니다.');
        }
        const banner = await this.bannerRepo.findOne({ _id: bannerDTO._id });
        if (_.isEmpty(banner)) {
            throw new HttpException(401, '배너 정보가 없습니다.');
        } else {
            bannerDTO.deployYn = 'Y';
            await this.bannerRepo.updateOne({ _id: bannerDTO._id }, bannerDTO);
        }
    }
    // todo: 배너 배포 취소하기 => 사용유무 내리고 레디스 취소 하기
    public async cancelDeploy(bannerDTO: BannerDTO) {
        if (_.isEmpty(bannerDTO._id)) {
            throw new HttpException(409, '배포 기본키는 필수 입니다.');
        }
        const banner = await this.bannerRepo.findOne({ _id: bannerDTO._id });
        if (_.isEmpty(banner)) {
            throw new HttpException(401, '배너 정보가 없습니다.');
        } else {
            bannerDTO.deployYn = 'N';
            await this.bannerRepo.updateOne({ _id: bannerDTO._id }, bannerDTO);
        }
    }
}
