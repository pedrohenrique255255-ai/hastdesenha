import { Controller, Body, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService:AuthService){}

    // endpoint post para auth/login
    // recebe o email e senha para tenatar autenticar o usuário
    @Post('login')
    login(@Body() loginDto:loginDto){
        return this.authService.login(loginDto);
    }

    @Get('publica')
    rotaPublic() {
       return { mensagem: 'Está é uma rota pública!'
       }
    }

    @UseGuards(AuthGuard)
    @Get('privada')
    rotaprivada(@Req() req){
        return {
            mensagem: 'Token valido, Bem-vindo(a) à área protegida',
            usuario: req.user
        }
    }

}

