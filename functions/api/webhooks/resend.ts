import { findSubscriberByEmailForEvents, logEvent, updateSubscriberStatus } from '../../_lib/newsletter/repository';
import { jsonResponse } from '../../_lib/newsletter/responses';
import { mapWebhookEventToStatus, normalizeResendEvent, verifyResendWebhookSignature } from '../../_lib/newsletter/webhooks';
import type { NewsletterEnv } from '../../_lib/newsletter/types';

export const onRequestPost = async (context: any): Promise<Response> => {
  const env = context.env as NewsletterEnv;
  if (!env.RESEND_WEBHOOK_SECRET) {
    return jsonResponse(
      { ok: false, message: 'RESEND_WEBHOOK_SECRET is missing. Webhook verification is required.' },
      500
    );
  }

  const bodyText = await context.request.text();
  const isValid = await verifyResendWebhookSignature(env.RESEND_WEBHOOK_SECRET, context.request.headers, bodyText);
  if (!isValid) {
    return jsonResponse({ ok: false, message: 'Invalid webhook signature.' }, 401);
  }

  let payload: any;
  try {
    payload = JSON.parse(bodyText);
  } catch {
    return jsonResponse({ ok: false, message: 'Invalid JSON body.' }, 400);
  }

  const normalized = normalizeResendEvent(payload);
  let subscriberId: number | null = null;

  if (normalized.email) {
    const subscriber = await findSubscriberByEmailForEvents(env.DB, normalized.email);
    if (subscriber) {
      subscriberId = subscriber.id;
      const nextStatus = mapWebhookEventToStatus(normalized.eventType);
      if (nextStatus) {
        await updateSubscriberStatus(env.DB, subscriber.id, nextStatus);
      }
    }
  }

  await logEvent(
    env.DB,
    normalized.eventType,
    {
      email: normalized.email,
      provider_message_id: normalized.providerMessageId,
      raw: normalized.raw,
    },
    subscriberId
  );

  return jsonResponse({ ok: true });
};

