export type SubscribeUiStatus =
  | 'idle'
  | 'loading'
  | 'success'
  | 'invalid_email'
  | 'already_subscribed'
  | 'error';

interface SubscribeResponse {
  ok: boolean;
  status: string;
  message: string;
}

export async function subscribeToNewsletter(payload: {
  email: string;
  company?: string;
  source?: string;
}): Promise<SubscribeResponse> {
  const response = await fetch('/api/newsletter/subscribe', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email: payload.email,
      company: payload.company ?? '',
      source: payload.source ?? 'website_home',
    }),
  });

  const json = (await response.json()) as SubscribeResponse;
  if (!response.ok) {
    return {
      ok: false,
      status: json.status ?? 'error',
      message: json.message ?? 'Nao foi possivel concluir a inscricao.',
    };
  }
  return json;
}
