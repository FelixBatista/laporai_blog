export type CommentStatus = 'pending' | 'approved' | 'rejected' | 'spam' | 'deleted';

export interface CommentsEnv {
  DB: any;
  TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  COMMENTS_ADMIN_SECRET?: string;
  COMMENTS_BASE_URL?: string;
  COMMENTS_AUTO_APPROVE?: string;
}

export interface PublicCommentRecord {
  id: number;
  post_slug: string;
  author_name: string;
  website_url: string | null;
  sanitized_body: string;
  created_at: string;
}

export interface AdminCommentRecord {
  id: number;
  post_slug: string;
  post_title: string | null;
  parent_id: number | null;
  author_name: string;
  author_email: string | null;
  author_email_hash: string | null;
  website_url: string | null;
  body_raw: string;
  sanitized_body: string;
  status: CommentStatus;
  source: string | null;
  turnstile_passed: number;
  ip_hash: string | null;
  user_agent_hash: string | null;
  created_at: string;
  updated_at: string;
  approved_at: string | null;
  deleted_at: string | null;
}
