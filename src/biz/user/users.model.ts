import { model, Schema, Document } from 'mongoose';
import { User } from '@/biz/user/users.interface';

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
    type: Boolean,
  },
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
