/**
 * Simple authentication (professional / client) using localStorage.
 * @module auth
 */

const ROLE_KEY = "sr-role";
const PROFESSIONAL_CODE = "1234";

export function loginAsProfessional(code) {
  if (code === PROFESSIONAL_CODE) {
    try {
      localStorage.setItem(ROLE_KEY, "professional");
      return true;
    } catch (error) {
      console.error("Error saving role:", error);
      return false;
    }
  }
  return false;
}

export function loginAsClient(phone) {
  try {
    localStorage.setItem(ROLE_KEY, "client");
    localStorage.setItem("sr-client-phone", phone);
  } catch (error) {
    console.error("Error saving client role:", error);
  }
}

export function getRole() {
  try {
    return localStorage.getItem(ROLE_KEY);
  } catch (error) {
    console.error("Error reading role:", error);
    return null;
  }
}

export function logout() {
  try {
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem("sr-client-phone");
  } catch (error) {
    console.error("Error logging out:", error);
  }
}

export function isAuthenticated() {
  return getRole() !== null;
}