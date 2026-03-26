import type { Post } from '../types';

type PostFile = Omit<Post, 'id' | 'slug' | 'tags'> & {
  tags: string[] | string;
};

const modules = import.meta.glob('../content/posts/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, PostFile>;

function slugFromPath(path: string) {
  return path.split('/').pop()?.replace(/\.json$/, '') ?? '';
}

function normalizePostTags(value: string[] | string): string[] {
  if (Array.isArray(value)) return value;
  return value ? [value] : [];
}

function parseReadMinutes(readTime: string): number {
  const m = readTime.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

export function getAllPosts(): Post[] {
  return Object.entries(modules)
    .map(([path, data]) => {
      const slug = slugFromPath(path);

      return {
        id: slug,
        slug,
        ...data,
        tags: normalizePostTags(data.tags),
      };
    })
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

/** Home “Recentes” vs “Populares”: recent = newest first; popular = popularity, then longer read time, then date. */
export function sortPostsForHome(posts: Post[], mode: 'recent' | 'popular'): Post[] {
  const copy = [...posts];
  if (mode === 'recent') {
    return copy.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  return copy.sort((a, b) => {
    const pa = a.popularity ?? 0;
    const pb = b.popularity ?? 0;
    if (pb !== pa) return pb - pa;
    const ra = parseReadMinutes(a.readTime);
    const rb = parseReadMinutes(b.readTime);
    if (rb !== ra) return rb - ra;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

function normalizeTag(value: string): string {
  return value.trim().toUpperCase();
}

export function hasPostTag(post: Post, tag: string): boolean {
  const normalized = normalizeTag(tag);
  return post.tags.some((item) => normalizeTag(item) === normalized);
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) => hasPostTag(post, tag));
}

export function getBlogPosts(): Post[] {
  return getPostsByTag('BLOG');
}

export function getPhotographyPosts(): Post[] {
  return getPostsByTag('PHOTOGRAPHY');
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function formatPostDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}