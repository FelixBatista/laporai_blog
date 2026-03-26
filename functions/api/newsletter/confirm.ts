import { getBaseUrl, requireResendConfig } from '../../_lib/newsletter/config';
import { sha256Hex } from '../../_lib/newsletter/crypto';
import {
  findValidTokenByHash,
  findSubscriberById,
  logEvent,
  markSubscriberConfirmed,
  markTokenUsed,
  setSubscriberResendContactId,
} from '../../_lib/newsletter/repository';
import { htmlResponse } from '../../_lib/newsletter/responses';
import { upsertNewsletterContact } from '../../_lib/newsletter/resend';
import { renderResultPage } from '../../_lib/newsletter/templates';
import type { NewsletterEnv } from '../../_lib/newsletter/types';

function render(status: 'success' | 'error', baseUrl: string, message: string): Response {
  return htmlResponse(
    renderResultPage({
      title: status === 'success' ? 'Inscricao confirmada' : 'Link invalido ou expirado',
      message,
      ctaHref: baseUrl,
      ctaLabel: 'Voltar para o site',
    }),
    status === 'success' ? 200 : 400
  );
}

export const onRequestGet = async (context: any): Promise<Response> => {
  const env = context.env as NewsletterEnv;
  const configError = requireResendConfig(env);
  const baseUrl = getBaseUrl(env, context.request.url);

  if (configError) {
    return render('error', baseUrl, 'Configuracao incompleta para finalizar a inscricao.');
  }

  const token = new URL(context.request.url).searchParams.get('token');
  if (!token) return render('error', baseUrl, 'Token ausente.');

  const tokenHash = await sha256Hex(token);
  const row = await findValidTokenByHash(env.DB, tokenHash, 'confirm');
  if (!row) return render('error', baseUrl, 'Este link nao e mais valido.');

  await markTokenUsed(env.DB, row.id);
  await markSubscriberConfirmed(env.DB, row.subscriber_id);

  try {
    const contact = await upsertNewsletterContact(env, row.email);
    if (contact?.id) {
      await setSubscriberResendContactId(env.DB, row.subscriber_id, contact.id);
    }
  } catch (error) {
    await logEvent(
      env.DB,
      'resend_contact_sync_failed',
      { error: error instanceof Error ? error.message : 'unknown' },
      row.subscriber_id
    );
  }

  const subscriber = await findSubscriberById(env.DB, row.subscriber_id);
  await logEvent(
    env.DB,
    'subscriber_confirmed',
    { email: subscriber?.email ?? row.email },
    row.subscriber_id
  );

  return render('success', baseUrl, 'Sua inscricao foi confirmada com sucesso. Nos vemos na proxima newsletter.');
};

