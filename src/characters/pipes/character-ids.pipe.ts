import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { FilmsService } from '../../films/films.service';
import { Observable } from 'rxjs';

@Injectable()
export class CharacterIdsPipe
  implements PipeTransform<string, Observable<number[]>>
{
  constructor(private readonly filmService: FilmsService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: string, _metadata: ArgumentMetadata): Observable<number[]> {
    const filmId = parseInt(value);
    return this.filmService.getCharacterIds(filmId);
  }
}
