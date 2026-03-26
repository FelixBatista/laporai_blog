import {
  COMMENT_LIMIT_DEFAULT,
  DUPLICATE_SPAM_THRESHOLD,
  DUPLICATE_WINDOW_SECONDS,
  RATE_LIMIT_MAX_PER_FINGERPRINT,
  RATE_LIMIT_MAX_PER_IP,
  RATE_LIMIT_WINDOW_SECONDS,
  toBool,
} from '../../_lib/comments/config';
import { hashWithSalt, safeNormalize, sha256Hex } from '../../_lib/comments/crypto';
import { checkAndConsumeRateLimit, getClientIp, getUserAgent } from '../../_lib/comments/rate-limit';
import { countRecentPotentialDuplicates, createComment, logCommentEvent } from '../../_lib/comments/repository';
import { badMethod, jsonResponse } from '../../_lib/comments/responses';
import { renderSanitizedCommentHtml, sanitizeCommentText, sanitizeName, sanitizeWebsiteUrl } from '../../_lib/comments/sanitize';
import { verifyTurnstileToken } from '../../_lib/comments/turnstile';
import { parseSubmitCommentInput, validateSubmitCommentInput } from '../../_lib/comments/validation';
import type { CommentStatus, CommentsEnv } from '../../_lib/comments/types';

function getHashSalt(env: CommentsEnv): string {
  return env.COMMENTS_ADMIN_SECRET || env.TURNSTILE_SECRET_KEY || 'laporai-comments-salt';
}

export const onRequestPost = async (context: any): Promise<Response> => {
  const env = context.env as CommentsEnv;
  const input = await parseSubmitCommentInput(context.request);

  if (input.honeypot) {
    return jsonResponse({
      ok: true,
      status: 'pending_moderation',
      message: 'Sua reflexao foi recebida e sera analisada antes de aparecer.',
    });
  }

  const errors = validateSubmitCommentInput(input);
  if (errors.length > 0) {
    return jsonResponse(
      {
        ok: false,
        status: 'validation_error',
        message: errors[0],
      },
      400
    );
  }

  const ip = getClientIp(context.request);
  const userAgent = getUserAgent(context.request);
  const salt = getHashSalt(env);
  const ipHash = ip ? await hashWithSalt(ip, salt) : null;
  const userAgentHash = userAgent ? await hashWithSalt(userAgent, salt) : null;

  if (ipHash) {
    const ipRateLimit = await checkAndConsumeRateLimit(
      env.DB,
      'comments_submit_ip',
      ipHash,
      RATE_LIMIT_MAX_PER_IP,
      RATE_LIMIT_WINDOW_SECONDS
    );
    if (!ipRateLimit.allowed) {
      return jsonResponse(
        {
          ok: false,
          status: 'rate_limited',
          message: 'Muitas tentativas em pouco tempo. Aguarde e tente novamente.',
          retry_after_seconds: ipRateLimit.retryAfterSeconds,
        },
        429
      );
    }
  }

  const fingerprint = ipHash && userAgentHash ? `${ipHash}:${userAgentHash}` : ipHash || userAgentHash || null;
  if (fingerprint) {
    const fpRateLimit = await checkAndConsumeRateLimit(
      env.DB,
      'comments_submit_fingerprint',
      fingerprint,
      RATE_LIMIT_MAX_PER_FINGERPRINT,
      RATE_LIMIT_WINDOW_SECONDS
    );
    if (!fpRateLimit.allowed) {
      return jsonResponse(
        {
          ok: false,
          status: 'rate_limited',
          message: 'Muitas tentativas em pouco tempo. Aguarde e tente novamente.',
          retry_after_seconds: fpRateLimit.retryAfterSeconds,
        },
        429
      );
    }
  }

  const turnstileResult = await verifyTurnstileToken(env.TURNSTILE_SECRET_KEY, input.turnstileToken, ip);
  if (!turnstileResult.ok) {
    return jsonResponse(
      {
        ok: false,
        status: 'validation_error',
        message: 'Nao foi possivel validar o desafio anti-spam. Tente novamente.',
      },
      400
    );
  }

  const normalizedBody = sanitizeCommentText(input.bodyRaw);
  const normalizedName = sanitizeName(input.authorName);
  const normalizedEmail = input.authorEmail ? safeNormalize(input.authorEmail).toLowerCase() : null;
  const websiteUrl = sanitizeWebsiteUrl(input.websiteUrlRaw);
  const sanitizedBody = renderSanitizedCommentHtml(normalizedBody);
  const bodyHash = await sha256Hex(`${input.postSlug}:${normalizedBody.toLowerCase()}`);
  const duplicateCount = await countRecentPotentialDuplicates(
    env.DB,
    input.postSlug,
    bodyHash,
    DUPLICATE_WINDOW_SECONDS
  );

  let status: CommentStatus = toBool(env.COMMENTS_AUTO_APPROVE, false) ? 'approved' : 'pending';
  if (duplicateCount >= DUPLICATE_SPAM_THRESHOLD) {
    status = 'spam';
  }

  const commentId = await createComment(env.DB, {
    postSlug: input.postSlug,
    postTitle: input.postTitle,
    parentId: input.parentId,
    authorName: normalizedName,
    authorEmail: normalizedEmail,
    authorEmailHash: normalizedEmail ? await hashWithSalt(normalizedEmail, salt) : null,
    websiteUrl,
    bodyRaw: normalizedBody,
    sanitizedBody,
    bodyHash,
    status,
    source: input.source,
    turnstilePassed: 1,
    ipHash,
    userAgentHash,
  });

  await logCommentEvent(env.DB, commentId, 'comment_submitted', 'public', {
    post_slug: input.postSlug,
    source: input.source,
    duplicate_count: duplicateCount,
    list_limit_hint: COMMENT_LIMIT_DEFAULT,
  });

  if (status === 'approved') {
    return jsonResponse({
      ok: true,
      status: 'success',
      message: 'Reflexao publicada com sucesso.',
      comment_id: commentId,
    });
  }

  if (status === 'spam') {
    return jsonResponse({
      ok: true,
      status: 'pending_moderation',
      message: 'Sua reflexao foi recebida e sera analisada antes de aparecer.',
    });
  }

  return jsonResponse({
    ok: true,
    status: 'pending_moderation',
    message: 'Sua reflexao foi recebida e esta aguardando moderacao.',
    comment_id: commentId,
  });
};

export const onRequest = (): Response => badMethod('POST');
