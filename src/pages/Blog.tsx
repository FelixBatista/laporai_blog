import React from 'react';

const Blog: React.FC = () => {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative px-8 py-12 max-w-7xl mx-auto mb-24">
        <div className="relative w-full aspect-[21/9] rounded-lg overflow-hidden editorial-shadow">
          <img 
            alt="Expansive mountain lake landscape" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUmZ7_9sJozh6q76YwShtQUdBzI-HcIxY0ZhZOK--P1GMRFCe-zPxXl8iY7QGydTN0dXFpDBnf6QRLQBwVXPh5TeqTD1CUHEAbvQZN8KRn2_vC9TAV8p78jO6wDwge5fAhYI-h7AWl6Mc49o09Bu4L1--64aenNF312xLJOGaWJ1R3fi7JTPf5wYXF1l-W-vp5IsLFsxjR5W8SOKTnbpm5KOeyOY2QeVm8_YQifxrFCACt-CiKdETxWTBtkN9Gm87qytX1bcnX__E"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="md:-mt-24 md:ml-12 relative z-10 max-w-2xl bg-white/70 backdrop-blur-2xl p-8 md:p-12 editorial-shadow rounded-lg">
          <p className="font-label text-xs tracking-widest text-primary font-bold mb-4">PELO MUNDO</p>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-on-surface leading-none tracking-tight mb-6">
            Blog
          </h1>
          <p className="text-lg text-secondary leading-relaxed max-w-lg">
            Um diário de jornadas pelo horizonte. Documentando a interseção entre paisagem, herança local e os momentos de quietude entre destinos.
          </p>
        </div>
      </section>

      {/* Asymmetric Bento Grid of Stories */}
      <section className="px-8 max-w-7xl mx-auto space-y-24">
        {/* Featured Entry */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden editorial-shadow">
              <img 
                alt="Aerial view of coastal road in Vietnam" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLMYxmKDN0H6bg4kQqMhkBYmatKruG1vTPEov8NN2XAQAzEjIJMTIGRzQTjkUTYb8OPi7FTydQLKSTttWbBr2BlkSR13zlAdt0-KENXKI7To9_1_bwIvTgI7G3rvy8jTUOEQ5XzQx-ZFFs-_5HZ74aD3OLq8LgOKBB6SDLIhfpNzPHRJ5Gt6FRC9ck0c9RmC67L03_vnPUYtKw39n_B6wuFBznrcGc55Pswp2sD_InMvCFaz90nBrg7fLHHmtJeifa2m6W_XRE3Hk"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="md:col-span-5 md:pl-12">
            <span className="font-label text-xs tracking-widest text-secondary uppercase mb-4 block">Southeast Asia</span>
            <h2 className="font-headline text-4xl font-bold text-on-surface mb-6 leading-tight hover:text-primary transition-colors cursor-pointer">
              The Silent Valleys of Da Lat
            </h2>
            <p className="text-secondary body-lg mb-8 leading-relaxed">
              Beyond the bustle of the coastal cities lies a highland sanctuary. We spent seven days mapping the fog-drenched coffee plantations and French colonial architecture.
            </p>
            <button className="inline-flex items-center gap-2 text-primary font-bold group">
              READ THE LOGBOOK 
              <span className="h-[2px] w-8 bg-primary transition-all group-hover:w-12"></span>
            </button>
          </div>
        </div>

        {/* Tonal Shift Section */}
        <div className="bg-surface-container-low rounded-lg p-12 md:p-24 -mx-8 md:mx-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Column 1 */}
            <div className="space-y-8">
              <div className="aspect-square bg-white rounded-lg p-6 editorial-shadow flex flex-col justify-between">
                <div>
                  <span className="material-symbols-outlined text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
                  <h3 className="font-headline text-2xl font-bold mb-2">Mapas de Rota</h3>
                  <p className="text-sm text-secondary">Baixe minhas rotas de GPS personalizadas para trilhas remotas.</p>
                </div>
                <a className="text-xs font-bold tracking-widest uppercase border-b border-primary-container pb-1 inline-block w-fit" href="#">Ver Mapas</a>
              </div>
              <div className="space-y-4">
                <img 
                  alt="Campfire under stars" 
                  className="w-full aspect-video object-cover rounded-lg" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYgxsmoPA2y3Pg5wlK4rfYmkceuN_OeYgaRyo2CmUAF1b_x7E82XSBgzGxmdKtXXTdl9BYw8Eauf_94Q2F6c7xOomAiEDjsQWfUHZJ2fVIxq5IwE6Muyz1MMv5kDymAydPONjGJEuRPrh81nnw5XyIRyusotHii8QHt5FQeMntr0dY0GXs7eyMCcElf1gg52QFOHqdV7EoMMqG17n0jAM3wwNhx6L-aX21RnJKOB0bB0uAu1rb080qi162YFpYnoACLZ486ARSzb8"
                  referrerPolicy="no-referrer"
                />
                <h4 className="font-headline text-xl font-bold">Meia-noite na Lapônia</h4>
                <p className="text-sm text-secondary">A luz que nunca se apaga.</p>
              </div>
            </div>
            {/* Column 2 */}
            <div className="lg:pt-24 space-y-8">
              <div className="space-y-4">
                <h4 className="font-label text-xs tracking-widest text-primary font-bold">ÚLTIMA POSTAGEM</h4>
                <h2 className="font-headline text-3xl font-bold leading-snug">Repensando o <br/>Nomadismo Moderno</h2>
                <p className="text-secondary leading-relaxed">A busca pela "autenticidade" está destruindo os lugares que amamos? Um ensaio sobre o desejo de viajar de forma sustentável.</p>
              </div>
              <div className="aspect-[3/4] overflow-hidden rounded-lg editorial-shadow">
                <img 
                  alt="Person looking at historical building" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgdJIndZ9xwxrrzKZYSHftRxs9aFV6aOSoxxq1zltPw46lHlQez2YJ4CK57Sj_gC8C1JirYuWOwVULdPrGLFpU7kYW_l5EW4hHOgNk3zOpNdHp2u-pZMJD0NpAI4x8qnfwTugJCjw1OaTPub_DkvBSD6qV_9P6H00HDPb1J3stjoDSlLK_6giYD52J4GI4U1WqvkfrFRHXuQFDG1u4oNTUexFUFuWywXcyvsiOEnWt8IYRqmX4qVZ9lKs7PK-7Kf0qAlANVGtUqnk"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            {/* Column 3 */}
            <div className="space-y-8 lg:text-right">
              <div className="bg-primary p-8 rounded-lg editorial-shadow">
                <h3 className="font-headline text-2xl text-white font-bold mb-4">Fique por dentro</h3>
                <p className="text-primary-fixed text-sm mb-6 leading-relaxed">Receba minhas notas mensais sobre viagens e fotografia direto no seu e-mail.</p>
                <div className="relative">
                  <input className="w-full bg-white/10 border-none rounded-xl text-white placeholder:text-primary-fixed focus:ring-2 focus:ring-white py-3 px-4 transition-all" placeholder="Seu e-mail" type="email"/>
                  <button className="absolute right-2 top-1.5 p-1.5 bg-white text-primary rounded-full">
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
              <div className="pt-8">
                <span className="font-label text-xs tracking-widest text-secondary uppercase mb-4 block">Mediterranean</span>
                <h4 className="font-headline text-xl font-bold">The Salt of the Earth</h4>
                <p className="text-sm text-secondary mt-2">Documenting the dying art of salt harvesting in Sicily.</p>
              </div>
            </div>
          </div>
        </div>

        {/* More Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div className="group cursor-pointer">
            <div className="relative h-96 overflow-hidden rounded-lg mb-6">
              <img 
                alt="Coastal town in Italy" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfSmQ-mlcsedNQylVBUVAezG4xUdzXTaa2RHxzdyRMqsWE_qX9CLEKz6HXWlziBo8uRvksDou0nugysF8Bfwzzub_5MqlqWwaFBlcRJc02WohYGY2RL4Na80y3fJuOCPNS8SAn4_xERQl89LtLhN5WzuAD1QSnX6hw9LtXsm8T9zXWXu9-5V2dfCc6Cjf-FMvdcN6Ed5jc9U34jOvrVuABVGwGC2Sq7WbnaLiz4qeAyGwf63pulo_tym9qOpV3Esy1utgeuvvGW_0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <span className="absolute top-6 left-6 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase">Western Europe</span>
            </div>
            <h3 className="font-headline text-3xl font-bold mb-3 group-hover:text-primary transition-colors">Vibrant Verticality</h3>
            <p className="text-secondary leading-relaxed">Navigating the cliffside stairways of the Amalfi Coast during the off-season.</p>
          </div>
          <div className="group cursor-pointer mt-12 md:mt-24">
            <div className="relative h-96 overflow-hidden rounded-lg mb-6">
              <img 
                alt="Monks in Bhutan" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSySkjXnhSvfNVGib0R7vTqO8mxLjZmbTALtrhQ14N3OdxwBBXqa24V3vUhXvQ6aTBhquc9wcliJIgfiV_4A-SCUyYfCHV5GtIb-Vi-Di2HBZtPLPeFmj1Kq-l5dh4sLz6O8jybxIIOmmCtR8O0hKKvcFKmf4FNwcVBZ8IBhNG-m9xf5psPeEhbTMrdSUys8p956PQq2TER-lJwKces870GSQaeUmOQu-X333rDptqzMoHY_FKD4kPooo5ZjwcDOb61LPL_OmoXys"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <span className="absolute top-6 left-6 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase">Central Asia</span>
            </div>
            <h3 className="font-headline text-3xl font-bold mb-3 group-hover:text-primary transition-colors">The Middle Way</h3>
            <p className="text-secondary leading-relaxed">Finding silence and spiritual clarity in the high-altitude monasteries of Bhutan.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
