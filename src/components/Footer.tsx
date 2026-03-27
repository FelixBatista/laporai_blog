import React from 'react';
import { Link } from 'react-router-dom';
import { useConsent } from '../lib/consent/context';

const Footer: React.FC = () => {
  const { openPreferences } = useConsent();

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
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-6">Contato</h4>
            <ul className="space-y-4 font-sans text-sm text-slate-500 dark:text-slate-400">
              <li><Link className="hover:underline decoration-[#ad2c00] underline-offset-4" to="/contact">Fale Comigo</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-between items-start md:items-end gap-8">
          <div className="w-full md:text-right">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-4">Legal</h4>
            <ul className="space-y-3 font-sans text-sm text-slate-500 dark:text-slate-400">
              <li className="md:text-right">
                <Link className="hover:underline decoration-[#ad2c00] underline-offset-4" to="/privacidade">Privacidade</Link>
              </li>
              <li className="md:text-right">
                <Link className="hover:underline decoration-[#ad2c00] underline-offset-4" to="/cookies">Cookies</Link>
              </li>
              <li className="md:text-right">
                <Link className="hover:underline decoration-[#ad2c00] underline-offset-4" to="/termos">Termos de Uso</Link>
              </li>
              <li className="md:text-right">
                <button
                  type="button"
                  onClick={openPreferences}
                  className="hover:underline decoration-[#ad2c00] underline-offset-4 text-left md:text-right"
                >
                  Gerir Preferências
                </button>
              </li>
            </ul>
          </div>
          <p className="font-sans text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Lá por Aí. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
