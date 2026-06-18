const TEMP_LINKS_KEY = "sr-temp-links";

export function loadTempLinks() {
  try {
    const data = localStorage.getItem(TEMP_LINKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading temporary links:", error);
    return [];
  }
}

export function saveTempLinks(links) {
  try {
    localStorage.setItem(TEMP_LINKS_KEY, JSON.stringify(links));
    return true;
  } catch (error) {
    console.error("Error saving temporary links:", error);
    return false;
  }
}

export function generateShareToken(clientId) {
  const token = 'tok_' + (crypto.randomUUID ? crypto.randomUUID() : 
    (Date.now().toString(36) + Math.random().toString(36).substr(2, 9)));
  const links = loadTempLinks();
  links.push({
    token,
    clientId,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000,
  });
  saveTempLinks(links);
  return token;
}

export function validateShareToken(token) {
  const links = loadTempLinks();
  const entry = links.find(l => l.token === token);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    const updated = links.filter(l => l.token !== token);
    saveTempLinks(updated);
    return null;
  }
  return entry.clientId;
}

export function cleanExpiredTokens() {
  const links = loadTempLinks();
  const valid = links.filter(l => Date.now() <= l.expiresAt);
  saveTempLinks(valid);
}