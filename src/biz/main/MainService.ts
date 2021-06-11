import { logger } from '@/common/utils/logger';
import HttpException from '@/exceptions/HttpException';
import _ from 'lodash';
import { startSession } from 'mongoose';
import { MainDTO } from './MainDTO';
import MainRepository from './MainRepository';

export default class MainService {
    private MainRepo = MainRepository;

    // todo: 배너 목록 가져오기
    public list(MainDTO: MainDTO) {
        if (_.isEmpty(MainDTO.startDate)) {
            throw new HttpException(409, '시작일자는 필수값 입니다.');
        }
        return this.MainRepo.find({ startDate: MainDTO.startDate });
    }
    
}
