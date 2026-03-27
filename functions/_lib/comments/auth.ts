import { assertGitHubPushAccess } from '../github-admin-auth';
import type { CommentsEnv } from './types';

export async function requireCommentsAdminAuth(
  request: Request,
  env: CommentsEnv
): Promise<Response | null> {
  return assertGitHubPushAccess(request, env);
}
