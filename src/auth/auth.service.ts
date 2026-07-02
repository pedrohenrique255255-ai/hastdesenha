import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { loginDto } from './dto/login.dto';
import { Usuario } from './interface/usuario.interface';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(private readonly databaseService:DatabaseService, private jwtService:JwtService){}

    async login(loginDto:loginDto){
        const {email, senha} = loginDto;
        const resultado = await this.databaseService.query(
            `SELECT id, nome, email, senha FROM usuario WHERE email = ?`, [email]
        );

        // Convertendo o resultado para uma lista de usuários
        const usuarios = resultado as Usuario[];

        // pegamos o primeiro usuário encontrado
        const usuario = usuarios[0];

        // se o email nao existir no banco, retornamos erro
        if (!usuario){
            throw new UnauthorizedException('Email ou senha inválidos')
        }

        // encontrado o email, vamos comparar a senha digitada com hash salvo no banco de dados
        const senhaValida = await compare(senha, usuario.senha);

        // se a senha estiver incorreta, retorna erro
        if(!senhaValida){
            throw new UnauthorizedException('Email ou senha inválidos')
        }

        // playload e a informação que ira dentro do token
        const playload = {
            id: usuario.id,
            email: usuario.email
        }

        // Geramos o token JWT com as informações do playload
        const token = this.jwtService.sign(playload)

        // se chegar até aqui é porque o login deu certo
        return{
            mensagem: 'login realizado com sucesso',
            access_token: token, // token usado para as proximas reuqisicoões
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email:usuario.email
            }
        };
    }
}
