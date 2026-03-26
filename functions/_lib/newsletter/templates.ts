export function renderConfirmEmail(params: {
  confirmUrl: string;
  unsubscribeUrl: string;
}): { subject: string; html: string; text: string } {
  const subject = 'Confirme sua inscrição na newsletter Lá por Aí';
  const html = `
    <div style="font-family: Georgia, serif; max-width: 640px; margin: 0 auto; padding: 24px;">
      <h1 style="font-size: 28px; margin-bottom: 16px; color: #8f1d00;">Falta só um passo</h1>
      <p style="font-size: 16px; line-height: 1.6; color: #241f1d;">
        Obrigada por assinar a newsletter do Lá por Aí.
        Para confirmar sua inscrição, clique no botão abaixo:
      </p>
      <p style="margin: 28px 0;">
        <a href="${params.confirmUrl}" style="display:inline-block;padding:14px 24px;background:#ad2c00;color:#fff;text-decoration:none;border-radius:8px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;font-size:12px;">
          Confirmar inscrição
        </a>
      </p>
      <p style="font-size: 13px; color: #625b57;">
        Se você não solicitou, pode ignorar este e-mail.
      </p>
      <p style="font-size: 12px; color: #7a726f; margin-top: 24px;">
        Para cancelar no futuro, use este link:
        <a href="${params.unsubscribeUrl}" style="color:#ad2c00;">Cancelar inscrição</a>
      </p>
    </div>
  `;

  const text = [
    'Falta so um passo para assinar a newsletter do La por Ai.',
    '',
    `Confirme sua inscricao: ${params.confirmUrl}`,
    '',
    `Cancelar inscricao: ${params.unsubscribeUrl}`,
  ].join('\n');

  return { subject, html, text };
}

export function renderResultPage(params: {
  title: string;
  message: string;
  ctaHref?: string;
  ctaLabel?: string;
}): string {
  const cta =
    params.ctaHref && params.ctaLabel
      ? `<p style="margin-top:24px;"><a href="${params.ctaHref}" style="display:inline-block;padding:12px 20px;background:#ad2c00;color:#fff;text-decoration:none;border-radius:8px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">${params.ctaLabel}</a></p>`
      : '';
  return `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${params.title}</title>
  </head>
  <body style="margin:0;background:#f8f5f3;font-family:Georgia,serif;color:#241f1d;">
    <main style="max-width:680px;margin:56px auto;padding:24px;">
      <section style="background:#fff;border-radius:14px;padding:28px;box-shadow:0 8px 24px rgba(0,0,0,0.08);">
        <h1 style="margin:0 0 12px;color:#8f1d00;">${params.title}</h1>
        <p style="font-size:16px;line-height:1.7;margin:0;">${params.message}</p>
        ${cta}
      </section>
    </main>
  </body>
</html>`;
}
