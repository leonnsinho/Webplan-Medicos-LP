import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle, Phone, Mail, CheckCircle, AlertCircle, Shield, Heart, Award, Globe, Building2, Stethoscope } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { FormData as ContactFormData } from '../types';
import { useLeadSubmission } from '../hooks/useLeadSubmission';
import sulamericaLogo from '../assets/images/planos_de_saúde_sulamérica_apcd.webp';

const SulamericaPage: React.FC = () => {
  console.log('🟢 [SulAmérica] Componente SulamericaPage renderizando...');
  
  // Hook do Supabase
  const { isSubmitting, submitLead } = useLeadSubmission();
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    idade: '',
    tem_cnpj: false,
    subject: 'sulamerica_adesao_medicos',
    message: '',
    email_consent: false
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  console.log('🟢 [SulAmérica] Estado inicial configurado:', { formData, errors, showSuccessPopup });
  console.log('🟢 [SulAmérica] Supabase isSubmitting:', isSubmitting);

  useEffect(() => {
    console.log('🟢 [SulAmérica] Componente montado! useEffect executado.');
  }, []);

  const subjectOptions = [
    { value: 'sulamerica_adesao_medicos', label: 'SulAmérica por Adesão - Médicos' },
    { value: 'sulamerica_empresarial', label: 'SulAmérica Empresarial' },
    { value: 'sulamerica_coletivo', label: 'SulAmérica Coletivo' },
    { value: 'sulamerica_categorias', label: 'Informações sobre Categorias' },
    { value: 'sulamerica_informacoes', label: 'Informações Gerais - Médicos' }
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
    console.log('🚀 [SulAmérica] Iniciando envio via Supabase...');
    
    if (validateForm()) {
      console.log('✅ [SulAmérica] Validação aprovada');
      console.log('📋 [SulAmérica] Dados:', formData);
      
      // Preparar dados para o Supabase
      const leadData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        idade: formData.idade,
        tem_cnpj: formData.tem_cnpj,
        operadora: 'SulAmérica', // Nome da operadora
        subject: `SulAmérica - ${formData.subject}`,
        message: formData.message || 'Cliente interessado em plano SulAmérica para médicos',
        email_consent: formData.email_consent
      };

      try {
        console.log('📤 [SulAmérica] Enviando para Supabase...');
        const result = await submitLead(leadData);
        
        if (result.success) {
          console.log('✅ [SulAmérica] Lead enviado com sucesso!');
          
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
              subject: 'sulamerica_adesao_medicos',
              message: '',
              email_consent: false
            });
          }, 1000);
          
        } else {
          console.error('❌ [SulAmérica] Erro ao enviar:', result.error);
          alert(`Erro ao enviar: ${result.error}`);
        }
      } catch (error) {
        console.error('💥 [SulAmérica] Erro inesperado:', error);
        alert('Erro inesperado ao enviar formulário. Tente novamente.');
      }
    } else {
      console.log('❌ [SulAmérica] Validação falhou:', errors);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    console.log('🟢 [SulAmérica] Input alterado:', e.target.name, '=', e.target.value);
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => {
      const newData = { 
        ...prev, 
        [name]: type === 'checkbox' ? checked : value 
      };
      console.log('🟢 [SulAmérica] FormData atualizado:', newData);
      return newData;
    });
    
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
      console.log('🟢 [SulAmérica] Erro limpo para campo:', name);
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      'Olá! Sou da área médica e gostaria de saber mais sobre os planos SulAmérica com benefícios exclusivos para médicos.'
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
                  <img src={sulamericaLogo} alt="SulAmérica Logo" className="h-16 w-auto" />
                  <div className="h-12 w-px bg-red-300"></div>
                  <h1 className="text-4xl sm:text-5xl font-bold text-red-800">
                    SulAmérica
                  </h1>
                </motion.div>
                
                <motion.h2 
                  className="text-2xl sm:text-3xl font-semibold text-red-700 mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Planos Especiais para Médicos
                </motion.h2>
                
                <motion.p 
                  className="text-lg text-red-600 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Mais de 128 anos de tradição oferecendo benefícios exclusivos para profissionais da medicina 
                  profissionais da área médica com abrangência nacional desde a categoria de entrada.
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
                  <img src={sulamericaLogo} alt="SulAmérica Logo" className="w-full h-64 object-contain" />
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-red-800 mb-2">Mais de 128 anos de tradição</h3>
                    <p className="text-red-600">Seguradora líder no Brasil</p>
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
                  <Globe size={24} />
                </motion.div>
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
              Benefícios especiais para profissionais da área médica
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Abrangência Nacional",
                description: "Cobertura em todo território nacional desde a categoria de entrada",
                color: "red"
              },
              {
                icon: Heart,
                title: "Coparticipação Competitiva",
                description: "Mensalidades acessíveis pagando apenas porcentagem ao usar",
                color: "orange"
              },
              {
                icon: Building2,
                title: "Hospitais Premium",
                description: "São Luiz, Samaritano, Sírio-Libanês, Albert Einstein e Vila Nova Star",
                color: "red"
              },
              {
                icon: Stethoscope,
                title: "Telemedicina Incluída",
                description: "Médico na Tela para consultas à distância com qualidade",
                color: "orange"
              },
              {
                icon: Award,
                title: "Múltiplas Categorias",
                description: "Direto Nacional, Exato, Clássico, Especial 100 e Executivo",
                color: "red"
              },
              {
                icon: Shield,
                title: "Assistência 24h",
                description: "Cobertura no Brasil e exterior com diversos serviços especiais",
                color: "orange"
              }
            ].map((feature, index) => (
              <AnimatedSection key={feature.title} direction="up" delay={0.1 * index}>
                <motion.div 
                  className={`bg-gradient-to-br from-red-50 to-orange-100 rounded-2xl p-6 text-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-red-200`}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`bg-${feature.color}-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
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
      <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-red-800 mb-4">
              Categorias SulAmérica para Médicos
            </h2>
            <p className="text-lg text-red-600 max-w-3xl mx-auto">
              Escolha a categoria ideal conforme sua necessidade e orçamento
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Direto Nacional / Exato",
                description: "Categorias de entrada com cobertura nacional e hospitais credenciados",
                features: ["Abrangência nacional", "Hospitais credenciados", "Telemedicina incluída", "Coparticipação disponível"],
                highlight: false
              },
              {
                name: "Clássico / Especial 100",
                description: "Categorias intermediárias com reembolso e assistência 24h",
                features: ["Transplantes incluídos", "Escleroterapia 30 sessões/ano", "Assistência 24h Brasil", "Reembolso no exterior"],
                highlight: true
              },
              {
                name: "Executivo Premium",
                description: "Categoria top com cobertura internacional completa",
                features: ["Cobertura no exterior", "Assistência 24h mundial", "Reembolso internacional", "Serviços VIP exclusivos"],
                highlight: false
              }
            ].map((plan, index) => (
              <AnimatedSection key={plan.name} direction="up" delay={0.2 * index}>
                <motion.div 
                  className={`rounded-2xl p-8 text-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                    plan.highlight 
                      ? 'bg-red-600 text-white border-4 border-red-400' 
                      : 'bg-white text-red-800 border-2 border-red-200'
                  }`}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {plan.highlight && (
                    <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
                      Mais Popular
                    </div>
                  )}
                  
                  <h3 className={`text-2xl font-bold mb-4 ${plan.highlight ? 'text-white' : 'text-red-800'}`}>
                    {plan.name}
                  </h3>
                  <p className={`mb-6 ${plan.highlight ? 'text-red-100' : 'text-red-600'}`}>
                    {plan.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className={`flex items-center justify-center gap-2 ${plan.highlight ? 'text-red-100' : 'text-red-700'}`}>
                        <CheckCircle size={20} className={plan.highlight ? 'text-orange-300' : 'text-red-500'} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      plan.highlight 
                        ? 'bg-white text-red-600 hover:bg-red-50' 
                        : 'bg-red-600 text-white hover:bg-red-700'
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

      {/* Contact Form Section */}
      <section id="formulario" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up" className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-red-800 mb-4">
              Solicite seu Plano SulAmérica - Médicos
            </h2>
            <p className="text-lg sm:text-xl text-red-600 max-w-3xl mx-auto">
              Preencha o formulário e receba uma proposta personalizada com benefícios exclusivos para médicos
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <AnimatedSection direction="left" delay={0.2}>
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-red-200">
                <h3 className="text-xl sm:text-2xl font-bold text-red-800 mb-6 flex items-center gap-3">
                  <Mail className="text-red-600" size={24} />
                  Formulário SulAmérica - Médicos
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { name: 'name', label: 'Nome Completo *', type: 'text', placeholder: 'Digite seu nome completo' },
                    { name: 'email', label: 'E-mail *', type: 'email', placeholder: 'seu.email@exemplo.com' },
                    { name: 'phone', label: 'Telefone/WhatsApp *', type: 'tel', placeholder: '(11) 99999-9999' },
                    { name: 'idade', label: 'Idades *', type: 'text', placeholder: 'Ex: 16, 17, 54' }
                  ].filter(field => field.name !== 'tem_cnpj').map((field, index) => (
                    <motion.div
                      key={field.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                    >
                      <label htmlFor={field.name} className="block text-sm font-medium text-red-700 mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name as keyof Pick<ContactFormData, 'name' | 'email' | 'phone' | 'idade'>]}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
                          errors[field.name as keyof ContactFormData] ? 'border-red-500' : 'border-red-300'
                        }`}
                        placeholder={field.placeholder}
                      />
                      {errors[field.name as keyof ContactFormData] && (
                        <motion.p 
                          className="mt-1 text-sm text-red-600 flex items-center gap-1"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <AlertCircle size={16} />
                          {errors[field.name as keyof ContactFormData]}
                        </motion.p>
                      )}
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex items-center space-x-3"
                  >
                    <input
                      type="checkbox"
                      id="tem_cnpj"
                      name="tem_cnpj"
                      checked={formData.tem_cnpj}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor="tem_cnpj" className="text-sm font-medium text-red-700">
                      Tenho CNPJ
                    </label>
                  </motion.div>

                  {/* Checkbox para Consentimento de Email */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.65 }}
                    className="flex items-start space-x-3"
                  >
                    <input
                      type="checkbox"
                      id="email_consent"
                      name="email_consent"
                      checked={formData.email_consent}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 rounded mt-0.5"
                    />
                    <label htmlFor="email_consent" className="text-sm text-red-700 leading-relaxed">
                      Aceito receber informações sobre planos de saúde, novidades e ofertas especiais por email. 
                      <span className="text-red-600 block mt-1">
                        Você pode cancelar a qualquer momento.
                      </span>
                    </label>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <label htmlFor="subject" className="block text-sm font-medium text-red-700 mb-2">
                      Tipo de Plano * <span className="text-red-600 font-normal">(Benefícios exclusivos para médicos)</span>
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
                      <motion.p 
                        className="mt-1 text-sm text-red-600 flex items-center gap-1"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <AlertCircle size={16} />
                        {errors.subject}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <label htmlFor="message" className="block text-sm font-medium text-red-700 mb-2">
                      Mensagem Adicional
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
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    <Send size={20} />
                    {isSubmitting ? 'Enviando...' : 'Solicitar Plano SulAmérica - Médicos'}
                  </motion.button>
                </form>
              </div>
            </AnimatedSection>

            {/* WhatsApp Contact */}
            <AnimatedSection direction="right" delay={0.4}>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-xl p-8 flex flex-col justify-center border-2 border-green-200">
                <div className="text-center">
                  <motion.div 
                    className="bg-green-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <MessageCircle className="text-white" size={40} />
                  </motion.div>
                  
                  <motion.h3 
                    className="text-2xl font-bold text-red-800 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    Fale com Especialista SulAmérica
                  </motion.h3>
                  
                  <motion.p 
                    className="text-lg text-red-600 mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    Tire suas dúvidas sobre os planos SulAmérica para médicos com benefícios exclusivos diretamente com nossos consultores especializados.
                  </motion.p>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      { icon: Phone, text: "Consultoria especializada SulAmérica", color: "red" },
                      { icon: CheckCircle, text: "Informações especializadas", color: "orange" },
                      { icon: CheckCircle, text: "Especialistas em categorias", color: "red" }
                    ].map((feature, index) => (
                      <motion.div 
                        key={feature.text}
                        className="flex items-center justify-center gap-3 text-red-700"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.9 + (index * 0.1) }}
                      >
                        <feature.icon size={20} className={`text-${feature.color}-600`} />
                        <span className="font-medium">{feature.text}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.button
                    onClick={handleWhatsAppClick}
                    className="bg-green-500 hover:bg-green-600 text-white py-4 px-8 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 mx-auto"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageCircle size={24} />
                    Consultor SulAmérica - Médicos
                  </motion.button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
          <motion.div 
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-md mx-auto"
            initial={{ scale: 0.7, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 50 }}
            transition={{ duration: 0.4, type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="text-center">
              <motion.div 
                className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <CheckCircle className="text-red-600" size={40} />
              </motion.div>

              <motion.h3 
                className="text-2xl font-bold text-red-800 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                Solicitação Enviada!
              </motion.h3>
              
              <motion.p 
                className="text-red-600 mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                Obrigado pelo interesse nos planos SulAmérica! Em breve um especialista entrará em contato.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-3 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <motion.button
                  onClick={() => setShowSuccessPopup(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Fechar
                </motion.button>
                
                <motion.button
                  onClick={() => {
                    setShowSuccessPopup(false);
                    handleWhatsAppClick();
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SulamericaPage;
