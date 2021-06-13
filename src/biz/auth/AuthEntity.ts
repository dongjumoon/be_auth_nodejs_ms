import { Request } from 'express';
import { User } from '@/biz/user/UserEntity';

export interface DataStoredInToken {
  _id: string;
  user_id: string;
  auth: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
