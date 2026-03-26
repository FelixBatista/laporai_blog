export interface PublicComment {
  id: number;
  author_name: string;
  website_url: string | null;
  body_html: string;
  created_at: string;
}

export interface ListCommentsResponse {
  ok: boolean;
  status: string;
  comments: PublicComment[];
  total_approved: number;
  next_cursor: string | null;
  turnstile_site_key: string;
}

export type SubmitCommentUiStatus =
  | 'idle'
  | 'loading'
  | 'success'
  | 'validation_error'
  | 'pending_moderation'
  | 'error';

export interface SubmitCommentResponse {
  ok: boolean;
  status: string;
  message: string;
  comment_id?: number;
}

export type AdminModerationAction = 'approve' | 'reject' | 'spam' | 'delete';

export type AdminCommentStatus = 'pending' | 'approved' | 'rejected' | 'spam' | 'deleted';

export interface AdminComment {
  id: number;
  post_slug: string;
  post_title: string | null;
  parent_id: number | null;
  author_name: string;
  author_email: string | null;
  website_url: string | null;
  body_raw: string;
  sanitized_body: string;
  status: AdminCommentStatus;
  source: string | null;
  turnstile_passed: number;
  ip_hash: string | null;
  user_agent_hash: string | null;
  created_at: string;
  updated_at: string;
  approved_at: string | null;
  deleted_at: string | null;
}

export interface AdminListResponse {
  ok: boolean;
  status: string;
  comments: AdminComment[];
  next_cursor: string | null;
}
