import React from 'react';
import { ArrowRight, Shield, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const HeroSection: React.FC = () => {
  const scrollToForm = () => {
    const element = document.querySelector('#contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main>
      <section id="home" className="pt-20 sm:pt-16 bg-gradient-to-br from-teal-50 to-white overflow-hidden" itemScope itemType="https://schema.org/Service">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <AnimatedSection direction="left" duration={0.8}>
              <header className="space-y-6 sm:space-y-8">
                <div className="space-y-4 sm:space-y-6">
                  <motion.h1 
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight" 
                    itemProp="name"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Planos de Saúde para{' '}
                    <span className="text-[#00655D]">Médicos</span>{' '}
                    com até 30% de Desconto
                  </motion.h1>
                
                <motion.p 
                  className="text-lg sm:text-xl text-gray-700 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Com o melhor custo-benefício para você{' '}
                  <span className="font-semibold text-[#005A53]">Médico</span>{' '}
                  e sua família.
                </motion.p>
              </div>

              <AnimatedSection delay={0.6} direction="up">
                <div className="space-y-4 text-gray-600">
                  <p className="text-lg">
                    Entre essas operadoras estão as melhores opções disponíveis hoje no ramo da Saúde, como:{' '}
                    <span className="font-semibold text-[#00655D]">
                      Amil, Sul América, NotreDame
                    </span>{' '}
                    entre outras.
                  </p>
                  
                  <p className="text-lg">
                    Saiba mais com um dos nossos consultores sobre os{' '}
                    <span className="font-semibold">planos coletivos por adesão para Médicos</span>.
                  </p>
                  
                  <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-[#00655D]">
                    <p className="text-[#005A53] font-medium">
                      💡 Se você é Médico e possui CNPJ, dependendo da operadora escolhida,{' '}
                      <span className="font-bold">seu desconto pode chegar até 30%</span>.
                    </p>
                  </div>
                  
                  <p className="text-lg">
                    Para saber mais, entre em contato com nossos consultores e solicite uma cotação no formulário abaixo.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.8} direction="up">
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    onClick={scrollToForm}
                    className="bg-[#00655D] hover:bg-[#005A53] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Solicite sua Cotação
                    <ArrowRight size={20} />
                  </motion.button>
                </div>
              </AnimatedSection>

              {/* Features */}
              <AnimatedSection delay={1.0} direction="up">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
                  {[
                    { icon: Shield, text: "Cobertura Nacional" },
                    { icon: Users, text: "Para Família" },
                    { icon: Award, text: "Até 30% Desconto" }
                  ].map((feature, index) => (
                    <motion.div 
                      key={feature.text}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1.2 + (index * 0.1) }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="bg-teal-50 p-2 rounded-lg">
                        <feature.icon className="text-[#00655D]" size={24} />
                      </div>
                      <span className="text-gray-700 font-medium">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            </header>
            </AnimatedSection>

            {/* Image */}
            <AnimatedSection direction="right" delay={0.4} duration={1.0}>
              <div className="relative">
                <motion.div 
                  className="relative z-10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/medico.jpg"
                    alt="Equipe médica sorridente e profissional"
                    className="rounded-2xl shadow-2xl w-full h-[600px] object-cover"
                  />
                </motion.div>
                <motion.div 
                  className="absolute top-6 left-6 w-full h-full bg-gradient-to-br from-[#00655D] to-[#005A53] rounded-2xl -z-10"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HeroSection;