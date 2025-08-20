import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  CheckCircle, 
  Building2, 
  Stethoscope,
  Phone,
  Mail,
  MapPin,
  Star,
  TrendingDown,
  Zap,
  Globe,
  Brain,
  Heart
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SEO from '../components/SEO';
import aliceImage from '../assets/images/Alice.svg';

const AlicePage: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipoPlano: '',
    cnpj: '',
    observacoes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formsubmit.co/leonardoribeiro3012@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: 'Nova Solicitação - Plano Alice',
          _captcha: false,
          _template: 'table'
        })
      });

      if (response.ok) {
        window.location.href = '/sucesso';
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppMessage = () => {
    const message = `Olá! Tenho interesse no Plano de Saúde Alice para enfermeiros.

📋 *Dados do interessado:*
Nome: ${formData.nome}
Email: ${formData.email}
Telefone: ${formData.telefone}
Tipo: ${formData.tipoPlano}
CNPJ: ${formData.cnpj}

${formData.observacoes ? `Observações: ${formData.observacoes}` : ''}

Gostaria de receber mais informações sobre condições e valores!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/5511982414900?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut" as const,
        staggerChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      <SEO 
        title="Plano de Saúde Alice para Enfermeiros | Inovação via CNPJ"
        description="Plano de saúde Alice exclusivo para CNPJ. Healthtech inovadora com baixo reajuste, cobertura nacional e atendimento digital para enfermeiros."
        keywords="plano saúde alice, enfermeiros, cnpj, healthtech, baixo reajuste, cobertura nacional"
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-100/40 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          <div className="relative container mx-auto px-4 text-center">
            <motion.div
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={itemVariants} className="mb-6">
                <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                  <Smartphone className="w-4 h-4" />
                  Healthtech Inovadora
                </span>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-6">
                <img src={aliceImage} alt="Alice Saúde" className="h-16 mx-auto mb-4" />
              </motion.div>

              <motion.h1 
                variants={itemVariants}
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Plano de Saúde
                <span className="block text-purple-600">Alice</span>
                <span className="block text-2xl md:text-3xl font-semibold text-gray-700 mt-2">
                  Inovação via CNPJ
                </span>
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed"
              >
                O plano de saúde mais <strong>inovador</strong> do Brasil para enfermeiros com CNPJ. 
                <strong>Tecnologia</strong>, <strong>baixo reajuste</strong> e <strong>cobertura nacional</strong>
              </motion.p>

              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <button
                  onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-5 h-5" />
                  Solicitar Cotação
                </button>
                <button
                  onClick={generateWhatsAppMessage}
                  className="bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  WhatsApp
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <AnimatedSection className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Por que escolher a <span className="text-purple-600">Alice</span>?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Revolução no mercado de saúde com tecnologia, medicina preventiva e atendimento humanizado
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Building2,
                  title: "Exclusivo para CNPJ",
                  description: "Não é necessário vínculo com sindicato ou entidade de classe"
                },
                {
                  icon: Globe,
                  title: "Cobertura Nacional",
                  description: "Atendimentos em todo o Brasil com hospitais de referência"
                },
                {
                  icon: Brain,
                  title: "Atendimento Inteligente",
                  description: "Acompanhamento digital, equipe multidisciplinar e suporte contínuo"
                },
                {
                  icon: TrendingDown,
                  title: "Baixo Reajuste",
                  description: "5 anos consecutivos com os menores reajustes: 9% a 12%"
                },
                {
                  icon: Zap,
                  title: "Preço Competitivo",
                  description: "Excelente custo-benefício com qualidade e economia"
                },
                {
                  icon: Heart,
                  title: "Cuidado Preventivo",
                  description: "Modelo preventivo e próximo dos beneficiários"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group hover:scale-105"
                >
                  <div className="bg-purple-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors duration-300">
                    <feature.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Plans Section */}
        <AnimatedSection className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Planos <span className="text-purple-600">Alice</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Escolha o plano ideal para suas necessidades via CNPJ
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "Alice Essencial",
                  description: "Ideal para quem busca qualidade com economia",
                  features: [
                    "Cobertura nacional",
                    "Atendimento digital",
                    "Rede credenciada",
                    "Medicina preventiva",
                    "Telemedicina incluída"
                  ],
                  highlight: false
                },
                {
                  name: "Alice Plus",
                  description: "O mais escolhido pelos profissionais",
                  features: [
                    "Tudo do Essencial",
                    "Hospitais de excelência",
                    "Equipe multidisciplinar",
                    "Acompanhamento personalizado",
                    "Pronto atendimento premium"
                  ],
                  highlight: true
                },
                {
                  name: "Alice Premium",
                  description: "Máxima cobertura e conforto",
                  features: [
                    "Tudo do Plus",
                    "Hospitais VIP",
                    "Segundo médico",
                    "Concierge de saúde",
                    "Cobertura internacional"
                  ],
                  highlight: false
                }
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
                    plan.highlight 
                      ? 'bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-2xl border-4 border-purple-300' 
                      : 'bg-white shadow-xl hover:shadow-2xl'
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                        MAIS ESCOLHIDO
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className={`text-2xl font-bold mb-3 ${
                      plan.highlight ? 'text-white' : 'text-gray-900'
                    }`}>
                      {plan.name}
                    </h3>
                    <p className={`text-lg ${
                      plan.highlight ? 'text-purple-100' : 'text-gray-600'
                    }`}>
                      {plan.description}
                    </p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className={`w-5 h-5 flex-shrink-0 ${
                          plan.highlight ? 'text-white' : 'text-purple-600'
                        }`} />
                        <span className={plan.highlight ? 'text-purple-100' : 'text-gray-700'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                      plan.highlight
                        ? 'bg-white text-purple-600 hover:bg-purple-50'
                        : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800'
                    }`}
                  >
                    Solicitar Cotação
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Benefits Section */}
        <AnimatedSection className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Uma nova forma de <span className="text-purple-600">cuidar da saúde</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Mais que um plano tradicional: uma healthtech com modelo preventivo, digital e próximo dos beneficiários
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-purple-100 p-3 rounded-xl">
                      <Brain className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Medicina Preventiva</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Foco em evitar doenças e acompanhar de perto a jornada de saúde de cada pessoa, 
                    com times de saúde que atuam de forma proativa.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-pink-100 p-3 rounded-xl">
                      <Smartphone className="w-8 h-8 text-pink-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Tecnologia Avançada</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Acompanhamento médico digital, orientação de saúde e suporte contínuo 
                    através de plataformas inovadoras e intuitivas.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-8 rounded-2xl text-white">
                  <h3 className="text-2xl font-bold mb-4">Histórico de Reajustes</h3>
                  <div className="space-y-4">
                    {[
                      { year: "2023", percentage: "9%" },
                      { year: "2022", percentage: "12%" },
                      { year: "2021", percentage: "10%" },
                      { year: "2020", percentage: "11%" },
                      { year: "2019", percentage: "9%" }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-medium">{item.year}</span>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">
                          {item.percentage}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-purple-100 mt-4 text-sm">
                    5 anos consecutivos com os menores reajustes do mercado
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Network Section */}
        <AnimatedSection className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                <span className="text-purple-600">Rede de Excelência</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hospitais de excelência nas principais cidades, garantindo suporte completo quando você mais precisar
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Building2,
                  title: "Hospitais Premium",
                  description: "Rede com os melhores hospitais do país",
                  items: ["Hospital Albert Einstein", "Hospital Sírio-Libanês", "Hospital Israelita", "Hospital Oswaldo Cruz"]
                },
                {
                  icon: Stethoscope,
                  title: "Especialidades",
                  description: "Cobertura completa em todas as especialidades",
                  items: ["Cardiologia", "Oncologia", "Neurologia", "Ortopedia"]
                },
                {
                  icon: Globe,
                  title: "Cobertura Nacional",
                  description: "Atendimento em todo território nacional",
                  items: ["São Paulo", "Rio de Janeiro", "Brasília", "Demais capitais"]
                }
              ].map((network, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="bg-purple-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                    <network.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{network.title}</h3>
                  <p className="text-gray-600 mb-6">{network.description}</p>
                  <ul className="space-y-2">
                    {network.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-purple-600" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection className="py-20 bg-gradient-to-br from-purple-600 to-purple-700">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Pronto para a revolução
                <span className="block">na sua saúde?</span>
              </h2>
              <p className="text-xl text-purple-100 mb-8 leading-relaxed">
                Contrate um plano inteligente, com atendimento de qualidade, 
                rede de excelência e preço justo
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-5 h-5" />
                  Solicitar Cotação Gratuita
                </button>
                <button
                  onClick={generateWhatsAppMessage}
                  className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Falar no WhatsApp
                </button>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Contact Form Section */}
        <section id="contato" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Solicite sua <span className="text-purple-600">Cotação</span>
                </h2>
                <p className="text-xl text-gray-600">
                  Preencha o formulário e receba sua proposta personalizada
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-xl"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        id="nome"
                        name="nome"
                        required
                        value={formData.nome}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone/WhatsApp *
                      </label>
                      <input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        required
                        value={formData.telefone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                        placeholder="(11) 99999-9999"
                      />
                    </div>

                    <div>
                      <label htmlFor="tipoPlano" className="block text-sm font-medium text-gray-700 mb-2">
                        Interesse
                      </label>
                      <select
                        id="tipoPlano"
                        name="tipoPlano"
                        value={formData.tipoPlano}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                      >
                        <option value="">Selecione uma opção</option>
                        <option value="alice-essencial">Alice Essencial</option>
                        <option value="alice-plus">Alice Plus</option>
                        <option value="alice-premium">Alice Premium</option>
                        <option value="informacoes-gerais">Informações Gerais</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700 mb-2">
                        CNPJ (obrigatório) *
                      </label>
                      <input
                        type="text"
                        id="cnpj"
                        name="cnpj"
                        required
                        value={formData.cnpj}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                        placeholder="XX.XXX.XXX/0001-XX"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 mb-2">
                      Observações
                    </label>
                    <textarea
                      id="observacoes"
                      name="observacoes"
                      rows={4}
                      value={formData.observacoes}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                      placeholder="Conte-nos mais sobre suas necessidades..."
                    ></textarea>
                  </div>

                  <div className="bg-purple-100 p-4 rounded-xl">
                    <p className="text-purple-800 text-sm">
                      <strong>Importante:</strong> O Plano Alice é exclusivo para contratação via CNPJ. 
                      Você pode usar seu próprio CNPJ ou de dependentes (cônjuge/filhos).
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Mail className="w-5 h-5" />
                          Enviar Solicitação
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={generateWhatsAppMessage}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <Phone className="w-5 h-5" />
                      WhatsApp Direto
                    </button>
                  </div>
                </form>

                <div className="mt-8 pt-8 border-t border-purple-200">
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <Phone className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-700">(11) 4116-5378</span>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <Mail className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-700">contato@webplan.com.br</span>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <MapPin className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-700">São Paulo, SP</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AlicePage;
