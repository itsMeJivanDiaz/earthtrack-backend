import { IsString } from 'class-validator';

export class UserDTO {
  @IsString()
  id: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  role: string;

  @IsString()
  username: string;

  @IsString()
  userpassword: string;
}
