import bcrypt from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import HttpException from '@exceptions/HttpException';
import { User } from '@/entity/users.interface';
import userModel from '@/repository/users.model';
import { isEmpty } from '@utils/util';

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: User = await this.users.findOne({ user_id: userId });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ user_id: userData.user_id });
    if (findUser) throw new HttpException(409, `You're user_id ${userData.user_id} already exists`);

    const now = new Date();
    const year = now.getFullYear() + '';
    const month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
    const day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
    const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    const min = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    const sec = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
    const nowDay = year + month + day + hour + min + sec;

    const data: CreateUserDto = {
      user_name: '',
      user_id: userData.user_id,
      email: '',
      password: '',
      img_url: '',
      point: 0,
      reg_date: nowDay,
      reg_writer: '',
      modify_date: '',
      modify_writer: '',
      del_date: '',
      del_writer: '',
      use_yn: true,
    };

    const createUserData: User = await this.users.create(data);

    return createUserData;
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    let pw;
    if (userId) {
      const findUser: User = await this.users.findOne({ user_id: userId });
      if (findUser && findUser.user_id != userId) throw new HttpException(409, `You're user_id ${userId} already exists`);
      pw = findUser.password;
    }

    if (userData.password) {
      const isPasswordMatching: boolean = await bcrypt.compare(userData.password, pw);
      if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

      const updateUserById: User = await this.users.findByIdAndUpdate(userId, { userData });
      if (!updateUserById) throw new HttpException(409, "You're not user");

      return updateUserById;
    } else {
      throw new HttpException(409, `You're user_password ${userData.password} already exists`);
    }
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "You're not user");

    return deleteUserById;
  }
}

export default UserService;
