// This route has been moved — comments moderation is now inside /admin.
export const onRequest = async (): Promise<Response> => {
  return new Response(null, {
    status: 301,
    headers: { location: '/admin' },
  });
};
