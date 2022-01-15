const idFromUrlPattern = /(?<=\/)(?<id>\d+)/;

export function getIdFromUrl(url: string): number {
  const id = parseInt(url.match(idFromUrlPattern)?.groups?.id);

  if (isNaN(id)) {
    throw new Error('Error getting Id from URL');
  }

  return id;
}
