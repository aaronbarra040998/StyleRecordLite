// Genera una URL de imagen placeholder de Lorem Picsum.
// Si no se proporciona seed, se genera una aleatoria (diferente cada vez).
export function getPlaceholderImage(width = 300, height = 200, seed = null) {
  const seedPart = seed ? `seed/${seed}/` : "";
  return `https://picsum.photos/${seedPart}${width}/${height}`;
}

// Genera un trío de URLs (antes, después frontal, después lateral) con seeds diferentes.
export function getBeforeAfterPlaceholders() {
  const beforeSeed = Math.random().toString(36).substring(2, 10);
  const frontalSeed = Math.random().toString(36).substring(2, 10);
  const lateralSeed = Math.random().toString(36).substring(2, 10);
  return {
    beforeImg: getPlaceholderImage(300, 200, beforeSeed),
    afterImg: getPlaceholderImage(300, 200, frontalSeed),
    afterLateralImg: getPlaceholderImage(300, 200, lateralSeed),
  };
}