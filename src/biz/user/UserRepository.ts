import { model, Schema, Document } from 'mongoose';
import { User } from '@/biz/user/UserEntity';

const userSchema: Schema = new Schema({
  user_name: {
    type: String,
  },
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
  },
  ad_accepted: {
    type: String,
  },
  nick_name: {
    type: String,
  },
  img_url: {
    type: String,
  },
  point: {
    type: Number,
  },
  reg_date: {
    type: String,
  },
  reg_writer: {
    type: String,
  },
  modify_date: {
    type: String,
  },
  modify_writer: {
    type: String,
  },
  del_date: {
    type: String,
  },
  del_writer: {
    type: String,
  },
  use_yn: {
    type: String,
  },
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
