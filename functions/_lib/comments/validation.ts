import {
  COMMENT_BODY_MAX_LENGTH,
  COMMENT_EMAIL_MAX_LENGTH,
  COMMENT_NAME_MAX_LENGTH,
  COMMENT_SLUG_MAX_LENGTH,
  COMMENT_SOURCE_MAX_LENGTH,
  COMMENT_TITLE_MAX_LENGTH,
} from './config';
import { sanitizeCommentText, sanitizeName } from './sanitize';

export interface SubmitCommentInput {
  postSlug: string;
  postTitle: string | null;
  parentId: number | null;
  authorName: string;
  authorEmail: string | null;
  websiteUrlRaw: string;
  bodyRaw: string;
  honeypot: string;
  turnstileToken: string;
  source: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanString(value: unknown): string {
  return String(value ?? '').trim();
}

export async function parseSubmitCommentInput(request: Request): Promise<SubmitCommentInput> {
  const contentType = request.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    const body = (await request.json()) as Record<string, unknown>;
    return {
      postSlug: cleanString(body.post_slug),
      postTitle: cleanString(body.post_title) || null,
      parentId: Number.isInteger(body.parent_id) ? Number(body.parent_id) : null,
      authorName: cleanString(body.author_name),
      authorEmail: cleanString(body.author_email) || null,
      websiteUrlRaw: cleanString(body.website_url),
      bodyRaw: String(body.body ?? ''),
      honeypot: cleanString(body.company || body.honeypot),
      turnstileToken: cleanString(body.turnstile_token),
      source: cleanString(body.source || 'website_post'),
    };
  }

  const formData = await request.formData();
  const parentRaw = formData.get('parent_id');
  const parentId = parentRaw != null && String(parentRaw).trim() !== '' ? Number(parentRaw) : null;
  return {
    postSlug: cleanString(formData.get('post_slug')),
    postTitle: cleanString(formData.get('post_title')) || null,
    parentId: Number.isInteger(parentId) ? parentId : null,
    authorName: cleanString(formData.get('author_name')),
    authorEmail: cleanString(formData.get('author_email')) || null,
    websiteUrlRaw: cleanString(formData.get('website_url')),
    bodyRaw: String(formData.get('body') ?? ''),
    honeypot: cleanString(formData.get('company') || formData.get('honeypot')),
    turnstileToken: cleanString(formData.get('turnstile_token')),
    source: cleanString(formData.get('source') || 'website_post'),
  };
}

export function validateSubmitCommentInput(input: SubmitCommentInput): string[] {
  const errors: string[] = [];
  const postSlug = input.postSlug.trim();
  const authorName = sanitizeName(input.authorName);
  const body = sanitizeCommentText(input.bodyRaw);
  const source = input.source.trim();

  if (!postSlug) errors.push('Post nao informado.');
  if (postSlug.length > COMMENT_SLUG_MAX_LENGTH) errors.push('Identificador do post invalido.');

  if (!authorName) errors.push('Nome e obrigatorio.');
  if (authorName.length > COMMENT_NAME_MAX_LENGTH) errors.push('Nome muito longo.');

  if (!body) errors.push('Comentario vazio.');
  if (body.length > COMMENT_BODY_MAX_LENGTH) errors.push('Comentario muito longo.');

  if (input.postTitle && input.postTitle.length > COMMENT_TITLE_MAX_LENGTH) {
    errors.push('Titulo do post invalido.');
  }

  if (input.authorEmail && input.authorEmail.length > COMMENT_EMAIL_MAX_LENGTH) {
    errors.push('E-mail muito longo.');
  }
  if (input.authorEmail && !EMAIL_REGEX.test(input.authorEmail)) {
    errors.push('E-mail invalido.');
  }

  if (!source) errors.push('Origem invalida.');
  if (source.length > COMMENT_SOURCE_MAX_LENGTH) errors.push('Origem invalida.');

  if (!input.turnstileToken) errors.push('Verificacao anti-spam pendente.');

  return errors;
}
