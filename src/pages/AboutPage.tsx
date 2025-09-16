import React from 'react';
import { Shield, Users, Clock, Phone, Award, CheckCircle, Heart, Star } from 'lucide-react';
import SEO from '../components/SEO';

const AboutPage: React.FC = () => {
  return (
    <>
      <SEO 
        title="Sobre Nós - WebPlan | 10 Anos de Experiência"
        description="Conheça nossa empresa especializada em planos de saúde com 10 anos de experiência. Corretores capacitados, atendimento diferenciado e soluções inteligentes para sua saúde."
        keywords="sobre seguros saúde sp, empresa planos saúde, corretores saúde, experiência planos saúde, escritório seguros saúde"
        canonicalUrl="https://www.simuleplanodesaude.com/sobre"
      />
      
      <main className="relative">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-32 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="w-full h-full bg-blue-800/20" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '30px 30px'
            }}></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
                Sobre a <span className="text-blue-300"><span className="font-bold">Web</span><span className="font-light">Plan</span></span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                10 anos de experiência dedicados a encontrar as melhores soluções em planos de saúde para você e sua família
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              <div className="text-center bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl font-bold text-blue-300 mb-3">10+</div>
                <div className="text-blue-100 font-medium">Anos de Experiência</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl font-bold text-blue-300 mb-3">1000+</div>
                <div className="text-blue-100 font-medium">Clientes Atendidos</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl font-bold text-blue-300 mb-3">24/7</div>
                <div className="text-blue-100 font-medium">Suporte Disponível</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl font-bold text-blue-300 mb-3">100%</div>
                <div className="text-blue-100 font-medium">Satisfação</div>
              </div>
            </div>
          </div>
          
          {/* Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
            </svg>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              {/* Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                    Nossa História e <span className="text-blue-600">Compromisso</span>
                  </h2>
                  
                  <div className="prose prose-lg text-gray-700 space-y-6">
                    <p className="text-lg leading-relaxed">
                      Somos uma empresa do ramo de Planos de Saúde, com experiência de 10 anos na área. 
                      Temos corretores capacitados e comprometidos em sempre orientar da melhor forma 
                      possível nossos clientes.
                    </p>
                    
                    <p className="text-lg leading-relaxed">
                      A nossa empresa está preparada para atender clientes de pequeno e médio porte, 
                      oferecendo sempre uma solução inteligente e econômica para quem precisa aderir 
                      à planos de saúde ou mesmo migrar de uma operadora para uma seguradora.
                    </p>
                    
                    <p className="text-lg leading-relaxed">
                      Podemos contribuir de forma positiva para sua escolha, com serviços realizados 
                      de acordo com as normas de qualidade que prezamos dentro da nossa organização, 
                      incluindo uma consultoria não só no ato da contratação mais também um pós venda eficaz.
                    </p>
                    
                    <p className="text-lg leading-relaxed">
                      Buscamos estabelecer uma relação transparente com os nossos clientes, oferecendo 
                      suporte através do atendimento diferenciado, com atendimento em horário comercial 
                      de segunda a sexta e atendimento emergencial aos finais de semana e feriados.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Image */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="overflow-hidden rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                    <img
                      src="https://i.postimg.cc/52gZx5Lg/edificio-italia.jpg"
                      alt="Equipe profissional de seguros de saúde"
                      className="w-full h-[600px] object-cover object-bottom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
                  </div>
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                    <span className="text-blue-600 font-semibold">Edifício Itália</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Nossos Valores e <span className="text-blue-300">Diferenciais</span>
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                O que nos torna únicos no mercado de seguros de saúde
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-sm p-10 rounded-3xl shadow-2xl text-center border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <Shield className="text-white" size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-6">Experiência Comprovada</h3>
                <p className="text-blue-100 leading-relaxed">
                  10 anos de atuação no mercado com milhares de clientes satisfeitos
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-10 rounded-3xl shadow-2xl text-center border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-br from-green-400 to-green-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <Users className="text-white" size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-6">Corretores Capacitados</h3>
                <p className="text-blue-100 leading-relaxed">
                  Equipe especializada e comprometida com a melhor orientação
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-10 rounded-3xl shadow-2xl text-center border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-br from-purple-400 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <Clock className="text-white" size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-6">Atendimento 24/7</h3>
                <p className="text-blue-100 leading-relaxed">
                  Suporte comercial e emergencial quando você mais precisa
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-10 rounded-3xl shadow-2xl text-center border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <Award className="text-white" size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-6">Qualidade Garantida</h3>
                <p className="text-blue-100 leading-relaxed">
                  Serviços realizados conforme normas de qualidade rigorosas
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-10 rounded-3xl shadow-2xl text-center border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-br from-red-400 to-red-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <Heart className="text-white" size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-6">Relacionamento Transparente</h3>
                <p className="text-blue-100 leading-relaxed">
                  Comunicação clara e honesta em todas as etapas do processo
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-10 rounded-3xl shadow-2xl text-center border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-br from-indigo-400 to-indigo-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <Star className="text-white" size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-6">Pós-Venda Eficaz</h3>
                <p className="text-blue-100 leading-relaxed">
                  Acompanhamento contínuo após a contratação do seu plano
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Como Podemos <span className="text-blue-600">Ajudar Você</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Soluções completas para suas necessidades de saúde
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-10 rounded-3xl shadow-xl border border-blue-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Para Pessoa Física</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <strong className="text-gray-900 text-lg">Planos Individuais e Familiares</strong>
                      <p className="text-gray-700 mt-2">Escolha o plano ideal, com a cobertura certa para você e quem você ama.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <strong className="text-gray-900 text-lg">Consultoria Personalizada</strong>
                      <p className="text-gray-700 mt-2">Conte com orientação especializada para identificar as melhores opções do mercado.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <strong className="text-gray-900 text-lg">Análise de Necessidades</strong>
                      <p className="text-gray-700 mt-2">Entendemos seu perfil e suas prioridades para indicar o plano mais adequado ao seu momento de vida.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <strong className="text-gray-900 text-lg">Atendimento Rápido e Sem Burocracia</strong>
                      <p className="text-gray-700 mt-2">Oferecemos suporte ágil, claro e humanizado para tirar dúvidas, orientar na escolha do plano e auxiliar em todas as etapas.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-10 rounded-3xl shadow-xl border border-green-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Para Empresas</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <strong className="text-gray-900 text-lg">Planos Coletivos Empresariais</strong>
                      <p className="text-gray-700 mt-2">Ofereça saúde de qualidade aos seus colaboradores com opções sob medida para o perfil da sua empresa.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <strong className="text-gray-900 text-lg">Gestão de Benefícios</strong>
                      <p className="text-gray-700 mt-2">Auxiliamos no gerenciamento dos planos de saúde, garantindo eficiência, economia e satisfação dos colaboradores.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <strong className="text-gray-900 text-lg">Negociação com Operadoras</strong>
                      <p className="text-gray-700 mt-2">Atuamos diretamente com as operadoras para buscar as melhores condições e coberturas para sua empresa.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <strong className="text-gray-900 text-lg">Suporte Administrativo</strong>
                      <p className="text-gray-700 mt-2">Cuidamos das rotinas operacionais relacionadas aos planos, como inclusões, exclusões e orientações gerais.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-10 rounded-3xl shadow-xl border border-purple-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Para Profissionais por Adesão</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <CheckCircle className="text-purple-600 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <strong className="text-gray-900 text-lg">Planos Coletivos por Adesão</strong>
                      <p className="text-gray-700 mt-2">Acesso a planos com valores reduzidos e ampla cobertura, disponíveis para profissionais da área médica e suas associações.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="text-purple-600 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <strong className="text-gray-900 text-lg">Vantagens por Categoria Profissional</strong>
                      <p className="text-gray-700 mt-2">Condições especiais negociadas para sua área de atuação — ideal para médicos, advogados, engenheiros, servidores públicos e muitas outras categorias.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="text-purple-600 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <strong className="text-gray-900 text-lg">Ampla Rede Credenciada</strong>
                      <p className="text-gray-700 mt-2">Atendimentos em hospitais, laboratórios e clínicas de referência, com qualidade e conveniência.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="text-purple-600 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <strong className="text-gray-900 text-lg">Adesão Facilitada</strong>
                      <p className="text-gray-700 mt-2">Processo simples, sem burocracia e com o suporte de uma equipe especializada em planos por afinidade profissional.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-16">
                <a
                  href="https://wa.me/5511959305175"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-6 px-12 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  ENCONTRE O PLANO PERFEITO PARA VOCÊ
                </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutPage;
