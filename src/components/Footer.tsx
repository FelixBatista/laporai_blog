import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-24 border-t-0 bg-slate-50 dark:bg-slate-950">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-8 py-16 max-w-7xl mx-auto">
        <div>
          <Link to="/" className="font-serif text-lg font-semibold text-slate-900 dark:text-white mb-6 block">Lá por Aí</Link>
          <p className="font-sans text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-xs leading-relaxed">
            Um diário visual dedicado à arte de viajar e às pequenas descobertas pelo caminho.
          </p>
          <div className="flex gap-4">
            <a className="text-slate-400 hover:text-primary transition-colors" href="#">
              <span className="material-symbols-outlined text-xl">public</span>
            </a>
            <a className="text-slate-400 hover:text-primary transition-colors" href="#">
              <span className="material-symbols-outlined text-xl">photo_camera</span>
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-6">Explorar</h4>
            <ul className="space-y-4 font-sans text-sm text-slate-500 dark:text-slate-400">
              <li><a className="hover:underline decoration-[#ad2c00] underline-offset-4" href="#">Newsletter</a></li>
              <li><a className="hover:underline decoration-[#ad2c00] underline-offset-4" href="#">Instagram</a></li>
              <li><Link className="hover:underline decoration-[#ad2c00] underline-offset-4" to="/blog">Blog</Link></li>
              <li><a className="hover:underline decoration-[#ad2c00] underline-offset-4" href="#">Privacidade</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-6">Contato</h4>
            <ul className="space-y-4 font-sans text-sm text-slate-500 dark:text-slate-400">
              <li><Link className="hover:underline decoration-[#ad2c00] underline-offset-4" to="/contact">Fale Comigo</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-between items-start md:items-end">
          <p className="font-sans text-sm text-slate-500 dark:text-slate-400 mt-auto">
            © 2026 Lá por Aí. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
