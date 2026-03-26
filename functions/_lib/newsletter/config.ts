import type { NewsletterEnv } from './types';

export function getBaseUrl(env: NewsletterEnv, requestUrl?: string): string {
  if (env.NEWSLETTER_BASE_URL && env.NEWSLETTER_BASE_URL.trim() !== '') {
    return env.NEWSLETTER_BASE_URL.replace(/\/+$/, '');
  }
  if (requestUrl) {
    const url = new URL(requestUrl);
    return `${url.protocol}//${url.host}`;
  }
  return 'http://localhost:8788';
}

export function requireResendConfig(env: NewsletterEnv): string | null {
  if (!env.RESEND_API_KEY) return 'RESEND_API_KEY is missing';
  if (!env.NEWSLETTER_FROM_EMAIL) return 'NEWSLETTER_FROM_EMAIL is missing';
  return null;
}
