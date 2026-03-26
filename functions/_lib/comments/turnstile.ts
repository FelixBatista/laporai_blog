interface TurnstileVerificationResult {
  success: boolean;
  'error-codes'?: string[];
}

export async function verifyTurnstileToken(
  secretKey: string | undefined,
  token: string,
  remoteIp: string | null
): Promise<{ ok: boolean; errors: string[] }> {
  if (!secretKey) {
    return { ok: false, errors: ['turnstile_secret_missing'] };
  }

  const body = new URLSearchParams();
  body.set('secret', secretKey);
  body.set('response', token);
  if (remoteIp) body.set('remoteip', remoteIp);

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    if (!response.ok) {
      return { ok: false, errors: ['turnstile_http_error'] };
    }

    const json = (await response.json()) as TurnstileVerificationResult;
    return {
      ok: Boolean(json.success),
      errors: json.success ? [] : json['error-codes'] ?? ['turnstile_invalid'],
    };
  } catch {
    return { ok: false, errors: ['turnstile_network_error'] };
  }
}
