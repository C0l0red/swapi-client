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

@Injectable()
export class FilmsService {
  constructor(private readonly httpService: HttpService) {}

  findAll() {
    return this.httpService.get('films').pipe(
      map((response) => response.data.results),
      map((films) => {
        return films.map((film) => new Film(film)) as Film[];
      }),
    );
  }

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

  getCharacterIds(id: number) {
    return this.findOne(id).pipe(
      map((film) => film.characterUrls),
      map((characterUrls) => {
        return characterUrls.map((characterUrl) => getIdFromUrl(characterUrl));
      }),
    );
  }
}
