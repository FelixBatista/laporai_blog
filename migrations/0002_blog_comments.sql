-- Persistent blog comments schema (Cloudflare D1)

CREATE TABLE IF NOT EXISTS blog_comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_slug TEXT NOT NULL,
  post_title TEXT,
  parent_id INTEGER,
  author_name TEXT NOT NULL,
  author_email TEXT,
  author_email_hash TEXT,
  website_url TEXT,
  body_raw TEXT NOT NULL,
  sanitized_body TEXT NOT NULL,
  body_hash TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'spam', 'deleted')),
  source TEXT NOT NULL DEFAULT 'website_post',
  turnstile_passed INTEGER NOT NULL DEFAULT 0,
  ip_hash TEXT,
  user_agent_hash TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  approved_at TEXT,
  deleted_at TEXT,
  FOREIGN KEY (parent_id) REFERENCES blog_comments(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_blog_comments_post_slug ON blog_comments(post_slug);
CREATE INDEX IF NOT EXISTS idx_blog_comments_status ON blog_comments(status);
CREATE INDEX IF NOT EXISTS idx_blog_comments_created_at ON blog_comments(created_at);
CREATE INDEX IF NOT EXISTS idx_blog_comments_post_status_created ON blog_comments(post_slug, status, created_at);
CREATE INDEX IF NOT EXISTS idx_blog_comments_body_hash_created ON blog_comments(post_slug, body_hash, created_at);

CREATE TABLE IF NOT EXISTS blog_comment_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  comment_id INTEGER NOT NULL,
  event_type TEXT NOT NULL,
  actor TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (comment_id) REFERENCES blog_comments(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_blog_comment_events_comment_id ON blog_comment_events(comment_id);
CREATE INDEX IF NOT EXISTS idx_blog_comment_events_type ON blog_comment_events(event_type);
CREATE INDEX IF NOT EXISTS idx_blog_comment_events_created_at ON blog_comment_events(created_at);

CREATE TABLE IF NOT EXISTS blog_comment_reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  comment_id INTEGER NOT NULL,
  reporter_ip_hash TEXT,
  reason TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (comment_id) REFERENCES blog_comments(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_blog_comment_reports_comment_id ON blog_comment_reports(comment_id);

CREATE TABLE IF NOT EXISTS blog_comment_rate_limits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  scope TEXT NOT NULL,
  key TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_blog_comment_rate_limits_lookup
ON blog_comment_rate_limits(scope, key, created_at);
