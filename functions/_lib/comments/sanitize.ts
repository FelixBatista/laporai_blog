import { COMMENT_WEBSITE_MAX_LENGTH } from './config';

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function sanitizeName(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

export function sanitizeCommentText(value: string): string {
  return value
    .replace(/\r\n?/g, '\n')
    .replace(/[^\S\n]+/g, ' ')
    .trim();
}

export function renderSanitizedCommentHtml(commentText: string): string {
  const escaped = escapeHtml(sanitizeCommentText(commentText));
  if (!escaped) return '';
  const paragraphs = escaped
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => `<p>${part.replace(/\n/g, '<br />')}</p>`);
  return paragraphs.join('');
}

export function sanitizeWebsiteUrl(value: string): string | null {
  const raw = value.trim();
  if (!raw) return null;
  if (raw.length > COMMENT_WEBSITE_MAX_LENGTH) return null;

  let parsed: URL;
  try {
    parsed = new URL(raw.startsWith('http://') || raw.startsWith('https://') ? raw : `https://${raw}`);
  } catch {
    return null;
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return null;
  }
  return parsed.toString();
}
