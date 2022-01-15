import { Gender } from '../../common/enums/gender.enum';
import { getIdFromUrl } from '../../common/functions/get-id-from-url.function';

export class Character {
  constructor(character: Record<string, any>) {
    this.id = getIdFromUrl(character.url);
    this.name = character.nage;
    this.height = character.height;
    this.mass = character.mass;
    this.gender = character.gender;
    this.url = character.url;
  }

  id: number;
  name: string;
  height: string;
  mass: string;
  gender: Gender;
  url: string;
}
