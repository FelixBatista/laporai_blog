const STYLE = `
  :root {
    --color-primary: #ad2c00;
    --color-on-surface: #0d1c2f;
    --color-background: #f8f9ff;
    --color-surface: #f8f9ff;
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

  .topbar a.active {
    color: #fff;
    font-weight: 700;
  }

  .topbar-brand {
    font-family: "Noto Serif", serif;
    color: #fff;
    font-weight: 700;
    font-size: 15px;
    margin-right: auto;
    text-decoration: none !important;
  }

  .container {
    max-width: 880px;
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
    padding: 24px;
    margin-bottom: 32px;
  }

  .grid-3 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    margin-bottom: 16px;
  }

  label { display: block; }

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
  input[type="text"],
  select,
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
  }

  input:focus, select:focus, textarea:focus {
    border-color: var(--color-primary);
  }

  .btn {
    display: inline-block;
    padding: 10px 20px;
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

  .btn-primary {
    background: var(--color-on-surface);
    color: #fff;
  }

  .btn-secondary {
    background: var(--color-surface-container-high);
    color: var(--color-on-surface);
  }

  .btn-secondary:hover { background: #d5e3fd; }

  .btn-danger {
    background: #ffdad6;
    color: var(--color-error);
  }

  .feedback {
    font-size: 12px;
    padding: 10px 14px;
    border-radius: 8px;
    background: var(--color-surface-container);
    border: 1px solid rgba(228,190,180,0.3);
    margin-top: 12px;
    display: none;
  }

  .feedback.visible { display: block; }
  .feedback.error { background: #ffdad6; color: var(--color-error); }

  .comment-list { display: flex; flex-direction: column; gap: 20px; }

  .comment-card {
    background: #fff;
    border: 1px solid rgba(228,190,180,0.3);
    border-radius: 12px;
    padding: 20px;
  }

  .comment-meta {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 12px;
  }

  .comment-author { font-weight: 700; font-size: 15px; }

  .comment-info {
    font-size: 12px;
    color: var(--color-secondary);
    margin-top: 2px;
  }

  textarea.body-edit {
    min-height: 100px;
    margin-bottom: 10px;
    resize: vertical;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
  }

  .empty-state {
    color: var(--color-secondary);
    font-size: 14px;
    text-align: center;
    padding: 48px 0;
  }

  .load-more {
    text-align: center;
    margin-top: 24px;
  }

  .status-badge {
    display: inline-block;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 2px 8px;
    border-radius: 4px;
    background: var(--color-surface-container);
    color: var(--color-secondary);
  }
`;

const PAGE_HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex" />
  <title>Comentários — Admin</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <style>${STYLE}</style>
