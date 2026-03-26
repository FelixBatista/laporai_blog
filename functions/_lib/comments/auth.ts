import type { CommentsEnv } from './types';

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

function extractCandidateSecret(request: Request): string {
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice('Bearer '.length).trim();
  }
  return (
    request.headers.get('x-comments-admin-secret') ??
    new URL(request.url).searchParams.get('secret') ??
    ''
  ).trim();
}

export function isCommentsAdminAuthorized(request: Request, env: CommentsEnv): boolean {
  const expected = (env.COMMENTS_ADMIN_SECRET ?? '').trim();
  if (!expected) return false;
  const provided = extractCandidateSecret(request);
  if (!provided) return false;
  return constantTimeEqual(provided, expected);
}

export function requireCommentsAdminAuth(request: Request, env: CommentsEnv): Response | null {
  if (isCommentsAdminAuthorized(request, env)) return null;
  return new Response('Unauthorized', { status: 401 });
}
