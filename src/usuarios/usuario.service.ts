import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { hash } from 'bcrypt';

@Injectable()
    export class UsuarioService{
        constructor(private readonly databaseService:DatabaseService){}

        async criar(CreateUsuarioDto:CreateUsuarioDto){
            const {nome, email, senha} = CreateUsuarioDto;

            const senhaHash = await hash(senha, 10);

            const sql = `INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)`;
            await this.databaseService.query(sql, [nome, email, senhaHash]);
            return{
                mensagem: 'Usuário cadastrado com sucesso!'
            };
        }
    }

