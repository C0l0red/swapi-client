import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { FilmsModule } from '../films/films.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), FilmsModule],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
