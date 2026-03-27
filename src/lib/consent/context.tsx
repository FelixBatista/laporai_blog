import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { legalMeta } from '../../content/legal';
import { clearConsent, loadConsent, saveConsent } from './storage';
import type { ConsentCategories, ConsentRecord } from './types';

interface ConsentContextValue {
  /** Whether consent has been decided (accepted or rejected). */
  decided: boolean;
  /** Whether the banner should be visible. */
  showBanner: boolean;
  /** Whether the preferences modal is open. */
  showPreferences: boolean;
  categories: ConsentCategories;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  saveCustom: (categories: Omit<ConsentCategories, 'essential'>) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  withdrawConsent: () => void;
}

const DEFAULT_CATEGORIES: ConsentCategories = {
  essential: true,
  analytics: false,
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export const ConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [record, setRecord] = useState<ConsentRecord | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = loadConsent();
    setRecord(stored);
    // Show the banner only if no prior consent is stored. The `mounted` flag
    // gates banner visibility so it never flickers on the initial server-side
    // or pre-hydration render.
    setShowBanner(stored === null);
    setMounted(true);
  }, []);

  const persist = useCallback((rec: ConsentRecord) => {
    saveConsent(rec);
    setRecord(rec);
    setShowBanner(false);
    setShowPreferences(false);
  }, []);

  const acceptAll = useCallback(() => {
    persist({
      version: legalMeta.policyVersion,
      timestamp: new Date().toISOString(),
      categories: { essential: true, analytics: true },
      source: 'banner',
    });
  }, [persist]);

  const rejectNonEssential = useCallback(() => {
    persist({
      version: legalMeta.policyVersion,
      timestamp: new Date().toISOString(),
      categories: { essential: true, analytics: false },
      source: 'banner',
    });
  }, [persist]);

  const saveCustom = useCallback((custom: Omit<ConsentCategories, 'essential'>) => {
    persist({
      version: legalMeta.policyVersion,
      timestamp: new Date().toISOString(),
      categories: { essential: true, ...custom },
      source: 'preferences',
    });
  }, [persist]);

  const withdrawConsent = useCallback(() => {
    clearConsent();
    setRecord(null);
    setShowBanner(true);
  }, []);

  const openPreferences = useCallback(() => setShowPreferences(true), []);
  const closePreferences = useCallback(() => setShowPreferences(false), []);

  const categories = record?.categories ?? DEFAULT_CATEGORIES;
  const decided = record !== null;

  // Always render the Provider so consumers (Footer, ConsentBanner, etc.) never
  // call useConsent() outside of a context. Before mounting we suppress the banner
  // (showBanner stays false) so nothing flickers on the first paint.
  return (
    <ConsentContext.Provider value={{
      decided,
      showBanner: mounted && showBanner,
      showPreferences: mounted && showPreferences,
      categories,
      acceptAll, rejectNonEssential, saveCustom,
      openPreferences, closePreferences, withdrawConsent,
    }}>
      {children}
    </ConsentContext.Provider>
  );
};

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent must be used within ConsentProvider');
  return ctx;
}
