import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';
import { FilmsService } from '../../films/films.service';

// Ensures that the filmId in the path param exists, and gets it's character Ids
@Injectable()
export class EnsureCharacterIdsGuard implements CanActivate {
  constructor(private readonly filmService: FilmsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const filmId: number = parseInt(request.params.filmId);
    const characterIds = await firstValueFrom(
      this.filmService.getCharacterIds(filmId),
    );

    request.params.characterIds = characterIds.toString();

    return true;
  }
}
