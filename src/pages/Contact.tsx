import React from 'react';
import { motion } from 'motion/react';
import { Mail, Instagram, Twitter, MessageCircle, Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-20 space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full font-label text-[10px] font-bold tracking-widest uppercase"
        >
          ENTRE EM CONTATO
        </motion.div>
        <h1 className="font-headline text-5xl lg:text-7xl font-bold tracking-tight text-balance">
          Conecte-se com o <br /> Lá por Aí.
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="font-headline text-4xl font-bold">Dúvidas e Parcerias</h2>
            <p className="text-secondary text-lg leading-relaxed max-w-md">
              Para colaborações editoriais, dúvidas sobre impressões ou simplesmente para compartilhar um relato de sua própria jornada.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-center space-x-6 group cursor-pointer">
              <div className="bg-primary/10 p-4 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Mail size={24} />
              </div>
              <div>
                <p className="font-label text-[10px] font-bold tracking-widest text-secondary uppercase">E-MAIL</p>
                <p className="font-headline text-xl font-bold">ola@laporai.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 group cursor-pointer">
              <div className="bg-primary/10 p-4 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Instagram size={24} />
              </div>
              <div>
                <p className="font-label text-[10px] font-bold tracking-widest text-secondary uppercase">INSTAGRAM</p>
                <p className="font-headline text-xl font-bold">@laporai</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 group cursor-pointer">
              <div className="bg-primary/10 p-4 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Twitter size={24} />
              </div>
              <div>
                <p className="font-label text-[10px] font-bold tracking-widest text-secondary uppercase">TWITTER</p>
                <p className="font-headline text-xl font-bold">@laporai</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 lg:p-12 rounded-2xl editorial-shadow space-y-8"
        >
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-label text-[10px] font-bold tracking-widest text-secondary uppercase">NOME COMPLETO</label>
                <input 
                  type="text" 
                  className="w-full bg-surface-container-low border-b border-outline-variant px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Seu nome"
                />
              </div>
              <div className="space-y-2">
                <label className="font-label text-[10px] font-bold tracking-widest text-secondary uppercase">ENDEREÇO DE E-MAIL</label>
                <input 
                  type="email" 
                  className="w-full bg-surface-container-low border-b border-outline-variant px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="seu@email.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="font-label text-[10px] font-bold tracking-widest text-secondary uppercase">ASSUNTO</label>
              <select className="w-full bg-surface-container-low border-b border-outline-variant px-4 py-3 focus:outline-none focus:border-primary transition-colors">
                <option>Colaboração Editorial</option>
                <option>Dúvida sobre Impressões</option>
                <option>Relato Geral</option>
                <option>Outro</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-label text-[10px] font-bold tracking-widest text-secondary uppercase">MENSAGEM</label>
              <textarea 
                rows={6}
                className="w-full bg-surface-container-low border-b border-outline-variant px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="Compartilhe seus pensamentos..."
              />
            </div>

            <button className="w-full bg-primary hover:bg-primary-container text-white py-4 rounded-full font-label text-xs font-bold tracking-widest uppercase transition-colors flex items-center justify-center space-x-3">
              <span>ENVIAR MENSAGEM</span>
              <Send size={14} />
            </button>
          </form>
        </motion.div>
      </div>

      <section className="text-center space-y-8 py-20 border-t border-outline-variant">
        <MessageCircle size={32} className="mx-auto text-primary" />
        <h3 className="font-headline text-3xl font-bold">Participe da Conversa</h3>
        <p className="text-secondary max-w-xl mx-auto leading-relaxed">
          Respondo a todas as mensagens atenciosas em até 48 horas. Obrigado pela paciência e por fazer parte da comunidade Lá por Aí.
        </p>
      </section>
    </div>
  );
};

export default Contact;
