import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useConsent } from '../lib/consent/context';
import type { ConsentCategories } from '../lib/consent/types';

/* ─── Preferences Modal ────────────────────────────────────────────────────── */

const PreferencesModal: React.FC = () => {
  const { categories, saveCustom, closePreferences, rejectNonEssential, acceptAll } = useConsent();
  const [analytics, setAnalytics] = useState(categories.analytics);

  const handleSave = () => {
    saveCustom({ analytics } satisfies Omit<ConsentCategories, 'essential'>);
  };

  return (
    <motion.div
      key="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-on-surface/60 backdrop-blur-sm px-4"
      onClick={(e) => { if (e.target === e.currentTarget) closePreferences(); }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ type: 'spring', damping: 28, stiffness: 360 }}
        className="w-full max-w-lg bg-surface rounded-2xl shadow-2xl p-8 space-y-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="prefs-title"
      >
        <div className="flex items-center justify-between">
          <h2 id="prefs-title" className="font-headline text-xl font-bold text-on-surface">
            Preferências de Privacidade
          </h2>
          <button
            onClick={closePreferences}
            className="text-secondary hover:text-on-surface transition-colors"
            aria-label="Fechar"
            type="button"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <p className="text-sm text-secondary leading-relaxed">
          Escolha quais categorias de processamento de dados aceita. As categorias essenciais são sempre ativas e não podem ser desativadas.
        </p>

        <div className="space-y-4">
          {/* Essential – always on */}
          <div className="flex items-start justify-between gap-4 p-4 bg-surface-container-low rounded-xl">
            <div className="space-y-1">
              <p className="font-bold text-sm text-on-surface">Essencial</p>
              <p className="text-xs text-secondary leading-relaxed">
                Necessário para o funcionamento do website: guardar as suas preferências de privacidade e proteção anti-spam nos comentários (Cloudflare Turnstile).
              </p>
            </div>
            <div className="shrink-0 mt-0.5">
              <span className="inline-block bg-green-600 text-white text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full">
                Sempre ativo
              </span>
            </div>
          </div>

          {/* Analytics – optional */}
          <div className="flex items-start justify-between gap-4 p-4 bg-surface-container-low rounded-xl">
            <div className="space-y-1">
              <p className="font-bold text-sm text-on-surface">Análise e Desempenho</p>
              <p className="text-xs text-secondary leading-relaxed">
                Atualmente não utilizamos nenhuma ferramenta de análise. Esta categoria está reservada para uso futuro e está desativada por padrão.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={analytics}
              onClick={() => setAnalytics((v) => !v)}
              className={`shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary mt-0.5 ${
                analytics ? 'bg-primary' : 'bg-outline-variant'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${analytics ? 'translate-x-6' : 'translate-x-1'}`} />
              <span className="sr-only">{analytics ? 'Ativado' : 'Desativado'}</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 bg-primary text-white font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-xl hover:opacity-90 transition-opacity"
          >
            Guardar preferências
          </button>
          <button
            type="button"
            onClick={rejectNonEssential}
            className="flex-1 border border-outline-variant text-on-surface font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-xl hover:bg-surface-container-low transition-colors"
          >
            Só essenciais
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="flex-1 border border-outline-variant text-on-surface font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-xl hover:bg-surface-container-low transition-colors"
          >
            Aceitar tudo
          </button>
        </div>

        <p className="text-[10px] text-secondary text-center">
          Saiba mais:{' '}
          <Link to="/privacidade" className="text-primary hover:underline" onClick={closePreferences}>Política de Privacidade</Link>
          {' · '}
          <Link to="/cookies" className="text-primary hover:underline" onClick={closePreferences}>Política de Cookies</Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

/* ─── Consent Banner ────────────────────────────────────────────────────────── */

const ConsentBanner: React.FC = () => {
  const { showBanner, showPreferences, acceptAll, rejectNonEssential, openPreferences } = useConsent();

  return (
    <AnimatePresence>
      {showPreferences && <PreferencesModal key="prefs" />}
      {showBanner && !showPreferences && (
        <motion.div
          key="banner"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', damping: 30, stiffness: 400 }}
          role="dialog"
          aria-modal="false"
          aria-label="Preferências de privacidade"
          className="fixed bottom-0 inset-x-0 z-[100] p-4 sm:p-6"
        >
          <div className="max-w-4xl mx-auto bg-inverse-surface text-inverse-on-surface rounded-2xl shadow-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm mb-1 text-inverse-on-surface">Este website respeita a sua privacidade.</p>
                <p className="text-xs text-inverse-on-surface/70 leading-relaxed">
                  Utilizamos apenas armazenamento local estritamente necessário para funcionamento e proteção anti-spam.
                  Sem cookies de rastreamento ou publicidade.{' '}
                  <Link to="/cookies" className="underline hover:no-underline text-inverse-on-surface/80">
                    Política de Cookies
                  </Link>
                  {' · '}
                  <Link to="/privacidade" className="underline hover:no-underline text-inverse-on-surface/80">
                    Privacidade
                  </Link>
                </p>
              </div>
              <div className="flex flex-wrap gap-2 shrink-0">
                <button
                  type="button"
                  onClick={openPreferences}
                  className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg border border-inverse-on-surface/30 text-inverse-on-surface hover:bg-inverse-on-surface/10 transition-colors"
                >
                  Personalizar
                </button>
                <button
                  type="button"
                  onClick={rejectNonEssential}
                  className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg border border-inverse-on-surface/30 text-inverse-on-surface hover:bg-inverse-on-surface/10 transition-colors"
                >
                  Só essenciais
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg bg-inverse-on-surface text-inverse-surface hover:opacity-90 transition-opacity"
                >
                  Aceitar tudo
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConsentBanner;
