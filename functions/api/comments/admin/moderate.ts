import { requireCommentsAdminAuth } from '../../../_lib/comments/auth';
import { getCommentById, logCommentEvent, updateCommentModeration } from '../../../_lib/comments/repository';
import { badMethod, jsonResponse } from '../../../_lib/comments/responses';
import { renderSanitizedCommentHtml, sanitizeCommentText } from '../../../_lib/comments/sanitize';
import type { CommentStatus, CommentsEnv } from '../../../_lib/comments/types';

type ModerationAction = 'approve' | 'reject' | 'spam' | 'delete';

function toStatus(action: ModerationAction): CommentStatus {
  if (action === 'approve') return 'approved';
  if (action === 'reject') return 'rejected';
  if (action === 'spam') return 'spam';
  return 'deleted';
}

async function parseBody(request: Request): Promise<{
  commentId: number;
  action: ModerationAction;
  reason: string;
  editedBody: string | null;
}> {
  const contentType = request.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    const body = (await request.json()) as Record<string, unknown>;
    return {
      commentId: Number(body.comment_id),
      action: String(body.action ?? '') as ModerationAction,
      reason: String(body.reason ?? '').trim(),
      editedBody: body.edited_body == null ? null : String(body.edited_body),
    };
  }
  const form = await request.formData();
  return {
    commentId: Number(form.get('comment_id')),
    action: String(form.get('action') ?? '') as ModerationAction,
    reason: String(form.get('reason') ?? '').trim(),
    editedBody: form.get('edited_body') == null ? null : String(form.get('edited_body')),
  };
}

export const onRequestPost = async (context: any): Promise<Response> => {
  const env = context.env as CommentsEnv;
  const unauthorized = requireCommentsAdminAuth(context.request, env);
  if (unauthorized) return unauthorized;

  const payload = await parseBody(context.request);
  if (!Number.isInteger(payload.commentId) || payload.commentId <= 0) {
    return jsonResponse({ ok: false, status: 'validation_error', message: 'Comentario invalido.' }, 400);
  }
  if (!['approve', 'reject', 'spam', 'delete'].includes(payload.action)) {
    return jsonResponse({ ok: false, status: 'validation_error', message: 'Acao invalida.' }, 400);
  }

  const current = await getCommentById(env.DB, payload.commentId);
  if (!current) {
    return jsonResponse({ ok: false, status: 'not_found', message: 'Comentario nao encontrado.' }, 404);
  }

  const nextStatus = toStatus(payload.action);
  const normalizedEditedBody = payload.editedBody == null ? null : sanitizeCommentText(payload.editedBody);
  const shouldUpdateBody = normalizedEditedBody != null && normalizedEditedBody.length > 0;
  const sanitizedBody = shouldUpdateBody ? renderSanitizedCommentHtml(normalizedEditedBody) : undefined;

  await updateCommentModeration(env.DB, {
    commentId: payload.commentId,
    status: nextStatus,
    bodyRaw: shouldUpdateBody ? normalizedEditedBody : undefined,
    sanitizedBody,
  });

  await logCommentEvent(env.DB, payload.commentId, 'comment_moderated', 'admin', {
    from_status: current.status,
    to_status: nextStatus,
    reason: payload.reason || null,
    body_edited: Boolean(shouldUpdateBody),
  });

  return jsonResponse({
    ok: true,
    status: 'success',
    message: 'Moderacao aplicada com sucesso.',
  });
};

export const onRequest = (): Response => badMethod('POST');
