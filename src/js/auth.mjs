const ROLE_KEY = "sr-role";
const PROFESSIONAL_CODE = "1234";

export function loginAsProfessional(code) {
  if (code === PROFESSIONAL_CODE) {
    localStorage.setItem(ROLE_KEY, "professional");
    return true;
  }
  return false;
}

export function loginAsClient(phone) {
  // Simplemente guardamos el rol y el teléfono
  localStorage.setItem(ROLE_KEY, "client");
  localStorage.setItem("sr-client-phone", phone);
}

export function getRole() {
  return localStorage.getItem(ROLE_KEY);
}

export function logout() {
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem("sr-client-phone");
}

export function isAuthenticated() {
  return getRole() !== null;
}