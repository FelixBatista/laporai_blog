import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TurnstileWidget from '../components/TurnstileWidget';
import { listComments, submitComment } from '../lib/comments/client';
import type { PublicComment, SubmitCommentUiStatus } from '../lib/comments/types';
import { getAllPosts } from '../lib/posts';
import type { Post } from '../types';

const FALLBACK_POST: Post = {
  id: 'fallback',
  slug: 'fallback',
  title: 'The Silent Breath of the Misty Highlands',
  excerpt:
    "In the heart of the Highlands, time doesn't tick. It exhales.",
  body: '',
  category: 'Travel',
  date: new Date().toISOString(),
  readTime: '12 MIN READ',
  image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD1l6-fjUpwtg0-r_mznjFAJtprxw0uAO9PKx6D34Vsmp8XJnFWw6vGNL3pXJXnn5nC_-eWqCYVIUxcgbWCHT-6C3hcCqteP5kIxBtU1eRvTKoIjQbOiralj3cbmdrqjpBlrBj2FF8ED5-c5DQOTZIYuBeXs6UykqHeY5Q0oYcj51QQGA93u6FK1CbJUQ-5i1icNjSEmQ4sRKux2wwRgkCAJiJmIU5S_5y08-bKbddqnnHe2K1wRx8tStDRaBv5rfdbaebZU-A9k-w',
  tags: ['SCOTLAND', 'SLOWTRAVEL', 'PHOTOGRAPHY'],
  author: {
    name: 'Elena Vance',
    role: 'Senior Curator & Photographer',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCrlItcH3URM0AFSrrQvgbYYw87WJlYj2wQGqoAuQt_SFYBEbtK8EFXxI9JJV4DWcvKP15tX0Gj6884LnyYec_1DG0OLk49k9WBUa-c-08GRsb__Zm04G0JiXItFGJlXV77HWQWAW3R5bEn9DEAdh6nZr9AYb3bqz4eD_bnUbLJP6sGFU_0JuuQgqV9tiJrnyYHmc9NOHXMZ2phuMZh9yGydrNNC51DExR1NTF-pvDyeLZMDpmLFroQTePOn7sXalVRWyTDbtW4LEE',
  },
};

function extractPlainTextChunks(value: string): string[] {
  return value
    .replace(/<\/(h[1-6]|p|li|blockquote|div|figure|ul|ol)>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .split(/\n{2,}/)
    .map((part) =>
      part
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/_(.*?)_/g, '$1')
        .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
        .trim(),
    )
    .filter(Boolean);
}

function pickParagraphs(chunks: string[], start: number, count: number, fallback: string[]) {
  const selected = chunks.slice(start, start + count);
  return selected.length > 0 ? selected : fallback;
}

function formatCommentDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

const PostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getAllPosts().find((item) => item.slug === slug || item.id === slug) ?? FALLBACK_POST;
  const [comments, setComments] = useState<PublicComment[]>([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const [commentsCursor, setCommentsCursor] = useState<string | null>(null);
  const [loadingComments, setLoadingComments] = useState(true);
  const [commentsError, setCommentsError] = useState('');
  const [turnstileSiteKey, setTurnstileSiteKey] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');

  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [websiteInput, setWebsiteInput] = useState('');
  const [commentInput, setCommentInput] = useState('');
  const [honeypotInput, setHoneypotInput] = useState('');
  const [submitStatus, setSubmitStatus] = useState<SubmitCommentUiStatus>('idle');
  const [submitFeedback, setSubmitFeedback] = useState('');
  const chunks = extractPlainTextChunks(post.body);

  const introQuote = chunks[0] ?? post.excerpt;
  const introParagraphs = pickParagraphs(chunks, 1, 2, [post.excerpt]);
  const middleParagraphs = pickParagraphs(chunks, 3, 2, introParagraphs);
  const finalParagraphs = pickParagraphs(chunks, 5, 2, middleParagraphs);
  const extraParagraphs = chunks.slice(7);

  const loadInitialComments = useCallback(async () => {
    setLoadingComments(true);
    setCommentsError('');
    try {
      const response = await listComments({ slug: post.slug, limit: 10 });
      setComments(response.comments);
      setCommentsCount(response.total_approved);
      setCommentsCursor(response.next_cursor);
      setTurnstileSiteKey(response.turnstile_site_key || '');
      setTurnstileToken('');
    } catch {
      setComments([]);
      setCommentsCount(0);
      setCommentsCursor(null);
      setCommentsError('Nao foi possivel carregar os comentarios neste momento.');
    } finally {
      setLoadingComments(false);
    }
  }, [post.slug]);

  useEffect(() => {
    void loadInitialComments();
  }, [loadInitialComments]);

  async function handleLoadMoreComments() {
    if (!commentsCursor) return;
    try {
      const response = await listComments({
        slug: post.slug,
        limit: 10,
        cursor: commentsCursor,
      });
      setComments((current) => [...current, ...response.comments]);
      setCommentsCursor(response.next_cursor);
      setCommentsCount(response.total_approved);
    } catch {
      setCommentsError('Nao foi possivel carregar mais comentarios.');
    }
  }

  async function handleSubmitComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = nameInput.trim();
    const trimmedComment = commentInput.trim();
    if (!trimmedName || !trimmedComment) {
      setSubmitStatus('validation_error');
      setSubmitFeedback('Nome e comentario sao obrigatorios.');
      return;
    }
    if (!turnstileToken) {
      setSubmitStatus('validation_error');
      setSubmitFeedback('Confirme o desafio anti-spam para continuar.');
      return;
    }

    setSubmitStatus('loading');
    setSubmitFeedback('');

    try {
      const response = await submitComment({
        post_slug: post.slug,
        post_title: post.title,
        author_name: trimmedName,
        author_email: emailInput,
        website_url: websiteInput,
        body: trimmedComment,
        source: 'website_post_detail',
        company: honeypotInput,
        turnstile_token: turnstileToken,
      });

      if (!response.ok && response.status === 'validation_error') {
        setSubmitStatus('validation_error');
        setSubmitFeedback(response.message);
        return;
      }

      if (response.ok && response.status === 'success') {
        setSubmitStatus('success');
        setSubmitFeedback(response.message);
        setCommentInput('');
        setWebsiteInput('');
        setEmailInput('');
        setHoneypotInput('');
        setTurnstileToken('');
        await loadInitialComments();
        return;
      }

      if (response.ok && response.status === 'pending_moderation') {
        setSubmitStatus('pending_moderation');
        setSubmitFeedback(response.message);
        setCommentInput('');
        setWebsiteInput('');
        setEmailInput('');
        setHoneypotInput('');
        setTurnstileToken('');
        return;
      }

      setSubmitStatus('error');
      setSubmitFeedback(response.message || 'Nao foi possivel enviar seu comentario agora.');
    } catch {
      setSubmitStatus('error');
      setSubmitFeedback('Nao foi possivel enviar seu comentario agora. Tente novamente em instantes.');
    }
  }

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[870px] w-full overflow-hidden">
        <img
          alt={post.title}
          className="w-full h-full object-cover"
          src={post.image}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface/90"></div>
      </section>

      {/* Article Header Content */}
      <article className="relative -mt-40 z-10 px-6 max-w-4xl mx-auto">
        <div className="bg-surface-container-lowest p-12 lg:p-20 rounded-xl shadow-2xl shadow-on-surface/5">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase font-label">{post.category}</span>
            <span className="w-8 h-[1px] bg-outline-variant/30"></span>
            <span className="text-xs font-medium text-secondary font-label">{post.readTime}</span>
          </div>
          <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl text-center leading-[1.1] text-on-surface font-bold tracking-tight mb-12">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 mb-16 border-b border-outline-variant/10 pb-12">
            {post.author.avatar ? (
              <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-high">
                <img
                  alt={post.author.name}
                  src={post.author.avatar}
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary">person</span>
              </div>
            )}
            <div className="text-left">
              <p className="text-sm font-bold text-on-surface">{post.author.name}</p>
              <p className="text-xs text-secondary">{post.author.role}</p>
            </div>
          </div>

          {/* Introduction Text */}
          <div className="prose prose-slate lg:prose-xl max-w-none">
            <p className="font-headline text-2xl text-on-surface/80 leading-relaxed italic mb-12 border-l-4 border-primary pl-8">
              "{introQuote}"
            </p>
            <div className="font-body text-lg leading-relaxed text-on-surface space-y-8">
              {introParagraphs.map((paragraph, index) => (
                <p key={`intro-${index}`}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Integrated Asymmetric Image Section */}
      <section className="mt-24 mb-24 max-w-7xl mx-auto px-6 grid grid-cols-12 gap-8 items-center">
        <div className="col-span-12 md:col-span-7 rounded-lg overflow-hidden shadow-xl">
          <img
            alt={post.title}
            src={post.image}
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="col-span-12 md:col-span-4 md:col-start-9">
          <h3 className="font-headline text-3xl mb-6 text-on-surface">Caminhos do Relato</h3>
          <p className="font-body text-secondary leading-relaxed italic">
            "{post.excerpt}"
          </p>
        </div>
      </section>

      {/* Continuing Narrative */}
      <article className="max-w-2xl mx-auto px-6 mb-24">
        <h2 className="font-headline text-4xl mb-8 text-on-surface font-bold">A Travessia</h2>
        <div className="font-body text-lg leading-relaxed text-on-surface space-y-8">
          {middleParagraphs.map((paragraph, index) => (
            <p key={`middle-${index}`}>{paragraph}</p>
          ))}
        </div>
      </article>

      {/* Middle Full Width Image Callout */}
      <section className="w-full bg-surface-container-low py-24 mb-24">
        <div className="max-w-4xl mx-auto px-6">
          <img
            alt={post.title}
            className="w-full h-[500px] object-cover rounded-xl mb-12 shadow-inner"
            src={post.image}
            referrerPolicy="no-referrer"
          />
          <div className="text-center">
            <span className="text-xs font-bold tracking-widest text-primary uppercase">NOTA DO AUTOR</span>
            <p className="font-headline text-2xl mt-4 text-on-surface">{post.excerpt}</p>
          </div>
        </div>
      </section>

      {/* Final Thoughts */}
      <article className="max-w-2xl mx-auto px-6 mb-24">
        <h2 className="font-headline text-4xl mb-8 text-on-surface font-bold">Conclusões</h2>
        <div className="font-body text-lg leading-relaxed text-on-surface space-y-8">
          {finalParagraphs.map((paragraph, index) => (
            <p key={`final-${index}`}>{paragraph}</p>
          ))}
        </div>

        {extraParagraphs.length > 0 && (
          <div className="font-body text-lg leading-relaxed text-on-surface space-y-8 mt-12">
            {extraParagraphs.map((paragraph, index) => (
              <p key={`extra-${index}`}>{paragraph}</p>
            ))}
          </div>
        )}

        {/* Tags & Share */}
        <div className="mt-20 pt-12 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-6">
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="px-4 py-2 bg-surface-container-high rounded-full text-xs font-bold font-label text-on-secondary-container">
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold font-label text-secondary">COMPARTILHAR</span>
            <button className="p-2 text-on-surface hover:text-primary transition-colors">
              <span className="material-symbols-outlined">share</span>
            </button>
            <button className="p-2 text-on-surface hover:text-primary transition-colors">
              <span className="material-symbols-outlined">bookmark</span>
            </button>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <section className="max-w-2xl mx-auto px-6 mb-32">
        <div className="border-t border-outline-variant/20 pt-16">
          <h3 className="font-headline text-3xl text-on-surface font-bold mb-12">
            Reflexoes <span className="text-secondary text-xl">({commentsCount})</span>
          </h3>
          {/* Existing Comments */}
          <div className="space-y-12 mb-20">
            {loadingComments ? (
              <p className="text-on-surface/70 font-body leading-relaxed">Carregando comentarios...</p>
            ) : commentsError ? (
              <p className="text-red-600 font-body leading-relaxed">{commentsError}</p>
            ) : comments.length === 0 ? (
              <p className="text-on-surface/70 font-body leading-relaxed">
                Ainda não há comentários neste post. Seja a primeira pessoa a compartilhar uma reflexão.
              </p>
            ) : (
              comments.map((item) => (
                <div className="group" key={item.id}>
                  <div className="flex justify-between items-baseline mb-4">
                    {item.website_url ? (
                      <a
                        className="font-bold text-on-surface font-body hover:text-primary transition-colors"
                        href={item.website_url}
                        target="_blank"
                        rel="noopener noreferrer nofollow ugc"
                      >
                        {item.author_name}
                      </a>
                    ) : (
                      <span className="font-bold text-on-surface font-body">{item.author_name}</span>
                    )}
                    <span className="text-xs text-secondary font-label uppercase tracking-wider">
                      {formatCommentDate(item.created_at)}
                    </span>
                  </div>
                  <div
                    className="text-on-surface/80 font-body leading-relaxed space-y-4"
                    dangerouslySetInnerHTML={{ __html: item.body_html }}
                  />
                </div>
              ))
            )}
          </div>
          {commentsCursor && !loadingComments && (
            <div className="mb-10">
              <button
                className="text-xs uppercase tracking-widest font-bold text-primary hover:text-on-surface transition-colors"
                type="button"
                onClick={handleLoadMoreComments}
              >
                Carregar mais comentarios
              </button>
            </div>
          )}

          {/* Comment Form */}
          <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10">
            <h4 className="font-headline text-xl text-on-surface mb-6">Deixe uma Reflexão</h4>
            <form className="space-y-4" onSubmit={handleSubmitComment}>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-widest font-label" htmlFor="name">Nome</label>
                <input
                  className="w-full bg-white border border-outline-variant/20 p-3 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm transition-all"
                  id="name"
                  placeholder="Seu nome"
                  type="text"
                  value={nameInput}
                  onChange={(event) => setNameInput(event.target.value)}
                  required
                  disabled={submitStatus === 'loading'}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-widest font-label" htmlFor="email">E-mail (opcional)</label>
                <input
                  className="w-full bg-white border border-outline-variant/20 p-3 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm transition-all"
                  id="email"
                  placeholder="voce@email.com"
                  type="email"
                  value={emailInput}
                  onChange={(event) => setEmailInput(event.target.value)}
                  autoComplete="email"
                  disabled={submitStatus === 'loading'}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-widest font-label" htmlFor="website">Site (opcional)</label>
                <input
                  className="w-full bg-white border border-outline-variant/20 p-3 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm transition-all"
                  id="website"
                  placeholder="https://seusite.com"
                  type="url"
                  value={websiteInput}
                  onChange={(event) => setWebsiteInput(event.target.value)}
                  autoComplete="url"
                  disabled={submitStatus === 'loading'}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-widest font-label" htmlFor="comment">Comentário</label>
                <textarea
                  className="w-full bg-white border border-outline-variant/20 p-3 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm transition-all resize-none"
                  id="comment"
                  placeholder="Compartilhe seus pensamentos..."
                  rows={5}
                  value={commentInput}
                  onChange={(event) => setCommentInput(event.target.value)}
                  required
                  disabled={submitStatus === 'loading'}
                ></textarea>
              </div>
              <input
                type="text"
                name="company"
                value={honeypotInput}
                onChange={(event) => setHoneypotInput(event.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              <div className="space-y-3">
                {turnstileSiteKey ? (
                  <TurnstileWidget siteKey={turnstileSiteKey} onTokenChange={setTurnstileToken} />
                ) : (
                  <p className="text-xs text-red-600">Protecao anti-spam indisponivel. Verifique a configuracao do Turnstile.</p>
                )}
                <p className="text-[10px] text-slate-500">
                  Ao enviar, voce concorda com a publicacao da sua mensagem e com a moderacao para prevencao de spam.
                </p>
              </div>
              <div className="pt-2">
                <button
                  className="bg-on-surface text-white font-bold py-3 px-8 rounded-lg hover:bg-primary transition-all uppercase tracking-widest text-[10px] disabled:opacity-70"
                  type="submit"
                  disabled={submitStatus === 'loading'}
                >
                  {submitStatus === 'loading' ? 'Enviando...' : 'Postar Reflexao'}
                </button>
              </div>
              {submitStatus !== 'idle' && (
                <p
                  className={`text-xs ${
                    submitStatus === 'success'
                      ? 'text-green-700'
                      : submitStatus === 'pending_moderation'
                        ? 'text-amber-700'
                        : 'text-red-600'
                  }`}
                >
                  {submitFeedback}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="max-w-5xl mx-auto px-6 mb-32">
        <div className="bg-primary p-12 lg:p-20 rounded-xl relative overflow-hidden group">
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-headline text-4xl text-white mb-6">Fique por dentro</h2>
              <p className="text-white/80 font-body text-lg">Histórias semanais, guias de fotografia e reflexões de viagem entregues no seu e-mail.</p>
            </div>
            <div>
              <form className="flex flex-col gap-4">
                <input className="bg-white/10 border-0 focus:ring-2 focus:ring-white/50 text-white placeholder:text-white/60 p-4 rounded-lg backdrop-blur-sm" placeholder="Seu endereço de e-mail" type="email" />
                <button className="bg-white text-primary font-bold py-4 px-8 rounded-lg hover:bg-surface transition-all uppercase tracking-widest text-sm" type="submit">Inscrever-se Agora</button>
              </form>
            </div>
          </div>
          {/* Abstract Grain/Texture Gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-container to-primary opacity-50 mix-blend-multiply"></div>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 pb-20">
        <Link className="inline-flex items-center gap-2 text-primary font-bold" to="/blog">
          <span className="material-symbols-outlined">arrow_back</span>
          Voltar ao blog
        </Link>
      </section>
    </main>
  );
};

export default PostDetail;
