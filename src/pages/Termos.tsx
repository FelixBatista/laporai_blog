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

const Termos: React.FC = () => {
  const { controllerName, contactEmail, siteName, siteUrl, siteDomain, lastUpdated, controllerCountry } = legalMeta;

  return (
    <main className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <header className="mb-16">
          <span className="font-label text-xs tracking-widest text-primary font-bold mb-4 block uppercase">Legal</span>
          <h1 className="font-headline text-5xl font-bold text-on-surface mb-6">Termos de Uso</h1>
          <p className="text-secondary text-sm">
            Última atualização: <time dateTime={lastUpdated}>{new Date(lastUpdated + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</time>
          </p>
        </header>

        <Section title="1. Aceitação dos Termos">
          <p>
            Ao aceder e utilizar o website <strong>{siteUrl}</strong> (doravante "{siteName}"), concorda com estes Termos de Uso. Se não concordar com qualquer parte destes termos, por favor não utilize este website.
          </p>
        </Section>

        <Section title="2. Sobre o Website">
          <p>
            {siteName} é um blog pessoal de viagens e fotografia operado por <strong>{controllerName}</strong>. O conteúdo publicado reflete perspetivas pessoais e experiências de viagem, e não constitui conselho profissional de qualquer natureza.
          </p>
        </Section>

        <Section title="3. Propriedade Intelectual">
          <p>
            Todo o conteúdo original publicado neste website — incluindo artigos, fotografias, ilustrações, vídeos e design — é propriedade de <strong>{controllerName}</strong> e está protegido pelas leis de direitos de autor aplicáveis.
          </p>
          <p>
            É permitido partilhar links para conteúdo deste website. A reprodução, cópia ou distribuição de conteúdo sem autorização expressa por escrito é proibida, exceto quando previsto pela legislação aplicável (por ex., citação para fins de crítica, comentário ou ensino).
          </p>
          <p>
            Para pedidos de utilização de conteúdo, contacte:{' '}
            <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">{contactEmail}</a>.
          </p>
        </Section>

        <Section title="4. Conteúdo Gerado por Utilizadores (Comentários)">
          <p>
            Este website permite que visitantes publiquem comentários nas publicações do blog. Ao submeter um comentário:
          </p>
          <ul className="mt-3 space-y-2 ml-4">
            <li className="flex gap-3">
              <span className="material-symbols-outlined text-primary text-sm mt-0.5 shrink-0">check</span>
              <span>Confirma que o conteúdo é seu e que tem o direito de o publicar.</span>
            </li>
            <li className="flex gap-3">
              <span className="material-symbols-outlined text-primary text-sm mt-0.5 shrink-0">check</span>
              <span>Concede ao {siteName} uma licença não exclusiva para exibir o comentário neste website.</span>
            </li>
            <li className="flex gap-3">
              <span className="material-symbols-outlined text-primary text-sm mt-0.5 shrink-0">check</span>
              <span>Aceita que os comentários estão sujeitos a moderação e podem ser editados, recusados ou removidos.</span>
            </li>
          </ul>

          <h3 className="font-bold text-on-surface mt-4 mb-2">Conteúdo proibido nos comentários:</h3>
          <ul className="space-y-1 ml-4">
            {[
              'Conteúdo ilegal, ofensivo, difamatório ou discriminatório',
              'Spam, publicidade não solicitada ou links de afiliação não divulgados',
              'Violação de privacidade de terceiros',
              'Desinformação deliberada',
              'Discurso de ódio de qualquer natureza',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="material-symbols-outlined text-red-500 text-sm mt-0.5 shrink-0">block</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="5. Subscrição de Newsletter">
          <p>
            Ao subscrever a newsletter, concorda em receber comunicações periódicas sobre o conteúdo do blog. Pode cancelar a subscrição a qualquer momento através do link presente em cada e-mail recebido ou contactando-nos diretamente.
          </p>
        </Section>

        <Section title="6. Links para Sites Externos">
          <p>
            Este website pode conter links para websites de terceiros. Esses links são fornecidos para conveniência; não endossamos nem nos responsabilizamos pelo conteúdo ou práticas de privacidade de sites externos. Recomendamos que leia as políticas de privacidade de qualquer website que visite.
          </p>
        </Section>

        <Section title="7. Exclusão de Responsabilidade">
          <p>
            O conteúdo deste website é fornecido "tal como está", sem garantias de qualquer tipo. Não garantimos a exatidão, integridade ou atualidade da informação publicada.
          </p>
          <p>
            Na máxima extensão permitida pela lei aplicável, {controllerName} não será responsável por quaisquer danos directos, indirectos, incidentais ou consequentes resultantes do uso ou da impossibilidade de uso deste website ou do seu conteúdo.
          </p>
        </Section>

        <Section title="8. Privacidade">
          <p>
            O tratamento dos seus dados pessoais é regido pela nossa{' '}
            <Link to="/privacidade" className="text-primary hover:underline">Política de Privacidade</Link>{' '}
            e pela nossa{' '}
            <Link to="/cookies" className="text-primary hover:underline">Política de Cookies</Link>, que fazem parte integrante destes Termos.
          </p>
        </Section>

        <Section title="9. Alterações aos Termos">
          <p>
            Podemos rever estes Termos de Uso periodicamente. As alterações entram em vigor imediatamente após publicação nesta página, salvo indicação em contrário. O uso continuado do website após a publicação de alterações constitui aceitação dos novos termos.
          </p>
        </Section>

        <Section title="10. Lei Aplicável e Jurisdição">
          <p>
            Estes Termos são regidos pelas leis da <strong>{controllerCountry}</strong> e da União Europeia. Qualquer litígio será submetido à jurisdição exclusiva dos tribunais competentes, sem prejuízo dos direitos dos consumidores ao abrigo da legislação do país de residência habitual.
          </p>
        </Section>

        <Section title="11. Contacto">
          <p>
            Para questões relacionadas com estes Termos, contacte:{' '}
            <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">{contactEmail}</a>
          </p>
        </Section>

        <div className="mt-16 pt-8 border-t border-outline-variant/20 flex gap-6 text-sm">
          <Link to="/privacidade" className="text-primary hover:underline">Política de Privacidade</Link>
          <Link to="/cookies" className="text-primary hover:underline">Política de Cookies</Link>
        </div>
      </div>
    </main>
  );
};

export default Termos;
