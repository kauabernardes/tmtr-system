import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}
    
    @Post('register')
    async register(@Body() payload: RegisterUserDto ) {
        return await this.authService.register(payload.username, payload.password, payload.securityCode);
    }

    @Post("login")
    async login(@Body() payload: { username: string; password: string }) {
        return await this.authService.login(payload.username, payload.password);
    }


}
