import type { SubscriberRecord, SubscriberStatus, TokenRecord, TokenType } from './types';

export async function findSubscriberByEmail(db: any, email: string): Promise<SubscriberRecord | null> {
  const result = await db
    .prepare(
      `SELECT id, email, status, source, resend_contact_id, created_at, updated_at, confirmed_at, unsubscribed_at, last_event_at
       FROM newsletter_subscribers WHERE email = ? LIMIT 1`
    )
    .bind(email)
    .first();
  return (result as SubscriberRecord | null) ?? null;
}

export async function findSubscriberById(db: any, id: number): Promise<SubscriberRecord | null> {
  const result = await db
    .prepare(
      `SELECT id, email, status, source, resend_contact_id, created_at, updated_at, confirmed_at, unsubscribed_at, last_event_at
       FROM newsletter_subscribers WHERE id = ? LIMIT 1`
    )
    .bind(id)
    .first();
  return (result as SubscriberRecord | null) ?? null;
}

export async function createSubscriber(db: any, email: string, source = 'website'): Promise<number> {
  const createdAt = new Date().toISOString();
  await db
    .prepare(
      `INSERT INTO newsletter_subscribers (
        email, status, source, created_at, updated_at
      ) VALUES (?, 'pending', ?, ?, ?)`
    )
    .bind(email, source, createdAt, createdAt)
    .run();
  const row = await db.prepare('SELECT last_insert_rowid() as id').first();
  return Number((row as { id: number }).id);
}

export async function markSubscriberConfirmed(db: any, subscriberId: number): Promise<void> {
  const now = new Date().toISOString();
  await db
    .prepare(
      `UPDATE newsletter_subscribers
       SET status = 'confirmed',
           confirmed_at = COALESCE(confirmed_at, ?),
           unsubscribed_at = NULL,
           updated_at = ?,
           last_event_at = ?
       WHERE id = ?`
    )
    .bind(now, now, now, subscriberId)
    .run();
}

export async function markSubscriberUnsubscribed(db: any, subscriberId: number): Promise<void> {
  const now = new Date().toISOString();
  await db
    .prepare(
      `UPDATE newsletter_subscribers
       SET status = 'unsubscribed',
           unsubscribed_at = ?,
           updated_at = ?,
           last_event_at = ?
       WHERE id = ?`
    )
    .bind(now, now, now, subscriberId)
    .run();
}

export async function updateSubscriberStatus(db: any, subscriberId: number, status: SubscriberStatus): Promise<void> {
  const now = new Date().toISOString();
  await db
    .prepare(
      `UPDATE newsletter_subscribers
       SET status = ?,
           updated_at = ?,
           last_event_at = ?,
           unsubscribed_at = CASE WHEN ? = 'unsubscribed' THEN COALESCE(unsubscribed_at, ?) ELSE unsubscribed_at END
       WHERE id = ?`
    )
    .bind(status, now, now, status, now, subscriberId)
    .run();
}

export async function setSubscriberResendContactId(db: any, subscriberId: number, contactId: string): Promise<void> {
  const now = new Date().toISOString();
  await db
    .prepare(
      `UPDATE newsletter_subscribers
       SET resend_contact_id = ?, updated_at = ?
       WHERE id = ?`
    )
    .bind(contactId, now, subscriberId)
    .run();
}

export async function invalidateActiveTokens(db: any, subscriberId: number, type: TokenType): Promise<void> {
  const now = new Date().toISOString();
  await db
    .prepare(
      `UPDATE newsletter_tokens
       SET used_at = COALESCE(used_at, ?)
       WHERE subscriber_id = ? AND type = ? AND used_at IS NULL`
    )
    .bind(now, subscriberId, type)
    .run();
}

export async function createToken(
  db: any,
  subscriberId: number,
  tokenHash: string,
  type: TokenType,
  expiresAtIso: string
): Promise<void> {
  const now = new Date().toISOString();
  await db
    .prepare(
      `INSERT INTO newsletter_tokens (
        subscriber_id, token_hash, type, expires_at, created_at
      ) VALUES (?, ?, ?, ?, ?)`
    )
    .bind(subscriberId, tokenHash, type, expiresAtIso, now)
    .run();
}

export async function findValidTokenByHash(
  db: any,
  tokenHash: string,
  type: TokenType
): Promise<(TokenRecord & { email: string; status: SubscriberStatus }) | null> {
  const now = new Date().toISOString();
  const result = await db
    .prepare(
      `SELECT
         t.id,
         t.subscriber_id,
         t.token_hash,
         t.type,
         t.expires_at,
         t.used_at,
         t.created_at,
         s.email,
         s.status
       FROM newsletter_tokens t
       JOIN newsletter_subscribers s ON s.id = t.subscriber_id
       WHERE t.token_hash = ?
         AND t.type = ?
         AND t.used_at IS NULL
         AND t.expires_at > ?
       LIMIT 1`
    )
    .bind(tokenHash, type, now)
    .first();
  return (result as (TokenRecord & { email: string; status: SubscriberStatus }) | null) ?? null;
}

