// Generates a Lorem Picsum placeholder image URL.
// If no seed is provided, a random one is generated (different each time).
export function getPlaceholderImage(width = 300, height = 200, seed = null) {
  const seedPart = seed ? `seed/${seed}/` : "";
  return `https://picsum.photos/${seedPart}${width}/${height}`;
}

// Generates a trio of URLs (before, after front, after side) with different seeds.
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