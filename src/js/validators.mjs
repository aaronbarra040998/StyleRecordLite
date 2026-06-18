/**
 * General form validation utilities.
 */

export function validateRequired(value, fieldName) {
  return (!value || !value.trim()) ? `${fieldName} is required.` : null;
}

export function validatePhone(phone) {
  const phoneRegex = /^\+?[1-9]\d{6,14}$/;
  return phoneRegex.test(phone.trim()) ? null : 'Invalid phone format. e.g. +541112345678';
}

export function validateDateNotFuture(dateStr) {
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date > today ? 'Date cannot be in the future.' : null;
}

export function validateClientFormData(name, phone) {
  const errors = {};
  const errName = validateRequired(name, 'Name');
  if (errName) errors.name = errName;
  const errPhone = validateRequired(phone, 'Phone') || validatePhone(phone);
  if (errPhone) errors.phone = errPhone;
  return errors;
}

export function validateServiceFormData(type, date, notes) {
  const errors = {};
  if (!type) errors.type = 'Service type is required.';
  const errDate = validateRequired(date, 'Date') || validateDateNotFuture(date);
  if (errDate) errors.date = errDate;
  return errors;
}

// ─── Professional registration validations ───

export function validateProfessionalType(type) {
  return type ? null : 'Select a professional type.';
}

export function validateModality(modality) {
  return modality ? null : 'Select a modality.';
}

export function validateBusinessName(name) {
  if (!name || !name.trim()) return 'Business name is required.';
  return null;
}

export function validateAddress(address) {
  if (!address || !address.trim()) return 'Address is required.';
  return null;
}

export function validateCompanyName(name) {
  if (!name || !name.trim()) return 'Company name is required.';
  return null;
}