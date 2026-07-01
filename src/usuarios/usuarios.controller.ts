import { Controller, Body, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
    // injetamos o usuariosService para acessar a regra de cadastro
    constructor(private readonly usuariosService:UsuarioService){}

    // requisição do tipo post para a rota usuarios
    @Post()
    criar(@Body() CreateUsuarioDto:CreateUsuarioDto){
        return this.usuariosService.criar(CreateUsuarioDto);
    }
}
