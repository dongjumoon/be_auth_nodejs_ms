import bcrypt from 'bcrypt';
import { isConstructorDeclaration } from 'typescript';
import { isEmpty, dayUtil } from '@/common/utils/util';
import { CreateUserDto } from '@/biz/user/UserDTO';
import { User } from '@/biz/user/UserEntity';
import UserRepository from '@/biz/user/UserRepository';
import HttpException from '@/exceptions/HttpException';
import { ErrorDTO, ResponseDTO } from '@/common/dto/ResponseDTO';
import { ErrorMsgConst } from '@/common/const/ErrorMsgConst';
import getSeqAutoincrement from '@/common/helper/getSeqAutoincrement';


class UserService {
  public users = UserRepository; //const userModel = model<User & Document>('User', userSchema)

  public async findAllUser(): Promise<User[]> {
    try {
      const users: User[] = await this.users.find(); //noSQL
      return users;
    } catch (e) {
      let response = new ResponseDTO();
      let errorDTO = new ErrorDTO();

      // 응답코드
      response.code = "500"; // 200, 400, 500...
      response.msg = "DB조회 실패";

      const active = process.env.NODE_ENV;

      if (active !== "product") {
        // 에러코드 정의
        errorDTO.code = ErrorMsgConst.USER_ERROR.RL_1.CODE; // 프로젝트에서 정한 에러코드
        errorDTO.msg = ErrorMsgConst.USER_ERROR.RL_1.MSG; // 프로젝트에서 정한 에러메세지
        response.error = errorDTO;
      } else {
        // 에러코드 정의
        errorDTO.code = ErrorMsgConst.USER_ERROR.RL_1.CODE; // 프로젝트에서 정한 에러코드
        errorDTO.msg = ErrorMsgConst.USER_ERROR.RL_1.MSG;
        response.error = errorDTO;
      }

      // 추적하는 유니크 아이디 = ObjectId
      response.transId = getSeqAutoincrement("findAllUser");
      throw new Error(JSON.stringify(response));
    }
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    const findUser: User = await this.users.findOne({ user_id: userData.user_id });
    try {
      if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    //if (findUser) throw new HttpException(409, `You're user_id ${userData.user_id} already exists`);
      const reg_date = dayUtil();
      const password = userData.password;
      const encryptedPassowrd = bcrypt.hashSync(password, 10) // sync
     //serData.reg_date = reg_date;
      userData.password = encryptedPassowrd;
      userData.point = 0;
      const createUserData: User = await this.users.create(userData);
      return createUserData;
    } catch (e) {
      let response = new ResponseDTO();
      let errorDTO = new ErrorDTO();

      //응답코드
      response.code = "500";
      response.msg = "DB조회 실패";

      const active = process.env.NODE_ENV;
      if (active !== "product") {
        //에러코드 정의
        errorDTO.code = ErrorMsgConst.USER_ERROR.C0_2.CODE;
        if(findUser){
          errorDTO.msg = "동일한 아이디가 존재합니다.";
        }else{
          errorDTO.msg = ErrorMsgConst.USER_ERROR.C0_2.MSG;
        }
        response.error = errorDTO;
      } else {
        errorDTO.code = ErrorMsgConst.USER_ERROR.C0_2.CODE;
        if(findUser){
          errorDTO.msg = "동일한 아이디가 존재합니다.";
        }else{
          errorDTO.msg = ErrorMsgConst.USER_ERROR.C0_2.MSG; // 운영 메세지
        }
        response.error = errorDTO;
      }
      //추적하는 유니크 아이디 = objectId
      response.transId = getSeqAutoincrement("createUser");
      throw new Error(JSON.stringify(response));
    }

  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    try {
      if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
      let pw: string;
      if (userId) {
        const findUser: User = await this.users.findOne({ user_id: userId });
        if (findUser && findUser.user_id != userId) throw new HttpException(409, `You're user_id ${userId} already exists`);
        pw = findUser.password;
      }
      if (userData.password) {

        const isPasswordMatching: boolean = await bcrypt.compare(userData.password, pw);
        if (isPasswordMatching) throw new HttpException(409, "You're password not matching");
        // const updateUserById: User = await this.users.findByIdAndUpdate(userData['_id'], userData);
        //userData.modify_date = dayUtil();
        const updateUserById = await this.users.updateOne({ user_id: userData['user_id'] }, userData);
        if (!updateUserById) throw new HttpException(409, "You're not user");

        return updateUserById as User;
      } else {
        throw new HttpException(409, `You're user_password ${userData.password} already exists`);
      }
    } catch (e) {
      let response = new ResponseDTO();
      let errorDTO = new ErrorDTO();

      //응답코드
      response.code = "500";
      response.msg = "DB조회 실패";

      const active = process.env.NODE_ENV;
      if (active !== "product") {
        //에러코드 정의
        errorDTO.code = ErrorMsgConst.USER_ERROR.U0_3.CODE;
        errorDTO.msg = ErrorMsgConst.USER_ERROR.U0_3.MSG;
        response.error = errorDTO;
      } else {
        errorDTO.code = ErrorMsgConst.USER_ERROR.U0_3.CODE;
        errorDTO.msg = ErrorMsgConst.USER_ERROR.U0_3.MSG; // 운영 메세지
        response.error = errorDTO;
      }
      //추적하는 유니크 아이디 = objectId
      response.transId = getSeqAutoincrement("findUserById");
      throw new Error(JSON.stringify(response));

    }

  }

