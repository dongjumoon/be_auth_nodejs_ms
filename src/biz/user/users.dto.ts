import { IsEmail } from 'class-validator';

export class CreateUserDto {
  public user_name?: string;

  @IsEmail()
  public user_id?: string;

  public email?: string;
  public password?: string;
  public img_url?: string;
  public point?: number;
  public reg_date?: string;
  public reg_writer?: string;
  public modify_date?: string;
  public modify_writer?: string;
  public del_date?: string;
  public del_writer?: string;
  public use_yn?: boolean;
}
