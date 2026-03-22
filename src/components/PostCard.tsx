import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, featured }) => {
  if (featured) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-surface-container-lowest rounded-2xl overflow-hidden editorial-shadow mb-12"
      >
        <div className="aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="p-8 lg:p-16 space-y-6">
          <div className="flex items-center space-x-4">
            <span className="font-label text-[10px] font-bold tracking-[0.2em] text-primary uppercase">{post.category}</span>
            <span className="w-1 h-1 rounded-full bg-outline-variant" />
            <span className="font-label text-[10px] font-bold tracking-[0.2em] text-secondary uppercase">{post.readTime}</span>
          </div>
          <h2 className="font-headline text-4xl lg:text-6xl font-bold leading-tight text-balance">
            {post.title}
          </h2>
          <p className="text-secondary text-lg leading-relaxed max-w-xl">
            {post.excerpt}
          </p>
          <Link 
            to={`/post/${post.id}`}
            className="inline-flex items-center space-x-3 font-label text-xs font-bold tracking-widest text-primary hover:translate-x-2 transition-transform"
          >
            <span>READ THE DISPATCH</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex flex-col space-y-6"
    >
      <div className="aspect-[4/3] rounded-xl overflow-hidden editorial-shadow">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <span className="font-label text-[9px] font-bold tracking-[0.2em] text-primary uppercase">{post.category}</span>
          <span className="w-1 h-1 rounded-full bg-outline-variant" />
          <span className="font-label text-[9px] font-bold tracking-[0.2em] text-secondary uppercase">{post.date}</span>
        </div>
        <h3 className="font-headline text-2xl font-bold leading-snug group-hover:text-primary transition-colors">
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </h3>
        <p className="text-secondary text-sm leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
      </div>
    </motion.div>
  );
};

export default PostCard;
