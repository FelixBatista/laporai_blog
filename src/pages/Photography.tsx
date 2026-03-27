import React, { useState } from 'react';
import { Photo } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { getPhotographyPosts } from '../lib/posts';

const Photography: React.FC = () => {
  const photoPosts = getPhotographyPosts();
  const photos: Photo[] = photoPosts.map((post) => ({
    id: post.id,
    title: post.title,
    location: post.category || 'Sem localização definida',
    camera: 'Autor',
    lens: post.author.name,
    image: post.image,
    category: post.category || 'Photograph',
  }));

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
    document.body.style.overflow = 'auto';
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null && photos.length > 0) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % photos.length);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null && photos.length > 0) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + photos.length) % photos.length);
    }
  };

  const selectedPhoto = selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null;

  return (
    <main className="pt-32 max-w-7xl mx-auto px-8">
      {/* Hero Section: Editorial Asymmetry */}
      <section className="mb-24">
        <div className="flex flex-col md:flex-row items-end gap-12">
          <div className="w-full md:w-7/12 relative">
            <img 
              alt="Majestic mountain peaks at dawn" 
              className="w-full h-[600px] object-cover rounded-lg shadow-sm" 
              src="/uploads/placeholder.svg"
            />
            <div className="absolute -bottom-8 -right-8 bg-surface-bright/70 backdrop-blur-xl p-8 max-w-xs hidden md:block rounded-lg shadow-sm">
              <p className="font-label text-xs tracking-widest text-primary font-bold uppercase mb-2">Série em Destaque</p>
              <p className="font-body text-sm leading-relaxed text-secondary">Capturado durante a hora dourada nos Alpes Suíços, explorando a interseção entre luz e escala.</p>
            </div>
          </div>
          <div className="w-full md:w-5/12 pb-12">
            <h1 className="font-headline text-6xl md:text-7xl leading-tight font-bold tracking-tighter text-on-surface mb-6">
              Galeria <span className="text-primary block">— O Olhar Vivo</span>
            </h1>
            <p className="font-body text-lg text-secondary leading-relaxed max-w-md">
              Um arquivo curado de momentos onde a luz, a arquitetura e o espírito humano convergem em brilho de alta definição.
            </p>
          </div>
        </div>
      </section>

      {/* Bento Gallery Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-24">
        {photos.slice(0, 5).map((photo, index) => {
          let colSpan = "md:col-span-4";
          let height = "h-[336px]";
          
          if (index === 0) {
            colSpan = "md:col-span-4";
            height = "h-[700px]";
          } else if (index === 1) {
            colSpan = "md:col-span-8";
            height = "h-[340px]";
          } else if (index === 4) {
            colSpan = "md:col-span-12 mt-2";
            height = "h-[500px]";
          }

          return (
            <div 
              key={photo.id} 
              className={`${colSpan} group cursor-pointer`}
              onClick={() => openLightbox(index)}
            >
              <div className={`relative overflow-hidden rounded-lg bg-surface-container-low ${height}`}>
                <img 
                  alt={photo.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  src={photo.image}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                  <span className="font-label text-white text-xs tracking-widest font-bold uppercase">{photo.category}</span>
                  <h3 className="font-headline text-2xl text-white mt-2">{photo.title}</h3>
                </div>
              </div>
            </div>
          );
        })}
        {photos.length === 0 && (
          <div className="md:col-span-12 bg-surface-container-low rounded-lg p-10 text-center text-secondary">
            Ainda não há conteúdos com a tag <strong>PHOTOGRAPHY</strong>. Crie no Decap CMS para aparecer aqui.
          </div>
        )}
      </section>

      {photos.length > 5 && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {photos.slice(5).map((photo, index) => {
            const lightboxIndex = index + 5;
            return (
              <div
                key={photo.id}
                className="group cursor-pointer"
                onClick={() => openLightbox(lightboxIndex)}
              >
                <div className="relative overflow-hidden rounded-lg bg-surface-container-low h-[300px]">
                  <img
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={photo.image}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <span className="font-label text-white text-xs tracking-widest font-bold uppercase">{photo.category}</span>
                    <h3 className="font-headline text-lg text-white mt-1">{photo.title}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Newsletter / CTA: Tonal Layering */}
      <section className="bg-surface-container-low rounded-lg p-12 md:p-24 flex flex-col items-center text-center">
        <span className="font-label text-xs tracking-[0.2em] text-primary font-bold uppercase mb-6">Inspire-se</span>
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-surface mb-8 max-w-2xl leading-tight">Junte-se ao blog para receber narrativas visuais semanais.</h2>
        <div className="w-full max-w-md flex flex-col md:flex-row gap-4">
          <input className="flex-grow bg-surface-container-lowest border-none rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary transition-all" placeholder="Seu e-mail" type="email"/>
          <button className="bg-gradient-to-br from-primary to-primary-container text-white px-8 py-4 rounded-xl font-label text-sm font-bold uppercase tracking-wider transition-all active:scale-[0.98]">
            Inscrever-se
          </button>
        </div>
      </section>

      {/* Lightbox View */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-on-surface/90 backdrop-blur-sm p-4 md:p-12 overflow-hidden"
            onClick={closeLightbox}
          >
            <div className="absolute top-8 right-8 z-[110]">
              <button 
                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all active:scale-95 group"
                onClick={closeLightbox}
              >
                <span className="material-symbols-outlined block text-3xl">close</span>
              </button>
            </div>
            
            <div className="absolute top-8 left-8 z-[110] hidden md:block">
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-primary"></div>
                <span className="font-label text-xs tracking-[0.2em] text-white/60 uppercase">Galeria de Fotos</span>
              </div>
            </div>

            <div className="relative w-full h-full flex flex-col items-center justify-center gap-8" onClick={(e) => e.stopPropagation()}>
              <div className="relative max-w-6xl w-full h-[70vh] md:h-[80vh] flex items-center justify-center">
                <img 
                  alt={selectedPhoto.title} 
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" 
                  src={selectedPhoto.image}
                  referrerPolicy="no-referrer"
                />
                
                {/* Camera Info Overlay (Desktop) */}
                <div className="absolute bottom-6 right-6 bg-surface/70 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10 hidden lg:flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-label tracking-widest text-on-surface/50 uppercase">Câmera</span>
                    <span className="text-xs font-medium text-on-surface">{selectedPhoto.camera}</span>
                  </div>
                  <div className="w-px h-6 bg-on-surface/10"></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-label tracking-widest text-on-surface/50 uppercase">Lente</span>
                    <span className="text-xs font-medium text-on-surface">{selectedPhoto.lens}</span>
                  </div>
                </div>
              </div>

              <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-4">
                <div className="space-y-2 text-left">
                  <h1 className="font-headline text-3xl md:text-5xl text-white tracking-tight">{selectedPhoto.title}</h1>
                  <div className="flex items-center gap-3 text-white/60 font-label text-sm uppercase tracking-wider">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                    <span>{selectedPhoto.location}</span>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button className="px-6 py-3 bg-surface-container-high/10 hover:bg-surface-container-high/20 text-white rounded-xl transition-all border border-white/5 flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">share</span>
                    <span className="font-label text-xs uppercase tracking-widest">Compartilhar</span>
                  </button>
                  <button className="px-8 py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-xl font-label text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all">
                    Comprar Print
                  </button>
                </div>
              </div>

              {/* Camera Info (Mobile) */}
              <div className="md:hidden w-full px-4">
                <div className="bg-surface/70 backdrop-blur-xl p-4 rounded-xl border border-white/10 grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-label tracking-widest text-on-surface/50 uppercase">Camera</span>
                    <span className="text-xs font-medium text-on-surface">{selectedPhoto.camera}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-label tracking-widest text-on-surface/50 uppercase">Lens</span>
                    <span className="text-xs font-medium text-on-surface">{selectedPhoto.lens}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 text-white/30 hidden md:flex">
              <button className="hover:text-white transition-colors" onClick={prevPhoto}>
                <span className="material-symbols-outlined text-4xl">chevron_left</span>
              </button>
              <span className="font-label text-xs tracking-[0.4em]">
                {String(selectedPhotoIndex! + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
              </span>
              <button className="hover:text-white transition-colors" onClick={nextPhoto}>
                <span className="material-symbols-outlined text-4xl">chevron_right</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Photography;
