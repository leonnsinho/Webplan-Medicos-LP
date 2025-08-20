import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle, Phone, Mail, CheckCircle, AlertCircle, Shield, Users, Heart, Award, Star, Globe, Building2, Stethoscope } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { FormData as ContactFormData } from '../types';
import sulamericaLogo from '../assets/images/planos_de_saúde_sulamérica_apcd.webp';

const SulamericaPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: 'sulamerica_adesao_enfermeiros',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const subjectOptions = [
    { value: 'sulamerica_adesao_enfermeiros', label: 'SulAmérica por Adesão - Enfermeiros' },
    { value: 'sulamerica_empresarial', label: 'SulAmérica Empresarial' },
    { value: 'sulamerica_coletivo', label: 'SulAmérica Coletivo' },
    { value: 'sulamerica_categorias', label: 'Informações sobre Categorias' },
    { value: 'sulamerica_informacoes', label: 'Informações Gerais - SEESP ENF' }
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
          subject: 'sulamerica_adesao_enfermeiros',
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
        '_subject': 'Nova solicitação - Plano SulAmérica para Enfermeiro COREN - WebPlan Seguros',
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
      'Olá! Sou da área de enfermagem e gostaria de saber mais sobre os planos SulAmérica com benefícios exclusivos para enfermeiros com COREN ativo.'
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
                  Planos Especiais para Enfermeiros com COREN
                </motion.h2>
                
                <motion.p 
                  className="text-lg text-red-600 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Mais de 128 anos de tradição oferecendo benefícios exclusivos para profissionais da enfermagem 
                  associados ao SEESP ENF com abrangência nacional desde a categoria de entrada.
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
              Vantagens Exclusivas para Enfermeiros
            </h2>
            <p className="text-lg text-red-600 max-w-3xl mx-auto">
              Benefícios especiais para profissionais associados ao SEESP ENF - Sindicato dos Enfermeiros de SP
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
              Categorias SulAmérica para Enfermeiros
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

      {/* Detailed Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-red-800 mb-4">
              Benefícios Detalhados por Categoria
            </h2>
            <p className="text-lg text-red-600 max-w-3xl mx-auto">
              Conheça todas as coberturas e vantagens incluídas em cada categoria de plano
            </p>
          </AnimatedSection>

          <div className="space-y-12">
            {[
              {
                title: "Coberturas Básicas Incluídas em Todos os Planos",
                description: "Todos os planos SulAmérica para enfermeiros incluem as coberturas essenciais conforme regulamentação da ANS, além de benefícios exclusivos como orientação médica telefônica e telemedicina.",
                features: ["Atendimento conforme Rol ANS", "Orientação Médica Telefônica", "Médico na Tela (telemedicina)", "Rede credenciada nacional"],
                icon: Shield,
                color: "red"
              },
              {
                title: "Categorias Intermediárias: Exato, Clássico e Especial",
                description: "As categorias intermediárias oferecem benefícios ampliados incluindo transplantes de órgãos, tratamentos especializados e assistência 24h completa no Brasil.",
                features: ["Transplantes: coração, pâncreas, pulmão, fígado", "Escleroterapia até 30 sessões/ano", "Assistência 24h no Brasil", "Remoção e hospedagem de acompanhantes"],
                icon: Award,
                color: "orange"
              },
              {
                title: "Reembolso Internacional: Clássico, Especial e Executivo",
                description: "As categorias superiores incluem reembolso de despesas médicas no exterior, proporcionando tranquilidade para viagens internacionais.",
                features: ["Reembolso conforme tabela SulAmérica", "Câmbio oficial", "Cobertura em viagens", "Atendimento internacional"],
                icon: Globe,
                color: "red"
              },
              {
                title: "Plano Executivo: Cobertura Internacional Completa",
                description: "O plano mais completo oferece todos os serviços de assistência 24h válidos também fora do Brasil, além de serviços VIP exclusivos.",
                features: ["Assistência 24h mundial", "Retorno de filhos menores", "Adiantamento despesas médicas exterior", "Orientação perda documentos"],
                icon: Star,
                color: "orange"
              },
              {
                title: "Modalidade de Contratação por Adesão Coletiva",
                description: "Os planos são oferecidos através do SEESP ENF - Sindicato dos Enfermeiros do Estado de São Paulo, garantindo condições especiais para associados.",
                features: ["Contratação via SEESP ENF", "Condições especiais para associados", "Benefícios exclusivos sindicato", "Administradoras de Benefícios credenciadas"],
                icon: Users,
                color: "red"
              }
            ].map((benefit, index) => (
              <AnimatedSection key={benefit.title} direction={index % 2 === 0 ? "left" : "right"} delay={0.2 * index}>
                <div className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="lg:w-1/3">
                    <motion.div 
                      className={`bg-gradient-to-br from-red-100 to-orange-100 rounded-3xl p-8 text-center shadow-lg`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`bg-${benefit.color}-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <benefit.icon className="text-white" size={40} />
                      </div>
                      <h3 className={`text-xl font-bold text-${benefit.color}-800`}>{benefit.title}</h3>
                    </motion.div>
                  </div>
                  
                  <div className="lg:w-2/3">
                    <h3 className={`text-2xl font-bold text-${benefit.color}-800 mb-4`}>{benefit.title}</h3>
                    <p className={`text-lg text-${benefit.color}-600 mb-6 leading-relaxed`}>{benefit.description}</p>
                    
                    <ul className="grid md:grid-cols-2 gap-3">
                      {benefit.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex}
                          className={`flex items-center gap-3 text-${benefit.color}-700`}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.1 * featureIndex }}
                        >
                          <CheckCircle size={20} className={`text-${benefit.color}-500 flex-shrink-0`} />
                          <span className="font-medium">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
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
              Solicite seu Plano SulAmérica - SEESP ENF
            </h2>
            <p className="text-lg sm:text-xl text-red-600 max-w-3xl mx-auto">
              Preencha o formulário e receba uma proposta personalizada com benefícios exclusivos para enfermeiros
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <AnimatedSection direction="left" delay={0.2}>
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-red-200">
                <h3 className="text-xl sm:text-2xl font-bold text-red-800 mb-6 flex items-center gap-3">
                  <Mail className="text-red-600" size={24} />
                  Formulário SulAmérica - SEESP ENF
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
                      <label htmlFor={field.name} className="block text-sm font-medium text-red-700 mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name as keyof ContactFormData]}
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
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <label htmlFor="subject" className="block text-sm font-medium text-red-700 mb-2">
                      Tipo de Plano * <span className="text-red-600 font-normal">(Benefícios exclusivos SEESP ENF)</span>
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
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send size={20} />
                    Solicitar Plano SulAmérica - SEESP ENF
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
                    Tire suas dúvidas sobre os planos SulAmérica para enfermeiros com benefícios exclusivos SEESP ENF diretamente com nossos consultores especializados.
                  </motion.p>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      { icon: Phone, text: "Consultoria especializada SulAmérica", color: "red" },
                      { icon: CheckCircle, text: "Informações sobre SEESP ENF", color: "orange" },
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
                    Consultor SulAmérica SEESP ENF
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
    </div>
  );
};

export default SulamericaPage;
