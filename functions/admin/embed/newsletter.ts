const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex" />
  <title>Newsletter</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-size: 14px;
      background: #f6f8fa;
      color: #1a1a2e;
      min-height: 100vh;
    }

    .page {
      max-width: 760px;
      margin: 0 auto;
      padding: 28px 24px 64px;
    }

    h1 {
      font-size: 22px;
      font-weight: 700;
      color: #1a1a2e;
      margin-bottom: 4px;
    }

    .subtitle {
      font-size: 13px;
      color: #6e7894;
      margin-bottom: 24px;
    }

    .card {
      background: #fff;
      border: 1px solid #e1e4e8;
      border-radius: 8px;
      padding: 24px;
    }

    .field { margin-bottom: 18px; }

    .field-label {
      display: block;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #6e7894;
      margin-bottom: 6px;
    }

    input[type="text"],
    textarea {
      width: 100%;
      background: #fff;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      padding: 8px 10px;
      font-size: 13px;
      font-family: inherit;
      color: #1a1a2e;
    }

    input[type="text"]:focus,
    textarea:focus {
      outline: 2px solid #4f46e5;
      outline-offset: 1px;
      border-color: transparent;
    }

    textarea { resize: vertical; }

    .hint {
      font-size: 12px;
      color: #9ca3af;
      margin-top: 4px;
    }

    .divider {
      border: none;
      border-top: 1px solid #e1e4e8;
      margin: 20px 0;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 18px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.02em;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-family: inherit;
      transition: opacity 0.15s;
    }
    .btn:disabled { opacity: 0.55; cursor: not-allowed; }
    .btn-primary { background: #4f46e5; color: #fff; }
    .btn-primary:hover:not(:disabled) { background: #4338ca; }

    .feedback {
      margin-top: 16px;
      padding: 12px 14px;
      border-radius: 6px;
      font-size: 13px;
      display: none;
    }
    .feedback.visible { display: block; }
    .feedback.info    { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
    .feedback.success { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
    .feedback.error   { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }

    .auth-banner {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 8px;
      padding: 16px;
      font-size: 13px;
      color: #1d4ed8;
      margin-bottom: 20px;
      display: none;
    }
    .auth-banner.visible { display: block; }
  </style>
</head>
<body>
<div class="page">
  <h1>Newsletter</h1>
  <p class="subtitle">Send a campaign to all confirmed subscribers.</p>

  <div class="auth-banner" id="authBanner">
    Sign in to Decap CMS first — your GitHub identity is used to authorize this panel.
  </div>

  <div class="card">
    <div class="field">
      <span class="field-label">Subject</span>
      <input type="text" id="subject" placeholder="Email subject…" />
    </div>

    <div class="field">
      <span class="field-label">HTML body</span>
      <textarea id="html" rows="12" placeholder="Full HTML content of the email…"></textarea>
      <p class="hint">An unsubscribe footer is appended automatically.</p>
    </div>

    <div class="field">
      <span class="field-label">Plain text (optional)</span>
      <textarea id="text" rows="5" placeholder="Plain-text version (optional)…"></textarea>
    </div>

    <hr class="divider" />

    <button class="btn btn-primary" id="sendBtn" onclick="sendNewsletter()">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M22 2 11 13M22 2 15 22 11 13 2 9l20-7Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
      </svg>
      Send Campaign
    </button>

    <div class="feedback" id="feedback"></div>
  </div>
</div>

<script>
  var githubToken = null;

  window.addEventListener('message', function (e) {
    if (e.origin !== window.location.origin) return;
    if (e.data && e.data.type === 'LAPORAI_GITHUB_TOKEN') {
      githubToken = e.data.token;
      document.getElementById('authBanner').classList.remove('visible');
    }
  });

  (function tryParentStorage() {
    try {
      var raw = window.parent.localStorage.getItem('decap-cms-user');
      if (raw) { var u = JSON.parse(raw); if (u && u.token) { githubToken = u.token; return; } }
      var raw2 = window.parent.localStorage.getItem('cms.user');
      if (raw2) { var u2 = JSON.parse(raw2); if (u2 && u2.token) { githubToken = u2.token; return; } }
    } catch (_) {}
  })();

  if (!githubToken) document.getElementById('authBanner').classList.add('visible');

  function showFeedback(msg, type) {
    var el = document.getElementById('feedback');
    el.textContent = msg;
    el.className = 'feedback visible ' + (type || 'info');
  }

  async function sendNewsletter() {
    if (!githubToken) {
      try {
        var raw = window.parent.localStorage.getItem('decap-cms-user');
        if (raw) { var u = JSON.parse(raw); if (u && u.token) githubToken = u.token; }
      } catch(_){}
    }
    if (!githubToken) { showFeedback('GitHub token not available. Sign in to Decap CMS first.', 'error'); return; }

    var subject = document.getElementById('subject').value.trim();
    var html    = document.getElementById('html').value.trim();
    var text    = document.getElementById('text').value.trim();

    if (!subject || !html) { showFeedback('Subject and HTML body are required.', 'error'); return; }

    var btn = document.getElementById('sendBtn');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    try {
      var form = new FormData();
      form.append('subject', subject);
      form.append('html', html);
      if (text) form.append('text', text);

      var res = await fetch('/api/newsletter/admin', {
        method: 'POST',
        headers: { authorization: 'Bearer ' + githubToken },
        body: form,
      });

      var responseText = await res.text();
      // Backend returns a tiny HTML snippet; extract inner text for clean display
      var tmp = document.createElement('div');
      tmp.innerHTML = responseText;
      var msg = tmp.textContent.trim() || (res.ok ? 'Campaign sent successfully.' : 'Error sending campaign.');

      showFeedback(msg, res.ok ? 'success' : 'error');
      if (res.ok) {
        document.getElementById('subject').value = '';
        document.getElementById('html').value    = '';
        document.getElementById('text').value    = '';
      }
    } catch (e) {
      showFeedback('Network error: ' + e.message, 'error');
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M22 2 11 13M22 2 15 22 11 13 2 9l20-7Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg> Send Campaign';
    }
  }
</script>
</body>
</html>`;

export const onRequestGet = async (): Promise<Response> => {
  return new Response(HTML, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
};
