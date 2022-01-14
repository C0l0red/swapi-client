import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { Film } from './entities/film.entity';
import { idFromUrlPattern } from '../common/constants';

@Injectable()
export class FilmsService {
  constructor(private readonly httpService: HttpService) {}

  findAll() {
    return this.httpService
      .get(`films`)
      .pipe(map((res) => res.data.results))
      .pipe(
        map((films) => {
          return films.flatMap((film) => new Film(film));
        }),
      );
  }

  findOne(id: number) {
    return this.httpService.get(`films/${id}`).pipe(
      map((res) => res.data),
      map((film) => new Film(film)),
    );
  }

  getCharacterIds(id: number): Observable<number[]> {
    return this.httpService.get(`films/${id}`).pipe(
      map((res) => res.data),
      map((film) => film.characters as string[]),
      map((characters) => {
        return characters.flatMap((character) =>
          parseInt(character.match(idFromUrlPattern)[0]),
        );
      }),
    );
  }
}
