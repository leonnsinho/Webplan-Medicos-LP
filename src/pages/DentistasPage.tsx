import React from 'react';
import { CheckCircle, Phone, MessageCircle, Users, Smile } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';

const DentistasPage: React.FC = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      'Olá! Sou dentista e quero uma cotação personalizada de plano de saúde'
    );
    const whatsappUrl = `https://wa.me/5511959305175?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <SEO
        title="Planos de Saúde para Dentistas CRO: Valores e Como Contratar 2025"
        description="Planos de saúde para dentistas CRO: compare Amil, Hapvida, Ampla e SulAmérica. Valores 2025, rede credenciada, processo de contratação e como escolher o melhor plano."
        keywords="planos de saude para dentistas cro, plano saúde cro sp, dentista plano saúde, cro plano saúde, plano saúde odontologia"
        canonicalUrl="https://simuleplanodesaude.com/planos-de-saude-para-dentistas"
      />

      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
        {/* Hero Section */}
        <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection direction="up">
              <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                  Planos de Saúde para <span className="text-cyan-600">Dentistas CRO</span>
                </h1>
                <p className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                  Guia Completo 2025: Valores, Como Contratar e Escolher o Melhor Plano
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                  <a
                    href="#formulario"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-cyan-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Solicitar Cotação
                  </a>
                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Phone className="w-5 h-5" />
                    Falar no WhatsApp
                  </button>
                </div>
              </div>
            </AnimatedSection>

            {/* Intro Box */}
            <AnimatedSection direction="up" delay={0.2}>
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 border-l-4 border-cyan-500 mb-12">
                <p className="text-lg text-cyan-900 mb-4">
                  <strong>Planos de saúde para dentistas CRO</strong> funcionam através de contratação coletiva por adesão, intermediada por associações profissionais. Cirurgiões-dentistas registrados no CRO-SP têm acesso a operadoras como Amil, Hapvida, Ampla e SulAmérica com valores até 40% menores que planos individuais.
                </p>
                <p className="text-lg text-cyan-900">
                  Neste guia você encontra: operadoras disponíveis, valores atualizados 2025, processo de contratação, análise de rede credenciada e como escolher o plano certo para sua situação.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Como Funcionam */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection direction="up">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
                Como Funcionam os Planos de Saúde para Dentistas CRO
              </h2>
            </AnimatedSection>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <AnimatedSection direction="left">
                <div className="bg-cyan-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">CRO-SP: O que é e por que é necessário</h3>
                  <p className="text-gray-700 mb-4">
                    O CRO-SP (Conselho Regional de Odontologia de São Paulo) é o órgão regulador da profissão. Todo cirurgião-dentista precisa de registro ativo para trabalhar legalmente. O registro no CRO-SP é requisito para contratar planos de saúde por adesão da categoria.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right">
                <div className="bg-blue-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Planos por adesão: como funciona</h3>
                  <ol className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-cyan-600">1.</span>
                      Se associa a uma entidade profissional através do nosso time
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-cyan-600">2.</span>
                      A entidade tem convênio com operadoras de saúde de bandeira renomada
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-cyan-600">3.</span>
                      Você contrata o plano através dessa parceria
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-cyan-600">4.</span>
                      Paga mensalidade da associação (R$ 35-60) + mensalidade do plano
                    </li>
                  </ol>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection direction="up" delay={0.2}>
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl p-8 text-center">
                <p className="text-lg">
                  <strong>Principal benefício:</strong> Ter acesso a planos de operadoras de bandeira renomada (Amil, Hapvida, Ampla, SulAmérica) através de entidade de classe, com valores mais acessíveis que planos individuais - que inclusive não existem mais para essas operadoras. Você mantém o plano mudando de consultório ou clínica.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Quem Pode Contratar */}
        <section className="py-20 bg-gradient-to-br from-cyan-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection direction="up">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
                Quem Pode Contratar Planos de Saúde para Dentistas CRO
              </h2>
            </AnimatedSection>

            <div className="grid lg:grid-cols-2 gap-8">
              <AnimatedSection direction="left">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="text-cyan-600" size={24} />
                    Profissionais elegíveis (registro ativo CRO-SP)
                  </h3>
                  <ul className="space-y-3">
                    {['Cirurgiões-dentistas', 'Ortodontistas', 'Implantodontistas', 'Endodontistas', 'Periodontistas'].map((prof) => (
                      <li key={prof} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                        {prof}
                      </li>
                    ))}
                  </ul>
                  <p className="text-gray-600 mt-4">
                    Não importa se trabalha em consultório próprio, clínica, hospital ou está desempregado. Precisa apenas de registro ativo no CRO-SP + associação à entidade através do nosso time.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Smile className="text-cyan-600" size={24} />
                    Dependentes aceitos
                  </h3>
                  <ul className="space-y-3 mb-4">
                    {['Cônjuge ou companheiro(a)', 'Filhos de qualquer idade', 'Enteados', 'Menores sob guarda/tutela'].map((dep) => (
                      <li key={dep} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                        {dep}
                      </li>
                    ))}
                  </ul>
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                    <p className="text-sm text-yellow-900">
                      <strong>Pais como dependentes:</strong> Apenas a <strong>Amil para Dentistas CRO</strong> aceita pais como dependentes. Hapvida, Ampla e SulAmérica não aceitam pais nos planos por adesão.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Operadoras */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection direction="up">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
                Operadoras de Planos de Saúde para Dentistas CRO
              </h2>
              <p className="text-xl text-gray-600 text-center max-w-4xl mx-auto mb-12">
                Quatro operadoras principais oferecem planos para dentistas em 2025. A diferença entre elas está na rede credenciada e modelo de atendimento.
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Amil */}
              <AnimatedSection direction="up" delay={0.1}>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">1. Amil para Dentistas CRO</h3>
                  <div className="space-y-3 mb-6">
                    <p className="text-gray-700"><strong>Rede:</strong> Credenciada ampla (não tem hospitais próprios)</p>
                    <p className="text-gray-700"><strong>Hospitais:</strong> Santa Paula, Nove de Julho, São Camilo</p>
                    <p className="text-gray-700"><strong>Abrangência:</strong> Bronze SP | Prata+ nacional</p>
                    <p className="text-gray-700"><strong>Coparticipação:</strong> Total - você paga em todos os procedimentos</p>
                    <p className="text-gray-700"><strong>Diferencial:</strong> ⭐ Única que aceita pais como dependentes</p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Valores Amil</h4>
                    <p className="text-gray-700">Bronze SP Enfermaria: <span className="text-2xl font-bold text-blue-600">R$ 227-1.002</span></p>
                    <p className="text-gray-700">Prata SP Apartamento: <span className="text-2xl font-bold text-blue-600">R$ 543-2.760</span></p>
                    <p className="text-xs text-gray-500 mt-1">(19 a 59+ anos)</p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Hapvida */}
              <AnimatedSection direction="up" delay={0.2}>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                  <h3 className="text-2xl font-bold text-green-900 mb-4">2. Hapvida Notredame</h3>
                  <div className="space-y-3 mb-6">
                    <p className="text-gray-700"><strong>Rede:</strong> Própria (hospitais e clínicas Hapvida)</p>
                    <p className="text-gray-700"><strong>Hospitais:</strong> Rede Hapvida, São Camilo</p>
                    <p className="text-gray-700"><strong>Abrangência:</strong> Smart regional | ADV 600+ nacional</p>
                    <p className="text-gray-700"><strong>Coparticipação:</strong> Total - você paga em todos os procedimentos</p>
                    <p className="text-gray-700"><strong>Diferencial:</strong> ⭐ Facilidade de agendamento na rede integrada</p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Valores Hapvida</h4>
                    <p className="text-gray-700">Smart 300 Enfermaria: <span className="text-2xl font-bold text-green-600">R$ 334-1.224</span></p>
                    <p className="text-gray-700">Smart 500 Apartamento: <span className="text-2xl font-bold text-green-600">R$ 515-1.885</span></p>
                    <p className="text-xs text-gray-500 mt-1">(19 a 59+ anos)</p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Ampla */}
              <AnimatedSection direction="up" delay={0.3}>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                  <h3 className="text-2xl font-bold text-purple-900 mb-4">3. Ampla Saúde</h3>
                  <div className="space-y-3 mb-6">
                    <p className="text-gray-700"><strong>Rede:</strong> Credenciada regional SP</p>
                    <p className="text-gray-700"><strong>Hospitais:</strong> Nipo Brasileiro, São Camilo, São Luiz</p>
                    <p className="text-gray-700"><strong>Abrangência:</strong> Regional SP</p>
                    <p className="text-gray-700"><strong>Coparticipação:</strong> Parcial - apenas em terapias</p>
                    <p className="text-gray-700"><strong>Diferencial:</strong> ⭐ Bom custo-benefício em categorias médias</p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Valores Ampla</h4>
                    <p className="text-gray-700">Ampla 200 Enfermaria: <span className="text-2xl font-bold text-purple-600">R$ 306-1.452</span></p>
                    <p className="text-gray-700">Ampla 400 Apartamento: <span className="text-2xl font-bold text-purple-600">R$ 449-2.129</span></p>
                    <p className="text-xs text-gray-500 mt-1">(19 a 59+ anos)</p>
                  </div>
                </div>
              </AnimatedSection>

              {/* SulAmérica */}
              <AnimatedSection direction="up" delay={0.4}>
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                  <h3 className="text-2xl font-bold text-red-900 mb-4">4. SulAmérica</h3>
                  <div className="space-y-3 mb-6">
                    <p className="text-gray-700"><strong>Rede:</strong> Credenciada nacional ampla</p>
                    <p className="text-gray-700"><strong>Hospitais:</strong> Rede nacional premium, Santa Joana</p>
                    <p className="text-gray-700"><strong>Abrangência:</strong> Nacional</p>
                    <p className="text-gray-700"><strong>Coparticipação:</strong> Parcial - apenas em terapias</p>
                    <p className="text-gray-700"><strong>Diferencial:</strong> ⭐ Rede premium e programas preventivos</p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Valores SulAmérica</h4>
                    <p className="text-gray-700">Direto Nacional Enfermaria: <span className="text-2xl font-bold text-red-600">R$ 568-2.475</span></p>
                    <p className="text-gray-700">Especial 100 Apartamento: <span className="text-2xl font-bold text-red-600">R$ 935-4.072</span></p>
                    <p className="text-xs text-gray-500 mt-1">(19 a 59+ anos)</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection direction="up" delay={0.5}>
              <div className="mt-8 bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <p className="text-green-900">
                  <strong>💡 Dica:</strong> Verifique quais hospitais próximos do seu consultório e residência atendem em cada operadora antes de decidir. Nossa equipe pode te ajudar nessa análise.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA Meio */}
        <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection direction="up">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Precisa de ajuda para escolher?
              </h2>
              <p className="text-xl text-cyan-100 mb-8">
                Nossa equipe especializada analisa seu perfil profissional, região de atendimento e orçamento para indicar o melhor plano. Atendemos dentistas em São Paulo há mais de 10 anos.
              </p>
              <button
                onClick={handleWhatsAppClick}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mx-auto"
              >
                <MessageCircle size={24} />
                Falar com Especialista no WhatsApp
              </button>
            </AnimatedSection>
          </div>
        </section>

        {/* Análise por Perfil */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection direction="up">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
                Qual Plano Escolher por Idade
              </h2>
            </AnimatedSection>

            <div className="space-y-8">
              {/* 19-28 anos */}
              <AnimatedSection direction="left">
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">19-28 anos: Foco em custo-benefício</h3>
                  <p className="text-gray-700 mb-4">
                    <strong>Melhor opção econômica:</strong> Amil Bronze SP (R$ 227-267)<br />
                    <strong>Alternativa rede própria:</strong> Hapvida Smart 300 (R$ 334-344)
                  </p>
                  <p className="text-gray-700">
                    Nessa faixa, priorize mensalidade baixa. Amil Bronze tem a menor mensalidade com hospitais de qualidade em SP. Hapvida oferece facilidade de agendamento na rede própria.
                  </p>
                  <div className="mt-4 bg-cyan-100 p-4 rounded-lg">
                    <p className="text-cyan-900">
                      <strong>💡 Planejando gravidez?</strong> Considere apartamento desde já. Diferença: R$ 100-150/mês, mas vale o conforto no parto e internações.
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              {/* 29-43 anos */}
              <AnimatedSection direction="right">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">29-43 anos: Equilíbrio preço e rede</h3>
                  <p className="text-gray-700 mb-4">
                    <strong>Melhor custo-benefício:</strong> Hapvida Smart 300/500 (R$ 382-535)<br />
                    <strong>Hospitais específicos:</strong> Ampla 400/600 ou SulAmérica
                  </p>
                  <p className="text-gray-700">
                    Momento de investir em apartamento se tem ou planeja ter filhos (que podem ser incluídos sem limite de idade). Hapvida mantém valores controlados. Se quer hospitais premium (São Luiz, Santa Joana), considere Ampla 600+ ou SulAmérica.
                  </p>
                </div>
              </AnimatedSection>

              {/* 44+ anos */}
              <AnimatedSection direction="left">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">44+ anos: Avalie alternativas</h3>
                  <p className="text-gray-700 mb-4">
                    <strong>Plano por adesão:</strong> Hapvida Smart mantém valores mais baixos (R$ 618-1.224)<br />
                    <strong>Alternativa MEI:</strong> Planos PME podem economizar 40%
                  </p>
                  <p className="text-gray-700">
                    A partir dos 44 anos, os reajustes ficam pesados. Se tem MEI (comum entre dentistas com consultório próprio), planos empresariais PME saem muito mais baratos. Operadoras como Sami oferecem planos a partir de R$ 112/mês para MEI.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Processo de Contratação */}
        <section className="py-20 bg-gradient-to-br from-cyan-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection direction="up">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
                Como Contratar: Processo Passo a Passo
              </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  step: '1',
                  title: 'Confirme seu registro CRO-SP',
                  description: 'Verifique se seu registro está ativo e em dia. Você precisará do número de registro e comprovante de inscrição.'
                },
                {
                  step: '2',
                  title: 'Escolha a operadora',
                  description: 'Com base na rede credenciada, perfil e orçamento. Nossa equipe ajuda nessa análise.'
                },
                {
                  step: '3',
                  title: 'Fale com nosso time',
                  description: 'Orientamos todo o processo de associação à entidade correspondente à operadora escolhida.'
                },
                {
                  step: '4',
                  title: 'Separe a documentação',
                  description: 'RG, CPF, comprovante de residência, carteira CRO-SP. Para dependentes: certidões e documentos pessoais.'
                },
                {
                  step: '5',
                  title: 'Preencha a proposta',
                  description: 'Pode ser digital. Preencha a Declaração de Saúde informando doenças preexistentes (seja honesto!).'
                },
                {
                  step: '6',
                  title: 'Aguarde aprovação',
                  description: 'Prazo médio: 5-10 dias úteis. A operadora pode solicitar documentação complementar.'
                },
                {
                  step: '7',
                  title: 'Efetue o pagamento',
                  description: 'Após aprovação, receba o boleto. Com pagamento confirmado, plano entra em vigor e você recebe a carteirinha digital.'
                }
              ].map((item, index) => (
                <AnimatedSection key={item.step} direction="up" delay={index * 0.1}>
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all relative">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 mt-4">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Carências */}
            <AnimatedSection direction="up" delay={0.5}>
              <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Carências: o que você precisa saber</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-cyan-600 text-white">
                      <tr>
                        <th className="px-6 py-3 text-left">Tipo de Atendimento</th>
                        <th className="px-6 py-3 text-left">Prazo de Carência</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        ['Urgência e emergência', '24 horas'],
                        ['Consultas e exames simples', '30 dias'],
                        ['Exames especiais e terapias', '180 dias'],
                        ['Internações e cirurgias', '180 dias'],
                        ['Parto', '300 dias']
                      ].map(([tipo, prazo], index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-gray-700">{tipo}</td>
                          <td className="px-6 py-4 font-semibold text-cyan-600">{prazo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 bg-cyan-50 p-4 rounded-lg">
                  <p className="text-cyan-900">
                    <strong>💡 Redução de carências:</strong> Se possui plano anterior há 12+ meses, pode apresentar carta de permanência para reduzir carências. Nossa equipe analisa cada caso.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection direction="up">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Tire Suas Dúvidas com Quem Entende de Planos para Dentistas
              </h2>
              <p className="text-xl text-cyan-100 mb-8">
                Somos especializados em planos de saúde para profissionais da saúde desde 2015. Atendemos mais de 8.000 famílias com avaliação 5.0 no Google. Vamos encontrar o plano ideal para seu perfil, região e orçamento.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleWhatsAppClick}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <MessageCircle size={24} />
                  Solicitar Cotação Personalizada
                </button>
                <a
                  href="tel:+551141165378"
                  className="bg-white hover:bg-gray-100 text-cyan-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Phone size={24} />
                  (11) 4116-5378
                </a>
              </div>
              <p className="text-cyan-100 mt-6">
                📱 WhatsApp: (11) 95930-5175
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Formulário de Contato */}
        <div id="formulario">
          <ContactForm />
        </div>

        {/* Resumo Final */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection direction="up">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
                Resumo: Planos de Saúde para Dentistas CRO-SP
              </h2>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2}>
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Pontos principais:</h3>
                <ul className="space-y-3">
                  {[
                    'Planos de saúde para dentistas CRO dão acesso a operadoras de bandeira renomada através de entidades de classe',
                    'Essas operadoras não comercializam mais planos individuais - a adesão por entidade é a forma de acesso',
                    'Não depende de vínculo empregatício (funciona mesmo autônomo ou desempregado)',
                    'Amil para Dentistas CRO aceita pais como dependentes (única)',
                    'Filhos podem ser incluídos sem limite de idade',
                    'Coparticipação total (Amil, Hapvida): paga em todos procedimentos com teto por item',
                    'Coparticipação parcial (Ampla, SulAmérica): paga apenas em terapias',
                    'Dentistas com MEI podem economizar 40% com planos PME',
                    'Após 44 anos, valores sobem - considere alternativas'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <CheckCircle className="text-cyan-600 flex-shrink-0 mt-1" size={20} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.3}>
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Como decidir:</h3>
                <ol className="space-y-3">
                  {[
                    'Liste hospitais próximos do consultório e residência',
                    'Veja qual operadora atende esses hospitais',
                    'Compare valores para sua faixa etária',
                    'Se tem MEI, compare com planos PME',
                    'Fale com nosso time para orientação sobre associação',
                    'Contrate o plano'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <span className="font-bold text-cyan-600 text-lg">{index + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </>
  );
};

export default DentistasPage;
