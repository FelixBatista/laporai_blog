import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_POSTS } from '../constants';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = MOCK_POSTS.find((p) => p.id === id);

  // If no post is found, we'll still show the design with the provided content from the HTML
  // to satisfy the user's request for the specific design.
  const displayPost = post || {
    title: "The Silent Breath of the Misty Highlands",
    category: "Travel",
    readTime: "12 MIN READ",
    author: {
      name: "Elena Vance",
      role: "Senior Curator & Photographer",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrlItcH3URM0AFSrrQvgbYYw87WJlYj2wQGqoAuQt_SFYBEbtK8EFXxI9JJV4DWcvKP15tX0Gj6884LnyYec_1DG0OLk49k9WBUa-c-08GRsb__Zm04G0JiXItFGJlXV77HWQWAW3R5bEn9DEAdh6nZr9AYb3bqz4eD_bnUbLJP6sGFU_0JuuQgqV9tiJrnyYHmc9NOHXMZ2phuMZh9yGydrNNC51DExR1NTF-pvDyeLZMDpmLFroQTePOn7sXalVRWyTDbtW4LEE"
    },
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1l6-fjUpwtg0-r_mznjFAJtprxw0uAO9PKx6D34Vsmp8XJnFWw6vGNL3pXJXnn5nC_-eWqCYVIUxcgbWCHT-6C3hcCqteP5kIxBtU1eRvTKoIjQbOiralj3cbmdrqjpBlrBj2FF8ED5-c5DQOTZIYuBeXs6UykqHeY5Q0oYcj51QQGA93u6FK1CbJUQ-5i1icNjSEmQ4sRKux2wwRgkCAJiJmIU5S_5y08-bKbddqnnHe2K1wRx8tStDRaBv5rfdbaebZU-A9k-w",
    tags: ["SCOTLAND", "SLOWTRAVEL", "PHOTOGRAPHY"]
  };

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[870px] w-full overflow-hidden">
        <img 
          alt="Aerial view of mist over a dense forest valley" 
          className="w-full h-full object-cover" 
          src={displayPost.image}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface/90"></div>
      </section>

      {/* Article Header Content */}
      <article className="relative -mt-40 z-10 px-6 max-w-4xl mx-auto">
        <div className="bg-surface-container-lowest p-12 lg:p-20 rounded-xl shadow-2xl shadow-on-surface/5">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase font-label">{displayPost.category}</span>
            <span className="w-8 h-[1px] bg-outline-variant/30"></span>
            <span className="text-xs font-medium text-secondary font-label">{displayPost.readTime}</span>
          </div>
          <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl text-center leading-[1.1] text-on-surface font-bold tracking-tight mb-12">
            {displayPost.title}
          </h1>
          <div className="flex items-center justify-center gap-4 mb-16 border-b border-outline-variant/10 pb-12">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-high">
              <img 
                alt="Portrait of the author" 
                src={displayPost.author.avatar}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-on-surface">{displayPost.author.name}</p>
              <p className="text-xs text-secondary">{displayPost.author.role}</p>
            </div>
          </div>

          {/* Introduction Text */}
          <div className="prose prose-slate lg:prose-xl max-w-none">
            <p className="font-headline text-2xl text-on-surface/80 leading-relaxed italic mb-12 border-l-4 border-primary pl-8">
              "In the heart of the Scottish Highlands, time doesn't tick. It exhales. I came here looking for silence, and found a conversation between the stone and the clouds."
            </p>
            <div className="font-body text-lg leading-relaxed text-on-surface space-y-8">
              <p>
                To wander through the highlands is to engage in a sensory negotiation. The air is thick with the scent of damp peat and ancient heather, a perfume that has remained unchanged for millennia. Unlike the rapid pulse of modern cityscapes, life here moves at the pace of shifting shadows.
              </p>
              <p>
                We arrived at dawn, the sky a bruised palette of indigo and charcoal. The mountains didn't emerge; they revealed themselves slowly, shedding layers of fog like a tired traveler removing heavy coats. There is a specific kind of weight to the air in these parts—a humidity that doesn't stifle but rather anchors you to the earth.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Integrated Asymmetric Image Section */}
      <section className="mt-24 mb-24 max-w-7xl mx-auto px-6 grid grid-cols-12 gap-8 items-center">
        <div className="col-span-12 md:col-span-7 rounded-lg overflow-hidden shadow-xl">
          <img 
            alt="Sunlight hitting a mountain peak through clouds" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlUAANCKvCSYk1sV_UdG4DU0ZvF48xA0UXuelEBjPThpPM7xc_LSvzjwenej30H6GGXsO-kzOX7M_NDbj6QAzfy__N4Ub2OrLLbPx3LfLxWGV2UXDs_M3MvQjrzPPzJnh8moqP2a4yukkNrRVzyyP8S1WVCWWQ1y3-XMEzCOg1g8vyesRZun9K8igqx6PYxvbobsIovJZWnUXvTa6bLjm0ediG0ttG4DQ_RPB8EHIRzi3L-jrXX7g71Hr-v3QlU6B-sh79VYc6N94"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="col-span-12 md:col-span-4 md:col-start-9">
          <h3 className="font-headline text-3xl mb-6 text-on-surface">The Light of the Peak</h3>
          <p className="font-body text-secondary leading-relaxed italic">
            "Photography in this environment is less about capturing a moment and more about waiting for a permission. The light gives, and just as quickly, it takes back."
          </p>
        </div>
      </section>

      {/* Continuing Narrative */}
      <article className="max-w-2xl mx-auto px-6 mb-24">
        <h2 className="font-headline text-4xl mb-8 text-on-surface font-bold">The Granite Keepers</h2>
        <div className="font-body text-lg leading-relaxed text-on-surface space-y-8">
          <p>
            Climbing the ridge near Glencoe requires more than just physical endurance; it demands a mental recalibration. The path is often invisible, a mere suggestion etched into the grass by the feet of those who came before. You learn to read the terrain not by lines, but by textures.
          </p>
          <p>
            At the summit, the world opens up in a way that feels almost violent in its beauty. The vastness is a physical pressure. From here, you can see the veins of the earth—silver streams cutting through emerald valleys—reminding you that we are merely guests in a much larger story.
          </p>
        </div>
      </article>

      {/* Middle Full Width Image Callout */}
      <section className="w-full bg-surface-container-low py-24 mb-24">
        <div className="max-w-4xl mx-auto px-6">
          <img 
            alt="Small wooden cabin in a vast field" 
            className="w-full h-[500px] object-cover rounded-xl mb-12 shadow-inner" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXZ-O78ny0Rnb2E_h-ZPu85VfhLAgQEH7KGb9K9dsoNM9d-PdEXakH5N7rxgEy-HnwkfNB1NPRWhtpHfc_MzN4Hnl7fK2X06LOgo8YW92izRmyTwPG48cZMmwvcBV4c1DU5VxQVAtFVQzjdjDZq3AIhisOrKkx015JVS92VqlH5WqfzwOHA8uJd1JP8nHAurUPzc5D4rs_OT_xb0_CK7wMfcd3D4IHSgO7GR9Aw-27cwWo3cFUaYSv1WO-chpMSBWb5JjZsZDTJqU"
            referrerPolicy="no-referrer"
          />
          <div className="text-center">
            <span className="text-xs font-bold tracking-widest text-primary uppercase">NOTA DO AUTOR</span>
            <p className="font-headline text-2xl mt-4 text-on-surface">A cabana no fim do mundo. Um lugar onde a única conectividade é entre a mente e o horizonte.</p>
          </div>
        </div>
      </section>

      {/* Final Thoughts */}
      <article className="max-w-2xl mx-auto px-6 mb-24">
        <h2 className="font-headline text-4xl mb-8 text-on-surface font-bold">Um Retorno à Essência</h2>
        <div className="font-body text-lg leading-relaxed text-on-surface space-y-8">
          <p>
            Enquanto o sol se punha no horizonte do Atlântico, transformando as colinas cobertas de urze em silhuetas de veludo roxo, percebi que viajar devagar não é sobre a distância percorrida. É sobre a profundidade habitada.
          </p>
          <p>
            Deixamos as terras altas não com uma lista de pontos turísticos vistos, mas com um renovado senso de nossa própria transitoriedade. E nessa transitoriedade, há uma paz profunda.
          </p>
        </div>

        {/* Tags & Share */}
        <div className="mt-20 pt-12 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-6">
          <div className="flex gap-2">
            {displayPost.tags.map(tag => (
              <span key={tag} className="px-4 py-2 bg-surface-container-high rounded-full text-xs font-bold font-label text-on-secondary-container">#{tag}</span>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold font-label text-secondary">COMPARTILHAR</span>
            <button className="p-2 text-on-surface hover:text-primary transition-colors">
              <span className="material-symbols-outlined">share</span>
            </button>
            <button className="p-2 text-on-surface hover:text-primary transition-colors">
              <span className="material-symbols-outlined">bookmark</span>
            </button>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <section className="max-w-2xl mx-auto px-6 mb-32">
        <div className="border-t border-outline-variant/20 pt-16">
          <h3 className="font-headline text-3xl text-on-surface font-bold mb-12">Reflexões</h3>
          {/* Existing Comments */}
          <div className="space-y-12 mb-20">
            <div className="group">
              <div className="flex justify-between items-baseline mb-4">
                <span className="font-bold text-on-surface font-body">Julian Thorne</span>
                <span className="text-xs text-secondary font-label uppercase tracking-wider">24 de Out, 2024</span>
              </div>
              <p className="text-on-surface/80 font-body leading-relaxed">
                Este texto ressoa profundamente. Visitei Glencoe no outono passado e o silêncio que você descreve é exatamente o que ficou comigo. Não é um silêncio vazio, mas um silêncio pesado e significativo.
              </p>
            </div>
            <div className="group">
              <div className="flex justify-between items-baseline mb-4">
                <span className="font-bold text-on-surface font-body">Marcus Chen</span>
                <span className="text-xs text-secondary font-label uppercase tracking-wider">26 de Out, 2024</span>
              </div>
              <p className="text-on-surface/80 font-body leading-relaxed">
                A fotografia aqui é excepcional. Aquela foto da luz atingindo o pico — ela captura perfeitamente aquela "permissão" que você mencionou. Storytelling excepcional.
              </p>
            </div>
            <div className="group">
              <div className="flex justify-between items-baseline mb-4">
                <span className="font-bold text-on-surface font-body">Sophia Lindholm</span>
                <span className="text-xs text-secondary font-label uppercase tracking-wider">27 de Out, 2024</span>
              </div>
              <p className="text-on-surface/80 font-body leading-relaxed">
                "O tempo não corre. Ele expira." Que sentimento lindo. É tão raro encontrar textos de viagem que foquem na paisagem interna tanto quanto na externa.
              </p>
            </div>
          </div>

          {/* Comment Form */}
          <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10">
            <h4 className="font-headline text-xl text-on-surface mb-6">Deixe uma Reflexão</h4>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-secondary uppercase tracking-widest font-label" htmlFor="name">Nome</label>
                  <input className="w-full bg-white border border-outline-variant/20 p-3 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm transition-all" id="name" placeholder="Seu nome" type="text"/>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-secondary uppercase tracking-widest font-label" htmlFor="email">E-mail</label>
                  <input className="w-full bg-white border border-outline-variant/20 p-3 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm transition-all" id="email" placeholder="Seu endereço de e-mail" type="email"/>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-widest font-label" htmlFor="comment">Comentário</label>
                <textarea className="w-full bg-white border border-outline-variant/20 p-3 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm transition-all resize-none" id="comment" placeholder="Compartilhe seus pensamentos..." rows={5}></textarea>
              </div>
              <div className="pt-2">
                <button className="bg-on-surface text-white font-bold py-3 px-8 rounded-lg hover:bg-primary transition-all uppercase tracking-widest text-[10px]" type="submit">Postar Reflexão</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="max-w-5xl mx-auto px-6 mb-32">
        <div className="bg-primary p-12 lg:p-20 rounded-xl relative overflow-hidden group">
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-headline text-4xl text-white mb-6">Fique por dentro</h2>
              <p className="text-white/80 font-body text-lg">Histórias semanais, guias de fotografia e reflexões de viagem entregues no seu e-mail.</p>
            </div>
            <div>
              <form className="flex flex-col gap-4">
                <input className="bg-white/10 border-0 focus:ring-2 focus:ring-white/50 text-white placeholder:text-white/60 p-4 rounded-lg backdrop-blur-sm" placeholder="Seu endereço de e-mail" type="email"/>
                <button className="bg-white text-primary font-bold py-4 px-8 rounded-lg hover:bg-surface transition-all uppercase tracking-widest text-sm" type="submit">Inscrever-se Agora</button>
              </form>
            </div>
          </div>
          {/* Abstract Grain/Texture Gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-container to-primary opacity-50 mix-blend-multiply"></div>
        </div>
      </section>
    </main>
  );
};

export default PostDetail;
