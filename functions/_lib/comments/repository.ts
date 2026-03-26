import type { AdminCommentRecord, CommentStatus, PublicCommentRecord } from './types';

function encodeCursor(createdAt: string, id: number): string {
  return btoa(`${createdAt}|${id}`);
}

function decodeCursor(cursor: string): { createdAt: string; id: number } | null {
  try {
    const decoded = atob(cursor);
    const [createdAt, idRaw] = decoded.split('|');
    const id = Number(idRaw);
    if (!createdAt || !Number.isFinite(id)) return null;
    return { createdAt, id };
  } catch {
    return null;
  }
}

export async function listApprovedCommentsBySlug(
  db: any,
  postSlug: string,
  limit: number,
  cursor?: string
): Promise<{ comments: PublicCommentRecord[]; nextCursor: string | null }> {
  const parsedCursor = cursor ? decodeCursor(cursor) : null;
  const query = parsedCursor
    ? db
        .prepare(
          `SELECT id, post_slug, author_name, website_url, sanitized_body, created_at
           FROM blog_comments
           WHERE post_slug = ?
             AND status = 'approved'
             AND (created_at > ? OR (created_at = ? AND id > ?))
           ORDER BY created_at ASC, id ASC
           LIMIT ?`
        )
        .bind(postSlug, parsedCursor.createdAt, parsedCursor.createdAt, parsedCursor.id, limit + 1)
    : db
        .prepare(
          `SELECT id, post_slug, author_name, website_url, sanitized_body, created_at
           FROM blog_comments
           WHERE post_slug = ?
             AND status = 'approved'
           ORDER BY created_at ASC, id ASC
           LIMIT ?`
        )
        .bind(postSlug, limit + 1);

  const result = await query.all();
  const rows = ((result as { results?: PublicCommentRecord[] }).results ?? []) as PublicCommentRecord[];
  const hasMore = rows.length > limit;
  const comments = hasMore ? rows.slice(0, limit) : rows;
  const last = comments[comments.length - 1];
  return {
    comments,
    nextCursor: hasMore && last ? encodeCursor(last.created_at, last.id) : null,
  };
}

export async function countApprovedCommentsBySlug(db: any, postSlug: string): Promise<number> {
  const row = await db
    .prepare(
      `SELECT COUNT(*) as count
       FROM blog_comments
       WHERE post_slug = ?
         AND status = 'approved'`
    )
    .bind(postSlug)
    .first();
  return Number((row as { count?: number } | null)?.count ?? 0);
}

