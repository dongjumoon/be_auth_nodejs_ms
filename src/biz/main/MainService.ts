import { logger } from '@/common/utils/logger';
import HttpException from '@/exceptions/HttpException';
import _ from 'lodash';
import { startSession } from 'mongoose';
import { MainDTO } from './MainDTO';
import MainRepository from './MainRepository';

export default class MainService {
    private MainRepo = MainRepository;
    
}
