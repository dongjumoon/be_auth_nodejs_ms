import { CreateUserDto } from '@/biz/user/UserDTO';
import { User, UserType } from '@/biz/user/UserEntity';
import UserRepository from '@/biz/user/UserRepository';
import { logger } from '@/common/utils/logger';
import { dayUtil } from '@/common/utils/util';
import HttpException from '@/exceptions/HttpException';
import bcrypt from 'bcrypt';
import _ from 'lodash';

class UserService {
  public users = UserRepository; //const userModel = model<User & Document>('User', userSchema)
  public async findAllUser(): Promise<User[]> {
    logger.info(`UserService::findAllUser in => 모든회원조회`);
    try {
      const users: User[] = await this.users.find(); //noSQL
      if (!users) {
        return null;
      } else {
        return users;
      }
    } catch (e) {
      logger.error('UserService::findAllUser exception => ', e);
      return null;
    }
  }

  public async createUser(userData: CreateUserDto): Promise<User | any> {
    logger.info(`UserService::createUser in => ${userData.user_id}`);
    logger.info(`유저생성 ------> : ${userData.user_id}`);
    const findUser: User = await this.users.findOne({ user_id: userData.user_id });
    try {
      //if (_.isEmpty(userData)) throw new HttpException(400, "You're not userData");
      //if (findUser) throw new HttpException(409, `You're user_id ${userData.user_id} already exists`);
      if (findUser) {
        throw new HttpException(409, '동일한 ID가 존재합니다.');
      }
      const password = userData.password;
      const encryptedPassowrd = bcrypt.hashSync(password, 10); // sync
      userData.password = encryptedPassowrd;
      // 1. interface 타입선언해라
      const userInsertData: User = {
        user_name: userData.user_name,
        user_id: userData.user_id,
        email: userData.user_name,
        password: encryptedPassowrd,
        img_url: '',
        point: 0,
        reg_date: dayUtil(),
        reg_writer: userData.user_id,
      };

      // 2. 두번째 클래스로 초기화 후 대입
      // const userInterData2: User;

      // const sum = a >> b; // 10000 -> 00001

      // // 4. 타입 기반
      // const userInterData3: UserType = {
      //   _id: '123123'
      // };

      // let array = [1,2,3,3,45];
      // let newArraay: Array<number> = [ ...array, 1, 3, 4 ];
      // const userInterData5: User = { ...userData };
      // userInterData5.reg_date = dayUtil();
      // userInterData5.reg_writer = 'amdin';

      const createUserData: UserType = await this.users.create(userInsertData); // 3. 직접 객체 {} 넣는방법
      if (!createUserData) {
        return null;
      } else {
        return createUserData;
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  public async updateUser(userData: CreateUserDto): Promise<User> {
    logger.info(`UserService::updateUser in => ${userData.user_id}`);
    logger.info(`유저수정 ------> : ${userData.user_id}`);
    try {
      //if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
      let pw: string;
      const findUser: User = await this.users.findOne({ user_id: userData.user_id });
      pw = findUser.password;
      //if (userId) {

      //if (findUser && findUser.user_id != userData.user_id) throw new HttpException(409, `You're user_id ${userData.user_id} already exists`);
      //  pw = findUser.password;
      // }
      if (findUser) {
        const isPasswordMatching: boolean = await bcrypt.compare(userData.password, pw);
        console.log('-------------------------', isPasswordMatching);
        if (isPasswordMatching) throw new HttpException(409, "You're password not matching");
        // const updateUserById: User = await this.users.findByIdAndUpdate(userData['_id'], userData);
        //userData.modify_date = dayUtil();
        const userInserData: UserType = {
          user_name: userData.user_name,
          email: userData.email,
          password: pw,
          img_url: userData.img_url,
          point: userData.point,
          modify_date: dayUtil(),
          modify_writer: userData.user_id,
        };
        const updateUserById: User | {} = await this.users.updateOne({ user_id: userData['user_id'] }, userInserData);
        if (!updateUserById) {
          return null;
        } else {
          return updateUserById;
        }
      } else {
        throw new HttpException(409, `You're user_password ${userData.password} already exists`);
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  public async deleteUser(userId: string): Promise<User> {
    logger.info(`UserService::deleteUser in => ${userId}`);
    logger.info(`유저삭제 ------> : ${userId}`);
    const findUser: User = await this.users.findOne({ user_id: userId });
    try {
      if (findUser) {
        const deleteUserById = await this.users.remove({ user_id: userId });
        return deleteUserById;
      } else {
        return null;
      }
    } catch (e) {
      logger.error('UserService::deleteUser exception => ', e);
      return null;
    }
  }

  public async findUserById(userId: string): Promise<User> {
    logger.info(`UserService::findUserById in => ${userId}`);
    logger.info(`유저ID 조회 : ${userId}`);
    try {
      if (_.isEmpty(userId)) throw new HttpException(400, "You're not userId");
      const findUser: User = await this.users.findOne({ user_id: userId });
      if (!findUser) throw new HttpException(409, "You're not user");

      if (!findUser) {
        return null;
      } else {
        return findUser;
      }

      return findUser;
    } catch (e) {
      //비정상 케이스
      logger.error('UserService::findUserById exception => ', e);
      return null;
    }
  }
  public async isDuplicateUserId(userData: CreateUserDto): Promise<User | any> {
    logger.info(`isDuplicateUserIdService::login in => ${userData.user_id}`);
    logger.info(`동일아이디체크 ------> : ${userData.user_id}`);
    const findUser: User = await this.users.findOne({ user_id: userData.user_id });
    if (findUser) {
      return new HttpException(409, '동일한 ID가 존재합니다.');
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
}

export default UserService;
