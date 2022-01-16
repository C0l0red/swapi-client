import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { FilmsService } from '../../films/films.service';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';

// Validates filmId in path params
@Injectable()
export class ValidateFilmIdGuard implements CanActivate {
  constructor(private readonly filmService: FilmsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const filmId: number = parseInt(request.params.filmId);

    if (isNaN(filmId)) throw new BadRequestException('id is not a number');

    await firstValueFrom(this.filmService.findOne(filmId));

    return true;
  }
}
