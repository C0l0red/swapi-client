import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { HttpModule } from '@nestjs/axios';
import { FilmsModule } from '../films/films.module';

@Module({
  imports: [
    HttpModule.register({ baseURL: 'https://swapi.py4e.com/api' }),
    FilmsModule,
  ],
  providers: [CharactersService],
  controllers: [CharactersController],
})
export class CharactersModule {}
