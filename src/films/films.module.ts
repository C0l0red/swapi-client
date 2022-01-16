import { forwardRef, Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { HttpModule } from '@nestjs/axios';
import { CommentsModule } from '../comments/comments.module';

// Module for Film operations
@Module({
  imports: [
    forwardRef(() => CommentsModule),
    HttpModule.register({ baseURL: 'https://swapi.py4e.com/api/' }),
  ],
  providers: [FilmsService],
  controllers: [FilmsController],
  exports: [FilmsService],
})
export class FilmsModule {}
