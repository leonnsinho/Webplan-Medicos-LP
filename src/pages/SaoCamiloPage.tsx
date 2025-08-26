import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle, CheckCircle, AlertCircle, Shield, Users, Heart, Award, Clock, Star } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { useLeadSubmission } from '../hooks/useLeadSubmission';
import { FormData as ContactFormData } from '../types';
import saoCamiloLogo from '../assets/images/Logo-Plano-Sao-Camilo.png';

const SaoCamiloPage: React.FC = () => {
  console.log('🟢 [São Camilo] Componente SaoCamiloPage renderizando...');
  
  const { submitLead, isSubmitting } = useLeadSubmission();
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: 'sao_camilo_crm_medicos',
    message: '',
    idade: '',
    tem_cnpj: false
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const subjectOptions = [
    { value: 'sao_camilo_crm_medicos', label: 'São Camilo - Médicos CRM' },
    { value: 'sao_camilo_adesao_coletiva', label: 'São Camilo - Adesão Coletiva' },
    { value: 'sao_camilo_rede_propria', label: 'São Camilo - Rede Própria' },
    { value: 'sao_camilo_hospitais', label: 'São Camilo - Hospitais Credenciados' },
    { value: 'sao_camilo_informacoes', label: 'Informações Gerais - São Camilo' }
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
    console.log('🚀 [São Camilo] Iniciando envio via Supabase...');
    
    if (validateForm()) {
      console.log('✅ [São Camilo] Validação aprovada');
      console.log('📋 [São Camilo] Dados:', formData);
      
      // Preparar dados para o Supabase
      const leadData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        operadora: 'São Camilo', // Nome da operadora
        subject: `São Camilo - ${formData.subject}`,
        message: formData.message || 'Cliente interessado em plano São Camilo para médicos',
        idade: formData.idade,
        tem_cnpj: formData.tem_cnpj
      };

      try {
        console.log('📤 [São Camilo] Enviando para Supabase...');
        const result = await submitLead(leadData);
        
        if (result.success) {
          console.log('✅ [São Camilo] Lead enviado com sucesso!');
          
          // Limpar formulário
          setTimeout(() => {
            setFormData({
              name: '',
              email: '',
              phone: '',
              subject: 'sao_camilo_crm_medicos',
              message: '',
              idade: '',
              tem_cnpj: false
            });
          }, 1000);
          
        } else {
          console.error('❌ [São Camilo] Erro ao enviar:', result.error);
          alert(`Erro ao enviar: ${result.error}`);
        }
      } catch (error) {
        console.error('💥 [São Camilo] Erro inesperado:', error);
        alert('Erro inesperado ao enviar formulário. Tente novamente.');
      }
    } else {
      console.log('❌ [São Camilo] Validação falhou:', errors);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      'Olá! Sou médico(a) com CRM ativo e gostaria de saber mais sobre os planos São Camilo com adesão coletiva e rede própria.'
    );
    const whatsappUrl = `https://wa.me/5511959305175?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
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
                  <img src={saoCamiloLogo} alt="São Camilo Logo" className="h-16 w-auto" />
                  <div className="h-12 w-px bg-red-300"></div>
                  <h1 className="text-4xl sm:text-5xl font-bold text-red-800">
                    São Camilo
                  </h1>
                </motion.div>
                
                <motion.h2 
                  className="text-2xl sm:text-3xl font-semibold text-red-700 mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Tradição e Excelência para Médicos
                </motion.h2>
                
                <motion.p 
                  className="text-lg text-red-600 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Mais de 50 anos cuidando da saúde dos brasileiros com rede própria e condições especiais para médicos com CRM ativo.
                </motion.p>

                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <button
                    onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Solicitar Cotação
                  </button>
                  <button
                    onClick={handleWhatsAppClick}
                    className="bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
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
                <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-red-100">
                  <img src={saoCamiloLogo} alt="São Camilo Logo" className="w-full h-64 object-contain" />
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-red-800 mb-2">Mais de 50 anos de tradição</h3>
                    <p className="text-red-600">Rede própria de excelência no Brasil</p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-red-800 mb-4">
              Vantagens Exclusivas para Médicos
            </h2>
            <p className="text-lg text-red-600 max-w-3xl mx-auto">
              Condições especiais para médicos com CRM ativo e acesso à rede própria São Camilo
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Adesão Coletiva Especial",
                description: "Condições exclusivas para médicos com CRM ativo e valores diferenciados",
                color: "red"
              },
              {
                icon: Shield,
                title: "Rede Própria Premium",
                description: "Acesso direto aos hospitais São Camilo com padrão de excelência",
                color: "red"
              },
              {
                icon: Award,
                title: "Tradição de 50+ Anos",
                description: "Décadas de experiência cuidando da saúde dos brasileiros",
                color: "red"
              },
              {
                icon: Clock,
                title: "Atendimento Humanizado",
                description: "Cuidado personalizado e acolhedor em todas as unidades",
                color: "red"
              },
              {
                icon: Heart,
                title: "Estrutura Moderna",
                description: "Hospitais com tecnologia de ponta e equipes especializadas",
                color: "red"
              },
              {
                icon: Star,
                title: "Reconhecimento Nacional",
                description: "Prêmios e certificações que atestam nossa qualidade",
                color: "red"
              }
            ].map((feature, index) => (
              <AnimatedSection key={feature.title} direction="up" delay={0.1 * index}>
                <motion.div 
                  className={`bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 text-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-red-200`}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`bg-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className="text-white" size={32} />
                  </div>
                  <h3 className={`text-xl font-bold text-red-800 mb-3`}>{feature.title}</h3>
                  <p className={`text-red-600 leading-relaxed`}>{feature.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-red-800 mb-4">
              Planos São Camilo para Médicos
            </h2>
            <p className="text-lg text-red-600 max-w-3xl mx-auto">
              Opções especiais com rede própria e condições exclusivas para profissionais médicos
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "São Camilo - Adesão Coletiva",
                description: "Plano coletivo por adesão com condições especiais para médicos",
                features: ["Desconto especial CRM", "Rede própria São Camilo", "Atendimento diferenciado", "Cobertura nacional"],
                highlight: false
              },
              {
                name: "São Camilo - Rede Própria",
                description: "Acesso prioritário à rede hospitalar própria São Camilo",
                features: ["Hospitais próprios", "Sem carência para urgência", "Atendimento humanizado", "Estrutura de excelência"],
                highlight: true
              },
              {
                name: "São Camilo - Hospitais Credenciados",
                description: "Ampla rede credenciada com qualidade São Camilo",
                features: ["Rede credenciada ampla", "Flexibilidade geográfica", "Atendimento personalizado", "Gestão simplificada"],
                highlight: false
              }
            ].map((plan, index) => (
              <AnimatedSection key={plan.name} direction="up" delay={0.2 * index}>
                <motion.div 
                  className={`bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden transition-all duration-300 transform hover:scale-105 ${plan.highlight ? 'border-4 border-red-500' : 'border border-red-200'}`}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {plan.highlight && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-2 rounded-bl-lg font-semibold">
                      Mais Popular
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold text-red-800 mb-4">{plan.name}</h3>
                  <p className="text-red-600 mb-6 leading-relaxed">{plan.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3 text-red-700">
                        <CheckCircle size={16} className="text-red-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`w-full py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                      plan.highlight 
                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                        : 'bg-red-100 hover:bg-red-200 text-red-700'
                    }`}
                  >
                    Solicitar Cotação
                  </button>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="formulario" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-red-800 mb-4">
              Solicite sua Cotação São Camilo
            </h2>
            <p className="text-lg text-red-600 max-w-2xl mx-auto">
              Preencha o formulário e receba uma proposta personalizada para médicos
            </p>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.2}>
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-red-800 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
                        errors.name ? 'border-red-500' : 'border-red-300'
                      }`}
                      placeholder="Digite seu nome completo"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle size={16} />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-red-800 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
                        errors.email ? 'border-red-500' : 'border-red-300'
                      }`}
                      placeholder="seu.email@exemplo.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle size={16} />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-red-800 mb-2">
                      Telefone/WhatsApp *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
                        errors.phone ? 'border-red-500' : 'border-red-300'
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
                    <label htmlFor="idade" className="block text-sm font-medium text-red-800 mb-2">
                      Idade
                    </label>
                    <input
                      type="text"
                      id="idade"
                      name="idade"
                      value={formData.idade}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="Digite sua idade"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="tem_cnpj"
                    name="tem_cnpj"
                    checked={formData.tem_cnpj}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-red-600 border-red-300 rounded focus:ring-red-500 focus:ring-2"
                  />
                  <label htmlFor="tem_cnpj" className="text-sm font-medium text-red-800">
                    Tenho CNPJ (Pessoa Jurídica)
                  </label>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-red-800 mb-2">
                    Tipo de Plano *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
                      errors.subject ? 'border-red-500' : 'border-red-300'
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

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-red-800 mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Conte-nos mais sobre suas necessidades..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    {isSubmitting ? 'Enviando...' : 'Solicitar Cotação'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleWhatsAppClick}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={20} />
                    WhatsApp
                  </button>
                </div>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default SaoCamiloPage;
