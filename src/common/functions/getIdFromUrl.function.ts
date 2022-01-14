import { idFromUrlPattern } from '../constants';

export function getIdFromUrl(entity): number {
  const id = parseInt(entity.url.match(idFromUrlPattern)[0]);

  if (isNaN(id)) {
    throw new Error('Error getting Id from URL');
  }

  return id;
}