  public async deleteUser(userId: string): Promise<User> {
    const findUser: User = await this.users.findOne({ user_id: userId });
    try {
      if(findUser){
        const deleteUserById: User = await this.users.remove({ user_id: userId });
        return deleteUserById;
      }
   
    } catch (e){
      let response = new ResponseDTO();
      let errorDTO = new ErrorDTO();

       // 응답코드
       response.code = "500"; // 200, 400, 500...
       response.msg = "DB조회 실패";

       const active = process.env.NODE_ENV;

       if (active !== "product") {
        // 에러코드 정의
        errorDTO.code = ErrorMsgConst.USER_ERROR.D0_5.CODE; // 프로젝트에서 정한 에러코드
        errorDTO.msg = ErrorMsgConst.USER_ERROR.D0_5.MSG; // 프로젝트에서 정한 에러메세지
        response.error = errorDTO;
      } else {
        // 에러코드 정의
        errorDTO.code = ErrorMsgConst.USER_ERROR.D0_5.CODE; // 프로젝트에서 정한 에러코드
        errorDTO.msg = ErrorMsgConst.USER_ERROR.D0_5.MSG;
        response.error = errorDTO;
      }
        // 추적하는 유니크 아이디 = ObjectId
        response.transId = getSeqAutoincrement("deleteUser");
        throw new Error(JSON.stringify(response)); //미들웨어가 받음
    }
  
  }

  public async findUserById(userId: string): Promise<User> {
    try {

      if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

      const findUser: User = await this.users.findOne({ user_id: userId });
      if (!findUser) throw new HttpException(409, "You're not user");

      return findUser;
    } catch (e) { //비정상 케이스
      let response = new ResponseDTO();
      let errorDTO = new ErrorDTO();

      //응답코드
      response.code = "500";
      response.msg = "DB조회 실패";

      const active = process.env.NODE_ENV;
      if (active !== "product") {
        //에러코드 정의
        errorDTO.code = ErrorMsgConst.USER_ERROR.RD_4.CODE;
        errorDTO.msg = ErrorMsgConst.USER_ERROR.RD_4.MSG;
        response.error = errorDTO;
      } else {
        errorDTO.code = ErrorMsgConst.USER_ERROR.RD_4.CODE;
        errorDTO.msg = ErrorMsgConst.USER_ERROR.RD_4.MSG; // 운영 메세지
        response.error = errorDTO;
      }
      //추적하는 유니크 아이디 = objectId
      response.transId = getSeqAutoincrement("findUserById");
      throw new Error(JSON.stringify(response));
    }
  }
}

export default UserService;
