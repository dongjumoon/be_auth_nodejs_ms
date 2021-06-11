import { logger } from '@/common/utils/logger';
import HttpException from '@/exceptions/HttpException';
import _ from 'lodash';
import { startSession } from 'mongoose';
import { MainDTO } from './MainDTO';
import MainRepository from './MainRepository';

export default class MainService {
    private MainRepo = MainRepository;
    // TODO: 배너 구좌 (상) : GET, LIST
    public getBannerTopList() {}

    // TODO: 카드 등록 : POST, BODY[카드명(선택),카드번호16자리(필수),Pin번호8자리(필수)]
    public regCard() {}
    
    // TODO: 차량번호 중복확인 : GET, Query
    public isCarNumber() {}

    // TODO: Events : GET, LIST[이미지링크,제목,설명] 
    public getEvents() {}

    // TODO: 새로나온 메뉴 : GET, LIST[이미지,제목]  
    public getNewMenuList() {}

    // TODO: 이 시간대 인기 메뉴 : GET, LIST[이미지,순위,제목] 
    public getPopMenuList() {}

    // TODO: 배너 구좌 (하) : GET, LIST 
    public getBannerBottomList() {}
}
