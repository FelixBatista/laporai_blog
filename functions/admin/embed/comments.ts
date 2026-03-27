const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex" />
  <title>Comments</title>
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
      max-width: 860px;
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

    /* Filter bar */
    .filter-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: flex-end;
      background: #fff;
      border: 1px solid #e1e4e8;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 20px;
    }

    .filter-bar label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #6e7894;
    }

    select {
      background: #fff;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      padding: 7px 10px;
      font-size: 13px;
      font-family: inherit;
      color: #1a1a2e;
      cursor: pointer;
      min-width: 130px;
    }

    select:focus { outline: 2px solid #4f46e5; outline-offset: 1px; }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 14px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.02em;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: opacity 0.15s;
      font-family: inherit;
    }
    .btn:disabled { opacity: 0.55; cursor: not-allowed; }

    .btn-primary { background: #4f46e5; color: #fff; }
    .btn-primary:hover:not(:disabled) { background: #4338ca; }

    .btn-ghost {
      background: #f3f4f6;
      color: #374151;
      border: 1px solid #e1e4e8;
    }
    .btn-ghost:hover:not(:disabled) { background: #e5e7eb; }

    .btn-danger { background: #fee2e2; color: #b91c1c; }
    .btn-danger:hover:not(:disabled) { background: #fecaca; }

    /* Status badge */
    .badge {
      display: inline-block;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.04em;
      padding: 2px 7px;
      border-radius: 12px;
      text-transform: capitalize;
    }
    .badge-pending  { background: #fff7ed; color: #c2410c; }
    .badge-approved { background: #f0fdf4; color: #15803d; }
    .badge-rejected { background: #f9fafb; color: #6b7280; }
    .badge-spam     { background: #fef2f2; color: #b91c1c; }
    .badge-deleted  { background: #f9fafb; color: #9ca3af; }

    /* Comment cards */
    .comment-list { display: flex; flex-direction: column; gap: 14px; }

    .comment-card {
      background: #fff;
      border: 1px solid #e1e4e8;
      border-radius: 8px;
      padding: 16px;
    }

    .comment-header {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-start;
      gap: 8px;
      margin-bottom: 12px;
    }

    .comment-author { font-weight: 700; font-size: 14px; }
    .comment-meta   { font-size: 12px; color: #6e7894; margin-top: 2px; }

    textarea.body-edit {
      width: 100%;
      min-height: 88px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      padding: 8px 10px;
      font-size: 13px;
      font-family: inherit;
      resize: vertical;
      margin-bottom: 8px;
      color: #1a1a2e;
    }
    textarea.body-edit:focus { outline: 2px solid #4f46e5; outline-offset: 1px; border-color: transparent; }

    input.reason-input {
      width: 100%;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      padding: 7px 10px;
      font-size: 13px;
      font-family: inherit;
      margin-bottom: 10px;
      color: #1a1a2e;
    }
    input.reason-input:focus { outline: 2px solid #4f46e5; outline-offset: 1px; border-color: transparent; }

    .action-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    /* Feedback bar */
    .feedback {
      font-size: 13px;
      padding: 10px 14px;
      border-radius: 6px;
      margin-top: 12px;
      display: none;
    }
    .feedback.visible { display: block; }
    .feedback.info    { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
    .feedback.success { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
    .feedback.error   { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }

    .empty {
      text-align: center;
      padding: 40px 0;
      color: #9ca3af;
      font-size: 13px;
    }

    .load-more { text-align: center; margin-top: 20px; }

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
  <h1>Comments</h1>
  <p class="subtitle">Moderate, approve, reject, or remove reader comments.</p>

  <div class="auth-banner" id="authBanner">
    Sign in to Decap CMS first — your GitHub identity is used to authorize this panel.
  </div>

  <div class="filter-bar">
    <label>
      Status
      <select id="statusFilter">
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
        <option value="spam">Spam</option>
        <option value="deleted">Deleted</option>
        <option value="all">All</option>
      </select>
    </label>
    <div style="display:flex;align-items:flex-end;">
      <button class="btn btn-primary" id="loadBtn" onclick="loadComments(null)">Load</button>
    </div>
    <div id="filterFeedback" class="feedback" style="margin-top:0;flex:1 1 100%;"></div>
  </div>

  <div id="commentList" class="comment-list"></div>
  <div class="load-more" id="loadMore" style="display:none;">
    <button class="btn btn-ghost" id="loadMoreBtn">Load more</button>
  </div>
</div>

<script>
  var githubToken = null;
  var nextCursor  = null;

  // Receive GitHub token from parent Decap window
  window.addEventListener('message', function (e) {
    if (e.origin !== window.location.origin) return;
    if (e.data && e.data.type === 'LAPORAI_GITHUB_TOKEN') {
      githubToken = e.data.token;
      document.getElementById('authBanner').classList.remove('visible');
    }
  });

  // Also try reading directly from parent storage (same origin)
  (function tryParentStorage() {
    try {
      var raw = window.parent.localStorage.getItem('decap-cms-user');
      if (raw) { var u = JSON.parse(raw); if (u && u.token) { githubToken = u.token; return; } }
      var raw2 = window.parent.localStorage.getItem('cms.user');
      if (raw2) { var u2 = JSON.parse(raw2); if (u2 && u2.token) { githubToken = u2.token; return; } }
    } catch (_) {}
  })();

  if (!githubToken) document.getElementById('authBanner').classList.add('visible');

  function showFilterFeedback(msg, type) {
    var el = document.getElementById('filterFeedback');
    el.textContent = msg;
    el.className = 'feedback visible ' + (type || 'info');
  }

  document.getElementById('loadMoreBtn').addEventListener('click', function () {
    loadComments(nextCursor, true);
  });

  function setLoading(on) {
    document.getElementById('loadBtn').disabled = on;
    document.getElementById('loadMoreBtn').disabled = on;
    document.getElementById('loadBtn').textContent = on ? 'Loading…' : 'Load';
  }

  function escHtml(s) {
    return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function fmtDate(s) {
    try { return new Intl.DateTimeFormat('pt-BR',{dateStyle:'short',timeStyle:'short'}).format(new Date(s)); }
    catch(_){ return s; }
  }
  function badgeClass(status) {
    return 'badge badge-' + (status || 'pending');
  }

  async function loadComments(cursor, append) {
    if (!githubToken) {
      // Try again from parent
      try {
        var raw = window.parent.localStorage.getItem('decap-cms-user');
        if (raw) { var u = JSON.parse(raw); if (u && u.token) githubToken = u.token; }
      } catch(_){}
    }
    if (!githubToken) {
      showFilterFeedback('GitHub token not available. Please sign in to Decap CMS first.', 'error');
      return;
    }
    document.getElementById('authBanner').classList.remove('visible');

    setLoading(true);
    var status = document.getElementById('statusFilter').value;
    var url = new URL('/api/comments/admin/list', location.origin);
    url.searchParams.set('status', status);
    url.searchParams.set('limit', '20');
    if (cursor) url.searchParams.set('cursor', cursor);

    try {
      var res = await fetch(url.toString(), {
        headers: { authorization: 'Bearer ' + githubToken }
      });
      var json = await res.json();
      if (!res.ok) { showFilterFeedback(json.message || 'Error loading comments.', 'error'); return; }

      nextCursor = json.next_cursor;
      document.getElementById('loadMore').style.display = nextCursor ? 'block' : 'none';
      renderComments(json.comments, append);
    } catch (e) {
      showFilterFeedback('Network error: ' + e.message, 'error');
    } finally {
      setLoading(false);
    }
  }

  function renderComments(comments, append) {
    var list = document.getElementById('commentList');
    if (!append) list.innerHTML = '';
    if (!append && comments.length === 0) {
      list.innerHTML = '<p class="empty">No comments found for this filter.</p>';
      return;
    }
    comments.forEach(function (c) {
      var div = document.createElement('div');
      div.className = 'comment-card';
      div.id = 'c-' + c.id;
      div.innerHTML =
        '<div class="comment-header">' +
          '<div>' +
            '<div class="comment-author">#' + escHtml(c.id) + ' — ' + escHtml(c.author_name) + '</div>' +
            '<div class="comment-meta">Post: ' + escHtml(c.post_slug) +
              ' &nbsp;·&nbsp; <span class="' + badgeClass(c.status) + '">' + escHtml(c.status) + '</span>' +
              ' &nbsp;·&nbsp; ' + fmtDate(c.created_at) +
              (c.author_email ? ' &nbsp;·&nbsp; ' + escHtml(c.author_email) : '') +
            '</div>' +
          '</div>' +
        '</div>' +
        '<textarea class="body-edit" id="body-' + c.id + '">' + escHtml(c.body_raw) + '</textarea>' +
        '<input class="reason-input" id="reason-' + c.id + '" type="text" placeholder="Reason for action (optional)" />' +
        '<div class="action-row">' +
          '<button class="btn btn-ghost"   onclick="moderate(' + c.id + ',\'approve\')">Approve</button>' +
          '<button class="btn btn-ghost"   onclick="moderate(' + c.id + ',\'reject\')">Reject</button>' +
          '<button class="btn btn-ghost"   onclick="moderate(' + c.id + ',\'spam\')">Spam</button>' +
          '<button class="btn btn-danger"  onclick="moderate(' + c.id + ',\'delete\')">Delete</button>' +
        '</div>';
      list.appendChild(div);
    });
  }

  async function moderate(commentId, action) {
    if (!githubToken) { showFilterFeedback('No GitHub token.', 'error'); return; }
    var body   = document.getElementById('body-'   + commentId)?.value;
    var reason = document.getElementById('reason-' + commentId)?.value;

    setLoading(true);
    try {
      var res = await fetch('/api/comments/admin/moderate', {
        method: 'POST',
        headers: { authorization: 'Bearer ' + githubToken, 'content-type': 'application/json' },
        body: JSON.stringify({ comment_id: commentId, action: action, reason: reason, edited_body: body }),
      });
      var json = await res.json();
      showFilterFeedback(json.message || (res.ok ? 'Done.' : 'Error.'), res.ok ? 'success' : 'error');
      if (res.ok) {
        var card = document.getElementById('c-' + commentId);
        if (card) { card.style.opacity = '0'; card.style.transition = 'opacity 0.3s'; setTimeout(function(){ card.remove(); }, 300); }
      }
    } catch (e) {
      showFilterFeedback('Network error: ' + e.message, 'error');
    } finally {
      setLoading(false);
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
