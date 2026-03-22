import React from 'react';

const Home: React.FC = () => {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative w-full h-[870px] overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <img 
            alt="Featured Story" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBd0EG6nvpse6DEn3eyBpbSos3XewkhSCTA6jTpjlOR-6CgyTugUTuJuSptvvv4qlHHLYmhOZPGro3eX3QWPGqMTHTCQli6mrfhq2EUOqcak9FyBt5onr7s5ZNlJgIxSsUh4G2LZPVAoWUP6OLLsWbTBkl068-rqGrwrBVA-EbdOUuzxGItnbag322kojwVfCr6f3XUpXGHXnZMRnFsZokDDsK_8i7KZL7Z-WDOY6Yg6pUz1gNXm6NViHLWoq3GNptZAVkNaRRUCVI"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 via-transparent to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-8 pb-24 w-full">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-primary text-white text-[10px] font-bold tracking-[0.15em] mb-6 rounded-sm uppercase">Destaque</span>
            <h1 className="font-headline text-white text-5xl md:text-7xl font-bold leading-tight mb-8 -ml-1">
              Os picos silenciosos da <br />solidão nórdica.
            </h1>
            <div className="flex items-center gap-6">
              <button className="bg-gradient-to-br from-primary to-primary-container text-white px-8 py-4 rounded-xl text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-opacity">
                Ler a história
              </button>
              <div className="h-[1px] w-12 bg-white/40"></div>
              <span className="text-white/80 text-sm font-medium italic">Fotografia por Elias Thorne</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Recent Posts */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="font-headline text-4xl font-bold text-on-surface mb-4">Postagens Recentes</h2>
            <p className="text-secondary max-w-md">Perspectivas curadas sobre o mundo através das minhas lentes e descobertas.</p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-surface-container-high text-on-surface text-xs font-bold uppercase tracking-wider rounded-full hover:bg-surface-dim transition-colors">Recentes</button>
            <button className="px-6 py-2 text-secondary text-xs font-bold uppercase tracking-wider hover:text-primary transition-colors">Populares</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Large Featured Card */}
          <div className="md:col-span-8 group">
            <div className="aspect-[16/9] mb-8 overflow-hidden rounded-xl bg-surface-container-low">
              <img 
                alt="Lifestyle Article" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUVexLJ2TyMWjb9gp1tcouL6spG2RNN6-_lIcdx0ggHR657qi7Np_XDX9vTvvlpzZRsU-sgjZo2UhNZFmA73yiMluH9OVmMFKnMD497snPOd6UYs64j37bAX2RWjHe0QdBlx6zmZe1PR343OVTo5fqdhB4g7mdCvWZommJjRxngW7QdYz3c59GiJpP2qUuDpzP12rMaB_kAZA-tURujBxV7gmZuNJysF9OzUgpZBGYPqvekDlUgv1u3YqbwM-zw3gsM4wcuu86vj0"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex gap-4 text-[10px] font-bold tracking-widest text-primary uppercase mb-4">
              <span>Lifestyle</span>
              <span className="text-outline-variant">•</span>
              <span className="text-secondary">12 de Nov, 2024</span>
            </div>
            <h3 className="font-headline text-3xl font-bold mb-4 group-hover:text-primary transition-colors">Modernismo no Mediterrâneo: Um Estudo de Luz.</h3>
            <p className="text-on-surface-variant leading-relaxed max-w-2xl">Explorando a interseção entre a arquitetura brutalista e a suavidade dos ambientes costeiros, onde cada sombra conta uma história de precisão matemática.</p>
          </div>
          {/* Side Card 1 */}
          <div className="md:col-span-4 flex flex-col group">
            <div className="aspect-square mb-6 overflow-hidden rounded-xl bg-surface-container-low">
              <img 
                alt="Travel Article" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2qrFuSUzd2LMTISdr7iCB4cwBQZ2CSnZeNeKGXDniBlSZiZjuxG3qLNn1ydgRLGPEuy8rdN3kYZOGL7P3PdH0Bc_t2UQhuU2had0X6Do7xMo-Fi1pKBZIGNorLSBWKhyjAut9pEPV7MDJdUopG0aTiyk1_RXh6EAMocRNzu2LlvCfoc4mo19gckvxKqIMu5f5j_fpx6pcTV1EPpqi2E3I3bGKY6LoKH0BOekHMW6f-FJNSoEbpbq0Rx8sIS7WFsg8IJW3uX6kdTg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-[10px] font-bold tracking-widest text-primary uppercase mb-3">Viagem</div>
            <h3 className="font-headline text-xl font-bold mb-4 group-hover:text-primary transition-colors">No silêncio verdejante do noroeste do Pacífico.</h3>
            <a className="text-xs font-bold uppercase tracking-widest text-on-surface border-b border-primary w-fit pb-1" href="#">Explorar</a>
          </div>
          {/* Asymmetric Bottom Row */}
          <div className="md:col-span-4 group mt-8">
            <div className="aspect-[4/5] mb-6 overflow-hidden rounded-xl bg-surface-container-low">
              <img 
                alt="Photography Article" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhFr7YWTRbYEeCuHiba07PN8xnhWHD3BAMiGB6N92uFgFGN5tZzpAslnPN6MBCJFZ61QDFUYAKDb4nMyalahiazPbe16GmQ_1mShOQFpS6wPObOXa85i3fkB8jKVbUoo2a_8YQe11Q_1hA0TTUKkXNhwF4_P77Ivpiv7MTDbYDT01gPALqALH7qIDAsCbojhpdCkfRCRvIpznMthR6R_y4COKAZdwNLHZwb7uuu_4vqI_ngxuie87KkBKHxCVQLufL4DgrkldfbH8"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-[10px] font-bold tracking-widest text-primary uppercase mb-3">Fotografia</div>
            <h3 className="font-headline text-xl font-bold group-hover:text-primary transition-colors">A Alquimia do Grão: Por que o Filme Ainda Importa.</h3>
          </div>
          <div className="md:col-span-8 bg-surface-container-low rounded-xl p-12 mt-8 flex flex-col justify-center items-center text-center">
            <div className="max-w-md">
              <span className="material-symbols-outlined text-primary mb-6 text-4xl" style={{ fontVariationSettings: "'FILL' 0" }}>auto_awesome</span>
              <h3 className="font-headline text-2xl font-bold mb-6 italic">"A fotografia é a única linguagem que pode ser entendida em qualquer lugar do mundo."</h3>
              <p className="text-secondary text-sm mb-8">— Bruno Barbey</p>
              <button className="text-primary text-xs font-bold uppercase tracking-[0.2em] border-b-2 border-primary/20 hover:border-primary transition-colors pb-1">Ver Galeria</button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Tonal Shift Section */}
      <section className="bg-surface-container-low py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square bg-surface-container-highest rounded-xl overflow-hidden relative z-10">
                <img 
                  alt="Join Newsletter" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIuTC138Vv8opZbY2wd0RThKXWsj-K7wNISdPyNApwxjr_3w3rURpg0aqYGLH6HZ3cvazaVX8CAqpdGYX9YNSOqsCNoK5XCHAYzguUJSc2i11FVV2QzPJ8uTuH6GN5IWHFqVd8-_aKjv5U84mu6XXfFhZzUwT5mz69l-dL0IPbmGb_9gu_bor4mFy37eEcroThwWhfDzbkIAcJ3YT67fTOvHA-mdN5YtaRnCrNbZuOXI4gHqBLw-lkOl1x3FQTVWY-091v8-aXaxE"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-xl -z-0"></div>
            </div>
            <div className="space-y-8">
              <h2 className="font-headline text-4xl font-bold leading-tight">Novidades por e-mail.<br /><span className="text-primary">Direto na sua caixa.</span></h2>
              <p className="text-secondary leading-relaxed">Junte-se a outros entusiastas que recebem minhas atualizações semanais sobre viagens, fotografia e inspirações. Sem spam, apenas conteúdo.</p>
              <form className="flex flex-col gap-4">
                <div className="relative">
                  <input className="w-full bg-surface-container-lowest border-none rounded-xl py-4 px-6 focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-slate-400" placeholder="Seu endereço de e-mail" type="email" />
                </div>
                <button className="w-full bg-primary text-white font-bold py-4 rounded-xl uppercase tracking-widest text-xs hover:bg-primary-container transition-colors" type="submit">Inscrever-se</button>
              </form>
              <p className="text-[10px] text-slate-400 italic">Respeitando sua privacidade. Cancele quando quiser.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
