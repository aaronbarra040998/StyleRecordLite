/**
 * Phone number validation service using Numverify.
 * @module numverifyService
 */

export class InvalidPhoneError extends Error {
  constructor(message, details) {
    super(message);
    this.name = "InvalidPhoneError";
    this.details = details;
  }
}

export class ServiceError extends Error {
  constructor(message) {
    super(message);
    this.name = "ServiceError";
  }
}

const API_KEY = import.meta.env.VITE_NUMVERIFY_KEY;

if (!API_KEY) {
  console.warn("VITE_NUMVERIFY_KEY is not defined. Phone validation will fail.");
}

export async function validatePhone(phoneNumber) {
  if (!API_KEY) {
    throw new ServiceError("API key not configured. Contact the administrator.");
  }

  const url = `https://apilayer.net/api/validate?access_key=${API_KEY}&number=${encodeURIComponent(phoneNumber)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network error: ${response.status}`);
    }
    const data = await response.json();
    if (!data.valid) {
      throw new InvalidPhoneError("The number is not valid or does not exist.", data);
    }
    return data; // contains: valid, number, local_format, international_format, country_code, country_name, location, carrier, line_type
  } catch (err) {
    if (err instanceof InvalidPhoneError) throw err;
    if (err instanceof ServiceError) throw err;
    throw new ServiceError("Could not connect to the validation service. Try again later.");
  }
}