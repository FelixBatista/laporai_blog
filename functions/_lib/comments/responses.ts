export function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

export function badMethod(allow: string): Response {
  return new Response('Method Not Allowed', {
    status: 405,
    headers: {
      allow,
    },
  });
}
