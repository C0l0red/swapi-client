import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

// Asserts that the characterId in the path param exists in the Film with filmId
@Injectable()
export class AssertCharacterInFilmGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const characterId: string = request.params.id;

    const characterIsInFilm = request.params.characterIds
      .split(',')
      .includes(characterId);

    if (!characterIsInFilm) {
      throw new BadRequestException('Character is not in film');
    }

    return true;
  }
}
