import { Gender } from '../../common/enums/gender.enum';
import { getIdFromUrl } from '../../common/functions/get-id-from-url.function';

// Character Entity
export default class Character {
  // Creates a Character Entity from a People object from the API
  constructor(character: Record<string, any>) {
    this.id = getIdFromUrl(character.url);
    this.name = character.name;
    this.height = parseInt(character.height);
    this.mass = parseInt(character.mass);
    this.gender = character.gender;
    this.url = character.url;
  }

  id: number;
  name: string;
  height: number;
  mass: number;
  gender: Gender;
  url: string;
}
