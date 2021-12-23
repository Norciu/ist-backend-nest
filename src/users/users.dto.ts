import { IsBoolean, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class LoginBodyDto {

  @IsNotEmpty()
    username: string;

  @IsNotEmpty()
    password: string;
}


export class CreateUserDto {

  @IsNotEmpty()
    firstName: string;

  @IsNotEmpty()
    lastName: string;

  @IsEmail()
  @IsOptional()
    email?: string;

  @IsOptional()
    phoneNo?: string;

  @IsNotEmpty()
    username: string;

  @IsNotEmpty()
    password: string;

  @IsOptional()
  @IsBoolean()
    disabled?: boolean;
}
