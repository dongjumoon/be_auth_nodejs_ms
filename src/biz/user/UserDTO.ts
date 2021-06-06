import { IsEmail } from 'class-validator';

export class CreateUserDto {
  public user_name?: string;

  //@IsEmail()
  public email?: string;
  public user_id?: string;
  public password?: string;
  public img_url?: string;
  public point?: number;
}
