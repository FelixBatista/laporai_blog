-- Newsletter system schema for Cloudflare D1

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'unsubscribed', 'bounced', 'complained')),
  source TEXT,
  resend_contact_id TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  confirmed_at TEXT,
  unsubscribed_at TEXT,
  last_event_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status ON newsletter_subscribers(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_created_at ON newsletter_subscribers(created_at);

CREATE TABLE IF NOT EXISTS newsletter_tokens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subscriber_id INTEGER NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('confirm', 'unsubscribe')),
  expires_at TEXT NOT NULL,
  used_at TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (subscriber_id) REFERENCES newsletter_subscribers(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_newsletter_tokens_lookup ON newsletter_tokens(token_hash, type);
CREATE INDEX IF NOT EXISTS idx_newsletter_tokens_subscriber ON newsletter_tokens(subscriber_id, type);

CREATE TABLE IF NOT EXISTS newsletter_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subscriber_id INTEGER,
  provider TEXT NOT NULL,
  event_type TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (subscriber_id) REFERENCES newsletter_subscribers(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_newsletter_events_subscriber ON newsletter_events(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_newsletter_events_type ON newsletter_events(event_type);
CREATE INDEX IF NOT EXISTS idx_newsletter_events_created_at ON newsletter_events(created_at);

CREATE TABLE IF NOT EXISTS newsletter_campaigns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subject TEXT NOT NULL,
  html_body TEXT NOT NULL,
  text_body TEXT,
  provider TEXT NOT NULL DEFAULT 'resend',
  provider_message_id TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'queued', 'sent', 'failed')),
  recipient_count INTEGER NOT NULL DEFAULT 0,
  error_message TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  sent_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_newsletter_campaigns_status ON newsletter_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_campaigns_created_at ON newsletter_campaigns(created_at);

CREATE TABLE IF NOT EXISTS newsletter_rate_limits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  scope TEXT NOT NULL,
  key TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_newsletter_rate_limits_lookup ON newsletter_rate_limits(scope, key, created_at);
