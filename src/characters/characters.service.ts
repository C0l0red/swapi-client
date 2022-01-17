import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { combineLatestAll, from, map } from 'rxjs';
import Character from './entities/character.entity';

// Handles Character data using the swapi.py4e.com/people API endpoint
@Injectable()
export class CharactersService {
  constructor(private readonly httpService: HttpService) {}

  // Gets Character Objects for using each of the IDs
  findMany(ids: number[]) {
    return from(ids).pipe(
      map((id) => this.findOne(id)),
      combineLatestAll(),
    );
  }

  // Gets a single Character Object using an ID
  findOne(id: number) {
    return this.httpService.get(`people/${id}`).pipe(
      map((res) => res.data),
      map((character) => new Character(character)),
    );
  }
}
