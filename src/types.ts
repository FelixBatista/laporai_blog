export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface Photo {
  id: string;
  title: string;
  location: string;
  camera: string;
  lens: string;
  image: string;
  category: string;
}