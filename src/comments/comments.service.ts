import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { CommentDto } from './dto/comment.dto';

// Handles Comment data using the Comment Repository
@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  // Creates a Comment
  create(commentDto: CommentDto) {
    const comment: Comment = this.commentRepository.create(commentDto);
    return this.commentRepository.save(comment);
  }

  // Makes a Query to get comments with a filmId in descending order of their
  // created date
  findMany(filmId: number) {
    return this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.film_id = :filmId', { filmId })
      .orderBy('comment.created', 'DESC')
      .getMany();
  }

  // Gets comment count for a Film
  getCountForFilm(filmId: number) {
    return this.commentRepository.count({ filmId: filmId });
  }
}
