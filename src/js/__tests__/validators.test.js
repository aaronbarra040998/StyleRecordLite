import { describe, it, expect } from 'vitest';
import { validateRequired, validatePhone, validateDateNotFuture } from '../validators.mjs';

describe('validators', () => {
  it('validateRequired fails for empty string', () => {
    expect(validateRequired('', 'Campo')).toBeTruthy();
  });
  it('validateRequired passes for non-empty', () => {
    expect(validateRequired('Hola', 'Campo')).toBeNull();
  });
  it('validatePhone rejects invalid format', () => {
    expect(validatePhone('abc')).toBeTruthy();
  });
  it('validatePhone accepts +541112345678', () => {
    expect(validatePhone('+541112345678')).toBeNull();
  });
  it('validateDateNotFuture rejects future date', () => {
    expect(validateDateNotFuture('2099-01-01')).toBeTruthy();
  });
  it('validateDateNotFuture accepts today', () => {
    const today = new Date().toISOString().slice(0,10);
    expect(validateDateNotFuture(today)).toBeNull();
  });
});