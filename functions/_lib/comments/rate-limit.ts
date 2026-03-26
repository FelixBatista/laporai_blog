export function getClientIp(request: Request): string | null {
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp.trim();
  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (!xForwardedFor) return null;
  const first = xForwardedFor.split(',')[0];
  return first?.trim() || null;
}

export function getUserAgent(request: Request): string | null {
  const userAgent = request.headers.get('user-agent');
  return userAgent?.trim() || null;
}

export async function checkAndConsumeRateLimit(
  db: any,
  scope: string,
  key: string,
  maxAttempts: number,
  windowSeconds: number
): Promise<{ allowed: boolean; retryAfterSeconds: number }> {
  const nowMs = Date.now();
  const cutoffIso = new Date(nowMs - windowSeconds * 1000).toISOString();
  const nowIso = new Date(nowMs).toISOString();

  await db
    .prepare(
      `DELETE FROM blog_comment_rate_limits
       WHERE scope = ? AND key = ? AND created_at < ?`
    )
    .bind(scope, key, cutoffIso)
    .run();

  const row = await db
    .prepare(
      `SELECT COUNT(*) as count
       FROM blog_comment_rate_limits
       WHERE scope = ? AND key = ?`
    )
    .bind(scope, key)
    .first();

  const count = Number((row as { count?: number } | null)?.count ?? 0);
  if (count >= maxAttempts) {
    return { allowed: false, retryAfterSeconds: windowSeconds };
  }

  await db
    .prepare(
      `INSERT INTO blog_comment_rate_limits (scope, key, created_at)
       VALUES (?, ?, ?)`
    )
    .bind(scope, key, nowIso)
    .run();

  return { allowed: true, retryAfterSeconds: 0 };
}
