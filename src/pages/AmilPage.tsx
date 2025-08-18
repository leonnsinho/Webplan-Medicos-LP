import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle, Phone, Mail, CheckCircle, AlertCircle, Shield, Users, Heart, Award, Clock, Star } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { FormData as ContactFormData } from '../types';
import amilLogo from '../assets/images/amil_saúde_apcd.webp';

const AmilPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: 'amil_plano',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const subjectOptions = [
    { value: 'amil_plano', label: 'Plano Amil - Pessoa Física' },
    { value: 'amil_empresarial', label: 'Plano Amil - Empresarial' },
    { value: 'amil_adesao', label: 'Plano Amil - Por Adesão' },
    { value: 'amil_informacoes', label: 'Informações Gerais Amil' }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setShowSuccessPopup(true);
      
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'amil_plano',
          message: ''
        });
      }, 1000);

      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.name = 'formsubmit-frame';
      document.body.appendChild(iframe);

      const form = document.createElement('form');
      const endpoint = 'https://formsubmit.co/ana.acfl@gmail.com';
      form.action = endpoint;
      form.method = 'POST';
      form.target = 'formsubmit-frame';
      form.style.display = 'none';

      const fields = {
        'name': formData.name,
        'email': formData.email,
        'phone': formData.phone,
        'subject': formData.subject,
        'message': formData.message,
        '_subject': 'Nova solicitação de cotação Amil - WebPlan Seguros',
        '_captcha': 'false',
        '_template': 'table'
      };

      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

      setTimeout(() => {
        if (document.body.contains(form)) document.body.removeChild(form);
        if (document.body.contains(iframe)) document.body.removeChild(iframe);
      }, 5000);
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
      'Olá! Gostaria de saber mais sobre os planos Amil disponíveis.'
    );
    const whatsappUrl = `https://wa.me/5511959305175?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
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
                  <img src={amilLogo} alt="Amil Logo" className="h-16 w-auto" />
                  <div className="h-12 w-px bg-emerald-300"></div>
                  <h1 className="text-4xl sm:text-5xl font-bold text-emerald-800">
                    Amil
                  </h1>
                </motion.div>
                
                <motion.h2 
                  className="text-2xl sm:text-3xl font-semibold text-emerald-700 mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Cuidando da sua saúde há mais de 40 anos
                </motion.h2>
                
                <motion.p 
                  className="text-lg text-emerald-600 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  A Amil é uma das maiores operadoras de planos de saúde do Brasil, 
                  oferecendo cobertura completa com a maior rede credenciada do país.
                </motion.p>

                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <button
                    onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Solicitar Cotação
                  </button>
                  <button
                    onClick={handleWhatsAppClick}
                    className="bg-transparent border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
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
                <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-emerald-100">
                  <img src={amilLogo} alt="Amil Logo" className="w-full h-64 object-contain" />
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-emerald-800 mb-2">Mais de 40 anos de tradição</h3>
                    <p className="text-emerald-600">Líder em planos de saúde no Brasil</p>
                  </div>
                </div>
                
                {/* Floating elements */}
                <motion.div 
                  className="absolute -top-4 -right-4 bg-emerald-500 text-white p-3 rounded-full"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <Shield size={24} />
                </motion.div>
                <motion.div 
                  className="absolute -bottom-4 -left-4 bg-teal-500 text-white p-3 rounded-full"
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-emerald-800 mb-4">
              Por que escolher a Amil?
            </h2>
            <p className="text-lg text-emerald-600 max-w-3xl mx-auto">
              Descubra os benefícios exclusivos que fazem da Amil a escolha certa para sua saúde
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Maior Rede Credenciada",
                description: "Mais de 30.000 prestadores em todo o Brasil",
                color: "emerald"
              },
              {
                icon: Shield,
                title: "Cobertura Completa",
                description: "Atendimento ambulatorial, hospitalar e emergencial",
                color: "teal"
              },
              {
                icon: Award,
                title: "Qualidade Reconhecida",
                description: "Nota máxima na ANS em satisfação do cliente",
                color: "emerald"
              },
              {
                icon: Clock,
                title: "Atendimento 24h",
                description: "Central de atendimento disponível 24 horas por dia",
                color: "teal"
              },
              {
                icon: Heart,
                title: "Programas de Saúde",
                description: "Programas de prevenção e promoção da saúde",
                color: "emerald"
              },
              {
                icon: Star,
                title: "Tradição e Confiança",
                description: "Mais de 40 anos cuidando da saúde dos brasileiros",
                color: "teal"
              }
            ].map((feature, index) => (
              <AnimatedSection key={feature.title} direction="up" delay={0.1 * index}>
                <motion.div 
                  className={`bg-gradient-to-br from-emerald-50 to-teal-100 rounded-2xl p-6 text-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-emerald-200`}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`bg-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className="text-white" size={32} />
                  </div>
                  <h3 className={`text-xl font-bold text-emerald-800 mb-3`}>{feature.title}</h3>
                  <p className={`text-emerald-600 leading-relaxed`}>{feature.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-emerald-800 mb-4">
              Planos Amil Disponíveis
            </h2>
            <p className="text-lg text-emerald-600 max-w-3xl mx-auto">
              Escolha o plano que melhor se adapta às suas necessidades
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Amil Pessoa Física",
                description: "Plano individual ou familiar com cobertura nacional",
                features: ["Rede credenciada nacional", "Cobertura ambulatorial", "Internação", "Emergência 24h"],
                highlight: false
              },
              {
                name: "Amil Empresarial",
                description: "Soluções corporativas para empresas de todos os portes",
                features: ["A partir de 2 vidas", "Gestão online", "Relatórios gerenciais", "Suporte dedicado"],
                highlight: true
              },
              {
                name: "Amil por Adesão",
                description: "Planos coletivos com mensalidades especiais",
                features: ["Sem carência", "Preços diferenciados", "Cobertura completa", "Fácil adesão"],
                highlight: false
              }
            ].map((plan, index) => (
              <AnimatedSection key={plan.name} direction="up" delay={0.2 * index}>
                <motion.div 
                  className={`rounded-2xl p-8 text-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                    plan.highlight 
                      ? 'bg-emerald-600 text-white border-4 border-emerald-400' 
                      : 'bg-white text-emerald-800 border-2 border-emerald-200'
                  }`}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {plan.highlight && (
                    <div className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
                      Mais Popular
                    </div>
                  )}
                  
                  <h3 className={`text-2xl font-bold mb-4 ${plan.highlight ? 'text-white' : 'text-emerald-800'}`}>
                    {plan.name}
                  </h3>
                  <p className={`mb-6 ${plan.highlight ? 'text-emerald-100' : 'text-emerald-600'}`}>
                    {plan.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className={`flex items-center justify-center gap-2 ${plan.highlight ? 'text-emerald-100' : 'text-emerald-700'}`}>
                        <CheckCircle size={20} className={plan.highlight ? 'text-teal-300' : 'text-emerald-500'} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      plan.highlight 
                        ? 'bg-white text-emerald-600 hover:bg-emerald-50' 
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
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
            <h2 className="text-3xl sm:text-4xl font-bold text-emerald-800 mb-4">
              Solicite sua Cotação Amil
            </h2>
            <p className="text-lg sm:text-xl text-emerald-600 max-w-3xl mx-auto">
              Preencha o formulário e receba uma proposta personalizada
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <AnimatedSection direction="left" delay={0.2}>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-emerald-200">
                <h3 className="text-xl sm:text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-3">
                  <Mail className="text-emerald-600" size={24} />
                  Formulário de Cotação Amil
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { name: 'name', label: 'Nome Completo *', type: 'text', placeholder: 'Digite seu nome completo' },
                    { name: 'email', label: 'E-mail *', type: 'email', placeholder: 'seu.email@exemplo.com' },
                    { name: 'phone', label: 'Telefone/WhatsApp *', type: 'tel', placeholder: '(11) 99999-9999' }
                  ].map((field, index) => (
                    <motion.div
                      key={field.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                    >
                      <label htmlFor={field.name} className="block text-sm font-medium text-emerald-700 mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name as keyof ContactFormData]}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                          errors[field.name as keyof ContactFormData] ? 'border-red-500' : 'border-emerald-300'
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
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <label htmlFor="subject" className="block text-sm font-medium text-emerald-700 mb-2">
                      Tipo de Plano *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                        errors.subject ? 'border-red-500' : 'border-emerald-300'
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
                    <label htmlFor="message" className="block text-sm font-medium text-emerald-700 mb-2">
                      Mensagem Adicional
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Conte-nos mais sobre suas necessidades..."
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send size={20} />
                    Solicitar Cotação Amil
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
                    className="text-2xl font-bold text-emerald-800 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    Fale com um especialista Amil
                  </motion.h3>
                  
                  <motion.p 
                    className="text-lg text-emerald-600 mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    Tire suas dúvidas sobre os planos Amil diretamente com nossos consultores especializados.
                  </motion.p>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      { icon: Phone, text: "Atendimento personalizado", color: "emerald" },
                      { icon: CheckCircle, text: "Consultoria gratuita", color: "teal" },
                      { icon: CheckCircle, text: "Especialistas Amil", color: "emerald" }
                    ].map((feature, index) => (
                      <motion.div 
                        key={feature.text}
                        className="flex items-center justify-center gap-3 text-emerald-700"
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
                    Consultor Amil via WhatsApp
                  </motion.button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Success Popup */}
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
                className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <CheckCircle className="text-emerald-600" size={40} />
              </motion.div>

              <motion.h3 
                className="text-2xl font-bold text-emerald-800 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                Solicitação Enviada!
              </motion.h3>
              
              <motion.p 
                className="text-emerald-600 mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                Obrigado pelo interesse nos planos Amil! Em breve um especialista entrará em contato.
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
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
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
    </div>
  );
};

export default AmilPage;
