import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';
import { Partner } from '../types';
import amilLogo from '../assets/images/amil_saúde_apcd.webp';
import sulamericaLogo from '../assets/images/planos_de_saúde_sulamérica_apcd.webp';
import bradescoLogo from '../assets/images/bradesco_saude.webp';
import unimedLogo from '../assets/images/seguros-unimed.png';
import amplaLogo from '../assets/images/ampla.png';
import blueLogo from '../assets/images/blue.webp';
import aliceLogo from '../assets/images/Alice.svg';
import portoSeguroLogo from '../assets/images/porto-seguro.png';
import qualicorpLogo from '../assets/images/quali-corp.png';
import medSeniorLogo from '../assets/images/LOGO-MED-SENIOR.png';
import preventSeniorLogo from '../assets/images/Prevent_Senior_logo.png';
import omintLogo from '../assets/images/omint-logo.png';
import unimedFespLogo from '../assets/images/unimed-fesp-logo.png';

const partners: Partner[] = [
  { name: 'Amil', logo: amilLogo, hasPage: true, href: '/amil' },
  { name: 'Alice', logo: aliceLogo },
  { name: 'Bradesco Saúde', logo: bradescoLogo },
  { name: 'Porto Seguro', logo: portoSeguroLogo },
  { name: 'Qualicorp', logo: qualicorpLogo },
  { name: 'MedSênior', logo: medSeniorLogo },
  { name: 'SulAmérica', logo: sulamericaLogo },
  { name: 'Prevent Senior', logo: preventSeniorLogo },
  { name: 'Seguros Unimed', logo: unimedLogo },
  { name: 'Omint', logo: omintLogo },
  { name: 'Ampla', logo: amplaLogo },
  { name: 'Blue Saúde', logo: blueLogo },
  { name: 'Unimed Fesp', logo: unimedFespLogo }
];

const PartnersSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollStep = 0.8; // Velocidade normal - não muito rápida nem muito lenta
    const scrollInterval = 10; // Intervalo balanceado para movimento suave

    const autoScroll = () => {
      scrollAmount += scrollStep;
      scrollContainer.scrollLeft = scrollAmount;

      // Reset scroll when reaching the middle (since we have duplicated content)
      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0;
        scrollContainer.scrollLeft = 0;
      }
    };

    const interval = setInterval(autoScroll, scrollInterval);

    // Remove pause on hover - mantém velocidade constante
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Duplicate partners array for infinite scroll effect
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section id="planos" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50" itemScope itemType="https://schema.org/Organization">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up" className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Nossos <span className="text-blue-600">Parceiros</span> de Confiança
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto" itemProp="description">
            Trabalhamos com as principais operadoras do mercado para oferecer as melhores opções para você
          </p>
        </AnimatedSection>

        {/* Infinite Carousel */}
        <AnimatedSection direction="fade" delay={0.3}>
          <div className="relative overflow-hidden">
            <div 
              ref={scrollRef}
              className="flex gap-6 overflow-hidden"
              style={{ scrollBehavior: 'auto' }}
            >
              {duplicatedPartners.map((partner, index) => (
                <motion.div
                  key={`${partner.name}-${index}`}
                  className={`flex-none w-48 bg-white hover:bg-blue-50 rounded-2xl p-6 text-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-gray-100 group ${
                    partner.hasPage ? 'cursor-pointer' : ''
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (index % partners.length) * 0.05 }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  onClick={() => {
                    if (partner.hasPage && partner.href) {
                      navigate(partner.href);
                    }
                  }}
                >
                  <div className="mb-4 h-20 flex items-center justify-center">
                    {partner.logo ? (
                      <motion.img
                        src={partner.logo}
                        alt={`Logo ${partner.name}`}
                        className="w-full h-full object-contain rounded-lg"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                    ) : (
                      <motion.div 
                        className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center border-2 border-blue-300 group-hover:from-blue-200 group-hover:to-blue-300 transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-blue-700 font-bold text-xl text-center px-2">
                          {partner.name.split(' ').map(word => word[0]).join('').toUpperCase()}
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm leading-tight group-hover:text-blue-600 transition-colors duration-300">
                    {partner.name}
                    {partner.hasPage && (
                      <span className="block text-xs text-blue-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Clique para saber mais
                      </span>
                    )}
                  </h3>
                </motion.div>
              ))}
            </div>
            
            {/* Gradient overlays for smooth edges */}
            <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-blue-50 to-transparent pointer-events-none z-10"></div>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.6}>
          <div className="text-center mt-16">
            <div className="bg-blue-50 rounded-2xl p-8 max-w-4xl mx-auto">
              <motion.h3 
                className="text-2xl font-bold text-blue-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                Por que escolher nossos parceiros?
              </motion.h3>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                {[
                  { title: "✓ Cobertura Nacional", desc: "Atendimento em todo o Brasil" },
                  { title: "✓ Rede Credenciada", desc: "Milhares de médicos e hospitais" },
                  { title: "✓ Qualidade Garantida", desc: "ANS com as melhores avaliações" }
                ].map((feature, index) => (
                  <motion.div 
                    key={feature.title}
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 1.0 + (index * 0.1) }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <h4 className="font-semibold text-blue-800">{feature.title}</h4>
                    <p className="text-blue-700">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default PartnersSection;