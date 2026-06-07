// Genera una URL de imagen placeholder de Lorem Picsum.
// Si no se proporciona seed, se genera una aleatoria (diferente cada vez).
export function getPlaceholderImage(width = 300, height = 200, seed = null) {
  const seedPart = seed ? `seed/${seed}/` : "";
  return `https://picsum.photos/${seedPart}${width}/${height}`;
}

// Genera un par de URLs (antes/después) con seeds diferentes para simular cambio.
export function getBeforeAfterPlaceholders() {
  const beforeSeed = Math.random().toString(36).substring(2, 10);
  const afterSeed = Math.random().toString(36).substring(2, 10);
  return {
    before: getPlaceholderImage(300, 200, beforeSeed),
    after: getPlaceholderImage(300, 200, afterSeed),
  };
}