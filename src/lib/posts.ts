import type { Post } from '../types';

type PostFile = Omit<Post, 'id' | 'slug'>;

const modules = import.meta.glob('../content/posts/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, PostFile>;

function slugFromPath(path: string) {
  return path.split('/').pop()?.replace(/\.json$/, '') ?? '';
}

export function getAllPosts(): Post[] {
  return Object.entries(modules)
    .map(([path, data]) => {
      const slug = slugFromPath(path);

      return {
        id: slug,
        slug,
        ...data,
      };
    })
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
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