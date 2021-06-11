import { IsEmail } from 'class-validator';

export class CreateUserDto {
  public user_name?: string;

  //@IsEmail()
  public email?: string;
  public user_id?: string;
  public password?: string;
  public img_url?: string;
  public point?: number;

  // TODO: 닉네임 

  // TODO: 임직원 번호 설정 

}
