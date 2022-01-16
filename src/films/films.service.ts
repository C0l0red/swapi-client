import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs';
import { Film } from './entities/film.entity';
import { getIdFromUrl } from '../common/functions/get-id-from-url.function';

// Handles Film data using the swapi.py4e.com/films API endpoint
@Injectable()
export class FilmsService {
  constructor(private readonly httpService: HttpService) {}

  // Gets all Film Objects
  findAll() {
    return this.httpService.get('films').pipe(
      map((response) => response.data.results),
      map((films) => {
        return films.map((film) => new Film(film)) as Film[];
      }),
    );
  }

  // Gets a single Film Object with an ID
  findOne(id: number) {
    return this.httpService.get(`films/${id}`).pipe(
      map((res) => res.data),
      map((film) => new Film(film)),

      catchError((err) => {
        if (err.response?.status == HttpStatus.NOT_FOUND) {
          throw new NotFoundException(`No film with ID ${id} found`);
        }
        throw new HttpException(err.message, HttpStatus.FAILED_DEPENDENCY);
      }),
    );
  }

  // Gets Character IDs for Characters in a Film with an ID
  getCharacterIds(id: number) {
    return this.findOne(id).pipe(
      map((film) => film.characterUrls),
      map((characterUrls) => {
        return characterUrls.map((characterUrl) => getIdFromUrl(characterUrl));
      }),
    );
  }
}
