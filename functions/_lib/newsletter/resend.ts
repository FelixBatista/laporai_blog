import type { NewsletterEnv } from './types';

interface ResendApiResponse<T> {
  data?: T;
  error?: {
    message?: string;
    name?: string;
  };
}

async function resendFetch<T>(
  env: NewsletterEnv,
  path: string,
  init: RequestInit
): Promise<T> {
  const response = await fetch(`https://api.resend.com${path}`, {
    ...init,
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      ...(init.headers ?? {}),
    },
  });

  const json = (await response.json()) as ResendApiResponse<T>;
  if (!response.ok || json.error) {
    const message = json.error?.message || `Resend request failed (${response.status})`;
    throw new Error(message);
  }
  return (json.data ?? (json as unknown as T)) as T;
}

export async function sendEmail(env: NewsletterEnv, params: {
  to: string[];
  subject: string;
  html: string;
  text?: string;
  tags?: Array<{ name: string; value: string }>;
}): Promise<{ id: string }> {
  return resendFetch<{ id: string }>(env, '/emails', {
    method: 'POST',
    body: JSON.stringify({
      from: env.NEWSLETTER_FROM_EMAIL,
      reply_to: env.NEWSLETTER_REPLY_TO || undefined,
      to: params.to,
      subject: params.subject,
      html: params.html,
      text: params.text,
      tags: params.tags,
    }),
  });
}

export async function upsertAudienceContact(
  env: NewsletterEnv,
  email: string
): Promise<{ id: string } | null> {
  if (!env.NEWSLETTER_AUDIENCE_ID) return null;
  try {
    const created = await resendFetch<{ id: string }>(env, `/audiences/${env.NEWSLETTER_AUDIENCE_ID}/contacts`, {
      method: 'POST',
      body: JSON.stringify({ email, unsubscribed: false }),
    });
    return created;
  } catch {
    // Contact can already exist; lookup and update.
    const list = await resendFetch<{ data?: Array<{ id: string; email: string }> } | Array<{ id: string; email: string }>>(
      env,
      `/audiences/${env.NEWSLETTER_AUDIENCE_ID}/contacts`,
      { method: 'GET' }
    );
    const contacts = Array.isArray(list) ? list : (list.data ?? []);
    const found = contacts.find((item) => item.email.toLowerCase() === email.toLowerCase());
    if (!found) return null;
    await resendFetch<{ id: string }>(env, `/audiences/${env.NEWSLETTER_AUDIENCE_ID}/contacts/${found.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ unsubscribed: false }),
    });
    return { id: found.id };
  }
}

export async function unsubscribeAudienceContact(env: NewsletterEnv, contactId: string | null): Promise<void> {
  if (!env.NEWSLETTER_AUDIENCE_ID || !contactId) return;
  await resendFetch<unknown>(
    env,
    `/audiences/${env.NEWSLETTER_AUDIENCE_ID}/contacts/${contactId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ unsubscribed: true }),
    }
  );
}

export async function createBroadcast(
  env: NewsletterEnv,
  params: { subject: string; html: string; text?: string }
): Promise<{ id: string }> {
  if (!env.NEWSLETTER_AUDIENCE_ID) {
    throw new Error('NEWSLETTER_AUDIENCE_ID is required to use Resend broadcast flow');
  }

  return resendFetch<{ id: string }>(env, '/broadcasts', {
    method: 'POST',
    body: JSON.stringify({
      audience_id: env.NEWSLETTER_AUDIENCE_ID,
      from: env.NEWSLETTER_FROM_EMAIL,
      reply_to: env.NEWSLETTER_REPLY_TO || undefined,
      subject: params.subject,
      html: params.html,
      text: params.text,
    }),
  });
}
