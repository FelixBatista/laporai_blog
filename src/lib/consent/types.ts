export interface ConsentCategories {
  /** Always true. Covers: consent-preference storage, Turnstile anti-spam. */
  essential: true;
  /** Optional analytics/performance. Currently unused – reserved for future. */
  analytics: boolean;
}

export interface ConsentRecord {
  version: string;
  timestamp: string;
  categories: ConsentCategories;
  /** 'banner' = user explicitly chose; 'withdraw' = revoked; 'legacy' = migrated */
  source: 'banner' | 'preferences' | 'withdraw' | 'legacy';
}

export type ConsentStatus = 'pending' | 'accepted' | 'rejected' | 'partial';
