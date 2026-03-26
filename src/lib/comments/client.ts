import type {
  AdminCommentStatus,
  AdminListResponse,
  AdminModerationAction,
  ListCommentsResponse,
  SubmitCommentResponse,
} from './types';

export async function listComments(payload: {
  slug: string;
  cursor?: string | null;
  limit?: number;
}): Promise<ListCommentsResponse> {
  const url = new URL('/api/comments/list', window.location.origin);
  url.searchParams.set('slug', payload.slug);
  if (payload.cursor) url.searchParams.set('cursor', payload.cursor);
  if (payload.limit) url.searchParams.set('limit', String(payload.limit));

  const response = await fetch(url.toString(), { method: 'GET' });
  const json = (await response.json()) as ListCommentsResponse;
  if (!response.ok) {
    throw new Error((json as { message?: string }).message || 'Falha ao carregar comentarios.');
  }
  return json;
}

export async function submitComment(payload: {
  post_slug: string;
  post_title?: string;
  author_name: string;
  author_email?: string;
  website_url?: string;
  body: string;
  source?: string;
  company?: string;
  turnstile_token: string;
}): Promise<SubmitCommentResponse> {
  const response = await fetch('/api/comments/submit', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      post_slug: payload.post_slug,
      post_title: payload.post_title ?? '',
      author_name: payload.author_name,
      author_email: payload.author_email ?? '',
      website_url: payload.website_url ?? '',
      body: payload.body,
      source: payload.source ?? 'website_post',
      company: payload.company ?? '',
      turnstile_token: payload.turnstile_token,
    }),
  });

  const json = (await response.json()) as SubmitCommentResponse;
  if (!response.ok) {
    return {
      ok: false,
      status: json.status || 'error',
      message: json.message || 'Nao foi possivel enviar seu comentario.',
    };
  }
  return json;
}

export async function listAdminComments(payload: {
  secret: string;
  status: AdminCommentStatus | 'all';
  cursor?: string | null;
  limit?: number;
}): Promise<AdminListResponse> {
  const url = new URL('/api/comments/admin/list', window.location.origin);
  url.searchParams.set('status', payload.status);
  if (payload.cursor) url.searchParams.set('cursor', payload.cursor);
  if (payload.limit) url.searchParams.set('limit', String(payload.limit));

  const response = await fetch(url.toString(), {
    headers: {
      authorization: `Bearer ${payload.secret}`,
    },
  });
  const json = (await response.json()) as AdminListResponse;
  if (!response.ok) {
    throw new Error((json as { message?: string }).message || 'Falha ao carregar moderacao.');
  }
  return json;
}

export async function moderateComment(payload: {
  secret: string;
  comment_id: number;
  action: AdminModerationAction;
  reason?: string;
  edited_body?: string;
}): Promise<{ ok: boolean; status: string; message: string }> {
  const response = await fetch('/api/comments/admin/moderate', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${payload.secret}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const json = (await response.json()) as { ok: boolean; status: string; message: string };
  if (!response.ok) {
    return {
      ok: false,
      status: json.status || 'error',
      message: json.message || 'Falha ao moderar comentario.',
    };
  }
  return json;
}
