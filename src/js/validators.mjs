export function validateRequired(value, fieldName) {
  return (!value || !value.trim()) ? `${fieldName} es obligatorio.` : null;
}

export function validatePhone(phone) {
  const phoneRegex = /^\+?[1-9]\d{6,14}$/;
  return phoneRegex.test(phone.trim()) ? null : 'Formato de teléfono inválido. Ej: +541112345678';
}

export function validateDateNotFuture(dateStr) {
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date > today ? 'La fecha no puede ser futura.' : null;
}

export function validateClientFormData(name, phone) {
  const errors = {};
  const errName = validateRequired(name, 'Nombre');
  if (errName) errors.name = errName;
  const errPhone = validateRequired(phone, 'Teléfono') || validatePhone(phone);
  if (errPhone) errors.phone = errPhone;
  return errors;
}

export function validateServiceFormData(type, date, notes) {
  const errors = {};
  if (!type) errors.type = 'Tipo de servicio es obligatorio.';
  const errDate = validateRequired(date, 'Fecha') || validateDateNotFuture(date);
  if (errDate) errors.date = errDate;
  return errors;
}