export const COMMENT_LIMIT_DEFAULT = 20;
export const COMMENT_LIMIT_MAX = 50;
export const COMMENT_NAME_MAX_LENGTH = 80;
export const COMMENT_EMAIL_MAX_LENGTH = 254;
export const COMMENT_WEBSITE_MAX_LENGTH = 500;
export const COMMENT_BODY_MAX_LENGTH = 5000;
export const COMMENT_SLUG_MAX_LENGTH = 160;
export const COMMENT_TITLE_MAX_LENGTH = 220;
export const COMMENT_SOURCE_MAX_LENGTH = 80;

export const RATE_LIMIT_WINDOW_SECONDS = 10 * 60;
export const RATE_LIMIT_MAX_PER_IP = 5;
export const RATE_LIMIT_MAX_PER_FINGERPRINT = 3;

export const DUPLICATE_WINDOW_SECONDS = 15 * 60;
export const DUPLICATE_SPAM_THRESHOLD = 2;

export function toBool(value: string | undefined, fallback = false): boolean {
  if (value == null) return fallback;
  const normalized = value.trim().toLowerCase();
  return normalized === '1' || normalized === 'true' || normalized === 'yes' || normalized === 'on';
}