export async function createComment(
  db: any,
  payload: {
    postSlug: string;
    postTitle: string | null;
    parentId: number | null;
    authorName: string;
    authorEmail: string | null;
    authorEmailHash: string | null;
    websiteUrl: string | null;
    bodyRaw: string;
    sanitizedBody: string;
    bodyHash: string;
    status: CommentStatus;
    source: string;
    turnstilePassed: number;
    ipHash: string | null;
    userAgentHash: string | null;
  }
): Promise<number> {
  const now = new Date().toISOString();
  const approvedAt = payload.status === 'approved' ? now : null;
  const deletedAt = payload.status === 'deleted' ? now : null;

  await db
    .prepare(
      `INSERT INTO blog_comments (
        post_slug,
        post_title,
        parent_id,
        author_name,
        author_email,
        author_email_hash,
        website_url,
        body_raw,
        sanitized_body,
        body_hash,
        status,
        source,
        turnstile_passed,
        ip_hash,
        user_agent_hash,
        created_at,
        updated_at,
        approved_at,
        deleted_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      payload.postSlug,
      payload.postTitle,
      payload.parentId,
      payload.authorName,
      payload.authorEmail,
      payload.authorEmailHash,
      payload.websiteUrl,
      payload.bodyRaw,
      payload.sanitizedBody,
      payload.bodyHash,
      payload.status,
      payload.source,
      payload.turnstilePassed,
      payload.ipHash,
      payload.userAgentHash,
      now,
      now,
      approvedAt,
      deletedAt
    )
    .run();

  const row = await db.prepare('SELECT last_insert_rowid() as id').first();
  return Number((row as { id: number }).id);
}

export async function logCommentEvent(
  db: any,
  commentId: number,
  eventType: string,
  actor: string,
  payload: unknown
): Promise<void> {
  await db
    .prepare(
      `INSERT INTO blog_comment_events (comment_id, event_type, actor, payload_json, created_at)
       VALUES (?, ?, ?, ?, ?)`
    )
    .bind(commentId, eventType, actor, JSON.stringify(payload), new Date().toISOString())
    .run();
}

export async function countRecentPotentialDuplicates(
  db: any,
  postSlug: string,
  bodyHash: string,
  windowSeconds: number
): Promise<number> {
  const cutoff = new Date(Date.now() - windowSeconds * 1000).toISOString();
  const row = await db
    .prepare(
      `SELECT COUNT(*) as count
       FROM blog_comments
       WHERE post_slug = ?
         AND body_hash = ?
         AND created_at >= ?`
    )
    .bind(postSlug, bodyHash, cutoff)
    .first();
  return Number((row as { count?: number } | null)?.count ?? 0);
}

export async function listAdminComments(
  db: any,
  status: CommentStatus | 'all',
  limit: number,
  cursor?: string
): Promise<{ comments: AdminCommentRecord[]; nextCursor: string | null }> {
  const parsedCursor = cursor ? decodeCursor(cursor) : null;
  const useStatusFilter = status !== 'all';

  const result = await (async () => {
    if (useStatusFilter && parsedCursor) {
      return db
        .prepare(
          `SELECT id, post_slug, post_title, parent_id, author_name, author_email, author_email_hash, website_url, body_raw, sanitized_body,
                  status, source, turnstile_passed, ip_hash, user_agent_hash, created_at, updated_at, approved_at, deleted_at
           FROM blog_comments
           WHERE status = ?
             AND (created_at > ? OR (created_at = ? AND id > ?))
           ORDER BY created_at ASC, id ASC
           LIMIT ?`
        )
        .bind(status, parsedCursor.createdAt, parsedCursor.createdAt, parsedCursor.id, limit + 1)
        .all();
    }
    if (useStatusFilter) {
      return db
        .prepare(
          `SELECT id, post_slug, post_title, parent_id, author_name, author_email, author_email_hash, website_url, body_raw, sanitized_body,
                  status, source, turnstile_passed, ip_hash, user_agent_hash, created_at, updated_at, approved_at, deleted_at
           FROM blog_comments
           WHERE status = ?
           ORDER BY created_at ASC, id ASC
           LIMIT ?`
        )
        .bind(status, limit + 1)
        .all();
    }
    if (parsedCursor) {
      return db
        .prepare(
          `SELECT id, post_slug, post_title, parent_id, author_name, author_email, author_email_hash, website_url, body_raw, sanitized_body,
                  status, source, turnstile_passed, ip_hash, user_agent_hash, created_at, updated_at, approved_at, deleted_at
           FROM blog_comments
           WHERE (created_at > ? OR (created_at = ? AND id > ?))
           ORDER BY created_at ASC, id ASC
           LIMIT ?`
        )
        .bind(parsedCursor.createdAt, parsedCursor.createdAt, parsedCursor.id, limit + 1)
        .all();
    }
    return db
      .prepare(
        `SELECT id, post_slug, post_title, parent_id, author_name, author_email, author_email_hash, website_url, body_raw, sanitized_body,
                status, source, turnstile_passed, ip_hash, user_agent_hash, created_at, updated_at, approved_at, deleted_at
         FROM blog_comments
         ORDER BY created_at ASC, id ASC
         LIMIT ?`
      )
      .bind(limit + 1)
      .all();
  })();

  const rows = ((result as { results?: AdminCommentRecord[] }).results ?? []) as AdminCommentRecord[];
  const hasMore = rows.length > limit;
  const comments = hasMore ? rows.slice(0, limit) : rows;
  const last = comments[comments.length - 1];
  return {
    comments,
    nextCursor: hasMore && last ? encodeCursor(last.created_at, last.id) : null,
  };
}

export async function getCommentById(db: any, commentId: number): Promise<AdminCommentRecord | null> {
  const row = await db
    .prepare(
      `SELECT id, post_slug, post_title, parent_id, author_name, author_email, author_email_hash, website_url, body_raw, sanitized_body,
              status, source, turnstile_passed, ip_hash, user_agent_hash, created_at, updated_at, approved_at, deleted_at
       FROM blog_comments
       WHERE id = ?
       LIMIT 1`
    )
    .bind(commentId)
    .first();
  return (row as AdminCommentRecord | null) ?? null;
}

export async function updateCommentModeration(
  db: any,
  payload: {
    commentId: number;
    status: CommentStatus;
    bodyRaw?: string;
    sanitizedBody?: string;
  }
): Promise<void> {
  const now = new Date().toISOString();
  await db
    .prepare(
      `UPDATE blog_comments
       SET status = ?,
           body_raw = COALESCE(?, body_raw),
           sanitized_body = COALESCE(?, sanitized_body),
           updated_at = ?,
           approved_at = CASE
             WHEN ? = 'approved' THEN COALESCE(approved_at, ?)
             ELSE approved_at
           END,
           deleted_at = CASE
             WHEN ? = 'deleted' THEN COALESCE(deleted_at, ?)
             ELSE deleted_at
           END
       WHERE id = ?`
    )
    .bind(
      payload.status,
      payload.bodyRaw ?? null,
      payload.sanitizedBody ?? null,
      now,
      payload.status,
      now,
      payload.status,
      now,
      payload.commentId
    )
    .run();
}
