import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import {SwaggerModule} from 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // permite que o frontend acesse a api
  app.enableCors({
    origin: 'http://127.0.0.1:5500',
    credentials: true
});
  // ativa as validações dos DTOs
  app.useGlobalPipes(new ValidationPipe());


  app.use(
    session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie:{
        maxAge: 1000 * 60 * 10
      }
    })
  )

  const config = new documentBuider()
  .setTitle("API de Autenticação")
  .setDecription("documentação da API com login, jwt e rotas")
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
