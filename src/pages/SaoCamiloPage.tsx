import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Shield, 
  CheckCircle, 
  Users, 
  Building2, 
  Stethoscope,
  Phone,
  Mail,
  MapPin,
  Star,
  Award,
  Clock,
  UserCheck,
  Zap
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SEO from '../components/SEO';

const SaoCamiloPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipoPlano: '',
    coren: '',
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
          _subject: 'Nova Solicitação - Plano São Camilo',
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
    const message = `Olá! Tenho interesse no Plano de Saúde São Camilo para enfermeiros.

📋 *Dados do interessado:*
Nome: ${formData.nome}
Email: ${formData.email}
Telefone: ${formData.telefone}
Tipo: ${formData.tipoPlano}
COREN: ${formData.coren}

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
        title="Plano de Saúde São Camilo para Enfermeiros | Condições Especiais COREN"
        description="Plano de saúde São Camilo exclusivo para enfermeiros com COREN. Acesso direto à rede própria São Camilo com valores especiais por adesão coletiva."
        keywords="plano saúde são camilo, enfermeiros, coren, adesão coletiva, hospital são camilo"
      />

      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-red-200/30 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-red-100/40 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          <div className="relative container mx-auto px-4 text-center">
            <motion.div
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={itemVariants} className="mb-6">
                <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
                  <Heart className="w-4 h-4" />
                  Exclusivo para Enfermeiros
                </span>
              </motion.div>

              <motion.h1 
                variants={itemVariants}
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Plano de Saúde
                <span className="block text-red-600">São Camilo</span>
                <span className="block text-2xl md:text-3xl font-semibold text-gray-700 mt-2">
                  Condições Especiais COREN
                </span>
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed"
              >
                Acesso direto à renomada <strong>Rede São Camilo</strong> com valores especiais 
                para profissionais da enfermagem por <strong>adesão coletiva</strong>
              </motion.p>

              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <button
                  onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5" />
                  Solicitar Cotação
                </button>
                <button
                  onClick={generateWhatsAppMessage}
                  className="bg-white text-red-600 border-2 border-red-600 hover:bg-red-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
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
                Por que escolher o <span className="text-red-600">São Camilo</span>?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Qualidade reconhecida, tradição hospitalar e condições exclusivas para enfermeiros
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Building2,
                  title: "Rede Própria Exclusiva",
                  description: "Atendimento direto nos hospitais São Camilo sem intermediários"
                },
                {
                  icon: Shield,
                  title: "Qualidade Reconhecida",
                  description: "Hospitais referência em excelência clínica e estrutura moderna"
                },
                {
                  icon: Users,
                  title: "Exclusivo Enfermeiros",
                  description: "Plano por adesão coletiva apenas para profissionais com COREN"
                },
                {
                  icon: Award,
                  title: "Custo Acessível",
                  description: "Valores mais vantajosos que planos tradicionais do mercado"
                },
                {
                  icon: Stethoscope,
                  title: "Atendimento Prioritário",
                  description: "Acesso facilitado e prioridade na rede própria São Camilo"
                },
                {
                  icon: Heart,
                  title: "Cuidado Humanizado",
                  description: "Atendimento especializado para quem cuida do próximo"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group hover:scale-105"
                >
                  <div className="bg-red-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors duration-300">
                    <feature.icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Network Section */}
        <AnimatedSection className="py-20 bg-gradient-to-br from-red-50 to-orange-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                <span className="text-red-600">Rede Hospitalar</span> São Camilo
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Acesso direto aos melhores hospitais da rede São Camilo e parceiros credenciados
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Rede Própria */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-red-100 p-3 rounded-xl">
                    <Building2 className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Rede Própria São Camilo</h3>
                </div>

                <div className="space-y-4">
                  {[
                    "Hospital São Camilo Ipiranga",
                    "Hospital São Camilo Santana", 
                    "Hospital São Camilo Pompéia",
                    "Unidades do Interior de SP"
                  ].map((hospital, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors duration-300"
                    >
                      <Star className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <span className="font-medium text-gray-800">{hospital}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-red-100 to-orange-100 rounded-xl">
                  <p className="text-red-800 font-medium text-center">
                    ✨ Atendimento prioritário na rede própria
                  </p>
                </div>
              </motion.div>

              {/* Hospitais Credenciados */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-orange-100 p-3 rounded-xl">
                    <Shield className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Hospitais Credenciados</h3>
                </div>

                <div className="space-y-4">
                  {[
                    "Hospital Nipo-Brasileiro",
                    "Hospital Sepaco"
                  ].map((hospital, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors duration-300"
                    >
                      <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                      <span className="font-medium text-gray-800">{hospital}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl">
                  <p className="text-orange-800 font-medium text-center">
                    🏥 Suporte em diferentes especialidades
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Benefits Section */}
        <AnimatedSection className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Vantagens <span className="text-red-600">Exclusivas</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Benefícios especiais para profissionais da enfermagem com COREN
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Custo-Benefício Superior",
                  description: "Valores mais acessíveis que outras operadoras que oferecem São Camilo credenciado",
                  highlight: true
                },
                {
                  icon: UserCheck,
                  title: "Adesão Coletiva COREN",
                  description: "Disponível apenas para enfermeiros com inscrição ativa no COREN",
                  highlight: false
                },
                {
                  icon: Building2,
                  title: "Atendimento Direto",
                  description: "Sem intermediários - acesso direto à rede própria São Camilo",
                  highlight: false
                },
                {
                  icon: Award,
                  title: "Excelência Reconhecida",
                  description: "Hospitais com tradição em qualidade clínica e estrutura moderna",
                  highlight: false
                },
                {
                  icon: Heart,
                  title: "Cuidado Especializado",
                  description: "Ideal para profissionais que dedicam a vida ao cuidado do próximo",
                  highlight: true
                },
                {
                  icon: Clock,
                  title: "Previsibilidade",
                  description: "Qualidade e confiança nos atendimentos com a marca São Camilo",
                  highlight: false
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`p-8 rounded-2xl transition-all duration-300 group hover:scale-105 ${
                    benefit.highlight 
                      ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-xl' 
                      : 'bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-xl'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                    benefit.highlight 
                      ? 'bg-white/20 group-hover:bg-white/30' 
                      : 'bg-red-100 group-hover:bg-red-200'
                  }`}>
                    <benefit.icon className={`w-8 h-8 ${
                      benefit.highlight ? 'text-white' : 'text-red-600'
                    }`} />
                  </div>
                  <h3 className={`text-xl font-bold mb-4 ${
                    benefit.highlight ? 'text-white' : 'text-gray-900'
                  }`}>
                    {benefit.title}
                  </h3>
                  <p className={`leading-relaxed ${
                    benefit.highlight ? 'text-white/90' : 'text-gray-600'
                  }`}>
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection className="py-20 bg-gradient-to-br from-red-600 to-red-700">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Pronto para ter acesso ao
                <span className="block">São Camilo?</span>
              </h2>
              <p className="text-xl text-red-100 mb-8 leading-relaxed">
                Solicite sua cotação personalizada e descubra as condições especiais 
                para enfermeiros com COREN
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-red-600 hover:bg-red-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5" />
                  Solicitar Cotação Gratuita
                </button>
                <button
                  onClick={generateWhatsAppMessage}
                  className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
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
                  Solicite sua <span className="text-red-600">Cotação</span>
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
                className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 shadow-xl"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                      >
                        <option value="">Selecione uma opção</option>
                        <option value="enfermeiro-coren">Enfermeiro(a) com COREN</option>
                        <option value="estudante-enfermagem">Estudante de Enfermagem</option>
                        <option value="profissional-formado">Profissional Formado</option>
                        <option value="informacoes-gerais">Informações Gerais</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="coren" className="block text-sm font-medium text-gray-700 mb-2">
                        Número COREN (se possuir)
                      </label>
                      <input
                        type="text"
                        id="coren"
                        name="coren"
                        value={formData.coren}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                        placeholder="Ex: COREN-SP 123456"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                      placeholder="Conte-nos mais sobre suas necessidades..."
                    ></textarea>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center gap-2"
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

                <div className="mt-8 pt-8 border-t border-red-200">
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <Phone className="w-5 h-5 text-red-600" />
                      <span className="text-gray-700">(11) 4116-5378</span>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <Mail className="w-5 h-5 text-red-600" />
                      <span className="text-gray-700">contato@webplan.com.br</span>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <MapPin className="w-5 h-5 text-red-600" />
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

export default SaoCamiloPage;
