import React from 'react';
import { Link } from 'react-router-dom';
import { legalMeta } from '../content/legal';

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

const Privacidade: React.FC = () => {
  const { controllerName, contactEmail, siteName, siteUrl, siteDomain, lastUpdated, supervisoryAuthority, supervisoryAuthorityUrl, processors } = legalMeta;

  return (
    <main className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <header className="mb-16">
          <span className="font-label text-xs tracking-widest text-primary font-bold mb-4 block uppercase">Legal</span>
          <h1 className="font-headline text-5xl font-bold text-on-surface mb-6">Política de Privacidade</h1>
          <p className="text-secondary text-sm">
            Última atualização: <time dateTime={lastUpdated}>{new Date(lastUpdated + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</time>
          </p>
        </header>

        <Section title="1. Quem é o Responsável pelo Tratamento">
          <p>
            O responsável pelo tratamento dos seus dados pessoais é:
          </p>
          <div className="bg-surface-container-low rounded-lg p-6 font-sans text-sm space-y-1">
            <p><strong>{controllerName}</strong></p>
            <p>Website: <a href={siteUrl} className="text-primary hover:underline">{siteDomain}</a></p>
            <p>E-mail de contacto: <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">{contactEmail}</a></p>
          </div>
        </Section>

        <Section title="2. Que Dados Pessoais Recolhemos e Porquê">
          <p>Recolhemos apenas os dados estritamente necessários para as finalidades descritas abaixo.</p>

          <div className="space-y-6 mt-4">
            <div>
              <h3 className="font-bold text-on-surface mb-2">2.1 Newsletter</h3>
              <p>Quando se inscreve na newsletter, recolhemos o seu <strong>endereço de e-mail</strong>.</p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
                <li><strong>Finalidade:</strong> envio de atualizações periódicas sobre o blog.</li>
                <li><strong>Base jurídica (RGPD art. 6.º, n.º 1, al. a)):</strong> consentimento expresso, dado no momento da inscrição.</li>
                <li><strong>Retenção:</strong> os dados são conservados enquanto mantiver a subscrição ativa. Após cancelar a subscrição, o registo é mantido com estado "cancelado" por 12 meses para fins de auditoria de abuso, e depois eliminado.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-on-surface mb-2">2.2 Comentários</h3>
              <p>Ao deixar um comentário, recolhemos o seu <strong>nome</strong> (obrigatório), <strong>endereço de e-mail</strong> (opcional) e <strong>URL do website</strong> (opcional).</p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
                <li><strong>Finalidade:</strong> publicação do comentário e moderação de conteúdo.</li>
                <li><strong>Base jurídica (RGPD art. 6.º, n.º 1, al. a)):</strong> consentimento expresso dado ao submeter o comentário.</li>
                <li><strong>Retenção:</strong> comentários aprovados são conservados indefinidamente como parte do arquivo editorial. Comentários rejeitados ou marcados como spam são eliminados após 90 dias. O e-mail nunca é exibido publicamente; é armazenado como hash para prevenção de duplicados e spam.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-on-surface mb-2">2.3 Dados Técnicos de Segurança</h3>
              <p>
                Para prevenir abusos (spam, ataques automatizados), utilizamos o <strong>Cloudflare Turnstile</strong> no formulário de comentários. O Turnstile analisa sinais do dispositivo e do navegador para determinar se o utilizador é humano. Este processamento é baseado no interesse legítimo do responsável pelo tratamento em garantir a segurança e integridade do serviço (art. 6.º, n.º 1, al. f)). Os endereços IP e User-Agent são armazenados apenas sob forma de hash (não reversível).
              </p>
            </div>

            <div>
              <h3 className="font-bold text-on-surface mb-2">2.4 Formulário de Contacto</h3>
              <p>
                Quando nos contacta através da <Link to="/contact" className="text-primary hover:underline">página de contacto</Link>, recolhemos nome e e-mail para responder à sua mensagem. Base jurídica: consentimento (art. 6.º, n.º 1, al. a)). Os dados são conservados pelo tempo necessário para responder e por um período máximo de 24 meses.
              </p>
            </div>
          </div>
        </Section>

        <Section title="3. Cookies e Armazenamento Local">
          <p>
            Este website utiliza armazenamento local (localStorage) para guardar as suas preferências de privacidade. Não utilizamos cookies de rastreamento ou publicidade. Para informação detalhada, consulte a nossa{' '}
            <Link to="/cookies" className="text-primary hover:underline">Política de Cookies</Link>.
          </p>
        </Section>

        <Section title="4. Subcontratantes e Destinatários">
          <p>
            Partilhamos os seus dados apenas com prestadores de serviços essenciais à operação do website. Estes subcontratantes estão obrigados contratualmente a tratar os dados exclusivamente conforme as nossas instruções.
          </p>
          <div className="mt-4 space-y-4">
            {Object.values(processors).map((p) => (
              <div key={p.name} className="bg-surface-container-low rounded-lg p-5 text-sm">
                <p className="font-bold text-on-surface mb-1">{p.name}</p>
                <p className="text-on-surface/70 mb-1"><strong>Finalidade:</strong> {p.purpose}</p>
                <p className="text-on-surface/70 mb-1"><strong>País:</strong> {p.country}</p>
                <a href={p.privacyUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs">Política de privacidade →</a>
              </div>
            ))}
          </div>
        </Section>

        <Section title="5. Transferências Internacionais de Dados">
          <p>
            Alguns dos nossos subcontratantes estão sediados nos <strong>Estados Unidos da América</strong>. As transferências de dados para os EUA são efetuadas ao abrigo de garantias adequadas, nomeadamente as Cláusulas Contratuais Padrão aprovadas pela Comissão Europeia ou, quando aplicável, ao abrigo do Data Privacy Framework UE–EUA.
          </p>
          <p>
            Pode obter mais informações sobre as salvaguardas aplicadas a cada subcontratante através dos links de política de privacidade indicados na secção 4.
          </p>
        </Section>

        <Section title="6. Os Seus Direitos ao Abrigo do RGPD">
          <p>Se residir no Espaço Económico Europeu, tem os seguintes direitos em relação aos seus dados pessoais:</p>
          <ul className="mt-3 space-y-2">
            {[
              ['Acesso', 'Solicitar uma cópia dos dados pessoais que temos sobre si.'],
              ['Retificação', 'Corrigir dados inexatos ou incompletos.'],
              ['Eliminação', 'Solicitar a eliminação dos seus dados ("direito ao esquecimento"), sujeito a obrigações legais de retenção.'],
              ['Portabilidade', 'Receber os seus dados num formato estruturado e legível por máquina.'],
              ['Oposição', 'Opor-se ao tratamento baseado em interesse legítimo.'],
              ['Limitação', 'Solicitar a limitação do tratamento em determinadas circunstâncias.'],
              ['Retirada do consentimento', 'Retirar o consentimento a qualquer momento, sem afetar a licitude do tratamento efetuado antes da retirada.'],
            ].map(([right, desc]) => (
              <li key={right} className="flex gap-3">
                <span className="material-symbols-outlined text-primary text-sm mt-0.5 shrink-0">check_circle</span>
                <span><strong>{right}:</strong> {desc}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4">
            Para exercer qualquer um destes direitos, contacte-nos através de{' '}
            <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">{contactEmail}</a>.
            Responderemos no prazo máximo de <strong>30 dias</strong>.
          </p>
        </Section>

        <Section title="7. Direito de Reclamação">
          <p>
            Se considerar que o tratamento dos seus dados pessoais viola o RGPD, tem o direito de apresentar reclamação junto da autoridade de controlo competente:
          </p>
          <div className="bg-surface-container-low rounded-lg p-5 text-sm mt-3">
            <p className="font-bold text-on-surface">{supervisoryAuthority}</p>
            <a href={supervisoryAuthorityUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs">{supervisoryAuthorityUrl}</a>
          </div>
          <p className="mt-3 text-sm">
            Caso resida noutro Estado-Membro da UE, pode reclamar junto da autoridade de controlo do seu país de residência habitual.
          </p>
        </Section>

        <Section title="8. Segurança dos Dados">
          <p>
            Adotamos medidas técnicas e organizativas adequadas para proteger os seus dados contra acesso não autorizado, perda ou divulgação. Entre as medidas em vigor encontram-se: transmissão cifrada (TLS), armazenamento de identificadores sensíveis apenas sob forma de hash, moderação de conteúdo gerado por utilizadores e controlos de acesso administrativo.
          </p>
        </Section>

        <Section title="9. Alterações a Esta Política">
          <p>
            Podemos atualizar esta Política de Privacidade. Quando o fizermos, atualizaremos a data de "última atualização" no topo desta página e, se as alterações forem materiais, notificaremos os subscritores da newsletter. Recomendamos que consulte esta página periodicamente.
          </p>
        </Section>

        <Section title="10. Contacto">
          <p>
            Para quaisquer questões relacionadas com privacidade ou para exercer os seus direitos, contacte:{' '}
            <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">{contactEmail}</a>
          </p>
        </Section>

        <div className="mt-16 pt-8 border-t border-outline-variant/20 flex gap-6 text-sm">
          <Link to="/cookies" className="text-primary hover:underline">Política de Cookies</Link>
          <Link to="/termos" className="text-primary hover:underline">Termos de Uso</Link>
        </div>
      </div>
    </main>
  );
};

export default Privacidade;
