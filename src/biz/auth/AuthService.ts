import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import { CreateUserDto } from '@/biz/user/UserDTO';
import HttpException from '@exceptions/HttpException';
//import { DataStoredInToken, TokenData } from '@/common/entity/auth.interface';
import { User } from '@/biz/user/UserEntity';
import userModel from '@/biz/user/UserRepository';
import { isEmpty } from '@/common/utils/util';
import { logger } from '@/common/utils/logger';
import { DataStoredInToken, TokenData } from './AuthEntity';

class AuthService {
  public users = userModel;

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async login(userData: CreateUserDto): Promise<{ cookie: string; findUser: User }> {
    logger.info(`AuthService::login in => ${userData.user_id}`);
    logger.info(`로그인 ------> : ${userData.user_id}`);
    const findUser: User = await this.users.findOne({ user_id: userData.user_id });
    try {
      if (findUser) {
        const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
        if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");
        const tokenData = this.createToken(findUser);
        const cookie = this.createCookie(tokenData);
        return { cookie, findUser };
      } else {
        throw new HttpException(409, "유저 정보가 없습니다.");
      }
    } catch (e) {
      logger.error('AuthService::login exception => ', e);
      throw new Error(e);
    }
  }

  
  public async isDuplicateUserId(userData: CreateUserDto):Promise<User | any> {
    logger.info(`isDuplicateUserIdService::login in => ${userData.user_id}`);
    logger.info(`동일아이디체크 ------> : ${userData.user_id}`);
      const findUser: User = await this.users.findOne({ user_id: userData.user_id });
      if (findUser) {
        return new HttpException(409,'동일한 ID가 존재합니다.');
      }
      return findUser;
  }
  //if (!findUser) throw new HttpException(409, `You're user_id ${userData.user_id} not found`);
  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    const findUser: User = await this.users.findOne({ user_id: userData.user_id });
    if (!findUser) throw new HttpException(409, `You're email ${userData} not found`);
    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id, user_id: user.user_id, auth: 'member'};
    const secret: string = config.get('secretKey');
    const expiresIn: number = 60 * 60;//3600 60:1초  총 1시간
    return { expiresIn, token: jwt.sign(dataStoredInToken, secret, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
