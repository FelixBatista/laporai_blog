import React from 'react';
import { Photo } from '../types';
import { motion } from 'motion/react';
import { Maximize2 } from 'lucide-react';

interface PhotoCardProps {
  photo: Photo;
  onClick: (photo: Photo) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer editorial-shadow"
      onClick={() => onClick(photo)}
    >
      <img 
        src={photo.image} 
        alt={photo.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-on-surface/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <div className="flex justify-between items-end">
          <div className="text-white">
            <p className="font-label text-[10px] font-bold tracking-widest uppercase opacity-70 mb-1">{photo.location}</p>
            <h4 className="font-headline text-lg font-bold">{photo.title}</h4>
          </div>
          <div className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white">
            <Maximize2 size={16} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PhotoCard;
