// This route has been moved to /admin/comments
export const onRequest = async (): Promise<Response> => {
  return new Response(
    '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"/><title>Movido</title>' +
      '<meta http-equiv="refresh" content="3;url=/admin/comments"/>' +
      '<style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#f8f9ff;color:#0d1c2f;}</style>' +
      '</head><body><p>Esta página foi movida para <a href="/admin/comments">/admin/comments</a>. A redirecionar…</p></body></html>',
    {
      status: 410,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    }
  );
};
