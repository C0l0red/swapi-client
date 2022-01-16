import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { FilmsModule } from './films/films.module';
import { CommonModule } from './common/common.module';
import { CharactersModule } from './characters/characters.module';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

// Module for the Application
@Module({
  imports: [
    FilmsModule,
    CommonModule,
    CharactersModule,
    CommentsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: ConfigService,
    }),
    ConfigModule,
  ],
  providers: [
    { provide: APP_PIPE, useClass: ValidationPipe },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AppModule {}
