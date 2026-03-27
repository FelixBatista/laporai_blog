/**
 * Centralized legal metadata for all policy pages.
 * Update these fields before going live. Fields marked [REQUIRED] must be filled
 * with real information before publishing – leaving placeholders is not compliant.
 */
export const legalMeta = {
  /** Legal name of the data controller / site owner. [REQUIRED] */
  controllerName: 'Larissa Vasconcelos',

  /** Public contact email for data subject rights requests. [REQUIRED] */
  contactEmail: 'privacidade@laporai.com',

  /** Country where the controller is based (affects supervisory authority). */
  controllerCountry: 'Alemanha',

  /** Competent supervisory authority for complaints. Update to match the country above. */
  supervisoryAuthority: 'Bundesbeauftragter für den Datenschutz und die Informationsfreiheit (BfDI)',
  supervisoryAuthorityUrl: 'https://www.bfdi.bund.de',

  /** Site domain used in policy text. */
  siteDomain: 'laporai.com',
  siteUrl: 'https://laporai.com',
  siteName: 'Lá por Aí',

  /** ISO 8601 date – update whenever any policy is materially changed. */
  lastUpdated: '2026-03-28',

  /** Policy version string – increment on any material change. */
  policyVersion: '1.0',

  /**
   * Third-party processors disclosed.
   * Keep this list accurate – it feeds into the privacy and cookies pages.
   */
  processors: {
    cloudflare: {
      name: 'Cloudflare, Inc.',
      purpose: 'Hospedagem, CDN, Turnstile (proteção anti-spam), Cloudflare Pages Functions',
      privacyUrl: 'https://www.cloudflare.com/privacypolicy/',
      country: 'Estados Unidos',
    },
    resend: {
      name: 'Resend, Inc.',
      purpose: 'Envio de e-mails transacionais e newsletter',
      privacyUrl: 'https://resend.com/legal/privacy-policy',
      country: 'Estados Unidos',
    },
    github: {
      name: 'GitHub, Inc. (Microsoft)',
      purpose: 'Autenticação OAuth para administração do CMS (somente área administrativa)',
      privacyUrl: 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement',
      country: 'Estados Unidos',
    },
  },
} as const;
