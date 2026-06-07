const API_KEY = "c43204c2a5e320e5600d73ce305b6f0d";

export async function validatePhone(phoneNumber) {
  const url = `http://apilayer.net/api/validate?access_key=${API_KEY}&number=${encodeURIComponent(phoneNumber)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error de red: ${response.status}`);
    }
    const data = await response.json();
    if (!data.valid) {
      throw {
        name: "InvalidPhoneError",
        message: "El número no es válido o no existe.",
        details: data
      };
    }
    return data; // contiene: valid, number, local_format, international_format, country_code, country_name, location, carrier, line_type
  } catch (err) {
    if (err.name === "InvalidPhoneError") throw err;
    throw {
      name: "ServiceError",
      message: "No se pudo conectar con el servicio de validación. Intenta más tarde."
    };
  }
}