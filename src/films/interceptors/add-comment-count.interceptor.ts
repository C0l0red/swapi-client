import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';
import { CommentsService } from '../../comments/comments.service';
import { Film } from '../entities/film.entity';

// Interceptor to add comment count to a Film response Object
@Injectable()
export class AddCommentCountInterceptor implements NestInterceptor {
  constructor(private readonly commentsService: CommentsService) {}

  intercept(context: ExecutionContext, next: CallHandler<Film | Film[]>) {
    const addCommentCount = async (film: Film) => {
      film.commentCount = await this.commentsService.getCountForFilm(film.id);
      return film;
    };
    // Adds comment count in different ways, depending on whether the response is
    // an array or a single Film
    return next.handle().pipe(
      map((response) => {
        if (response instanceof Array) {
          const promises = response.map(addCommentCount);
          return Promise.all(promises);
        } else {
          return addCommentCount(response).then((film) => film);
        }
      }),
    );
  }
}
