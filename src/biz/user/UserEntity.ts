export interface User {
  _id?: string;
  user_name?: string;
  user_id?: string;
  email?: string;
  password?: string;
  img_url?: string;
  point?: number;
  reg_date?: string;
  reg_writer?: string;
  modify_date?: string;
  modify_writer?: string;
  del_date?: string;
  del_writer?: string;
  use_yn?: string;
  ad_accepted?: string;
  phone?: string;
  nick_name?: string;


}

//export class UserVO implements User {};

export type UserType = {
  user_name?: string;
  user_id?: string;
  email?: string;
  password?: string;
  img_url?: string;
  point?: number;
  reg_date?: string;
  reg_writer?: string;
  modify_date?: string;
  modify_writer?: string;
  del_date?: string;
  del_writer?: string;
  use_yn?: string;
}
