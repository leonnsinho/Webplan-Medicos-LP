import React, { useState } from 'react';
import { Send, MessageCircle, Phone, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { useLeadSubmission } from '../hooks/useLeadSubmission';
import { FormData as ContactFormData } from '../types';

const ContactForm: React.FC = () => {
  const { submitLead, isSubmitting } = useLeadSubmission();
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    idade: '',
    tem_cnpj: false,
    email_consent: false
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const subjectOptions = [
    { value: '', label: 'Selecione um assunto' },
    { value: 'pessoa_fisica', label: 'Pessoa Física' },
    { value: 'plano_adesao', label: 'Plano por Adesão' },
    { value: 'empresarial', label: 'Empresarial' }
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
    // Message is now optional - removed validation

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 [ContactForm] Iniciando envio via Supabase...');
    
    if (validateForm()) {
      console.log('✅ [ContactForm] Validação aprovada');
      console.log('📋 [ContactForm] Dados:', formData);
      
      // Preparar dados para o Supabase
      const leadData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        operadora: 'main', // Formulário principal
        subject: `Formulário Principal - ${formData.subject}`,
        message: formData.message || 'Cliente interessado em cotação via formulário principal',
        idade: formData.idade,
        tem_cnpj: formData.tem_cnpj,
        email_consent: formData.email_consent
      };

      try {
        console.log('� [ContactForm] Enviando para Supabase...');
        const result = await submitLead(leadData);
        
        if (result.success) {
          console.log('✅ [ContactForm] Lead enviado com sucesso!');
          
          // Mostrar popup de sucesso
          setShowSuccessPopup(true);
          
          // Limpar formulário
          setTimeout(() => {
            setFormData({
              name: '',
              email: '',
              phone: '',
              subject: '',
              message: '',
              idade: '',
              tem_cnpj: false,
              email_consent: false
            });
          }, 1000);
          
        } else {
          console.error('❌ [ContactForm] Erro ao enviar:', result.error);
          alert(`Erro ao enviar: ${result.error}`);
        }
      } catch (error) {
        console.error('� [ContactForm] Erro inesperado:', error);
        alert('Erro inesperado ao enviar formulário. Tente novamente.');
      }
    } else {
      console.log('❌ [ContactForm] Validação falhou:', errors);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      'Olá! Gostaria de falar com um consultor sobre planos de saúde para médicos.'
    );
    const whatsappUrl = `https://wa.me/5511959305175?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contato" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up" className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Entre em Contato
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Solicite sua cotação personalizada ou tire suas dúvidas com nossos especialistas
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <AnimatedSection direction="left" delay={0.2}>
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Mail className="text-[#00655D]" size={24} />
                Formulário de Cotação
              </h3>
              
              <form 
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                {/* FormSubmit will be handled via JavaScript, no need for hidden fields here */}
                {[
                  { name: 'name', label: 'Nome Completo *', type: 'text', placeholder: 'Digite seu nome completo' },
                  { name: 'email', label: 'E-mail *', type: 'email', placeholder: 'seu.email@exemplo.com' },
                  { name: 'phone', label: 'Telefone/WhatsApp *', type: 'tel', placeholder: '(11) 99999-9999' },
                  { name: 'idade', label: 'Idades', type: 'text', placeholder: 'Ex: 16, 17, 54' }
                ].map((field, index) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                  >
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name as keyof Pick<ContactFormData, 'name' | 'email' | 'phone' | 'idade'>] as string}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#00655D] focus:border-transparent transition-all duration-200 ${
                        errors[field.name as keyof ContactFormData] ? 'border-red-500' : 'border-gray-300'
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

                {/* Checkbox para CNPJ */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="tem_cnpj"
                      name="tem_cnpj"
                      checked={formData.tem_cnpj}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-[#00655D] border-gray-300 rounded focus:ring-[#00655D] focus:ring-2"
                    />
                    <label htmlFor="tem_cnpj" className="text-sm font-medium text-gray-700">
                      Tenho CNPJ (Pessoa Jurídica)
                    </label>
                  </div>
                </motion.div>

                {/* Checkbox para Consentimento de Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.85 }}
                >
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="email_consent"
                      name="email_consent"
                      checked={formData.email_consent}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-[#00655D] border-gray-300 rounded focus:ring-[#00655D] focus:ring-2 mt-0.5"
                    />
                    <label htmlFor="email_consent" className="text-sm text-gray-700 leading-relaxed">
                      Aceito receber informações sobre planos de saúde, novidades e ofertas especiais por email. 
                      <span className="text-gray-500 block mt-1">
                        Você pode cancelar a qualquer momento.
                      </span>
                    </label>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Assunto *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#00655D] focus:border-transparent transition-all duration-200 ${
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
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#00655D] focus:border-transparent transition-all duration-200 resize-none ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Conte-nos mais sobre suas necessidades..."
                  />
                  {errors.message && (
                    <motion.p 
                      className="mt-1 text-sm text-red-600 flex items-center gap-1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AlertCircle size={16} />
                      {errors.message}
                    </motion.p>
                  )}
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#00655D] hover:bg-[#005A53] disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  <Send size={20} />
                  {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
                </motion.button>
              </form>
            </div>
          </AnimatedSection>

          {/* WhatsApp Contact */}
          <AnimatedSection direction="right" delay={0.4}>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-xl p-8 flex flex-col justify-center">
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
                  className="text-2xl font-bold text-gray-900 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  Prefere falar diretamente com um consultor?
                </motion.h3>
                
                <motion.p 
                  className="text-lg text-gray-700 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  Clique no botão abaixo para uma consulta gratuita via WhatsApp.
                  Nossos especialistas estão prontos para ajudar!
                </motion.p>
                
                <div className="space-y-4 mb-8">
                  {[
                    { icon: Phone, text: "Atendimento imediato" },
                    { icon: CheckCircle, text: "Consultoria gratuita" },
                    { icon: CheckCircle, text: "Especialistas em medicina" }
                  ].map((feature, index) => (
                    <motion.div 
                      key={feature.text}
                      className="flex items-center justify-center gap-3 text-gray-700"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.9 + (index * 0.1) }}
                    >
                      <feature.icon size={20} className="text-green-600" />
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
                  Falar com Consultor
                </motion.button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

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
                {/* Success Icon */}
                <motion.div 
                  className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <CheckCircle className="text-green-600" size={40} />
                </motion.div>

                {/* Success Message */}
                <motion.h3 
                  className="text-2xl font-bold text-gray-900 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  Mensagem Enviada!
                </motion.h3>
                
                <motion.p 
                  className="text-gray-600 mb-6 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  Obrigado pelo seu interesse! Recebemos sua solicitação e em breve um de nossos especialistas entrará em contato.
                </motion.p>

                {/* Action Buttons */}
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
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageCircle size={18} />
                    Falar no WhatsApp
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactForm;