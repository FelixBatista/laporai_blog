import React from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../lib/posts';
import type { Post } from '../types';

function pickPost(posts: Post[], index: number) {
  if (posts.length === 0) return undefined;
  return posts[index] ?? posts[index % posts.length];
}

const Blog: React.FC = () => {
  const posts = getAllPosts();
  const featuredPost = pickPost(posts, 0);
  const latestPost = pickPost(posts, 1);
  const sidePost = pickPost(posts, 2);
  const footerHighlightPost = pickPost(posts, 3);
  const moreStories = posts.length > 4 ? posts.slice(4) : posts.slice(2);

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative px-8 py-12 max-w-7xl mx-auto mb-24">
        <div className="relative w-full aspect-[21/9] rounded-lg overflow-hidden editorial-shadow">
          <img
            alt="Expansive mountain lake landscape"
            className="w-full h-full object-cover"
            src={featuredPost?.image ?? 'https://picsum.photos/seed/blog/1400/600'}
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="md:-mt-24 md:ml-12 relative z-10 max-w-2xl bg-white/70 backdrop-blur-2xl p-8 md:p-12 editorial-shadow rounded-lg">
          <p className="font-label text-xs tracking-widest text-primary font-bold mb-4">PELO MUNDO</p>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-on-surface leading-none tracking-tight mb-6">
            Blog
          </h1>
          <p className="text-lg text-secondary leading-relaxed max-w-lg">
            Um diário de jornadas pelo horizonte. Documentando a interseção entre paisagem, herança local e os momentos de quietude entre destinos.
          </p>
        </div>
      </section>

      {/* Asymmetric Bento Grid of Stories */}
      <section className="px-8 max-w-7xl mx-auto space-y-24">
        {featuredPost && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden editorial-shadow">
                <img
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                  src={featuredPost.image}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="md:col-span-5 md:pl-12">
              <span className="font-label text-xs tracking-widest text-secondary uppercase mb-4 block">{featuredPost.category}</span>
              <Link to={`/post/${featuredPost.slug}`}>
                <h2 className="font-headline text-4xl font-bold text-on-surface mb-6 leading-tight hover:text-primary transition-colors cursor-pointer">
                  {featuredPost.title}
                </h2>
              </Link>
              <p className="text-secondary body-lg mb-8 leading-relaxed">{featuredPost.excerpt}</p>
              <Link className="inline-flex items-center gap-2 text-primary font-bold group" to={`/post/${featuredPost.slug}`}>
                READ THE LOGBOOK
                <span className="h-[2px] w-8 bg-primary transition-all group-hover:w-12"></span>
              </Link>
            </div>
          </div>
        )}

        {/* Tonal Shift Section */}
        <div className="bg-surface-container-low rounded-lg p-12 md:p-24 -mx-8 md:mx-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Column 1 */}
            <div className="space-y-8">
              <div className="aspect-square bg-white rounded-lg p-6 editorial-shadow flex flex-col justify-between">
                <div>
                  <span className="material-symbols-outlined text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>
                    explore
                  </span>
                  <h3 className="font-headline text-2xl font-bold mb-2">Mapas de Rota</h3>
                  <p className="text-sm text-secondary">Baixe minhas rotas de GPS personalizadas para trilhas remotas.</p>
                </div>
                <a className="text-xs font-bold tracking-widest uppercase border-b border-primary-container pb-1 inline-block w-fit" href="#">
                  Ver Mapas
                </a>
              </div>
              {sidePost && (
                <Link className="block space-y-4 group" to={`/post/${sidePost.slug}`}>
                  <img
                    alt={sidePost.title}
                    className="w-full aspect-video object-cover rounded-lg transition-transform duration-700 group-hover:scale-105"
                    src={sidePost.image}
                    referrerPolicy="no-referrer"
                  />
                  <h4 className="font-headline text-xl font-bold group-hover:text-primary transition-colors">{sidePost.title}</h4>
                  <p className="text-sm text-secondary line-clamp-2">{sidePost.excerpt}</p>
                </Link>
              )}
            </div>

            {/* Column 2 */}
            {latestPost && (
              <div className="lg:pt-24 space-y-8">
                <div className="space-y-4">
                  <h4 className="font-label text-xs tracking-widest text-primary font-bold">ÚLTIMA POSTAGEM</h4>
                  <h2 className="font-headline text-3xl font-bold leading-snug">
                    <Link className="hover:text-primary transition-colors" to={`/post/${latestPost.slug}`}>
                      {latestPost.title}
                    </Link>
                  </h2>
                  <p className="text-secondary leading-relaxed">{latestPost.excerpt}</p>
                </div>
                <Link className="aspect-[3/4] overflow-hidden rounded-lg editorial-shadow block" to={`/post/${latestPost.slug}`}>
                  <img
                    alt={latestPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    src={latestPost.image}
                    referrerPolicy="no-referrer"
                  />
                </Link>
              </div>
            )}

            {/* Column 3 */}
            <div className="space-y-8 lg:text-right">
              <div className="bg-primary p-8 rounded-lg editorial-shadow">
                <h3 className="font-headline text-2xl text-white font-bold mb-4">Fique por dentro</h3>
                <p className="text-primary-fixed text-sm mb-6 leading-relaxed">Receba minhas notas mensais sobre viagens e fotografia direto no seu e-mail.</p>
                <div className="relative">
                  <input className="w-full bg-white/10 border-none rounded-xl text-white placeholder:text-primary-fixed focus:ring-2 focus:ring-white py-3 px-4 transition-all" placeholder="Seu e-mail" type="email" />
                  <button className="absolute right-2 top-1.5 p-1.5 bg-white text-primary rounded-full">
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
              {footerHighlightPost && (
                <div className="pt-8">
                  <span className="font-label text-xs tracking-widest text-secondary uppercase mb-4 block">{footerHighlightPost.category}</span>
                  <Link to={`/post/${footerHighlightPost.slug}`}>
                    <h4 className="font-headline text-xl font-bold">{footerHighlightPost.title}</h4>
                  </Link>
                  <p className="text-sm text-secondary mt-2 line-clamp-3">{footerHighlightPost.excerpt}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* More Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          {(moreStories.length > 0 ? moreStories : posts.slice(0, 2)).map((post, index) => (
            <Link className={`group cursor-pointer ${index % 2 === 1 ? 'mt-12 md:mt-24' : ''}`} key={`${post.slug}-${index}`} to={`/post/${post.slug}`}>
              <div className="relative h-96 overflow-hidden rounded-lg mb-6">
                <img
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={post.image}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <span className="absolute top-6 left-6 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase">{post.category}</span>
              </div>
              <h3 className="font-headline text-3xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="text-secondary leading-relaxed">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;
