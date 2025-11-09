import React from 'react';
import { Heart, Briefcase, GraduationCap, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import SEO from '../components/SEO';

const ProfissoesPage: React.FC = () => {
  const navigate = useNavigate();

  const profissoes = [
    {
      id: 'enfermeiros',
      title: 'Enfermeiros',
      subtitle: 'Planos de Saúde para Enfermeiros COREN',
      description: 'Planos de saúde exclusivos para enfermeiros, técnicos e auxiliares de enfermagem registrados no COREN-SP. Acesso a operadoras renomadas com valores especiais.',
      icon: Heart,
      color: 'teal',
      link: '/planos-de-saude-para-enfermeiros',
      available: true,
      tags: ['COREN', 'Amil', 'Hapvida', 'SulAmérica']
    }
    // Futuras profissões serão adicionadas aqui
  ];

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; hover: string; text: string; border: string } } = {
      teal: {
        bg: 'from-teal-50 to-blue-50',
        hover: 'hover:from-teal-100 hover:to-blue-100',
        text: 'text-teal-600',
        border: 'border-teal-500'
      }
    };
    return colors[color] || colors.teal;
  };

  return (
    <>
      <SEO 
        title="Planos de Saúde por Profissão | WebPlan Corretora"
        description="Encontre planos de saúde especiais para sua profissão. Condições diferenciadas e valores exclusivos para profissionais registrados em conselhos de classe."
        keywords="planos de saúde por profissão, plano saúde enfermeiros, plano saúde médicos, plano saúde conselho classe"
        canonicalUrl="https://simuleplanodesaude.com/profissoes"
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Hero Section */}
        <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection direction="up">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-3 mb-6">
                  <Briefcase className="w-12 h-12 text-blue-600" />
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                  Planos de Saúde por <span className="text-blue-600">Profissão</span>
                </h1>
                <p className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                  Condições especiais para profissionais registrados em conselhos de classe
                </p>
              </div>
            </AnimatedSection>

            {/* Intro Box */}
            <AnimatedSection direction="up" delay={0.2}>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border-l-4 border-blue-500 mb-16">
                <p className="text-lg text-blue-900 mb-4">
                  <strong>Planos de saúde por adesão profissional</strong> oferecem condições diferenciadas para profissionais registrados em conselhos de classe. Através de associações profissionais, você tem acesso a operadoras de saúde renomadas com valores até 40% menores que planos individuais.
                </p>
                <p className="text-lg text-blue-900">
                  Selecione sua profissão abaixo para conhecer as opções disponíveis:
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Profissões Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {profissoes.map((profissao, index) => {
                const colors = getColorClasses(profissao.color);
                const Icon = profissao.icon;

                return (
                  <AnimatedSection key={profissao.id} direction="up" delay={index * 0.1}>
                    <div 
                      className={`group relative bg-gradient-to-br ${colors.bg} rounded-2xl p-8 border-l-4 ${colors.border} cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${colors.hover}`}
                      onClick={() => profissao.available && navigate(profissao.link)}
                    >
                      {/* Icon */}
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-8 h-8 ${colors.text}`} />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {profissao.title}
                      </h3>

                      {/* Subtitle */}
                      <p className={`text-lg font-semibold ${colors.text} mb-4`}>
                        {profissao.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {profissao.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {profissao.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="px-3 py-1 bg-white/80 rounded-full text-sm font-medium text-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      {profissao.available ? (
                        <div className={`flex items-center gap-2 ${colors.text} font-semibold group-hover:gap-4 transition-all duration-300`}>
                          Ver detalhes
                          <span className="text-xl">→</span>
                        </div>
                      ) : (
                        <div className="text-gray-500 font-medium italic">
                          Em breve
                        </div>
                      )}

                      {/* Hover Effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </AnimatedSection>
                );
              })}

              {/* Coming Soon Cards */}
              {[
                { title: 'Médicos', icon: Heart, color: 'blue' },
                { title: 'Advogados', icon: Briefcase, color: 'purple' },
                { title: 'Engenheiros', icon: GraduationCap, color: 'orange' },
                { title: 'Professores', icon: Users, color: 'green' },
              ].map((item, index) => (
                <AnimatedSection key={item.title} direction="up" delay={(profissoes.length + index) * 0.1}>
                  <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 border-l-4 border-gray-400 opacity-60">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-white shadow-lg mb-6">
                      <item.icon className="w-8 h-8 text-gray-500" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-700 mb-3">
                      {item.title}
                    </h3>

                    {/* Coming Soon Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-semibold mb-4">
                      <span className="animate-pulse">●</span>
                      Em Breve
                    </div>

                    <p className="text-gray-600 leading-relaxed">
                      Estamos preparando condições especiais para profissionais da categoria. Em breve você poderá consultar as melhores opções de planos de saúde.
                    </p>

                    {/* Overlay */}
                    <div className="absolute inset-0 rounded-2xl bg-white/20 pointer-events-none" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection direction="up">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Como Funcionam os Planos por Profissão?
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-8">
              <AnimatedSection direction="up" delay={0.1}>
                <div className="text-center p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Registro Profissional</h3>
                  <p className="text-gray-600">
                    Você precisa estar registrado no conselho de classe da sua profissão (COREN, CRM, OAB, CREA, etc.)
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="up" delay={0.2}>
                <div className="text-center p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <span className="text-2xl font-bold text-green-600">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Associação Profissional</h3>
                  <p className="text-gray-600">
                    Você se associa a uma entidade profissional que tem convênio com operadoras de saúde
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="up" delay={0.3}>
                <div className="text-center p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                    <span className="text-2xl font-bold text-purple-600">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Condições Especiais</h3>
                  <p className="text-gray-600">
                    Acesso a operadoras renomadas com valores até 40% menores que planos individuais
                  </p>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection direction="up" delay={0.4}>
              <div className="mt-12 text-center">
                <div className="inline-block bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border-l-4 border-blue-500">
                  <p className="text-lg text-gray-900">
                    <strong>Nosso time está preparado para ajudar!</strong><br />
                    Entre em contato e receba uma cotação personalizada para sua profissão.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProfissoesPage;
