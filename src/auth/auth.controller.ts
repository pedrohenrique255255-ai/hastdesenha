import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService:AuthService){}

    // endpoint post para auth/login
    // recebe o email e senha para tenatar autenticar o usuário
    @Post('login')
    login(@Body() loginDto:loginDto){
        return this.authService.login(loginDto);
    }
}
