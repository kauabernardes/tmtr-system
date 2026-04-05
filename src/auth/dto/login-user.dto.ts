import { IsString, MaxLength } from "class-validator";

export class LoginUserDto {

    @IsString({ message: 'Username must be a string' })
    @MaxLength(32, { message: "Username must be at most 32 characters long" })
    username: string;

    @IsString({ message: 'Password must be a string' })
    @MaxLength(32, { message: "Password must be at most 32 characters long" })
    password: string;
}