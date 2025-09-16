import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Award, Clock } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const AboutWebplanSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up" className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-6">
            Sobre a WebPlan
          </h2>
          <p className="text-xl text-blue-600 font-semibold mb-4">
            Transparência e Compromisso
          </p>
          <div className="max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed space-y-4">
            <p>
              A WebPlan Corretora de Seguros atua de forma <strong>independente</strong>, oferecendo 
              orientação especializada para profissionais da medicina.
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg">
              <p className="text-amber-800 font-medium">
                <strong>Importante:</strong> Não possuímos vínculo institucional com organizações 
                profissionais ou entidades de classe, mas conhecemos profundamente os benefícios 
                e planos de saúde aceitos por profissionais dessas categorias.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Nossa Especialização */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <AnimatedSection direction="left">
            <h3 className="text-2xl font-bold text-blue-800 mb-6">Nossa Especialização</h3>
            <div className="space-y-4">
              {[
                { icon: Users, text: "Planos de saúde para médicos e profissionais da saúde" },
                { icon: Shield, text: "Orientação sobre benefícios profissionais" },
                { icon: Award, text: "Consultoria especializada em seguros" },
                { icon: Clock, text: "Atendimento personalizado por categoria" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100">
              <div className="text-center">
                <h4 className="text-2xl font-bold text-blue-800 mb-4">
                  WebPlan Corretora de Seguros
                </h4>
                <div className="space-y-3 text-gray-600">
                  <p className="text-lg">
                    <strong>CNPJ:</strong> 22.729.507/0001-13
                  </p>
                  <div className="border-t border-blue-100 pt-4 mt-4">
                    <p className="text-xl font-semibold text-blue-700">
                      Mais de 10 anos de experiência
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutWebplanSection;