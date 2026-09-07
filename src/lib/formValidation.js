export function isValidEmail(email) {
  const value = email?.trim() ?? '';
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value);
}

export function normalizePhone(phone) {
  const trimmed = phone?.trim() ?? '';
  if (!trimmed) return '';
  const digits = trimmed.replace(/\D/g, '');
  if (trimmed.startsWith('+')) return `+${digits}`;
  return trimmed;
}
