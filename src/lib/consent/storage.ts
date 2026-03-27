import type { ConsentRecord } from './types';
import { legalMeta } from '../../content/legal';

const KEY = 'laporai_consent';

export function loadConsent(): ConsentRecord | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    // Invalidate stored consent if policy version has changed.
    if (parsed.version !== legalMeta.policyVersion) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveConsent(record: ConsentRecord): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(record));
  } catch {
    // Storage might be unavailable (private mode quota exceeded, etc.)
  }
}

export function clearConsent(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Ignore
  }
}
