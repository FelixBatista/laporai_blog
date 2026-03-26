import { getBaseUrl, requireResendConfig } from '../../_lib/newsletter/config';
import { randomToken, sha256Hex } from '../../_lib/newsletter/crypto';
import { createCampaign, createToken, listConfirmedSubscribers, logEvent, markCampaignFailed, markCampaignSent } from '../../_lib/newsletter/repository';
import { htmlResponse } from '../../_lib/newsletter/responses';
import { createBroadcast, sendEmail } from '../../_lib/newsletter/resend';
import type { NewsletterEnv } from '../../_lib/newsletter/types';

const UNSUBSCRIBE_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 365 * 5;

function isAuthorized(request: Request, env: NewsletterEnv): boolean {
  const secret = env.NEWSLETTER_ADMIN_SECRET;
  if (!secret) return false;
  const authHeader = request.headers.get('authorization');
  const headerSecret = request.headers.get('x-newsletter-admin-secret');
  const urlSecret = new URL(request.url).searchParams.get('secret');

  if (authHeader?.startsWith('Bearer ') && authHeader.slice('Bearer '.length) === secret) return true;
  if (headerSecret === secret) return true;
  if (urlSecret === secret) return true;
  return false;
}

function adminFormHtml(message: string | null, secret: string): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Newsletter Admin</title>
  </head>
  <body style="font-family: Arial, sans-serif; margin: 24px; max-width: 840px;">
    <h1>Newsletter Admin</h1>
    <p>Envio interno protegido por segredo.</p>
    ${message ? `<p style="padding:10px;border:1px solid #ddd;background:#f7f7f7;">${message}</p>` : ''}
    <form method="POST">
      <input type="hidden" name="secret" value="${secret}" />
      <label>Assunto</label><br />
      <input name="subject" type="text" required style="width:100%;padding:10px;margin:8px 0 16px;" /><br />
      <label>HTML</label><br />
      <textarea name="html" required style="width:100%;min-height:240px;padding:10px;margin:8px 0 16px;"></textarea><br />
      <label>Texto (opcional)</label><br />
      <textarea name="text" style="width:100%;min-height:120px;padding:10px;margin:8px 0 16px;"></textarea><br />
      <button type="submit" style="padding:12px 20px;">Enviar newsletter</button>
    </form>
  </body>
</html>`;
}

export const onRequestGet = async (context: any): Promise<Response> => {
  const env = context.env as NewsletterEnv;
  if (!isAuthorized(context.request, env)) {
    return new Response('Unauthorized', { status: 401 });
  }
  const secret = new URL(context.request.url).searchParams.get('secret') ?? '';
  return htmlResponse(adminFormHtml(null, secret));
};

export const onRequestPost = async (context: any): Promise<Response> => {
  const env = context.env as NewsletterEnv;
  if (!isAuthorized(context.request, env)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const configError = requireResendConfig(env);
  if (configError) {
    return htmlResponse(adminFormHtml(`Erro de configuracao: ${configError}`, ''), 500);
  }

  const form = await context.request.formData();
  const subject = String(form.get('subject') ?? '').trim();
  const html = String(form.get('html') ?? '').trim();
  const text = String(form.get('text') ?? '').trim();
  const secret = String(form.get('secret') ?? '');

  if (!subject || !html) {
    return htmlResponse(adminFormHtml('Assunto e HTML sao obrigatorios.', secret), 400);
  }

  const subscribers = await listConfirmedSubscribers(env.DB);
  if (subscribers.length === 0) {
    return htmlResponse(adminFormHtml('Nao existem assinantes confirmados para envio.', secret), 400);
  }

  const campaignId = await createCampaign(env.DB, subject, html, text || null);
  const baseUrl = getBaseUrl(env, context.request.url);

  try {
    if (env.NEWSLETTER_AUDIENCE_ID) {
      const broadcast = await createBroadcast(env, { subject, html, text: text || undefined });
      await markCampaignSent(env.DB, campaignId, broadcast.id, subscribers.length);
      await logEvent(env.DB, 'campaign_sent_broadcast', { campaignId, broadcastId: broadcast.id }, null);
      return htmlResponse(adminFormHtml(`Campanha enviada via audience. ID: ${broadcast.id}`, secret));
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
    return htmlResponse(adminFormHtml(`Campanha enviada para ${sentCount} assinantes confirmados.`, secret));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    await markCampaignFailed(env.DB, campaignId, message);
    await logEvent(env.DB, 'campaign_send_failed', { campaignId, message }, null);
    return htmlResponse(adminFormHtml(`Falha no envio: ${message}`, secret), 500);
  }
};

