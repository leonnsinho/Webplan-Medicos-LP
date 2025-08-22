import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle, Phone, CheckCircle, AlertCircle, Shield, Users, Heart, Award, Clock, Star } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { FormData as ContactFormData } from '../types';
import { useLeadSubmission } from '../hooks/useLeadSubmission';
import unimedLogo from '../assets/images/seguros-unimed.png';

const UnimedPage: React.FC = () => {
  const { submitLead, isSubmitting } = useLeadSubmission();
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: 'unimed_coren_enfermeiros',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const subjectOptions = [
    { value: 'unimed_coren_enfermeiros', label: 'Seguros Unimed - Enfermeiros COREN' },
    { value: 'unimed_seesp', label: 'Seguros Unimed - Via SEESP' },
    { value: 'unimed_cnpj_2vidas', label: 'Seguros Unimed - CNPJ 2+ Vidas' },
    { value: 'unimed_empresarial', label: 'Seguros Unimed - Empresarial' },
    { value: 'unimed_reembolso', label: 'Seguros Unimed - Reembolso' },
    { value: 'unimed_informacoes', label: 'Informações Gerais - Unimed' }
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
    if (!formData.subject) newErrors.subject = 'Assunto é obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Criar objeto lead para Supabase
        const leadData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message || `Modalidade: ${formData.subject}`,
          operadora: 'Unimed',
          subject: formData.subject,
          source_page: 'unimed-page',
          utm_source: 'website'
        };
        
        const result = await submitLead(leadData);
        
        if (result.success) {
          console.log('✨ [Unimed] Lead enviado com sucesso para Supabase');
          setShowSuccessPopup(true);
          
          // Reset form after success
          setTimeout(() => {
            setFormData({
              name: '',
              email: '',
              phone: '',
              subject: 'unimed_coren_enfermeiros',
              message: ''
            });
          }, 1000);
        } else {
          console.error('❌ [Unimed] Erro retornado pelo hook:', result.error);
        }
      } catch (error) {
        console.error('💥 [Unimed] Erro ao enviar formulário:', error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      'Olá! Sou enfermeiro(a) com COREN ativo e gostaria de saber mais sobre os Seguros Unimed (via SEESP ou CNPJ 2+ vidas).'
    );
    const whatsappUrl = `https://wa.me/5511959305175?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <div className="text-center lg:text-left">
                <motion.div 
                  className="flex items-center justify-center lg:justify-start gap-4 mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <img src={unimedLogo} alt="Seguros Unimed Logo" className="h-16 w-auto" />
                  <div className="h-12 w-px bg-green-300"></div>
                  <h1 className="text-4xl sm:text-5xl font-bold text-green-800">
                    Unimed
                  </h1>
                </motion.div>
                
                <motion.h2 
                  className="text-2xl sm:text-3xl font-semibold text-green-700 mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Cobertura Nacional com Flexibilidade para Enfermeiros
                </motion.h2>
                
                <motion.p 
                  className="text-lg text-green-600 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Seguros Unimed com condições especiais para enfermeiros com COREN ativo. Contratação via SEESP ou CNPJ a partir de 2 vidas.
                </motion.p>

                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <button
                    onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Solicitar Cotação
                  </button>
                  <button
                    onClick={handleWhatsAppClick}
                    className="bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Falar com Consultor
                  </button>
                </motion.div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.3}>
              <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-green-100">
                  <img src={unimedLogo} alt="Seguros Unimed Logo" className="w-full h-64 object-contain" />
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-green-800 mb-2">Sistema Nacional Unimed</h3>
                    <p className="text-green-600">Cobertura em todo o Brasil</p>
                  </div>
                </div>
                
                {/* Floating elements */}
                <motion.div 
                  className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <Shield size={24} />
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-full"
                  animate={{ y: [10, -10, 10] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}
                >
                  <Heart size={24} />
                </motion.div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <AnimatedSection>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Principais Vantagens dos <span className="text-green-600">Seguros Unimed</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ampla rede de cobertura, sistema de intercâmbio nacional e acesso facilitado em diversas regiões do país
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Cobertura Nacional",
                  description: "Acesso facilitado à rede Unimed de todo o Brasil através do sistema de intercâmbio entre Unimeds estaduais."
                },
                {
                  icon: Heart,
                  title: "Rede de Excelência SP",
                  description: "Hospitais de excelência em São Paulo, capital, interior e litoral. Ideal para profissionais com mobilidade."
                },
                {
                  icon: Star,
                  title: "Reembolso Elevado",
                  description: "Reembolso atrativo dependendo da categoria, oferecendo liberdade de escolha fora da rede credenciada."
                },
                {
                  icon: Users,
                  title: "Maior Credenciamento",
                  description: "Uma das operadoras com maior credenciamento do país, garantindo assistência em diversas especialidades."
                },
                {
                  icon: Clock,
                  title: "Facilidade CNPJ",
                  description: "Contratação empresarial a partir de apenas 2 vidas, tornando o plano mais acessível para pequenas empresas."
                },
                {
                  icon: Award,
                  title: "Condições SEESP",
                  description: "Valores reduzidos e condições exclusivas para enfermeiros associados ao SEESP via contratação coletiva."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <feature.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Plans Section */}
      <AnimatedSection>
        <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Duas Formas de Contratação para <span className="text-green-600">Enfermeiros</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Flexibilidade total para atender diferentes perfis e necessidades de enfermeiros com COREN ativo
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {[
                {
                  title: "Via Entidade de Classe",
                  subtitle: "SEESP - Sindicato dos Enfermeiros",
                  description: "Enfermeiros associados ao SEESP podem contratar com valores reduzidos",
                  features: [
                    "Associação ao SEESP obrigatória",
                    "Valores reduzidos e exclusivos",
                    "Contratação coletiva por adesão",
                    "Condições especiais para categoria"
                  ],
                  highlight: true,
                  badge: "VALORES REDUZIDOS",
                  icon: Users
                },
                {
                  title: "Via CNPJ Empresarial",
                  subtitle: "A partir de 2 vidas",
                  description: "CNPJ ativo ou dependentes com empresa registrada",
                  features: [
                    "Apenas 2 vidas para adesão",
                    "CNPJ próprio ou dependentes",
                    "Planos empresariais flexíveis",
                    "Excelente custo-benefício"
                  ],
                  highlight: false,
                  badge: "FACILIDADE 2 VIDAS",
                  icon: Shield
                }
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  className={`relative p-8 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 ${
                    plan.highlight 
                      ? 'bg-gradient-to-br from-green-600 to-blue-600 text-white' 
                      : 'bg-white border-2 border-green-100'
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute -top-4 left-8">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                      plan.highlight 
                        ? 'bg-yellow-400 text-green-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {plan.badge}
                    </span>
                  </div>

                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 mt-4 ${
                    plan.highlight ? 'bg-white/20' : 'bg-green-100'
                  }`}>
                    <plan.icon className={`w-8 h-8 ${plan.highlight ? 'text-white' : 'text-green-600'}`} />
                  </div>
                  
                  <h3 className={`text-2xl font-bold mb-2 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                    {plan.title}
                  </h3>
                  <h4 className={`text-lg font-semibold mb-4 ${plan.highlight ? 'text-green-100' : 'text-green-600'}`}>
                    {plan.subtitle}
                  </h4>
                  <p className={`mb-6 ${plan.highlight ? 'text-green-100' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className={`w-5 h-5 ${plan.highlight ? 'text-green-300' : 'text-green-500'}`} />
                        <span className={plan.highlight ? 'text-green-100' : 'text-gray-700'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                      plan.highlight
                        ? 'bg-white text-green-600 hover:bg-green-50'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    Solicitar Cotação
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Benefits Section */}
      <AnimatedSection>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Por que enfermeiros escolhem a <span className="text-green-600">Seguros Unimed</span>?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Capilaridade nacional, atendimento ágil e qualidade tanto na capital quanto em outras cidades e estados
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Vantagens Exclusivas</h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: Shield,
                      title: "Capilaridade Nacional",
                      description: "Amplamente reconhecida por sua presença em todo território nacional, permitindo atendimento ágil."
                    },
                    {
                      icon: Heart,
                      title: "Ideal para Mobilidade",
                      description: "Escolha perfeita para enfermeiros que atuam em diferentes regiões e precisam de cobertura flexível."
                    },
                    {
                      icon: Users,
                      title: "Facilidade de Contratação",
                      description: "CNPJ com apenas 2 vidas ou condições especiais SEESP tornam o plano acessível e vantajoso."
                    },
                    {
                      icon: Award,
                      title: "Sistema de Intercâmbio",
                      description: "Estrutura única que conecta todas as Unimeds do país, garantindo atendimento em qualquer região."
                    }
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex gap-4"
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h4>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                className="lg:text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-3xl p-8 text-white shadow-2xl">
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-4">2</div>
                    <div className="text-xl font-semibold mb-2">Vidas Mínimas</div>
                    <div className="text-green-100 mb-6">Para contratação empresarial</div>
                    <div className="grid grid-cols-1 gap-4 text-center">
                      <div className="bg-white/20 rounded-xl p-4">
                        <div className="text-2xl font-bold">SEESP</div>
                        <div className="text-sm text-green-200">Via Sindicato</div>
                      </div>
                      <div className="bg-white/20 rounded-xl p-4">
                        <div className="text-2xl font-bold">CNPJ</div>
                        <div className="text-sm text-green-200">Empresarial</div>
                      </div>
                      <div className="bg-white/20 rounded-xl p-4">
                        <div className="text-2xl font-bold">Nacional</div>
                        <div className="text-sm text-green-200">Cobertura</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Contact Form Section */}
      <section id="formulario" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Solicite sua <span className="text-green-600">Cotação</span>
              </h2>
              <p className="text-xl text-gray-600">
                Preencha o formulário abaixo e nossa equipe entrará em contato
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Seu nome completo"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle size={16} />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="seu@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle size={16} />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone/WhatsApp *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="(11) 99999-9999"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle size={16} />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Modalidade de Interesse
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                        errors.subject ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      {subjectOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle size={16} />
                        {errors.subject}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Conte-nos mais sobre suas necessidades..."
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleWhatsAppClick}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={20} />
                    WhatsApp
                  </button>
                </div>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="text-center text-gray-600">
                  <p className="mb-4">Ou entre em contato diretamente:</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <a
                      href="tel:+551141165378"
                      className="flex items-center justify-center gap-2 text-green-600 hover:text-green-700 transition-colors"
                    >
                      <Phone size={20} />
                      (11) 4116-5378
                    </a>

                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-2xl max-w-md mx-4"
              initial={{ scale: 0.7, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Solicitação Enviada!</h3>
                <p className="text-gray-600 mb-6">
                  Nossa equipe entrará em contato em breve com as melhores condições para você.
                </p>
                <button
                  onClick={() => setShowSuccessPopup(false)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UnimedPage;
