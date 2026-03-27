import React from 'react';
import { Link } from 'react-router-dom';
import { legalMeta } from '../content/legal';
import { useConsent } from '../lib/consent/context';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-12">
    <h2 className="font-headline text-2xl font-bold text-on-surface mb-5 pb-3 border-b border-outline-variant/20">
      {title}
    </h2>
    <div className="space-y-4 text-on-surface/80 leading-relaxed font-sans text-base">
      {children}
    </div>
  </section>
);

const BadgeEssential: React.FC = () => (
  <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full">
    Essencial
  </span>
);

const BadgeFunctional: React.FC = () => (
  <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full">
    Funcional
  </span>
);

const Cookies: React.FC = () => {
  const { openPreferences } = useConsent();
  const { lastUpdated, contactEmail } = legalMeta;

  return (
    <main className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <header className="mb-16">
          <span className="font-label text-xs tracking-widest text-primary font-bold mb-4 block uppercase">Legal</span>
          <h1 className="font-headline text-5xl font-bold text-on-surface mb-6">Política de Cookies</h1>
          <p className="text-secondary text-sm">
            Última atualização: <time dateTime={lastUpdated}>{new Date(lastUpdated + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</time>
          </p>
        </header>

        <Section title="1. O Que São Cookies e Armazenamento Local">
          <p>
            Cookies são pequenos ficheiros de texto guardados no seu dispositivo por um website. Este website não utiliza cookies de rastreamento ou publicidade. Utilizamos exclusivamente o <strong>armazenamento local do navegador (localStorage)</strong> — uma tecnologia semelhante aos cookies, mas que não é transmitida automaticamente ao servidor — para guardar as suas preferências.
          </p>
        </Section>

        <Section title="2. O Que Utilizamos e Porquê">
          <p>A tabela abaixo descreve todo o armazenamento utilizado neste website no contexto do utilizador público (visitante normal).</p>

          <div className="mt-4 overflow-x-auto rounded-lg border border-outline-variant/20">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-container-low text-left">
                  <th className="px-4 py-3 font-bold text-on-surface">Nome</th>
                  <th className="px-4 py-3 font-bold text-on-surface">Tipo</th>
                  <th className="px-4 py-3 font-bold text-on-surface">Finalidade</th>
                  <th className="px-4 py-3 font-bold text-on-surface">Duração</th>
                  <th className="px-4 py-3 font-bold text-on-surface">Categoria</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">laporai_consent</td>
                  <td className="px-4 py-3">localStorage</td>
                  <td className="px-4 py-3">Guarda as suas preferências de privacidade e consentimento.</td>
                  <td className="px-4 py-3">Até remoção manual ou 12 meses</td>
                  <td className="px-4 py-3"><BadgeEssential /></td>
                </tr>
                <tr className="bg-surface-container-low/30">
                  <td className="px-4 py-3 font-mono text-xs">cf_clearance (Turnstile)</td>
                  <td className="px-4 py-3">Cookie / sessão</td>
                  <td className="px-4 py-3">Proteção anti-spam no formulário de comentários. Gerido pelo Cloudflare Turnstile para verificar que o utilizador é humano.</td>
                  <td className="px-4 py-3">Sessão do browser</td>
                  <td className="px-4 py-3"><BadgeEssential /></td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm mt-4 text-secondary">
            Este website <strong>não utiliza</strong> cookies de análise (Google Analytics, etc.), cookies de publicidade, pixels de rastreamento nem qualquer tecnologia de rastreamento entre sites.
          </p>
        </Section>

        <Section title="3. Serviços de Terceiros">
          <p>
            Algumas funcionalidades envolvem comunicação com servidores de terceiros, o que pode resultar na criação de cookies por esses serviços nos seus dispositivos, fora do nosso controlo direto:
          </p>
          <ul className="mt-3 space-y-3">
            <li className="flex gap-3">
              <span className="material-symbols-outlined text-primary text-sm mt-0.5 shrink-0">security</span>
              <span>
                <strong>Cloudflare Turnstile</strong> — carregado no formulário de comentários para proteção contra bots. O Cloudflare pode utilizar armazenamento do browser para esta finalidade. Consulte a{' '}
                <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">política de privacidade do Cloudflare</a>.
              </span>
            </li>
          </ul>

          <p className="text-sm mt-4 text-secondary">
            As fontes tipográficas e ícones utilizados neste website são <strong>alojados localmente</strong> no nosso próprio servidor — não são carregados de servidores Google Fonts ou de terceiros, eliminando esse vetor de rastreamento.
          </p>
        </Section>

        <Section title="4. Área Administrativa">
          <p>
            A área administrativa do website (<code>/admin</code>) é acessível apenas a colaboradores autorizados. Essa área utiliza <strong>armazenamento local (localStorage)</strong> para gerir a sessão OAuth GitHub necessária para o sistema de gestão de conteúdo (Decap CMS). Estes dados de sessão nunca afetam visitantes normais do website.
          </p>
        </Section>

        <Section title="5. Como Gerir as Suas Preferências">
          <p>Tem total controlo sobre as suas preferências:</p>
          <div className="mt-4 space-y-3">
            <div className="flex items-start gap-3 bg-surface-container-low rounded-lg p-4">
              <span className="material-symbols-outlined text-primary text-sm mt-0.5 shrink-0">tune</span>
              <div>
                <p className="font-bold text-on-surface text-sm mb-1">Preferências de privacidade</p>
                <p className="text-sm mb-3">Pode rever e alterar as suas escolhas a qualquer momento.</p>
                <button
                  type="button"
                  onClick={openPreferences}
                  className="inline-flex items-center gap-2 bg-primary text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Gerir Preferências
                </button>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-surface-container-low rounded-lg p-4">
              <span className="material-symbols-outlined text-primary text-sm mt-0.5 shrink-0">delete_sweep</span>
              <div>
                <p className="font-bold text-on-surface text-sm mb-1">Limpar armazenamento local</p>
                <p className="text-sm">Pode apagar todo o armazenamento local deste website nas definições do seu navegador (Definições → Privacidade → Limpar dados do site) ou utilizando as ferramentas de programador (F12 → Application → Local Storage).</p>
              </div>
            </div>
          </div>
        </Section>

        <Section title="6. Alterações a Esta Política">
          <p>
            Se introduzirmos alterações relevantes ao uso de cookies ou tecnologias de rastreamento, atualizaremos esta página e a data de "última atualização". Para alterações materiais que envolvam processamento adicional de dados pessoais, solicitaremos novo consentimento.
          </p>
        </Section>

        <Section title="7. Contacto">
          <p>
            Para quaisquer questões sobre esta política:{' '}
            <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">{contactEmail}</a>
          </p>
        </Section>

        <div className="mt-16 pt-8 border-t border-outline-variant/20 flex gap-6 text-sm">
          <Link to="/privacidade" className="text-primary hover:underline">Política de Privacidade</Link>
          <Link to="/termos" className="text-primary hover:underline">Termos de Uso</Link>
        </div>
      </div>
    </main>
  );
};

export default Cookies;
