import { getBaseUrl } from '../../_lib/newsletter/config';
import { sha256Hex } from '../../_lib/newsletter/crypto';
import {
  findValidTokenByHash,
  logEvent,
  markSubscriberUnsubscribed,
  markTokenUsed,
  setSubscriberResendContactId,
} from '../../_lib/newsletter/repository';
import { htmlResponse } from '../../_lib/newsletter/responses';
import { unsubscribeNewsletterContact, upsertNewsletterContact } from '../../_lib/newsletter/resend';
import { renderResultPage } from '../../_lib/newsletter/templates';
import type { NewsletterEnv } from '../../_lib/newsletter/types';

function render(status: 'success' | 'error', baseUrl: string, message: string): Response {
  return htmlResponse(
    renderResultPage({
      title: status === 'success' ? 'Inscricao cancelada' : 'Link invalido ou expirado',
      message,
      ctaHref: baseUrl,
      ctaLabel: 'Voltar para o site',
    }),
    status === 'success' ? 200 : 400
  );
}

export const onRequestGet = async (context: any): Promise<Response> => {
  const env = context.env as NewsletterEnv;
  const baseUrl = getBaseUrl(env, context.request.url);
  const token = new URL(context.request.url).searchParams.get('token');
  if (!token) return render('error', baseUrl, 'Token ausente.');

  const tokenHash = await sha256Hex(token);
  const row = await findValidTokenByHash(env.DB, tokenHash, 'unsubscribe');
  if (!row) return render('error', baseUrl, 'Este link nao e mais valido.');

  await markTokenUsed(env.DB, row.id);
  await markSubscriberUnsubscribed(env.DB, row.subscriber_id);

  try {
    const contact = await upsertNewsletterContact(env, row.email);
    if (contact?.id) {
      await setSubscriberResendContactId(env.DB, row.subscriber_id, contact.id);
    }
    await unsubscribeNewsletterContact(env, row.email);
  } catch (error) {
    await logEvent(
      env.DB,
      'resend_unsubscribe_sync_failed',
      { error: error instanceof Error ? error.message : 'unknown' },
      row.subscriber_id
    );
  }

  await logEvent(env.DB, 'subscriber_unsubscribed', { email: row.email }, row.subscriber_id);
  return render('success', baseUrl, 'Sua inscricao foi cancelada. Voce nao recebera novos envios.');
};

