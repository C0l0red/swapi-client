// Regex pattern to extract ID from a URL
const idFromUrlPattern = /(?<=\/)(?<id>\d+)/;

// Function to get an ID from a URL
export function getIdFromUrl(url: string): number {
  const id = parseInt(url.match(idFromUrlPattern)?.groups?.id);

  if (isNaN(id)) {
    throw new Error('Error getting Id from URL');
  }

  return id;
}
