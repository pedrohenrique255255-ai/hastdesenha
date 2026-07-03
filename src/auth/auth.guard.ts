// CanActivate -> interface que define se uma requisição pode ou não continuar
// ExecutionContext -> permite acessar informações da requisição, resposta e outros dados
// Injectable -> indica que essa classe pode ser injetada pelo sistema de dependecias
// UnauthorizedException -> exeção ultilizada para retornar o erro 401 (não autorizado)

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";


@Injectable()
export class AuthGuard implements CanActivate { 
    constructor(private jwtService:JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extrairToken(request);

        if (!token) {
            throw new UnauthorizedException('Token não informado');
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET
            });
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException('Token inválido');
        }
        return true;
    }
    private extrairToken(request: Request): string | undefined {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return undefined;
        }
        const [tipo, token] = authHeader.split(' ');
        return tipo === 'Bearer' ? token : undefined;

    }
}