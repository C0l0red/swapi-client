import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({ baseURL: 'https://swapi.py4e.com/api/' })],
  providers: [FilmsService],
  controllers: [FilmsController],
  exports: [FilmsService],
})
export class FilmsModule {}
