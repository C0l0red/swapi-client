import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');

  const config = new DocumentBuilder()
    .setTitle('SWAPI Client')
    .setDescription(
      `The SWAPI NestJS Client bare requirements Swagger Documentation.  
    PS: This Swagger documentation doesn't utilize the full power of the API, just bare the requirements from the
    project.    
    For the full experience as documented on [Gitbook](https://blaizepaschal.gitbook.io/swapi-client-1/),
    please, use an API Client tester, such as Postman or Insomnia.  
    Thanks!`,
    )
    .setVersion('1.0')
    .addTag('films')
    .addTag('characters')
    .addTag('comments')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(process.env['PORT'] || 3000);
}
bootstrap();