</head>
<body>
  <nav class="topbar">
    <a href="/admin" class="topbar-brand">Lá por Aí</a>
    <a href="/admin">CMS</a>
    <a href="/admin/comments" class="active">Comentários</a>
    <a href="/admin/newsletter">Newsletter</a>
  </nav>

  <div class="container">
    <h1>Moderação de Comentários</h1>
    <p class="subtitle">Aprovar, rejeitar, marcar spam e remover comentários.</p>

    <div class="card">
      <div class="grid-3">
        <label>
          <span class="label-text">Segredo admin</span>
          <input type="password" id="secret" placeholder="COMMENTS_ADMIN_SECRET" />
        </label>
        <label>
          <span class="label-text">Status</span>
          <select id="statusFilter">
            <option value="pending">Pendentes</option>
            <option value="approved">Aprovados</option>
            <option value="rejected">Rejeitados</option>
            <option value="spam">Spam</option>
            <option value="deleted">Removidos</option>
            <option value="all">Todos</option>
          </select>
        </label>
        <div style="display:flex;align-items:flex-end;">
          <button class="btn btn-primary" id="loadBtn" onclick="loadComments(null)">Carregar</button>
        </div>
      </div>
      <div class="feedback" id="feedback"></div>
    </div>

    <div id="commentList" class="comment-list"></div>
    <div class="load-more" id="loadMore" style="display:none;">
      <button class="btn btn-secondary" id="loadMoreBtn">Carregar mais</button>
    </div>
  </div>

  <script>
    const SECRET_KEY = 'comments_admin_secret';

    const secretInput = document.getElementById('secret');
    const feedbackEl = document.getElementById('feedback');
    const listEl = document.getElementById('commentList');
    const loadMoreEl = document.getElementById('loadMore');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const loadBtn = document.getElementById('loadBtn');

    let nextCursor = null;

    // Restore secret from sessionStorage
    const savedSecret = sessionStorage.getItem(SECRET_KEY);
    if (savedSecret) secretInput.value = savedSecret;

    secretInput.addEventListener('change', () => {
      sessionStorage.setItem(SECRET_KEY, secretInput.value);
    });

    function showFeedback(msg, isError) {
      feedbackEl.textContent = msg;
      feedbackEl.className = 'feedback visible' + (isError ? ' error' : '');
    }

    function hideFeedback() {
      feedbackEl.className = 'feedback';
    }

    function setLoading(on) {
      loadBtn.disabled = on;
      loadMoreBtn.disabled = on;
      loadBtn.textContent = on ? 'Carregando...' : 'Carregar';
    }

    async function loadComments(cursor, append) {
      const secret = secretInput.value.trim();
      sessionStorage.setItem(SECRET_KEY, secret);
      if (!secret) { showFeedback('Informe o segredo de administração.', true); return; }

      hideFeedback();
      setLoading(true);
      try {
        const status = document.getElementById('statusFilter').value;
        const url = new URL('/api/comments/admin/list', location.origin);
        url.searchParams.set('status', status);
        url.searchParams.set('limit', '20');
        if (cursor) url.searchParams.set('cursor', cursor);

        const res = await fetch(url.toString(), {
          headers: { authorization: 'Bearer ' + secret }
        });
        const json = await res.json();
        if (!res.ok) { showFeedback(json.message || 'Erro ao carregar.', true); return; }

        nextCursor = json.next_cursor;
        loadMoreEl.style.display = nextCursor ? 'block' : 'none';
        renderComments(json.comments, append);
      } catch (e) {
        showFeedback('Erro de rede: ' + e.message, true);
      } finally {
        setLoading(false);
      }
    }

    loadMoreBtn.addEventListener('click', () => loadComments(nextCursor, true));

    function escHtml(s) {
      return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }

    function fmtDate(s) {
      try {
        return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(s));
      } catch { return s; }
    }

    function renderComments(comments, append) {
      if (!append) listEl.innerHTML = '';
      if (!append && comments.length === 0) {
        listEl.innerHTML = '<p class="empty-state">Nenhum comentário encontrado para esse filtro.</p>';
        return;
      }
      comments.forEach(c => {
        const div = document.createElement('div');
        div.className = 'comment-card';
        div.id = 'c-' + c.id;
        div.innerHTML = \`
          <div class="comment-meta">
            <div>
              <div class="comment-author">#\${escHtml(c.id)} — \${escHtml(c.author_name)}</div>
              <div class="comment-info">
                Post: \${escHtml(c.post_slug)}
                &nbsp;·&nbsp; <span class="status-badge">\${escHtml(c.status)}</span>
                &nbsp;·&nbsp; \${fmtDate(c.created_at)}
                \${c.author_email ? '&nbsp;·&nbsp; ' + escHtml(c.author_email) : ''}
              </div>
            </div>
          </div>
          <textarea class="body-edit" id="body-\${c.id}">\${escHtml(c.body_raw)}</textarea>
          <input type="text" id="reason-\${c.id}" placeholder="Motivo da ação (opcional)" />
          <div class="actions">
            <button class="btn btn-secondary" onclick="moderate(\${c.id},'approve')">Aprovar</button>
            <button class="btn btn-secondary" onclick="moderate(\${c.id},'reject')">Rejeitar</button>
            <button class="btn btn-secondary" onclick="moderate(\${c.id},'spam')">Spam</button>
            <button class="btn btn-danger" onclick="moderate(\${c.id},'delete')">Excluir</button>
          </div>
        \`;
        listEl.appendChild(div);
      });
    }

    async function moderate(commentId, action) {
      const secret = secretInput.value.trim();
      sessionStorage.setItem(SECRET_KEY, secret);
      if (!secret) { showFeedback('Informe o segredo de administração.', true); return; }

      const editedBody = document.getElementById('body-' + commentId)?.value;
      const reason = document.getElementById('reason-' + commentId)?.value;

      setLoading(true);
      hideFeedback();
      try {
        const res = await fetch('/api/comments/admin/moderate', {
          method: 'POST',
          headers: {
            authorization: 'Bearer ' + secret,
            'content-type': 'application/json',
          },
          body: JSON.stringify({ comment_id: commentId, action, reason, edited_body: editedBody }),
        });
        const json = await res.json();
        showFeedback(json.message || (res.ok ? 'Ação aplicada.' : 'Erro.'), !res.ok);
        if (res.ok) {
          // Remove the comment card from view
          const card = document.getElementById('c-' + commentId);
          if (card) card.remove();
        }
      } catch (e) {
        showFeedback('Erro de rede: ' + e.message, true);
      } finally {
        setLoading(false);
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
