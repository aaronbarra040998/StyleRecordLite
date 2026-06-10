/**
 * Servicio de validación de números telefónicos usando Numverify.
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
  console.warn("VITE_NUMVERIFY_KEY no está definida. La validación telefónica fallará.");
}

export async function validatePhone(phoneNumber) {
  if (!API_KEY) {
    throw new ServiceError("Clave de API no configurada. Contacta al administrador.");
  }

  const url = `https://apilayer.net/api/validate?access_key=${API_KEY}&number=${encodeURIComponent(phoneNumber)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error de red: ${response.status}`);
    }
    const data = await response.json();
    if (!data.valid) {
      throw new InvalidPhoneError("El número no es válido o no existe.", data);
    }
    return data; // contiene: valid, number, local_format, international_format, country_code, country_name, location, carrier, line_type
  } catch (err) {
    if (err instanceof InvalidPhoneError) throw err;
    if (err instanceof ServiceError) throw err;
    throw new ServiceError("No se pudo conectar con el servicio de validación. Intenta más tarde.");
  }
}
