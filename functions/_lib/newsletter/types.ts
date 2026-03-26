export type SubscriberStatus =
  | 'pending'
  | 'confirmed'
  | 'unsubscribed'
  | 'bounced'
  | 'complained';

export type TokenType = 'confirm' | 'unsubscribe';

export interface NewsletterEnv {
  DB: any;
  RESEND_API_KEY?: string;
  RESEND_WEBHOOK_SECRET?: string;
  NEWSLETTER_FROM_EMAIL?: string;
  NEWSLETTER_REPLY_TO?: string;
  NEWSLETTER_BASE_URL?: string;
  NEWSLETTER_AUDIENCE_ID?: string;
  NEWSLETTER_ADMIN_SECRET?: string;
}

export interface SubscriberRecord {
  id: number;
  email: string;
  status: SubscriberStatus;
  source: string | null;
  resend_contact_id: string | null;
  created_at: string;
  updated_at: string;
  confirmed_at: string | null;
  unsubscribed_at: string | null;
  last_event_at: string | null;
}

export interface TokenRecord {
  id: number;
  subscriber_id: number;
  token_hash: string;
  type: TokenType;
  expires_at: string;
  used_at: string | null;
  created_at: string;
}
