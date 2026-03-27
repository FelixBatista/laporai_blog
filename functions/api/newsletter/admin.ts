import { assertGitHubPushAccess } from '../../_lib/github-admin-auth';
import { getBaseUrl, requireResendConfig } from '../../_lib/newsletter/config';
import { randomToken, sha256Hex } from '../../_lib/newsletter/crypto';
import { createCampaign, createToken, listConfirmedSubscribers, logEvent, markCampaignFailed, markCampaignSent } from '../../_lib/newsletter/repository';
import { htmlResponse } from '../../_lib/newsletter/responses';
import { createBroadcast, sendEmail } from '../../_lib/newsletter/resend';
import type { NewsletterEnv } from '../../_lib/newsletter/types';

const UNSUBSCRIBE_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 365 * 5;

function msgHtml(message: string): string {
  return `<p style="padding:10px;border:1px solid #ddd;background:#f7f7f7;">${message}</p>`;
}

// GET /api/newsletter/admin → redirect to admin UI
export const onRequestGet = async (): Promise<Response> => {
  return new Response(null, {
    status: 302,
    headers: { location: '/admin' },
  });
};

export const onRequestPost = async (context: any): Promise<Response> => {
  const env = context.env as NewsletterEnv;
  const unauthorized = await assertGitHubPushAccess(context.request, env);
  if (unauthorized) return unauthorized;

  const configError = requireResendConfig(env);
  if (configError) {
    return htmlResponse(msgHtml(`Erro de configuracao: ${configError}`), 500);
  }

  const form = await context.request.formData();
  const subject = String(form.get('subject') ?? '').trim();
  const html = String(form.get('html') ?? '').trim();
  const text = String(form.get('text') ?? '').trim();

  if (!subject || !html) {
    return htmlResponse(msgHtml('Assunto e HTML sao obrigatorios.'), 400);
  }

  const subscribers = await listConfirmedSubscribers(env.DB);
  if (subscribers.length === 0) {
    return htmlResponse(msgHtml('Nao existem assinantes confirmados para envio.'), 400);
  }

  const campaignId = await createCampaign(env.DB, subject, html, text || null);
  const baseUrl = getBaseUrl(env, context.request.url);
  const hasSegment = Boolean(env.NEWSLETTER_SEGMENT_ID || env.NEWSLETTER_AUDIENCE_ID);

  try {
    if (hasSegment) {
      const broadcast = await createBroadcast(env, { subject, html, text: text || undefined });
      await markCampaignSent(env.DB, campaignId, broadcast.id, subscribers.length);
      await logEvent(env.DB, 'campaign_sent_broadcast', { campaignId, broadcastId: broadcast.id }, null);
      return htmlResponse(msgHtml(`Campanha enviada via segment. ID: ${broadcast.id}`));
    }

    let sentCount = 0;
    for (const subscriber of subscribers) {
      const rawUnsubscribeToken = randomToken(32);
      const tokenHash = await sha256Hex(rawUnsubscribeToken);
      await createToken(
        env.DB,
        subscriber.id,
        tokenHash,
        'unsubscribe',
        new Date(Date.now() + UNSUBSCRIBE_TOKEN_TTL_SECONDS * 1000).toISOString()
      );
      const unsubscribeUrl = `${baseUrl}/api/newsletter/unsubscribe?token=${encodeURIComponent(rawUnsubscribeToken)}`;
      const finalHtml = `${html}<hr /><p style="font-size:12px;color:#666;">Nao quer mais receber? <a href="${unsubscribeUrl}">Cancelar inscricao</a>.</p>`;
      await sendEmail(env, {
        to: [subscriber.email],
        subject,
        html: finalHtml,
        text: text || undefined,
        tags: [{ name: 'campaign_id', value: String(campaignId) }],
      });
      sentCount += 1;
    }

    await markCampaignSent(env.DB, campaignId, null, sentCount);
    await logEvent(env.DB, 'campaign_sent_fallback', { campaignId, sentCount }, null);
    return htmlResponse(msgHtml(`Campanha enviada para ${sentCount} assinantes confirmados.`));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    await markCampaignFailed(env.DB, campaignId, message);
    await logEvent(env.DB, 'campaign_send_failed', { campaignId, message }, null);
    return htmlResponse(msgHtml(`Falha no envio: ${message}`), 500);
  }
};
