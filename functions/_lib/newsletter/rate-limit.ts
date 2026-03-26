interface RateLimitCheckResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

const WINDOWS = [
  { seconds: 60, max: 6 },
  { seconds: 60 * 10, max: 30 },
];

export function getClientIp(request: Request): string {
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp;
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return 'unknown';
}

export async function checkAndConsumeRateLimit(db: any, scope: string, key: string): Promise<RateLimitCheckResult> {
  const nowMs = Date.now();
  const nowIso = new Date(nowMs).toISOString();
  let retryAfterSeconds = 0;

  for (const window of WINDOWS) {
    const windowStartIso = new Date(nowMs - window.seconds * 1000).toISOString();
    const countRow = await db
      .prepare(
        `SELECT COUNT(*) as count
         FROM newsletter_rate_limits
         WHERE scope = ? AND key = ? AND created_at >= ?`
      )
      .bind(scope, key, windowStartIso)
      .first();
    const count = Number((countRow as { count: number }).count ?? 0);
    if (count >= window.max) {
      retryAfterSeconds = Math.max(retryAfterSeconds, window.seconds);
      return {
        allowed: false,
        retryAfterSeconds,
      };
    }
  }

  await db
    .prepare(
      `INSERT INTO newsletter_rate_limits (scope, key, created_at)
       VALUES (?, ?, ?)`
    )
    .bind(scope, key, nowIso)
    .run();

  // Cleanup old rate-limit rows opportunistically.
  const oldestToKeepIso = new Date(nowMs - 60 * 60 * 1000).toISOString();
  await db
    .prepare(
      `DELETE FROM newsletter_rate_limits
       WHERE created_at < ?`
    )
    .bind(oldestToKeepIso)
    .run();

  return {
    allowed: true,
    retryAfterSeconds: 0,
  };
}
