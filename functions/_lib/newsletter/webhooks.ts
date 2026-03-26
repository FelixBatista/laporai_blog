import { hmacSha256Base64, normalizeWebhookSecret } from './crypto';

export interface NormalizedResendEvent {
  eventType: string;
  email: string | null;
  providerMessageId: string | null;
  raw: unknown;
}

function extractSignatureCandidates(signatureHeader: string): string[] {
  return signatureHeader
    .split(' ')
    .join(',')
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const eqIndex = part.indexOf('=');
      if (eqIndex >= 0) return part.slice(eqIndex + 1);
      return part;
    });
}

export async function verifyResendWebhookSignature(
  secret: string,
  headers: Headers,
  bodyText: string
): Promise<boolean> {
  const normalizedSecret = normalizeWebhookSecret(secret);
  const id =
    headers.get('svix-id') ||
    headers.get('webhook-id') ||
    headers.get('x-webhook-id');
  const timestamp =
    headers.get('svix-timestamp') ||
    headers.get('webhook-timestamp') ||
    headers.get('x-webhook-timestamp');
  const signatureHeader =
    headers.get('svix-signature') ||
    headers.get('webhook-signature') ||
    headers.get('x-webhook-signature') ||
    headers.get('resend-signature');

  if (!id || !timestamp || !signatureHeader) return false;

  const signedContent = `${id}.${timestamp}.${bodyText}`;
  const expected = await hmacSha256Base64(normalizedSecret, signedContent);
  const candidates = extractSignatureCandidates(signatureHeader);
  return candidates.some((candidate) => candidate === expected);
}

export function normalizeResendEvent(payload: any): NormalizedResendEvent {
  const eventType = String(payload?.type ?? payload?.event ?? 'unknown');
  const email =
    payload?.data?.to ??
    payload?.data?.email ??
    payload?.to ??
    payload?.email ??
    null;

  const providerMessageId =
    payload?.data?.email_id ??
    payload?.data?.id ??
    payload?.email_id ??
    payload?.id ??
    null;

  return {
    eventType,
    email: typeof email === 'string' ? email : null,
    providerMessageId: typeof providerMessageId === 'string' ? providerMessageId : null,
    raw: payload,
  };
}

export function mapWebhookEventToStatus(eventType: string): 'bounced' | 'complained' | 'unsubscribed' | null {
  const normalized = eventType.toLowerCase();
  if (normalized.includes('bounce')) return 'bounced';
  if (normalized.includes('complain')) return 'complained';
  if (normalized.includes('unsubscribe')) return 'unsubscribed';
  return null;
}
