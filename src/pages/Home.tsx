import React from 'react';
import { Link } from 'react-router-dom';
import { formatPostDate, getAllPosts } from '../lib/posts';
import { subscribeToNewsletter, type SubscribeUiStatus } from '../lib/newsletter/client';
import type { Post } from '../types';

function pickPost(posts: Post[], index: number) {
  if (posts.length === 0) return undefined;
  return posts[index] ?? posts[index % posts.length];
}

const Home: React.FC = () => {
  const posts = getAllPosts();
  const [email, setEmail] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [status, setStatus] = React.useState<SubscribeUiStatus>('idle');
  const [feedback, setFeedback] = React.useState('');
  const heroPost = pickPost(posts, 0);
  const largeCardPost = pickPost(posts, 1) ?? heroPost;
  const sideCardPost = pickPost(posts, 2) ?? heroPost;
  const bottomCardPost = pickPost(posts, 3) ?? heroPost;

  const onSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setFeedback('');

    try {
      const response = await subscribeToNewsletter({
        email,
        company,
        source: 'website_home',
      });

      if (response.status === 'invalid_email') {
        setStatus('invalid_email');
        setFeedback(response.message);
        return;
      }
      if (response.status === 'already_subscribed') {
        setStatus('already_subscribed');
        setFeedback(response.message);
        return;
      }
      if (response.ok && response.status === 'success') {
        setStatus('success');
        setFeedback(response.message);
        setEmail('');
        setCompany('');
        return;
      }
      setStatus('error');
      setFeedback(response.message || 'Nao foi possivel concluir a inscricao.');
    } catch {
      setStatus('error');
      setFeedback('Nao foi possivel concluir a inscricao agora. Tente novamente.');
    }
  };

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative w-full h-[870px] overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <img 
            alt={heroPost?.title ?? 'Featured Story'}
            className="w-full h-full object-cover" 
            src={heroPost?.image ?? 'https://picsum.photos/seed/home-hero/1600/900'}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 via-transparent to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-8 pb-24 w-full">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-primary text-white text-[10px] font-bold tracking-[0.15em] mb-6 rounded-sm uppercase">Destaque</span>
            <h1 className="font-headline text-white text-5xl md:text-7xl font-bold leading-tight mb-8 -ml-1">
              {heroPost?.title ?? 'Post em destaque'}
            </h1>
            <div className="flex items-center gap-6">
              <Link
                className="bg-gradient-to-br from-primary to-primary-container text-white px-8 py-4 rounded-xl text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-opacity"
                to={heroPost ? `/post/${heroPost.slug}` : '/blog'}
              >
                Ler a história
              </Link>
              <div className="h-[1px] w-12 bg-white/40"></div>
              <span className="text-white/80 text-sm font-medium italic">
                {heroPost ? `Por ${heroPost.author.name}` : 'Novas histórias em breve'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Recent Posts */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="font-headline text-4xl font-bold text-on-surface mb-4">Postagens Recentes</h2>
            <p className="text-secondary max-w-md">Perspectivas curadas sobre o mundo através das minhas lentes e descobertas.</p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-surface-container-high text-on-surface text-xs font-bold uppercase tracking-wider rounded-full hover:bg-surface-dim transition-colors">Recentes</button>
            <button className="px-6 py-2 text-secondary text-xs font-bold uppercase tracking-wider hover:text-primary transition-colors">Populares</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Large Featured Card */}
          <div className="md:col-span-8 group">
            <div className="aspect-[16/9] mb-8 overflow-hidden rounded-xl bg-surface-container-low">
              <img
                alt={largeCardPost?.title ?? 'Post recente'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                src={largeCardPost?.image ?? 'https://picsum.photos/seed/home-large/1200/700'}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex gap-4 text-[10px] font-bold tracking-widest text-primary uppercase mb-4">
              <span>{largeCardPost?.category ?? 'Editorial'}</span>
              <span className="text-outline-variant">•</span>
              <span className="text-secondary">{largeCardPost ? formatPostDate(largeCardPost.date) : '-'}</span>
            </div>
            <Link to={largeCardPost ? `/post/${largeCardPost.slug}` : '/blog'}>
              <h3 className="font-headline text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                {largeCardPost?.title ?? 'Novas histórias em breve'}
              </h3>
            </Link>
            <p className="text-on-surface-variant leading-relaxed max-w-2xl">
              {largeCardPost?.excerpt ?? 'Acompanhe os próximos relatos publicados no blog.'}
            </p>
          </div>
          {/* Side Card 1 */}
          <div className="md:col-span-4 flex flex-col group">
            <div className="aspect-square mb-6 overflow-hidden rounded-xl bg-surface-container-low">
              <img
                alt={sideCardPost?.title ?? 'Post de viagem'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                src={sideCardPost?.image ?? 'https://picsum.photos/seed/home-side/700/700'}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-[10px] font-bold tracking-widest text-primary uppercase mb-3">{sideCardPost?.category ?? 'Viagem'}</div>
            <Link to={sideCardPost ? `/post/${sideCardPost.slug}` : '/blog'}>
              <h3 className="font-headline text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                {sideCardPost?.title ?? 'História em atualização'}
              </h3>
            </Link>
            <Link className="text-xs font-bold uppercase tracking-widest text-on-surface border-b border-primary w-fit pb-1" to={sideCardPost ? `/post/${sideCardPost.slug}` : '/blog'}>
              Explorar
            </Link>
          </div>
          {/* Asymmetric Bottom Row */}
          <div className="md:col-span-4 group mt-8">
            <div className="aspect-[4/5] mb-6 overflow-hidden rounded-xl bg-surface-container-low">
              <img
                alt={bottomCardPost?.title ?? 'Post de fotografia'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                src={bottomCardPost?.image ?? 'https://picsum.photos/seed/home-bottom/800/1000'}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-[10px] font-bold tracking-widest text-primary uppercase mb-3">{bottomCardPost?.category ?? 'Fotografia'}</div>
            <Link to={bottomCardPost ? `/post/${bottomCardPost.slug}` : '/blog'}>
              <h3 className="font-headline text-xl font-bold group-hover:text-primary transition-colors">
                {bottomCardPost?.title ?? 'Novo olhar em breve'}
              </h3>
            </Link>
          </div>
          <div className="md:col-span-8 bg-surface-container-low rounded-xl p-12 mt-8 flex flex-col justify-center items-center text-center">
            <div className="max-w-md">
              <span className="material-symbols-outlined text-primary mb-6 text-4xl" style={{ fontVariationSettings: "'FILL' 0" }}>auto_awesome</span>
              <h3 className="font-headline text-2xl font-bold mb-6 italic">"A fotografia é a única linguagem que pode ser entendida em qualquer lugar do mundo."</h3>
              <p className="text-secondary text-sm mb-8">— Bruno Barbey</p>
              <Link className="text-primary text-xs font-bold uppercase tracking-[0.2em] border-b-2 border-primary/20 hover:border-primary transition-colors pb-1" to="/blog">
                Ver Galeria
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Tonal Shift Section */}
      <section className="bg-surface-container-low py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square bg-surface-container-highest rounded-xl overflow-hidden relative z-10">
                <img 
                  alt="Join Newsletter" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIuTC138Vv8opZbY2wd0RThKXWsj-K7wNISdPyNApwxjr_3w3rURpg0aqYGLH6HZ3cvazaVX8CAqpdGYX9YNSOqsCNoK5XCHAYzguUJSc2i11FVV2QzPJ8uTuH6GN5IWHFqVd8-_aKjv5U84mu6XXfFhZzUwT5mz69l-dL0IPbmGb_9gu_bor4mFy37eEcroThwWhfDzbkIAcJ3YT67fTOvHA-mdN5YtaRnCrNbZuOXI4gHqBLw-lkOl1x3FQTVWY-091v8-aXaxE"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-xl -z-0"></div>
            </div>
            <div className="space-y-8">
              <h2 className="font-headline text-4xl font-bold leading-tight">Novidades por e-mail.<br /><span className="text-primary">Direto na sua caixa.</span></h2>
              <p className="text-secondary leading-relaxed">Junte-se a outros entusiastas que recebem minhas atualizações semanais sobre viagens, fotografia e inspirações. Sem spam, apenas conteúdo.</p>
              <form className="flex flex-col gap-4" onSubmit={onSubscribe}>
                <div className="relative">
                  <input
                    className="w-full bg-surface-container-lowest border-none rounded-xl py-4 px-6 focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-slate-400"
                    placeholder="Seu endereço de e-mail"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    required
                    disabled={status === 'loading'}
                  />
                </div>
                <input
                  type="text"
                  name="company"
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                <button
                  className="w-full bg-primary text-white font-bold py-4 rounded-xl uppercase tracking-widest text-xs hover:bg-primary-container transition-colors disabled:opacity-70"
                  type="submit"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Enviando...' : 'Inscrever-se'}
                </button>
              </form>
              {status !== 'idle' && (
                <p className={`text-xs ${status === 'success' || status === 'already_subscribed' ? 'text-green-700' : 'text-red-600'}`}>
                  {feedback}
                </p>
              )}
              <p className="text-[10px] text-slate-400 italic">Respeitando sua privacidade. Cancele quando quiser.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
