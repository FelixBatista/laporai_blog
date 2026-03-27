// The Newsletter admin is now embedded inside the Decap CMS shell at /admin.
// Click the "Newsletter" button in the /admin top bar to open it.
export const onRequestGet = async (): Promise<Response> => {
  return new Response(null, {
    status: 302,
    headers: { location: '/admin' },
  });
};
