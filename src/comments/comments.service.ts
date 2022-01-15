import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  create(commentDto: CommentDto) {
    const comment: Comment = this.commentRepository.create(commentDto);
    return this.commentRepository.save(comment);
  }

  findMany(filmId: number) {
    return this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.film_id = :filmId', { filmId })
      .orderBy('comment.created', 'DESC')
      .getMany();
  }

  getCountForFilm(filmId: number) {
    return this.commentRepository.count({ filmId: filmId });
  }
}
