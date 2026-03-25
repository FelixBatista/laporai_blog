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