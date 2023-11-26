import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userpassword: string;
}

export class AuthResponseDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  access_token: string;
}

export class AuthUserDTO {
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
