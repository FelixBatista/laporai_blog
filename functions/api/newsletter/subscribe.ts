import { getBaseUrl, requireResendConfig } from '../../_lib/newsletter/config';
import { randomToken, sha256Hex } from '../../_lib/newsletter/crypto';
import { isLikelyValidEmail, normalizeEmail } from '../../_lib/newsletter/email';
import {
  createSubscriber,
  createToken,
  findSubscriberByEmail,
  getRecentActiveToken,
  invalidateActiveTokens,
  logEvent,
} from '../../_lib/newsletter/repository';
import { checkAndConsumeRateLimit, getClientIp } from '../../_lib/newsletter/rate-limit';
import { jsonResponse } from '../../_lib/newsletter/responses';
import { sendEmail } from '../../_lib/newsletter/resend';
import { renderConfirmEmail } from '../../_lib/newsletter/templates';
import type { NewsletterEnv } from '../../_lib/newsletter/types';

const CONFIRM_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 3;
const UNSUBSCRIBE_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 365 * 5;
const RESEND_COOLDOWN_SECONDS = 120;

async function parseBody(request: Request): Promise<{ email: string; honeypot: string; source: string }> {
  const contentType = request.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    const body = (await request.json()) as Record<string, unknown>;
    return {
      email: String(body.email ?? ''),
      honeypot: String(body.company ?? ''),
      source: String(body.source ?? 'website'),
    };
  }
  const formData = await request.formData();
  return {
    email: String(formData.get('email') ?? ''),
    honeypot: String(formData.get('company') ?? ''),
    source: String(formData.get('source') ?? 'website'),
  };
}

function tokenExpiresAt(secondsFromNow: number): string {
  return new Date(Date.now() + secondsFromNow * 1000).toISOString();
}

function recentlyCreated(createdAtIso: string): boolean {
  const createdAtMs = Date.parse(createdAtIso);
  if (Number.isNaN(createdAtMs)) return false;
  return Date.now() - createdAtMs < RESEND_COOLDOWN_SECONDS * 1000;
}

export const onRequestPost = async (context: any): Promise<Response> => {
  const env = context.env as NewsletterEnv;
  const configError = requireResendConfig(env);
  if (configError) {
    return jsonResponse({ ok: false, status: 'error', message: configError }, 500);
  }

  const ip = getClientIp(context.request);
  const rateLimit = await checkAndConsumeRateLimit(env.DB, 'subscribe', ip);
  if (!rateLimit.allowed) {
    return jsonResponse(
      {
        ok: false,
        status: 'rate_limited',
        message: 'Muitas tentativas em pouco tempo. Tente novamente em instantes.',
      },
      429
    );
  }

  const { email, honeypot, source } = await parseBody(context.request);
  if (honeypot.trim() !== '') {
    return jsonResponse({ ok: true, status: 'success', message: 'Confira seu e-mail para confirmar a inscrição.' });
  }

  const normalizedEmail = normalizeEmail(email);
  if (!isLikelyValidEmail(normalizedEmail)) {
    return jsonResponse(
      {
        ok: false,
        status: 'invalid_email',
        message: 'Digite um e-mail valido para continuar.',
      },
      400
    );
  }

  const existing = await findSubscriberByEmail(env.DB, normalizedEmail);
  if (existing?.status === 'confirmed') {
    return jsonResponse({
      ok: true,
      status: 'already_subscribed',
      message: 'Este e-mail ja esta inscrito.',
    });
  }

  const subscriberId = existing?.id ?? (await createSubscriber(env.DB, normalizedEmail, source));

  if (existing?.status === 'unsubscribed' || existing?.status === 'bounced' || existing?.status === 'complained') {
    await env.DB
      .prepare(
        `UPDATE newsletter_subscribers
         SET status = 'pending', updated_at = ?
         WHERE id = ?`
      )
      .bind(new Date().toISOString(), subscriberId)
      .run();
  }

  const latestConfirmToken = await getRecentActiveToken(env.DB, subscriberId, 'confirm');
  if (latestConfirmToken && recentlyCreated(latestConfirmToken.created_at)) {
    return jsonResponse({
      ok: true,
      status: 'success',
      message: 'Confira seu e-mail para confirmar a inscricao.',
    });
  }

  await invalidateActiveTokens(env.DB, subscriberId, 'confirm');
  await invalidateActiveTokens(env.DB, subscriberId, 'unsubscribe');

  const rawConfirmToken = randomToken(32);
  const confirmHash = await sha256Hex(rawConfirmToken);
  await createToken(env.DB, subscriberId, confirmHash, 'confirm', tokenExpiresAt(CONFIRM_TOKEN_TTL_SECONDS));

  const rawUnsubscribeToken = randomToken(32);
  const unsubscribeHash = await sha256Hex(rawUnsubscribeToken);
  await createToken(
    env.DB,
    subscriberId,
    unsubscribeHash,
    'unsubscribe',
    tokenExpiresAt(UNSUBSCRIBE_TOKEN_TTL_SECONDS)
  );

  const baseUrl = getBaseUrl(env, context.request.url);
  const confirmUrl = `${baseUrl}/api/newsletter/confirm?token=${encodeURIComponent(rawConfirmToken)}`;
  const unsubscribeUrl = `${baseUrl}/api/newsletter/unsubscribe?token=${encodeURIComponent(rawUnsubscribeToken)}`;
  const emailContent = renderConfirmEmail({ confirmUrl, unsubscribeUrl });

  try {
    const sent = await sendEmail(env, {
      to: [normalizedEmail],
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
      tags: [
        { name: 'flow', value: 'newsletter_confirm' },
        { name: 'subscriber_id', value: String(subscriberId) },
      ],
    });

    await logEvent(env.DB, 'confirm_email_sent', { email: normalizedEmail, resend_email_id: sent.id }, subscriberId);
    return jsonResponse({
      ok: true,
      status: 'success',
      message: 'Confira seu e-mail para confirmar a inscricao.',
    });
  } catch (error) {
    await logEvent(
      env.DB,
      'confirm_email_send_failed',
      { email: normalizedEmail, error: error instanceof Error ? error.message : 'unknown' },
      subscriberId
    );
    return jsonResponse(
      {
        ok: false,
        status: 'error',
        message: 'Nao foi possivel processar sua inscricao agora. Tente novamente.',
      },
      500
    );
  }
};

