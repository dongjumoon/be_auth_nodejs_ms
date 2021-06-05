import config from 'config';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import HttpException from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@/common/entity/auth.interface';
import userModel from '@/biz/user/UserRepository';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    console.log('오스미들웨어 들어옴');
    const Authorization = req.cookies['Authorization'] || req.header('Authorization').split('Bearer ')[1] || null;
    if (Authorization) {
      console.log('오소라지제이션', Authorization);
      const secretKey: string = config.get('secretKey');
      console.log('secretKeysecretKey', secretKey);
      const verificationResponse = (await jwt.verify(Authorization, secretKey)) as DataStoredInToken;
      console.log('verificationResponseverificationResponse', verificationResponse);
      const userId = verificationResponse._id;
      const findUser = await userModel.findById(userId);
      if (findUser) {
        req.user = findUser;
        next();
      } else {
        console.log('sdfsadfasdfasdf');
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};
export default authMiddleware;
