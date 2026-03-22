import React from 'react';

const About: React.FC = () => {
  return (
    <main className="pt-32">
      {/* Hero Profile Section */}
      <section className="max-w-7xl mx-auto px-8 mb-24">
        <div className="flex flex-col md:flex-row items-end gap-12 relative">
          {/* Large Image Frame with Asymmetric Margin Logic */}
          <div className="w-full md:w-5/12 aspect-[4/5] overflow-hidden rounded-lg shadow-sm">
            <img 
              alt="Portrait of the curator" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-v-SOOLVUerLjSl1nVFT_E9exxViUqxWtd-PPFObPHF3H4A8J4-KUOaUyrmprMM_Emfz-rrIZjotBU80-K1UK3O-2POkvOItMtPVxcvIyWCC0I6Ut6F_xe-AWDde0aXT9Q3iB-6JzjZi8faPd--Hvi_XrmeSizbKduVB09FnPOPysZRh42V0TbU-3Ax-NCNc4YwXrQgn0JESAs4AL2JTjxKzk2TsbjSP1CJzlQv85h4dY-bpM7fNA36GM5muwMb3GgAX1Nf-4nqU"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Headline Overlap Logic */}
          <div className="w-full md:w-7/12 md:-ml-20 md:mb-12 z-10">
            <span className="font-label text-xs tracking-widest text-primary font-bold mb-4 block uppercase">O AUTOR</span>
            <h1 className="font-headline text-5xl md:text-7xl font-bold text-on-surface leading-tight tracking-tight mb-8">
              Preservando os <br/> <span className="italic font-normal">momentos de calma</span> em um <br/> mundo barulhento.
            </h1>
            <div className="max-w-xl">
              <p className="text-lg text-secondary leading-relaxed mb-6">
                Sou Julian Vane, fotógrafo e entusiasta de viagens. O Lá por Aí é meu diário visual — um espaço dedicado à interseção entre a viagem moderna e a preservação de memórias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section with Tonal Shift */}
      <section className="bg-surface-container-low py-24">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-24">
          <div className="space-y-8">
            <h2 className="font-headline text-3xl font-bold">A Visão</h2>
            <div className="space-y-6 text-on-surface/80 leading-[1.8] font-light">
              <p>
                Fotografar é mais do que capturar uma cena; é um ato de documentação emocional. Há mais de uma década, percorro o mundo, buscando padrões em como habitamos os espaços e as histórias que eles contam.
              </p>
              <p>
                O Lá por Aí começou como um sistema pessoal para catalogar minhas fotos. Hoje, evoluiu para um blog onde exploro a "alma" dos destinos através de uma lente minimalista. Priorizo a profundidade sobre o volume, e o silêncio sobre o espetáculo.
              </p>
            </div>
            <div className="pt-8">
              <a className="inline-flex items-center text-primary font-bold tracking-wide uppercase text-xs group" href="#">
                Portfólio Completo 
                <span className="material-symbols-outlined ml-2 transition-transform group-hover:translate-x-1">arrow_forward</span>
              </a>
              <div className="h-[2px] w-24 bg-primary mt-2"></div>
            </div>
          </div>
          {/* Bento Grid of Current Projects/Focus */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 bg-surface-container-lowest p-8 rounded-xl">
              <span className="material-symbols-outlined text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>camera</span>
              <h3 className="font-headline text-xl font-bold mb-2">Projeto Atual</h3>
              <p className="text-sm text-secondary">"Portos Esquecidos" — Um estudo de longa duração sobre o patrimônio marítimo na costa do Mediterrâneo.</p>
            </div>
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <span className="material-symbols-outlined text-on-secondary-container mb-3">auto_awesome</span>
              <h4 className="font-bold text-sm mb-1">Filosofia</h4>
              <p className="text-xs text-on-secondary-container/80">Documentação através da disciplina e contenção.</p>
            </div>
            <div className="bg-primary text-white p-6 rounded-xl flex flex-col justify-end">
              <h4 className="font-bold text-sm mb-1">Status</h4>
              <p className="text-xs opacity-90">Atualmente em Reykjavik, Islândia.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gear & Essentials Section */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="mb-16">
          <h2 className="font-headline text-3xl font-bold text-center">Ferramentas Essenciais</h2>
          <div className="w-12 h-1 bg-primary mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Gear Item 1 */}
          <div className="group cursor-default">
            <div className="aspect-square bg-surface-container-low rounded-lg mb-6 overflow-hidden relative">
              <img 
                alt="Leica Camera" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8j8NypA85oC5riCle0SkNnR7FSq_ZeVLTrylhb5BX7-nAAYC4duUAQXjFVjzcIHm-3fKiIJerstEuTVubJDENJ4IGvV0hZQUaZpX6tdGz0ULxkdeoBl-4Guxw6JSd73zYvoIVIk-27h8sHlaR3LWifnwccl04kdfQX6S9ssGWkAOCvHxerjjLV5yEY1snHtFor_UY7F7C9f0MyXObkMfelPMXXdS94qWCc4v4jJZga7z2GX2FeE6NzTovwKyxN-fRMKXF_GMq_ac"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <h4 className="font-bold text-lg mb-2">Leica M11</h4>
            <p className="text-secondary text-sm leading-relaxed">O ápice das câmeras digitais de visor. Ela força uma abordagem mais lenta e deliberada a cada quadro que capturo.</p>
          </div>
          {/* Gear Item 2 */}
          <div className="group cursor-default">
            <div className="aspect-square bg-surface-container-low rounded-lg mb-6 overflow-hidden relative">
              <img 
                alt="Field Notes" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9JW--DnU31h19zP8B9J0GuOpWXi7DfVxbsMhe5DiN8eQFCuJJU_7GTMsEjwflE_EHwrw60Z83j4ZvXf7e-Nbyowt8SSfDo6FYsYKpy2oC7fWsV6HKj0WTkZkkNMqBVdwftOxC8LZMRjg7-9r0x_zNABRZu4BP6Dah8r6jPQyLtxrk67YpZAC5mLhSsUiKUtkI_3kybGJJHEX0bFpAmGUXgsVZ-0RIhdbEnnExlgD7Wfi3dzyqB87jOdzLFeFrI-y75GYEdlSGw5w"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <h4 className="font-bold text-lg mb-2">Diário Galen Leather</h4>
            <p className="text-secondary text-sm leading-relaxed">Onde cada história começa. Passo horas em cafés locais esboçando o arco narrativo dos meus ensaios fotográficos.</p>
          </div>
          {/* Gear Item 3 */}
          <div className="group cursor-default">
            <div className="aspect-square bg-surface-container-low rounded-lg mb-6 overflow-hidden relative">
              <img 
                alt="The backpack" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuArqIjQaR6h4MPKTYhr4VOAXCOdfMELtXkBZA9auOYca1mRlFOIjNQDUy5PghdBjDDkNZr6m--ukbBg2itn3KwQZPSOcI6UpniESHhlsOkxxx_El70jD6DGuiYNhlGFj2aKOlwHVAyYIjN1PzV55ZaxvIHuza3Sa1bxStHHbThGIIv9k7lvLZcbWrfYwv199GELy60Y62fwnl6Xf-v1CFOQSGNRjby6M7LqY2Lky5TdZvkU0qJ1PZ6u9lfWLMDaVDcTICz3t4hu0p8"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <h4 className="font-bold text-lg mb-2">Wotancraft Pilot</h4>
            <p className="text-secondary text-sm leading-relaxed">Uma companheira robusta que protegeu meu equipamento em seis continentes. Discreta e indestrutível.</p>
          </div>
        </div>
      </section>

      {/* Newsletter CTA with Glassmorphism */}
      <section className="max-w-5xl mx-auto px-8 mb-24">
        <div className="bg-surface-container-highest p-12 md:p-20 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32"></div>
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="font-headline text-3xl font-bold mb-6">Fique por dentro</h2>
            <p className="text-secondary mb-10">Inscreva-se para receber minhas notas mensais sobre viagens, equipamentos e o processo criativo. Sem spam, apenas conteúdo.</p>
            <form className="flex flex-col md:flex-row gap-4">
              <input className="flex-grow bg-surface-container-lowest border-none px-6 py-4 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400" placeholder="Seu endereço de e-mail" type="email"/>
              <button className="bg-gradient-to-br from-primary to-primary-container text-white px-8 py-4 rounded-xl font-bold tracking-wider text-xs uppercase hover:opacity-90 transition-opacity" type="submit">
                Inscrever-se
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
