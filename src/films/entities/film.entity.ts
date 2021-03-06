import { getIdFromUrl } from '../../common/functions/get-id-from-url.function';
import { Exclude } from 'class-transformer';

// Film Entity
export class Film {
  // Creates a Film Object from a Film Object from the API
  constructor(film: Record<string, any>) {
    this.id = getIdFromUrl(film.url);
    this.title = film.title;
    this.episodeId = film.episode_id;
    this.openingCrawl = film.opening_crawl;
    this.director = film.director;
    this.producer = film.producer;
    this.releaseDate = film.release_date;
    this.characterUrls = film.characters;
    this.url = film.url;
  }

  id: number;
  title: string;
  episodeId: number;
  openingCrawl: string;
  director: string;
  producer: string;
  releaseDate: Date;
  commentCount: number;
  url: string;

  // Excludes characterUrls from responses
  @Exclude()
  characterUrls?: string[];
}
