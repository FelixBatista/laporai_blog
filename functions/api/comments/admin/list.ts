import { requireCommentsAdminAuth } from '../../../_lib/comments/auth';
import { COMMENT_LIMIT_DEFAULT, COMMENT_LIMIT_MAX } from '../../../_lib/comments/config';
import { listAdminComments } from '../../../_lib/comments/repository';
import { badMethod, jsonResponse } from '../../../_lib/comments/responses';
import type { CommentStatus, CommentsEnv } from '../../../_lib/comments/types';

const ALLOWED_STATUSES: Array<CommentStatus | 'all'> = ['pending', 'approved', 'rejected', 'spam', 'deleted', 'all'];

export const onRequestGet = async (context: any): Promise<Response> => {
  const env = context.env as CommentsEnv;
  const unauthorized = requireCommentsAdminAuth(context.request, env);
  if (unauthorized) return unauthorized;

  const url = new URL(context.request.url);
  const statusCandidate = (url.searchParams.get('status') ?? 'pending').trim().toLowerCase() as CommentStatus | 'all';
  const status = ALLOWED_STATUSES.includes(statusCandidate) ? statusCandidate : 'pending';
  const cursor = (url.searchParams.get('cursor') ?? '').trim() || undefined;
  const requestedLimit = Number(url.searchParams.get('limit') ?? COMMENT_LIMIT_DEFAULT);
  const limit = Number.isFinite(requestedLimit)
    ? Math.min(Math.max(1, Math.trunc(requestedLimit)), COMMENT_LIMIT_MAX)
    : COMMENT_LIMIT_DEFAULT;

  const listed = await listAdminComments(env.DB, status, limit, cursor);
  return jsonResponse({
    ok: true,
    status: 'success',
    comments: listed.comments,
    next_cursor: listed.nextCursor,
  });
};

export const onRequest = (): Response => badMethod('GET');
