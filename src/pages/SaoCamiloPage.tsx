import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle, Phone, CheckCircle, AlertCircle, Shield, Users, Heart, Award, Clock } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { FormData as ContactFormData } from '../types';
import { useLeadSubmission } from '../hooks/useLeadSubmission';
import saoCamiloLogo from '../assets/images/Logo-Plano-Sao-Camilo.png';

const SaoCamiloPage: React.FC = () => {
  console.log('🟢 [São Camilo] Componente SaoCamiloPage renderizando...');
  
  // Hook do Supabase
  const { isSubmitting, submitLead } = useLeadSubmission();
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    idade: '',
    tem_cnpj: false,
    subject: 'sao_camilo_coren_enfermeiros',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  console.log('🟢 [São Camilo] Estado inicial configurado:', { formData, errors, showSuccessPopup });

  useEffect(() => {
    console.log('🟢 [São Camilo] Componente montado! useEffect executado.');
  }, []);

  const subjectOptions = [
    { value: 'sao_camilo_coren_enfermeiros', label: 'São Camilo - Enfermeiros COREN' },
    { value: 'sao_camilo_adesao_coletiva', label: 'São Camilo - Adesão Coletiva' },
    { value: 'sao_camilo_rede_propria', label: 'São Camilo - Rede Própria' },
    { value: 'sao_camilo_hospitais', label: 'São Camilo - Hospitais Credenciados' },
    { value: 'sao_camilo_valores', label: 'São Camilo - Valores e Condições' },
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
    console.log('� [São Camilo] Iniciando envio via Supabase...');
    
    if (validateForm()) {
      console.log('✅ [São Camilo] Validação aprovada');
      console.log('📋 [São Camilo] Dados:', formData);
      
      // Preparar dados para o Supabase
      const leadData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        idade: formData.idade,
        tem_cnpj: formData.tem_cnpj,
        operadora: 'São Camilo', // Nome da operadora
        subject: `São Camilo - ${formData.subject}`,
        message: formData.message || 'Cliente interessado em plano São Camilo para enfermeiros'
      };

      try {
        console.log('� [São Camilo] Enviando para Supabase...');
        const result = await submitLead(leadData);
        
        if (result.success) {
          console.log('✅ [São Camilo] Lead enviado com sucesso!');
          
          // Mostrar popup de sucesso
          setShowSuccessPopup(true);
          
          // Limpar formulário
          setTimeout(() => {
            setFormData({
              name: '',
              email: '',
              phone: '',
              idade: '',
              tem_cnpj: false,
              subject: 'sao_camilo_coren_enfermeiros',
              message: ''
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
    console.log('🟢 [São Camilo] Input alterado:', e.target.name, '=', e.target.value);
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => {
      const newData = { 
        ...prev, 
        [name]: type === 'checkbox' ? checked : value 
      };
      console.log('🟢 [São Camilo] FormData atualizado:', newData);
      return newData;
    });
    
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
      console.log('🟢 [São Camilo] Erro limpo para campo:', name);
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      'Olá! Sou enfermeiro(a) com COREN ativo e gostaria de saber mais sobre o plano São Camilo com adesão coletiva.'
    );
    const whatsappUrl = `https://wa.me/5511959305175?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
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
                  Condições Especiais para Enfermeiros COREN
                </motion.h2>
                
                <motion.p 
                  className="text-lg text-red-600 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Acesso direto à rede própria São Camilo com valores especiais por adesão coletiva para enfermeiros.
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
                    <h3 className="text-xl font-bold text-red-800 mb-2">Tradição e Excelência</h3>
                    <p className="text-red-600">Rede própria de hospitais</p>
                  </div>
                </div>
                
                {/* Floating elements */}
                <motion.div 
                  className="absolute -top-4 -right-4 bg-red-500 text-white p-3 rounded-full"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <Shield size={24} />
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-4 -left-4 bg-orange-500 text-white p-3 rounded-full"
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
                Por que escolher o <span className="text-red-600">São Camilo</span>?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Qualidade reconhecida, tradição hospitalar e condições exclusivas para enfermeiros
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Rede Própria Exclusiva",
                  description: "Atendimento direto nos hospitais São Camilo sem intermediários, garantindo qualidade no atendimento."
                },
                {
                  icon: Heart,
                  title: "Qualidade Reconhecida",
                  description: "Hospitais com tradição em excelência médica, estrutura moderna e equipe altamente qualificada."
                },
                {
                  icon: Users,
                  title: "Adesão Coletiva COREN",
                  description: "Condições especiais disponíveis apenas para enfermeiros com inscrição ativa no COREN."
                },
                {
                  icon: Award,
                  title: "Custo-Benefício Superior",
                  description: "Valores mais acessíveis que outras operadoras que oferecem São Camilo credenciado."
                },
                {
                  icon: Clock,
                  title: "Atendimento Ágil",
                  description: "Sem filas de espera, com agendamento facilitado e atendimento prioritário para beneficiários."
                },
                {
                  icon: Award,
                  title: "Tradição e Confiança",
                  description: "Mais de 100 anos de tradição em saúde, sendo referência em qualidade hospitalar no Brasil."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <feature.icon className="w-8 h-8 text-red-600" />
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
        <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Hospitais <span className="text-red-600">São Camilo</span> Credenciados
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Acesso direto aos melhores hospitais da rede própria São Camilo em São Paulo
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {[
                {
                  title: "São Camilo Ipiranga",
                  subtitle: "Unidade Principal",
                  description: "Hospital de referência com centro cirúrgico moderno e UTI de alta complexidade",
                  features: [
                    "Centro cirúrgico de última geração",
                    "UTI com 80 leitos especializados",
                    "Pronto Socorro 24h",
                    "Medicina diagnóstica completa"
                  ],
                  highlight: true,
                  badge: "UNIDADE PRINCIPAL",
                  icon: Heart
                },
                {
                  title: "São Camilo Santana & Pompéia",
                  subtitle: "Unidades Especializadas", 
                  description: "Hospitais com especialidades diversas e atendimento humanizado",
                  features: [
                    "Maternidade com centro obstétrico",
                    "Oncologia e hematologia",
                    "Cardiologia intervencionista",
                    "Pediatria e neonatologia"
                  ],
                  highlight: false,
                  badge: "REDE COMPLETA",
                  icon: Shield
                }
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  className={`relative p-8 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 ${
                    plan.highlight 
                      ? 'bg-gradient-to-br from-red-600 to-orange-600 text-white' 
                      : 'bg-white border-2 border-red-100'
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute -top-4 left-8">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                      plan.highlight 
                        ? 'bg-yellow-400 text-red-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {plan.badge}
                    </span>
                  </div>

                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 mt-4 ${
                    plan.highlight ? 'bg-white/20' : 'bg-red-100'
                  }`}>
                    <plan.icon className={`w-8 h-8 ${plan.highlight ? 'text-white' : 'text-red-600'}`} />
                  </div>
                  
                  <h3 className={`text-2xl font-bold mb-2 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                    {plan.title}
                  </h3>
                  <h4 className={`text-lg font-semibold mb-4 ${plan.highlight ? 'text-red-100' : 'text-red-600'}`}>
                    {plan.subtitle}
                  </h4>
                  <p className={`mb-6 ${plan.highlight ? 'text-red-100' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className={`w-5 h-5 ${plan.highlight ? 'text-red-300' : 'text-red-500'}`} />
                        <span className={plan.highlight ? 'text-red-100' : 'text-gray-700'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                      plan.highlight
                        ? 'bg-white text-red-600 hover:bg-red-50'
                        : 'bg-red-600 text-white hover:bg-red-700'
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
                Vantagens <span className="text-red-600">Exclusivas</span> para Enfermeiros
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Benefícios especiais desenvolvidos especialmente para profissionais da enfermagem
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Diferenciais Únicos</h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: Users,
                      title: "Adesão Coletiva COREN",
                      description: "Disponível exclusivamente para enfermeiros com inscrição ativa no COREN, com valores especiais."
                    },
                    {
                      icon: Shield,
                      title: "Acesso Direto",
                      description: "Sem intermediários - entrada direta na rede própria São Camilo com toda a qualidade garantida."
                    },
                    {
                      icon: Award,
                      title: "Custo-Benefício",
                      description: "Valores mais acessíveis comparado a outras operadoras que oferecem São Camilo credenciado."
                    },
                    {
                      icon: Heart,
                      title: "Atendimento Humanizado",
                      description: "Cuidado especial e atendimento diferenciado para profissionais da área de saúde."
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
                      <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-6 h-6 text-red-600" />
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
                <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl p-8 text-white shadow-2xl">
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-4">100+</div>
                    <div className="text-xl font-semibold mb-2">Anos de Tradição</div>
                    <div className="text-red-100 mb-6">Em excelência hospitalar</div>
                    <div className="grid grid-cols-1 gap-4 text-center">
                      <div className="bg-white/20 rounded-xl p-4">
                        <div className="text-2xl font-bold">COREN</div>
                        <div className="text-sm text-red-200">Exclusivo</div>
                      </div>
                      <div className="bg-white/20 rounded-xl p-4">
                        <div className="text-2xl font-bold">Própria</div>
                        <div className="text-sm text-red-200">Rede Hospital</div>
                      </div>
                      <div className="bg-white/20 rounded-xl p-4">
                        <div className="text-2xl font-bold">24h</div>
                        <div className="text-sm text-red-200">Pronto Socorro</div>
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
      <section id="formulario" className="py-20 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Solicite sua <span className="text-red-600">Cotação</span>
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
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
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
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
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
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
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
                    <label htmlFor="idade" className="block text-sm font-medium text-gray-700 mb-2">
                      Idade *
                    </label>
                    <input
                      type="text"
                      id="idade"
                      name="idade"
                      value={formData.idade}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                        errors.idade ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Sua idade"
                    />
                    {errors.idade && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle size={16} />
                        {errors.idade}
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
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
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

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="tem_cnpj"
                    name="tem_cnpj"
                    checked={formData.tem_cnpj}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor="tem_cnpj" className="text-sm font-medium text-gray-700">
                    Tenho CNPJ
                  </label>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder="Conte-nos mais sobre suas necessidades..."
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleWhatsAppClick}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
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
                      className="flex items-center justify-center gap-2 text-red-600 hover:text-red-700 transition-colors"
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
          >
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-2xl max-w-md mx-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Solicitação Enviada!</h3>
              <p className="text-gray-600 mb-6">
                Nossa equipe entrará em contato em breve com as melhores condições para você.
              </p>
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
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
};export default SaoCamiloPage;
