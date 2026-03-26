const STYLE = `
  :root {
    --color-primary: #ad2c00;
    --color-on-surface: #0d1c2f;
    --color-background: #f8f9ff;
    --color-surface-container-low: #eff4ff;
    --color-surface-container: #e6eeff;
    --color-surface-container-high: #dde9ff;
    --color-outline-variant: #e4beb4;
    --color-secondary: #515f74;
    --color-error: #ba1a1a;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: "Inter", sans-serif;
    background: var(--color-background);
    color: var(--color-on-surface);
    min-height: 100vh;
  }

  .topbar {
    position: sticky;
    top: 0;
    z-index: 10;
    background: #0d1c2f;
    padding: 0 24px;
    height: 56px;
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .topbar a {
    color: rgba(255,255,255,0.75);
    text-decoration: none;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.02em;
    transition: color 0.15s;
  }

  .topbar a:hover { color: #fff; }

  .topbar a.active { color: #fff; font-weight: 700; }

  .topbar-brand {
    font-family: "Noto Serif", serif;
    color: #fff;
    font-weight: 700;
    font-size: 15px;
    margin-right: auto;
    text-decoration: none !important;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 24px 80px;
  }

  h1 {
    font-family: "Noto Serif", serif;
    font-size: 32px;
    font-weight: 800;
    margin-bottom: 8px;
  }

  .subtitle {
    color: var(--color-secondary);
    font-size: 14px;
    margin-bottom: 32px;
  }

  .card {
    background: var(--color-surface-container-low);
    border: 1px solid rgba(228,190,180,0.4);
    border-radius: 12px;
    padding: 28px;
  }

  .field { margin-bottom: 20px; }

  .label-text {
    display: block;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-secondary);
    margin-bottom: 6px;
  }

  input[type="password"],
  input[type="text"] {
    width: 100%;
    background: #fff;
    border: 1px solid rgba(228,190,180,0.4);
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 14px;
    font-family: inherit;
    color: var(--color-on-surface);
    outline: none;
    transition: border-color 0.15s;
  }

  textarea {
    width: 100%;
    background: #fff;
    border: 1px solid rgba(228,190,180,0.4);
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 14px;
    font-family: inherit;
    color: var(--color-on-surface);
    outline: none;
    transition: border-color 0.15s;
    resize: vertical;
  }

  input:focus, textarea:focus { border-color: var(--color-primary); }

  .hint {
    font-size: 12px;
    color: var(--color-secondary);
    margin-top: 4px;
  }

  .actions { display: flex; gap: 12px; align-items: center; margin-top: 24px; }

  .btn {
    padding: 12px 24px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: opacity 0.15s;
  }

  .btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .btn-primary { background: var(--color-on-surface); color: #fff; }
  .btn-primary:hover:not(:disabled) { opacity: 0.85; }

  .feedback {
    margin-top: 20px;
    padding: 14px 16px;
    border-radius: 8px;
    font-size: 14px;
    background: var(--color-surface-container);
    border: 1px solid rgba(228,190,180,0.3);
    display: none;
  }

  .feedback.visible { display: block; }
  .feedback.success { background: #d8f5e2; color: #1a5c36; border-color: #a8dbb8; }
  .feedback.error { background: #ffdad6; color: var(--color-error); border-color: #ffb3ad; }

  .divider {
    border: none;
    border-top: 1px solid rgba(228,190,180,0.4);
    margin: 28px 0;
  }

  .subscriber-count {
    font-size: 13px;
    color: var(--color-secondary);
    font-style: italic;
  }
`;

const PAGE_HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex" />
  <title>Newsletter — Admin</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <style>${STYLE}</style>
