const SIMPLE_EMAIL_REGEX =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function isLikelyValidEmail(value: string): boolean {
  if (value.length < 6 || value.length > 320) return false;
  if (!SIMPLE_EMAIL_REGEX.test(value)) return false;
  if (value.includes('..')) return false;
  return true;
}
