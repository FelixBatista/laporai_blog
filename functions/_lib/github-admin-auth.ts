// Authorizes admin API calls by verifying the caller's GitHub OAuth token
// has push access to the configured repository. This reuses the same identity
// as Decap CMS — no separate admin secrets needed.

export interface GitHubAuthEnv {
  // Plain env var, e.g. "FelixBatista/laporai_blog". Falls back to config.
  GITHUB_REPOSITORY?: string;
}

const DEFAULT_REPO = 'FelixBatista/laporai_blog';

function extractBearerToken(request: Request): string | null {
  const header = request.headers.get('authorization');
  if (header?.startsWith('Bearer ')) return header.slice('Bearer '.length).trim();
  return null;
}

export async function assertGitHubPushAccess(
  request: Request,
  env: GitHubAuthEnv
): Promise<Response | null> {
  const token = extractBearerToken(request);
  if (!token) {
    return new Response(JSON.stringify({ ok: false, message: 'No authorization token provided.' }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    });
  }

  const repo = (env.GITHUB_REPOSITORY ?? DEFAULT_REPO).trim();
  let data: Record<string, unknown>;

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'laporai-admin/1.0',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    if (res.status === 401) {
      return new Response(JSON.stringify({ ok: false, message: 'Invalid GitHub token.' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      });
    }

    if (!res.ok) {
      return new Response(JSON.stringify({ ok: false, message: 'GitHub authorization failed.' }), {
        status: 403,
        headers: { 'content-type': 'application/json' },
      });
    }

    data = (await res.json()) as Record<string, unknown>;
  } catch {
    return new Response(JSON.stringify({ ok: false, message: 'Could not verify GitHub token.' }), {
      status: 503,
      headers: { 'content-type': 'application/json' },
    });
  }

  const perms = data.permissions as Record<string, boolean> | undefined;
  const hasPush = perms?.push === true || perms?.admin === true;

  if (!hasPush) {
    return new Response(JSON.stringify({ ok: false, message: 'Forbidden: push access required.' }), {
      status: 403,
      headers: { 'content-type': 'application/json' },
    });
  }

  return null; // authorized
}
