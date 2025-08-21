import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle, Phone, Mail, CheckCircle, AlertCircle, Shield, Users, Heart, Award, Clock, Star } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { FormData as ContactFormData } from '../types';
import portoLogo from '../assets/images/porto-seguro.png';

const PortoSeguroPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: 'porto_cnpj_enfermeiros',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  console.log('🟢 [Porto Seguro] Componente renderizado');
  console.log('🟢 [Porto Seguro] Estado inicial configurado:', { formData, errors, showSuccessPopup });

  useEffect(() => {
    console.log('🚀 [Porto Seguro] useEffect - Componente montado');
  }, []);

  const subjectOptions = [
    { value: 'porto_cnpj_enfermeiros', label: 'Porto Seguro - Enfermeiros CNPJ' },
    { value: 'porto_bairro', label: 'Porto Seguro - Porto Bairro' },
    { value: 'porto_pro', label: 'Porto Seguro - Linha PRÓ' },
    { value: 'porto_p', label: 'Porto Seguro - Linha P' },
    { value: 'porto_tradicional', label: 'Porto Seguro - Linha Tradicional' },
    { value: 'porto_informacoes', label: 'Informações Gerais - Porto Seguro' }
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
    console.log('🟢 [Porto Seguro] Função handleSubmit foi chamada!');
    console.log('🟢 [Porto Seguro] Event:', e);
    console.log('🟢 [Porto Seguro] FormData atual:', formData);
    
    // Teste básico primeiro
    alert('Formulário Porto Seguro acionado! Verifique o console.');
    
    console.log('🚀 [Porto Seguro] Iniciando processo de envio do formulário...');
    
    if (validateForm()) {
      console.log('✅ [Porto Seguro] Validação do formulário aprovada');
      console.log('📋 [Porto Seguro] Dados do formulário:', formData);
      
      // Show success popup immediately
      setShowSuccessPopup(true);
      console.log('✨ [Porto Seguro] Popup de sucesso ativado');
      
      // Reset form data in state
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'porto_cnpj_enfermeiros',
          message: ''
        });
        console.log('🔄 [Porto Seguro] Formulário resetado');
      }, 1000);

      try {
        // Create iframe to handle the submission without redirect
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.name = 'formsubmit-frame';
        
        // Add event listeners to iframe for debugging
        iframe.onload = () => {
          console.log('🎉 [Porto Seguro] Iframe carregado - Formulário enviado com sucesso!');
          // Verificar se há conteúdo no iframe para debug
          try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
            if (iframeDoc) {
              console.log('📄 [Porto Seguro] Conteúdo da resposta do FormSubmit:', iframeDoc.body?.innerHTML);
            }
          } catch (error) {
            console.warn('⚠️ [Porto Seguro] Não foi possível acessar o conteúdo do iframe (CORS):', error);
          }
        };
        
        iframe.onerror = (error) => {
          console.error('❌ [Porto Seguro] Erro no iframe:', error);
          console.error('🔍 [Porto Seguro] Possíveis causas: Email não ativado, endpoint incorreto, ou bloqueio CORS');
        };
        
        document.body.appendChild(iframe);
        console.log('📦 [Porto Seguro] Iframe criado e adicionado ao DOM');

        // Create form that targets the iframe
        const form = document.createElement('form');
        const endpoint = 'https://formsubmit.co/ana.acfl@gmail.com';
        form.action = endpoint;
        form.method = 'POST';
        form.target = 'formsubmit-frame';
        form.style.display = 'none';
        
        console.log('🎯 [Porto Seguro] Endpoint configurado:', endpoint);

        // Add all form fields
        const fields = {
          'name': formData.name,
          'email': formData.email,
          'phone': formData.phone,
          'subject': formData.subject,
          'message': formData.message,
          '_subject': 'Nova solicitação - Plano Porto Seguro para Enfermeiro com CNPJ - WebPlan Seguros',
          '_captcha': 'false',
          '_template': 'table'
        };

        console.log('📝 [Porto Seguro] Campos que serão enviados:', fields);

        Object.entries(fields).forEach(([key, value]) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value;
          form.appendChild(input);
          console.log(`➕ [Porto Seguro] Campo adicionado: ${key} = ${value}`);
        });

        document.body.appendChild(form);
        console.log('📋 [Porto Seguro] Formulário criado e adicionado ao DOM');
        console.log('🚀 [Porto Seguro] Enviando formulário para FormSubmit...');
        
        // Adicionar timeout para verificar se a submissão aconteceu
        const submitStartTime = Date.now();
        form.submit();
        
        console.log('⏱️ [Porto Seguro] Formulário submetido em:', new Date().toISOString());
        
        // Verificar se o email foi ativado no FormSubmit
        console.log('🔔 [Porto Seguro] IMPORTANTE: Email ana.acfl@gmail.com já foi ativado no FormSubmit!');
        console.log('📧 [Porto Seguro] Email deve chegar em 1-2 minutos.');

        // Clean up after submission
        setTimeout(() => {
          const submitDuration = Date.now() - submitStartTime;
          console.log(`⏰ [Porto Seguro] Tempo decorrido desde o envio: ${submitDuration}ms`);
          
          if (document.body.contains(form)) {
            document.body.removeChild(form);
            console.log('🧹 [Porto Seguro] Formulário removido do DOM.');
          }
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
            console.log('🧹 [Porto Seguro] Iframe removido do DOM.');
          }
          
          console.log('✨ [Porto Seguro] Limpeza concluída.');
        }, 5000);
      } catch (error) {
        console.error('💥 [Porto Seguro] Erro durante criação do formulário:', error);
      }
    } else {
      console.log('❌ [Porto Seguro] Validação do formulário falhou');
      console.log('🔍 [Porto Seguro] Erros encontrados:', errors);
    }
  };

  // Botão de teste debug
  const handleDebugTest = () => {
    console.log('🧪 [Porto Seguro] TESTE MANUAL INICIADO');
    console.log('🧪 [Porto Seguro] FormData atual no teste:', formData);
    
    setFormData({
      name: 'Teste Porto Seguro Debug',
      email: 'teste@portoseguro.com',
      phone: '(11) 99999-9999',
      subject: 'porto_cnpj_enfermeiros',
      message: 'Esta é uma mensagem de teste para debug da página Porto Seguro.'
    });
    
    console.log('🧪 [Porto Seguro] Dados de teste definidos no estado');
    
    setTimeout(() => {
      console.log('🧪 [Porto Seguro] Simulando envio do formulário com dados de teste...');
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
      handleSubmit(fakeEvent);
    }, 500);
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
      'Olá! Sou enfermeiro(a) com CNPJ e gostaria de saber mais sobre os planos Porto Seguro Saúde Empresarial com pelo menos 3 vidas.'
    );
    const whatsappUrl = `https://wa.me/5511959305175?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
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
                  <img src={portoLogo} alt="Porto Seguro Logo" className="h-16 w-auto" />
                  <div className="h-12 w-px bg-orange-300"></div>
                  <h1 className="text-4xl sm:text-5xl font-bold text-orange-800">
                    Porto Seguro
                  </h1>
                </motion.div>
                
                <motion.h2 
                  className="text-2xl sm:text-3xl font-semibold text-orange-700 mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Qualidade, Flexibilidade e Excelência para Enfermeiros
                </motion.h2>
                
                <motion.p 
                  className="text-lg text-orange-600 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Planos empresariais para enfermeiros com CNPJ ativo. Soluções completas com pelo menos 3 vidas para adesão e rede de excelência.
                </motion.p>

                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <button
                    onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Solicitar Cotação
                  </button>
                  <button
                    onClick={handleWhatsAppClick}
                    className="bg-transparent border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
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
                <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-orange-100">
                  <img src={portoLogo} alt="Porto Seguro Logo" className="w-full h-64 object-contain" />
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-orange-800 mb-2">Tradição e Confiança</h3>
                    <p className="text-orange-600">Uma das seguradoras mais respeitadas do Brasil</p>
                  </div>
                </div>
                
                {/* Floating elements */}
                <motion.div 
                  className="absolute -top-4 -right-4 bg-orange-500 text-white p-3 rounded-full"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <Shield size={24} />
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-4 -left-4 bg-red-500 text-white p-3 rounded-full"
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
                Por que escolher a <span className="text-orange-600">Porto Seguro</span>?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Soluções completas em saúde com foco em qualidade assistencial, rede de excelência e benefícios exclusivos
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "CNPJ com 3+ Vidas",
                  description: "Exclusivo para CNPJ ativo com pelo menos 3 vidas para adesão. Ideal para pequenas empresas e profissionais."
                },
                {
                  icon: Shield,
                  title: "Rede de Excelência",
                  description: "Hospitais de ponta com opções regionais e nacionais, incluindo Albert Einstein e Oswaldo Cruz."
                },
                {
                  icon: Heart,
                  title: "Reembolso Flexível",
                  description: "Planos com reembolso em diversas categorias, oferecendo maior flexibilidade no atendimento."
                },
                {
                  icon: Award,
                  title: "Cobertura Internacional",
                  description: "Algumas modalidades incluem cobertura internacional para maior tranquilidade em viagens."
                },
                {
                  icon: Star,
                  title: "Presença Nacional",
                  description: "Ampla presença em SP e RJ com extensão via rede credenciada MedService para todo o Brasil."
                },
                {
                  icon: Clock,
                  title: "Tradição e Confiança",
                  description: "Uma das seguradoras mais respeitadas do Brasil, sinônimo de qualidade e confiabilidade."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <feature.icon className="w-8 h-8 text-orange-600" />
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
        <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Linhas de Produtos <span className="text-orange-600">Porto Seguro</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Descubra qual linha se adapta melhor ao seu perfil e necessidades
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {[
                {
                  title: "Porto Bairro",
                  description: "Foco em regiões específicas da capital paulista",
                  features: [
                    "Rede hospitalar de qualidade",
                    "Preço enxuto e acessível",
                    "Ideal para pequenas empresas",
                    "Bons serviços sem abrir mão da qualidade"
                  ],
                  highlight: false,
                  badge: "ECONÔMICO"
                },
                {
                  title: "Linha PRÓ",
                  description: "Plano regionalizado com rede de excelência",
                  features: [
                    "Acesso a Oswaldo Cruz e Albert Einstein",
                    "Exclusividade Porto Seguro",
                    "Hospitais premium regionais",
                    "Excelente para quem fica em SP"
                  ],
                  highlight: true,
                  badge: "PREMIUM REGIONAL"
                },
                {
                  title: "Linha P",
                  description: "Carro-chefe da Porto no segmento saúde",
                  features: [
                    "Cobertura nacional completa",
                    "Melhores hospitais do país",
                    "Benefícios exclusivos",
                    "Alto nível de atendimento"
                  ],
                  highlight: false,
                  badge: "NACIONAL"
                },
                {
                  title: "Linha Tradicional",
                  description: "A linha mais completa da Porto",
                  features: [
                    "Cobertura nacional ampla",
                    "Máxima flexibilidade",
                    "Atendimento em qualquer lugar",
                    "Para empresas que valorizam qualidade"
                  ],
                  highlight: true,
                  badge: "MAIS COMPLETA"
                }
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  className={`relative p-8 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 ${
                    plan.highlight 
                      ? 'bg-gradient-to-br from-orange-600 to-red-600 text-white' 
                      : 'bg-white border-2 border-orange-100'
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute -top-4 left-8">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                      plan.highlight 
                        ? 'bg-yellow-400 text-orange-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {plan.badge}
                    </span>
                  </div>
                  
                  <h3 className={`text-2xl font-bold mb-4 mt-4 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                    {plan.title}
                  </h3>
                  <p className={`mb-6 ${plan.highlight ? 'text-orange-100' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className={`w-5 h-5 ${plan.highlight ? 'text-green-300' : 'text-green-500'}`} />
                        <span className={plan.highlight ? 'text-orange-100' : 'text-gray-700'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                      plan.highlight
                        ? 'bg-white text-orange-600 hover:bg-orange-50'
                        : 'bg-orange-600 text-white hover:bg-orange-700'
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
                Cobertura <span className="text-orange-600">Nacional</span> com Rede Parceira
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nos planos nacionais, garantimos atendimento de qualidade em todo o território nacional através da rede MedService
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Diferenciais Exclusivos</h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: Shield,
                      title: "Rede MedService",
                      description: "Quando fora de SP ou RJ, atendimento garantido através da MedService, uma das maiores redes do país."
                    },
                    {
                      icon: Heart,
                      title: "Flexibilidade Total",
                      description: "Planos que se adaptam aos diferentes perfis e necessidades, sempre com foco na qualidade assistencial."
                    },
                    {
                      icon: Users,
                      title: "Atendimento Empresarial",
                      description: "Soluções completas para empresas com CNPJ, oferecendo benefícios exclusivos para colaboradores."
                    },
                    {
                      icon: Award,
                      title: "Qualidade Reconhecida",
                      description: "Marca sinônimo de confiança, entre os destaques do setor de saúde suplementar no país."
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
                      <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-6 h-6 text-orange-600" />
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
                <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-8 text-white shadow-2xl">
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-4">3+</div>
                    <div className="text-xl font-semibold mb-2">Vidas Mínimas</div>
                    <div className="text-orange-100 mb-6">Para adesão aos planos empresariais</div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-white/20 rounded-xl p-4">
                        <div className="text-2xl font-bold">SP</div>
                        <div className="text-sm text-orange-200">Presença Total</div>
                      </div>
                      <div className="bg-white/20 rounded-xl p-4">
                        <div className="text-2xl font-bold">RJ</div>
                        <div className="text-sm text-orange-200">Presença Total</div>
                      </div>
                      <div className="col-span-2 bg-white/20 rounded-xl p-4">
                        <div className="text-2xl font-bold">MedService</div>
                        <div className="text-sm text-orange-200">Rede Nacional</div>
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
      <section id="formulario" className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Solicite sua <span className="text-orange-600">Cotação</span>
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
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
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
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
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
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
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
                      Linha de Interesse
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="Conte-nos mais sobre suas necessidades..."
                  ></textarea>
                </div>

                <div className="text-center mb-4">
                  <button
                    type="button"
                    onClick={handleDebugTest}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm"
                  >
                    🧪 Teste Debug Porto Seguro
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    Enviar Solicitação
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
                      className="flex items-center justify-center gap-2 text-orange-600 hover:text-orange-700 transition-colors"
                    >
                      <Phone size={20} />
                      (11) 4116-5378
                    </a>
                    <a
                      href="mailto:contato@webplan.com.br"
                      className="flex items-center justify-center gap-2 text-orange-600 hover:text-orange-700 transition-colors"
                    >
                      <Mail size={20} />
                      contato@webplan.com.br
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
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
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

export default PortoSeguroPage;
