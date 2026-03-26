import React from 'react';
import { listAdminComments, moderateComment } from '../lib/comments/client';
import type { AdminComment, AdminCommentStatus, AdminModerationAction } from '../lib/comments/types';

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
}

const STATUS_OPTIONS: Array<{ id: AdminCommentStatus | 'all'; label: string }> = [
  { id: 'pending', label: 'Pendentes' },
  { id: 'approved', label: 'Aprovados' },
  { id: 'rejected', label: 'Rejeitados' },
  { id: 'spam', label: 'Spam' },
  { id: 'deleted', label: 'Removidos' },
  { id: 'all', label: 'Todos' },
];

const ACTION_OPTIONS: Array<{ id: AdminModerationAction; label: string }> = [
  { id: 'approve', label: 'Aprovar' },
  { id: 'reject', label: 'Rejeitar' },
  { id: 'spam', label: 'Marcar spam' },
  { id: 'delete', label: 'Excluir (soft)' },
];

const CommentsAdmin: React.FC = () => {
  const [secret, setSecret] = React.useState('');
  const [status, setStatus] = React.useState<AdminCommentStatus | 'all'>('pending');
  const [comments, setComments] = React.useState<AdminComment[]>([]);
  const [nextCursor, setNextCursor] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [feedback, setFeedback] = React.useState('');
  const [reasonById, setReasonById] = React.useState<Record<number, string>>({});
  const [editById, setEditById] = React.useState<Record<number, string>>({});

  const loadComments = React.useCallback(
    async (cursor?: string | null, append = false) => {
      if (!secret) {
        setFeedback('Informe o segredo de administracao para carregar os comentarios.');
        return;
      }
      setLoading(true);
      setFeedback('');
      try {
        const response = await listAdminComments({
          secret,
          status,
          cursor: cursor ?? undefined,
          limit: 20,
        });
        setComments((current) => (append ? [...current, ...response.comments] : response.comments));
        setNextCursor(response.next_cursor);
      } catch (error) {
        setFeedback(error instanceof Error ? error.message : 'Nao foi possivel carregar a moderacao.');
      } finally {
        setLoading(false);
      }
    },
    [secret, status]
  );

  const onModerate = React.useCallback(
    async (commentId: number, action: AdminModerationAction) => {
      if (!secret) {
        setFeedback('Informe o segredo de administracao.');
        return;
      }
      const editedBody = editById[commentId];
      const reason = reasonById[commentId];
      setLoading(true);
      setFeedback('');
      try {
        const result = await moderateComment({
          secret,
          comment_id: commentId,
          action,
          reason,
          edited_body: editedBody,
        });
        if (!result.ok) {
          setFeedback(result.message);
          return;
        }
        setFeedback(result.message);
        await loadComments(null, false);
      } finally {
        setLoading(false);
      }
    },
    [secret, editById, reasonById, loadComments]
  );

  return (
    <main className="pt-20 pb-20">
      <section className="max-w-5xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-bold text-on-surface mb-3">Moderacao de Comentarios</h1>
          <p className="text-secondary">
            Fluxo interno protegido por segredo para aprovar, rejeitar, marcar spam e remover comentarios.
          </p>
        </div>

        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 space-y-4 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <label className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-secondary font-bold">Segredo admin</span>
              <input
                type="password"
                className="w-full bg-white border border-outline-variant/20 p-3 rounded-lg text-sm"
                value={secret}
                onChange={(event) => setSecret(event.target.value)}
                placeholder="COMMENTS_ADMIN_SECRET"
              />
            </label>
            <label className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-secondary font-bold">Status</span>
              <select
                className="w-full bg-white border border-outline-variant/20 p-3 rounded-lg text-sm"
                value={status}
                onChange={(event) => setStatus(event.target.value as AdminCommentStatus | 'all')}
              >
                {STATUS_OPTIONS.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => void loadComments(null, false)}
                className="bg-on-surface text-white font-bold py-3 px-6 rounded-lg uppercase tracking-widest text-[10px] disabled:opacity-70"
                disabled={loading}
              >
                {loading ? 'Carregando...' : 'Carregar'}
              </button>
            </div>
          </div>
          {feedback ? <p className="text-xs text-on-surface/80">{feedback}</p> : null}
        </div>

        <div className="space-y-6">
          {comments.length === 0 ? (
            <p className="text-on-surface/70">Nenhum comentario encontrado para esse filtro.</p>
          ) : (
            comments.map((comment) => (
              <article key={comment.id} className="bg-white border border-outline-variant/20 rounded-xl p-5 space-y-4">
                <div className="flex flex-wrap justify-between gap-3">
                  <div>
                    <p className="font-bold text-on-surface">
                      #{comment.id} - {comment.author_name}
                    </p>
                    <p className="text-xs text-secondary">
                      Post: {comment.post_slug} | Status: {comment.status} | Criado: {formatDate(comment.created_at)}
                    </p>
                  </div>
                  <div className="text-xs text-secondary">
                    {comment.author_email ? <p>Email: {comment.author_email}</p> : null}
                    {comment.website_url ? <p>Site: {comment.website_url}</p> : null}
                  </div>
                </div>

                <textarea
                  className="w-full min-h-28 bg-surface-container-low border border-outline-variant/20 p-3 rounded-lg text-sm"
                  value={editById[comment.id] ?? comment.body_raw}
                  onChange={(event) =>
                    setEditById((current) => ({
                      ...current,
                      [comment.id]: event.target.value,
                    }))
                  }
                />
                <input
                  className="w-full bg-surface-container-low border border-outline-variant/20 p-3 rounded-lg text-sm"
                  placeholder="Motivo da acao (opcional)"
                  value={reasonById[comment.id] ?? ''}
                  onChange={(event) =>
                    setReasonById((current) => ({
                      ...current,
                      [comment.id]: event.target.value,
                    }))
                  }
                />

                <div className="flex flex-wrap gap-2">
                  {ACTION_OPTIONS.map((action) => (
                    <button
                      key={action.id}
                      type="button"
                      className="px-3 py-2 text-[10px] uppercase tracking-widest font-bold rounded-md bg-surface-container-high hover:bg-surface-container-highest"
                      onClick={() => void onModerate(comment.id, action.id)}
                      disabled={loading}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </article>
            ))
          )}
        </div>

        {nextCursor ? (
          <div className="mt-8">
            <button
              type="button"
              className="text-xs uppercase tracking-widest font-bold text-primary"
              onClick={() => void loadComments(nextCursor, true)}
              disabled={loading}
            >
              Carregar mais
            </button>
          </div>
        ) : null}
      </section>
    </main>
  );
};

export default CommentsAdmin;
