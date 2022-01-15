import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { combineLatestAll, from, map } from 'rxjs';
import { Character } from './entities/character.entity';

@Injectable()
export class CharactersService {
  constructor(private readonly httpService: HttpService) {}

  findMany(ids: number[]) {
    return from(ids).pipe(
      map((id) => this.findOne(id)),
      combineLatestAll(),
    );
  }

  findOne(id: number) {
    return this.httpService.get(`people/${id}`).pipe(
      map((res) => res.data),
      map((character) => new Character(character)),
    );
  }
}