export async function markTokenUsed(db: any, tokenId: number): Promise<void> {
  const now = new Date().toISOString();
  await db
    .prepare(`UPDATE newsletter_tokens SET used_at = COALESCE(used_at, ?) WHERE id = ?`)
    .bind(now, tokenId)
    .run();
}

export async function getRecentActiveToken(
  db: any,
  subscriberId: number,
  type: TokenType
): Promise<TokenRecord | null> {
  const now = new Date().toISOString();
  const row = await db
    .prepare(
      `SELECT id, subscriber_id, token_hash, type, expires_at, used_at, created_at
       FROM newsletter_tokens
       WHERE subscriber_id = ? AND type = ? AND used_at IS NULL AND expires_at > ?
       ORDER BY created_at DESC
       LIMIT 1`
    )
    .bind(subscriberId, type, now)
    .first();
  return (row as TokenRecord | null) ?? null;
}

export async function logEvent(
  db: any,
  eventType: string,
  payload: unknown,
  subscriberId: number | null = null,
  provider = 'resend'
): Promise<void> {
  const now = new Date().toISOString();
  await db
    .prepare(
      `INSERT INTO newsletter_events (
        subscriber_id, provider, event_type, payload_json, created_at
      ) VALUES (?, ?, ?, ?, ?)`
    )
    .bind(subscriberId, provider, eventType, JSON.stringify(payload), now)
    .run();
}

export async function createCampaign(
  db: any,
  subject: string,
  htmlBody: string,
  textBody: string | null
): Promise<number> {
  const now = new Date().toISOString();
  await db
    .prepare(
      `INSERT INTO newsletter_campaigns (
        subject, html_body, text_body, provider, status, created_at, updated_at
      ) VALUES (?, ?, ?, 'resend', 'draft', ?, ?)`
    )
    .bind(subject, htmlBody, textBody, now, now)
    .run();
  const row = await db.prepare('SELECT last_insert_rowid() as id').first();
  return Number((row as { id: number }).id);
}

export async function markCampaignSent(
  db: any,
  campaignId: number,
  providerMessageId: string | null,
  recipientCount: number
): Promise<void> {
  const now = new Date().toISOString();
  await db
    .prepare(
      `UPDATE newsletter_campaigns
       SET status = 'sent',
           provider_message_id = ?,
           recipient_count = ?,
           sent_at = ?,
           updated_at = ?
       WHERE id = ?`
    )
    .bind(providerMessageId, recipientCount, now, now, campaignId)
    .run();
}

export async function markCampaignFailed(db: any, campaignId: number, errorMessage: string): Promise<void> {
  const now = new Date().toISOString();
  await db
    .prepare(
      `UPDATE newsletter_campaigns
       SET status = 'failed',
           error_message = ?,
           updated_at = ?
       WHERE id = ?`
    )
    .bind(errorMessage.slice(0, 2000), now, campaignId)
    .run();
}

export async function countConfirmedSubscribers(db: any): Promise<number> {
  const row = await db
    .prepare(
      `SELECT COUNT(*) as count
       FROM newsletter_subscribers
       WHERE status = 'confirmed'`
    )
    .first();
  return Number((row as { count: number }).count ?? 0);
}

export async function listConfirmedSubscriberEmails(db: any): Promise<string[]> {
  const result = await db
    .prepare(
      `SELECT email
       FROM newsletter_subscribers
       WHERE status = 'confirmed'
       ORDER BY created_at ASC`
    )
    .all();
  const rows = ((result as { results?: Array<{ email: string }> }).results ?? []).map((row) => row.email);
  return rows;
}

export async function listConfirmedSubscribers(
  db: any
): Promise<Array<{ id: number; email: string; resend_contact_id: string | null }>> {
  const result = await db
    .prepare(
      `SELECT id, email, resend_contact_id
       FROM newsletter_subscribers
       WHERE status = 'confirmed'
       ORDER BY created_at ASC`
    )
    .all();
  return ((
    result as { results?: Array<{ id: number; email: string; resend_contact_id: string | null }> }
  ).results ?? []);
}

export async function findSubscriberByEmailForEvents(db: any, email: string): Promise<SubscriberRecord | null> {
  return findSubscriberByEmail(db, email.toLowerCase());
}
