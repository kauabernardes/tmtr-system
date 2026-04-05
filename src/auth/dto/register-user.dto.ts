import { IsString, Length } from "class-validator";

export class RegisterUserDto {

    @IsString({message: 'Username must be a string'})
    @Length(4, 32, {message: "Username must be between 4 and 32 characters long"})
    username: string;
    
    @IsString({message: 'Password must be a string'})
    @Length(8, 32, {message: "Password must be between 8 and 32 characters long"})
    password: string;

    @IsString({message: 'Security code must be a string'})
    @Length(6, 6, {message: "Security code must be exactly 6 characters long"})
    securityCode: string;

}