</head>
<body>
  <nav class="topbar">
    <a href="/admin" class="topbar-brand">Lá por Aí</a>
    <a href="/admin">CMS</a>
    <a href="/admin/comments">Comentários</a>
    <a href="/admin/newsletter" class="active">Newsletter</a>
  </nav>

  <div class="container">
    <h1>Envio de Newsletter</h1>
    <p class="subtitle">Envio interno de campanhas para assinantes confirmados.</p>

    <div class="card">
      <div class="field">
        <span class="label-text">Segredo admin</span>
        <input type="password" id="secret" placeholder="NEWSLETTER_ADMIN_SECRET" />
      </div>

      <hr class="divider" />

      <div class="field">
        <span class="label-text">Assunto</span>
        <input type="text" id="subject" placeholder="Assunto do email..." />
      </div>

      <div class="field">
        <span class="label-text">HTML do email</span>
        <textarea id="html" rows="12" placeholder="Conteúdo HTML completo do email..."></textarea>
        <p class="hint">O rodapé de cancelamento de inscrição será adicionado automaticamente.</p>
      </div>

      <div class="field">
        <span class="label-text">Texto simples (opcional)</span>
        <textarea id="text" rows="5" placeholder="Versão em texto simples (opcional)..."></textarea>
      </div>

      <div class="actions">
        <button class="btn btn-primary" id="sendBtn" onclick="sendNewsletter()">Enviar Newsletter</button>
        <span class="subscriber-count" id="statusText"></span>
      </div>

      <div class="feedback" id="feedback"></div>
    </div>
  </div>

  <script>
    const SECRET_KEY = 'newsletter_admin_secret';

    const secretInput = document.getElementById('secret');
    const feedbackEl = document.getElementById('feedback');
    const sendBtn = document.getElementById('sendBtn');
    const statusText = document.getElementById('statusText');

    const savedSecret = sessionStorage.getItem(SECRET_KEY);
    if (savedSecret) secretInput.value = savedSecret;

    secretInput.addEventListener('change', () => {
      sessionStorage.setItem(SECRET_KEY, secretInput.value);
    });

    function showFeedback(msg, type) {
      feedbackEl.innerHTML = msg;
      feedbackEl.className = 'feedback visible ' + (type || '');
    }

    async function sendNewsletter() {
      const secret = secretInput.value.trim();
      sessionStorage.setItem(SECRET_KEY, secret);

      if (!secret) { showFeedback('Informe o segredo de administração.', 'error'); return; }

      const subject = document.getElementById('subject').value.trim();
      const html = document.getElementById('html').value.trim();
      const text = document.getElementById('text').value.trim();

      if (!subject || !html) {
        showFeedback('Assunto e HTML são obrigatórios.', 'error');
        return;
      }

      sendBtn.disabled = true;
      sendBtn.textContent = 'Enviando...';
      statusText.textContent = '';

      try {
        const formData = new FormData();
        formData.append('subject', subject);
        formData.append('html', html);
        if (text) formData.append('text', text);

        const res = await fetch('/api/newsletter/admin', {
          method: 'POST',
          headers: { authorization: 'Bearer ' + secret },
          body: formData,
        });

        const responseHtml = await res.text();

        if (res.ok) {
          // Extract the message from the HTML response
          const msgMatch = responseHtml.match(/<p[^>]*style[^>]*>([^<]+)<\\/p>/i);
          const msg = msgMatch ? msgMatch[1] : 'Campanha enviada com sucesso!';
          showFeedback(msg, 'success');
          document.getElementById('subject').value = '';
          document.getElementById('html').value = '';
          document.getElementById('text').value = '';
        } else {
          const msgMatch = responseHtml.match(/<p[^>]*style[^>]*>([^<]+)<\\/p>/i);
          const msg = msgMatch ? msgMatch[1] : 'Erro ao enviar a campanha.';
          showFeedback(msg, 'error');
        }
      } catch (e) {
        showFeedback('Erro de rede: ' + e.message, 'error');
      } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = 'Enviar Newsletter';
      }
    }
  </script>
</body>
</html>`;

export const onRequestGet = async (): Promise<Response> => {
  return new Response(PAGE_HTML, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
};
