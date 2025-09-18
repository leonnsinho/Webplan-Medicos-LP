import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle, Phone, CheckCircle, AlertCircle, Shield, Users, Heart, Award, Clock } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { FormData as ContactFormData } from '../types';
import { useLeadSubmission } from '../hooks/useLeadSubmission';
import medSeniorLogo from '../assets/images/LOGO-MED-SENIOR.png';

const MedSeniorPage: React.FC = () => {
  const { submitLead, isSubmitting } = useLeadSubmission();
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    idade: '',
    tem_cnpj: false,
    email_consent: false,
    subject: 'medsenior_44anos_individual',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const subjectOptions = [
    { value: 'medsenior_44anos_individual', label: 'MedSênior - Plano Individual 44+' },
    { value: 'medsenior_categoria_black', label: 'MedSênior - Categoria BLACK' },
    { value: 'medsenior_rede_hospitais', label: 'MedSênior - Rede de Hospitais' },
    { value: 'medsenior_reajuste_ans', label: 'MedSênior - Reajuste ANS' },
    { value: 'medsenior_8_estados', label: 'MedSênior - Cobertura 8 Estados' },
    { value: 'medsenior_informacoes', label: 'Informações Gerais - MedSênior' }
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
          idade: formData.idade,
          tem_cnpj: formData.tem_cnpj,
          email_consent: formData.email_consent,
          message: formData.message || `Modalidade: ${formData.subject}`,
          operadora: 'MedSenior',
          subject: formData.subject,
          source_page: 'medsenior-page',
          utm_source: 'website'
        };
        
        const result = await submitLead(leadData);
        
        if (result.success) {
          console.log('✨ [MedSenior] Lead enviado com sucesso para Supabase');
          setShowSuccessPopup(true);
          
          // Reset form after success
          setTimeout(() => {
            setFormData({
              name: '',
              email: '',
              phone: '',
              idade: '',
              tem_cnpj: false,
              email_consent: false,
              subject: 'medsenior_44anos_individual',
              message: ''
            });
          }, 1000);
        } else {
          console.error('❌ [MedSenior] Erro retornado pelo hook:', result.error);
        }
      } catch (error) {
        console.error('💥 [MedSenior] Erro ao enviar formulário:', error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
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
      'Olá! Tenho 44 anos ou mais e gostaria de saber mais sobre o plano MedSênior individual (sem CNPJ ou entidade).'
    );
    const whatsappUrl = `https://wa.me/5511959305175?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
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
                  <img src={medSeniorLogo} alt="MedSênior Logo" className="h-16 w-auto" />
                  <div className="h-12 w-px bg-green-300"></div>
                  <h1 className="text-4xl sm:text-5xl font-bold text-green-800">
                    WebPlan
                  </h1>
                </motion.div>
                
                <motion.h2 
                  className="text-2xl sm:text-3xl font-semibold text-green-700 mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Simplicidade, Qualidade e Controle no Reajuste
                </motion.h2>
                
                <motion.p 
                  className="text-lg text-green-600 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Plano individual para médicos 44+. Sem CNPJ, sem entidade de classe. Só documentos pessoais e qualidade garantida.
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
                  <img src={medSeniorLogo} alt="MedSênior Logo" className="w-full h-64 object-contain" />
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-green-800 mb-2">Plano Individual 44+</h3>
                    <p className="text-green-600">Sem burocracia, só qualidade</p>
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
                  className="absolute -bottom-4 -left-4 bg-emerald-500 text-white p-3 rounded-full"
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
                Principais Vantagens do <span className="text-green-600">MedSênior</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Plano individual descomplicado, rede de excelência e reajuste controlado pela ANS
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: CheckCircle,
                  title: "Contratação Descomplicada",
                  description: "Apenas 44 anos completos e documentos pessoais. Nada de burocracia com entidades ou CNPJ."
                },
                {
                  icon: Heart,
                  title: "Categoria BLACK",
                  description: "Rede de hospitais renomados: São Camilo, Leforte, Carlos Chagas, Vera Cruz e outros de excelência."
                },
                {
                  icon: Shield,
                  title: "Cobertura 8 Estados",
                  description: "Presente em SP, RJ, DF, MG, PR, PE, ES e RS. Ideal para quem viaja ou tem familiares em outras regiões."
                },
                {
                  icon: Clock,
                  title: "Reajuste ANS",
                  description: "Reajuste controlado e previsível pela ANS. Maior estabilidade financeira comparado a planos por CNPJ."
                },
                {
                  icon: Award,
                  title: "Rede de Excelência",
                  description: "Hospitais com estrutura moderna, equipe qualificada e alto padrão de atendimento em todas as unidades."
                },
                {
                  icon: Users,
                  title: "Foco em Adultos 44+",
                  description: "Especializado em saúde e bem-estar de adultos e idosos, oferecendo tranquilidade em todas as etapas."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
        <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Rede de Hospitais <span className="text-green-600">Categoria BLACK</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Acesso aos melhores hospitais de São Paulo e interior com estrutura moderna e equipe qualificada
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {[
                {
                  title: "São Paulo - Capital",
                  hospitals: [
                    "Rede São Camilo - Ipiranga",
                    "Rede São Camilo - Santana", 
                    "Rede São Camilo - Pompéia",
                    "Hospital Leforte - Liberdade"
                  ],
                  icon: Heart,
                  highlight: true
                },
                {
                  title: "Grande SP e Interior",
                  hospitals: [
                    "Hospital Carlos Chagas - Guarulhos",
                    "Hospital Vera Cruz - Campinas",
                    "Rede credenciada no interior",
                    "Atendimento de qualidade regional"
                  ],
                  icon: Shield,
                  highlight: false
                }
              ].map((region, index) => (
                <motion.div
                  key={index}
                  className={`p-8 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 ${
                    region.highlight 
                      ? 'bg-gradient-to-br from-green-600 to-emerald-600 text-white' 
                      : 'bg-white border-2 border-green-100'
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                    region.highlight ? 'bg-white/20' : 'bg-green-100'
                  }`}>
                    <region.icon className={`w-8 h-8 ${region.highlight ? 'text-white' : 'text-green-600'}`} />
                  </div>
                  
                  <h3 className={`text-2xl font-bold mb-6 ${region.highlight ? 'text-white' : 'text-gray-900'}`}>
                    {region.title}
                  </h3>
                  
                  <ul className="space-y-3">
                    {region.hospitals.map((hospital, hospitalIndex) => (
                      <li key={hospitalIndex} className="flex items-center gap-3">
                        <CheckCircle className={`w-5 h-5 ${region.highlight ? 'text-green-300' : 'text-green-500'}`} />
                        <span className={region.highlight ? 'text-green-100' : 'text-gray-700'}>
                          {hospital}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Estados com Cobertura */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Cobertura em 8 Estados
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {[
                  { estado: 'SP', nome: 'São Paulo' },
                  { estado: 'RJ', nome: 'Rio de Janeiro' },
                  { estado: 'DF', nome: 'Distrito Federal' },
                  { estado: 'MG', nome: 'Minas Gerais' },
                  { estado: 'PR', nome: 'Paraná' },
                  { estado: 'PE', nome: 'Pernambuco' },
                  { estado: 'ES', nome: 'Espírito Santo' },
                  { estado: 'RS', nome: 'Rio Grande do Sul' }
                ].map((estado, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-4 rounded-xl text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-2xl font-bold mb-1">{estado.estado}</div>
                    <div className="text-sm text-green-200">{estado.nome}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Benefits Section */}
      <AnimatedSection>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Para quem o <span className="text-green-600">MedSênior</span> é ideal?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Perfil ideal e vantagens exclusivas para profissionais que valorizam simplicidade e qualidade
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Perfil Ideal</h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: Users,
                      title: "Médicos(as) 44+",
                      description: "Idade mínima de 44 anos completos para contratação individual sem dependência de terceiros."
                    },
                    {
                      icon: CheckCircle,
                      title: "Sem Dependência",
                      description: "Não precisa de entidade de classe ou CNPJ. Contratação totalmente independente e descomplicada."
                    },
                    {
                      icon: Heart,
                      title: "Rede Qualificada",
                      description: "Quem valoriza hospital de excelência com estrutura moderna e equipe médica altamente qualificada."
                    },
                    {
                      icon: Shield,
                      title: "Estabilidade Financeira",
                      description: "Busca previsibilidade nos reajustes com controle da ANS, evitando surpresas nos custos."
                    },
                    {
                      icon: Award,
                      title: "Mobilidade Profissional",
                      description: "Profissionais com rotina entre diferentes estados que precisam de cobertura ampla e flexível."
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
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl p-8 text-white shadow-2xl">
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-4">44+</div>
                    <div className="text-xl font-semibold mb-2">Idade Mínima</div>
                    <div className="text-green-100 mb-6">Para contratação individual</div>
                    <div className="grid grid-cols-1 gap-4 text-center">
                      <div className="bg-white/20 rounded-xl p-4">
                        <div className="text-2xl font-bold">BLACK</div>
                        <div className="text-sm text-green-200">Categoria Premium</div>
                      </div>
                      <div className="bg-white/20 rounded-xl p-4">
                        <div className="text-2xl font-bold">ANS</div>
                        <div className="text-sm text-green-200">Reajuste Controlado</div>
                      </div>
                      <div className="bg-white/20 rounded-xl p-4">
                        <div className="text-2xl font-bold">7</div>
                        <div className="text-sm text-green-200">Estados Cobertura</div>
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
      <section id="formulario" className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
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
                    <label htmlFor="idade" className="block text-sm font-medium text-gray-700 mb-2">
                      Idades *
                    </label>
                    <input
                      type="text"
                      id="idade"
                      name="idade"
                      value={formData.idade}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                        errors.idade ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Ex: 16, 17, 54"
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

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="tem_cnpj"
                    name="tem_cnpj"
                    checked={formData.tem_cnpj}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="tem_cnpj" className="text-sm font-medium text-gray-700">
                    Tenho CNPJ
                  </label>
                </div>

                {/* Checkbox para Consentimento de Email */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="email_consent"
                    name="email_consent"
                    checked={formData.email_consent}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-0.5"
                  />
                  <label htmlFor="email_consent" className="text-sm text-gray-700 leading-relaxed">
                    Aceito receber informações sobre planos de saúde, novidades e ofertas especiais por email. 
                    <span className="text-gray-500 block mt-1">
                      Você pode cancelar a qualquer momento.
                    </span>
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

export default MedSeniorPage;
