import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { combineLatestAll, from, map } from 'rxjs';
import { Character } from './entities/character.entity';

@Injectable()
export class CharactersService {
  constructor(private readonly httpService: HttpService) {}

  findMany(ids: number[]) {
    return from(ids)
      .pipe(map((id) => this.findOne(id)))
      .pipe(combineLatestAll())
      .pipe(
        map((characters) => {
          return characters.sort((a, b) => b.id - a.id);
        }),
      );
  }

  findOne(id: number) {
    return this.httpService
      .get(`people/${id}`)
      .pipe(map((res) => res.data))
      .pipe(map((character) => new Character(character)));
  }
}
