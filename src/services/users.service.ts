import bcrypt from 'bcrypt';
import { isConstructorDeclaration } from 'typescript';
import { isEmpty, dayUtil } from '@/common/utils/util';
import { CreateUserDto } from '@/biz/user/UsersDTO';
import { User } from '@/biz/user/UsersEntity';
import userModel from '@/biz/user/UsersRepository';
import HttpException from '@/exceptions/HttpException';

class UserService {
  public users = userModel; //const userModel = model<User & Document>('User', userSchema)

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find(); //noSQL 
    return users;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    const findUser: User = await this.users.findOne({ user_id: userData.user_id });
    if (findUser) throw new HttpException(409, `You're user_id ${userData.user_id} already exists`);
    // const data: CreateUserDto = {
    //   user_name: '',
    //   user_id: userData.user_id,
    //   email: '',
    //   password: '',
    //   img_url: '',
    //   point: 0,
    //   reg_date: nowDay,
    //   reg_writer: '',
    //   modify_date: '',
    //   modify_writer: '',
    //   del_date: '',
    //   del_writer: '',
    //   use_yn: true,
    // };
    const reg_date = dayUtil();
    const password = userData.password;
    const encryptedPassowrd = bcrypt.hashSync(password, 10) // sync
    userData.reg_date = reg_date;
    userData.password = encryptedPassowrd;
    userData.point    = 0; 

    const createUserData: User = await this.users.create(userData);

    return createUserData;
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    let pw :string;
    if (userId) {
      const findUser: User = await this.users.findOne({ user_id: userId });
      if (findUser && findUser.user_id != userId) throw new HttpException(409, `You're user_id ${userId} already exists`);
      pw = findUser.password;
    }
    if (userData.password) {
      
      const isPasswordMatching: boolean = await bcrypt.compare(userData.password, pw);
      if (isPasswordMatching) throw new HttpException(409, "You're password not matching");
      // const updateUserById: User = await this.users.findByIdAndUpdate(userData['_id'], userData);
      userData.modify_date = dayUtil();
      const updateUserById = await this.users.updateOne({user_id: userData['user_id']}, userData);
      if (!updateUserById) throw new HttpException(409, "You're not user");

      return updateUserById as User;
    } else {
      throw new HttpException(409, `You're user_password ${userData.password} already exists`);
    }
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.remove({ user_id : userId});
    if (!deleteUserById) throw new HttpException(409, "You're not user");

    return deleteUserById;
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: User = await this.users.findOne({ user_id: userId });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }
}

export default UserService;
