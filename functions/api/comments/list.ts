import { COMMENT_LIMIT_DEFAULT, COMMENT_LIMIT_MAX } from '../../_lib/comments/config';
import { listApprovedCommentsBySlug, countApprovedCommentsBySlug } from '../../_lib/comments/repository';
import { badMethod, jsonResponse } from '../../_lib/comments/responses';
import type { CommentsEnv } from '../../_lib/comments/types';

function cleanSlug(value: string): string {
  return value.trim().toLowerCase();
}

export const onRequestGet = async (context: any): Promise<Response> => {
  const env = context.env as CommentsEnv;
  const url = new URL(context.request.url);
  const slug = cleanSlug(url.searchParams.get('slug') ?? '');
  const cursor = (url.searchParams.get('cursor') ?? '').trim() || undefined;
  const requestedLimit = Number(url.searchParams.get('limit') ?? COMMENT_LIMIT_DEFAULT);
  const limit = Number.isFinite(requestedLimit)
    ? Math.min(Math.max(1, Math.trunc(requestedLimit)), COMMENT_LIMIT_MAX)
    : COMMENT_LIMIT_DEFAULT;

  if (!slug || slug.length > 160) {
    return jsonResponse(
      {
        ok: false,
        status: 'validation_error',
        message: 'Slug do post invalido.',
      },
      400
    );
  }

  const [listed, count] = await Promise.all([
    listApprovedCommentsBySlug(env.DB, slug, limit, cursor),
    countApprovedCommentsBySlug(env.DB, slug),
  ]);

  return jsonResponse({
    ok: true,
    status: 'success',
    comments: listed.comments.map((item) => ({
      id: item.id,
      author_name: item.author_name,
      website_url: item.website_url,
      body_html: item.sanitized_body,
      created_at: item.created_at,
    })),
    total_approved: count,
    next_cursor: listed.nextCursor,
    turnstile_site_key: env.TURNSTILE_SITE_KEY ?? '',
    comments_base_url: env.COMMENTS_BASE_URL ?? new URL(context.request.url).origin,
  });
};

export const onRequest = (): Response => badMethod('GET');
