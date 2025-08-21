/*!
 * Webplan Forms Integration - Versão CSP Compatível
 * Sistema para sites com Content Security Policy restritivo
 * Versão 1.2 - 21/08/2025
 * 
 * Esta versão funciona apenas com FormSubmit (sem Supabase direto)
 * Ideal para sites que não podem alterar CSP
 */

(function() {
  'use strict';

  // Cache para rate limiting
  const requestCache = new Map();
  
  /**
   * Normaliza nome da operadora
   */
  function normalizeOperadora(operadora) {
    const operadoraMap = {
      'SulAmérica': 'sulamerica',
      'Porto Seguro': 'porto_seguro',
      'Bradesco': 'bradesco',
      'Amil': 'amil',
      'Alice': 'alice',
      'Unimed': 'unimed',
      'MedSenior': 'medsenior',
      'São Camilo': 'sao_camilo',
      'NotreDame': 'notredame',
      'OneHealth': 'onehealth',
      'Prevent Senior': 'prevent_senior',
      'Qualicorp': 'qualicorp',
      'Blue Med': 'blue_med',
      'main': 'main'
    };
    
    return operadoraMap[operadora] || operadora.toLowerCase().replace(/\s+/g, '_');
  }

  /**
   * Extrai parâmetros UTM da URL
   */
  function getUTMParams() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      return {
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign')
      };
    } catch (error) {
      return {};
    }
  }

  /**
   * Valida formato de e-mail
   */
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Valida telefone
   */
  function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[\d\s\(\)\-]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  /**
   * Rate limiting simples
   */
  function checkRateLimit(identifier) {
    const now = Date.now();
    const windowMs = 60000; // 1 minuto
    const maxRequests = 3; // Reduzido para CSP
    
    const requests = requestCache.get(identifier) || [];
    const recentRequests = requests.filter(time => now - time < windowMs);
    
    if (recentRequests.length >= maxRequests) {
      return false;
    }
    
    recentRequests.push(now);
    requestCache.set(identifier, recentRequests);
    return true;
  }

  /**
   * Envia via FormSubmit (método principal para CSP)
   */
  async function enviarViaFormSubmit(leadData) {
    const formData = new FormData();
    
    // Dados principais
    formData.append('name', leadData.name);
    formData.append('email', leadData.email);
    formData.append('phone', leadData.phone);
    formData.append('message', leadData.message || 'Interessado em cotação');
    formData.append('operadora', leadData.operadora);
    formData.append('subject', leadData.subject);
    
    // Metadados
    formData.append('source_page', leadData.source_page);
    formData.append('user_agent', leadData.user_agent);
    formData.append('timestamp', new Date().toLocaleString('pt-BR'));
    
    // UTM (se disponível)
    if (leadData.utm_source) formData.append('utm_source', leadData.utm_source);
    if (leadData.utm_medium) formData.append('utm_medium', leadData.utm_medium);
    if (leadData.utm_campaign) formData.append('utm_campaign', leadData.utm_campaign);
    
    // Configurações do FormSubmit
    formData.append('_next', 'https://segurosaudeseesp.com/obrigado.html');
    formData.append('_subject', `🎯 Novo Lead - ${leadData.operadora} - ${leadData.name}`);
    formData.append('_cc', 'contato@segurosaudeseesp.com');
    formData.append('_captcha', 'false'); // Desabilitar captcha
    formData.append('_template', 'table'); // Template de e-mail mais limpo
    
    const response = await fetch('https://formsubmit.co/contato@segurosaudeseesp.com', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`FormSubmit falhou: ${response.status}`);
    }
    
    return { success: true, method: 'formsubmit' };
  }

  /**
   * Função principal para enviar lead (CSP Safe)
   */
  async function enviarLeadWebplan(formData) {
    try {
      console.log('🚀 [Webplan CSP] Enviando lead via FormSubmit...');
      
      // Validações
      if (!formData.name?.trim()) throw new Error('Nome é obrigatório');
      if (!formData.email?.trim()) throw new Error('E-mail é obrigatório');
      if (!isValidEmail(formData.email)) throw new Error('E-mail inválido');
      if (!formData.phone?.trim()) throw new Error('Telefone é obrigatório');
      if (!isValidPhone(formData.phone)) throw new Error('Telefone inválido');
      if (!formData.operadora?.trim()) throw new Error('Operadora é obrigatória');

      // Rate limiting
      if (!checkRateLimit(formData.email)) {
        throw new Error('Muitas tentativas. Aguarde 1 minuto.');
      }
      
      // Obter UTM params
      const utmParams = getUTMParams();
      
      // Preparar dados
      const leadData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        message: formData.message?.trim() || '',
        operadora: normalizeOperadora(formData.operadora),
        subject: formData.subject?.trim() || 'Lead do site',
        user_agent: navigator.userAgent,
        source_page: window.location.href,
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign
      };
      
      console.log('📧 [Webplan CSP] Enviando via FormSubmit...');
      await enviarViaFormSubmit(leadData);
      
      console.log('✅ [Webplan CSP] Lead enviado com sucesso!');
      return {
        success: true,
        message: 'Lead enviado com sucesso! Em breve um especialista entrará em contato.',
        method: 'formsubmit',
        note: 'Dados enviados por e-mail - aparecerão no painel após processamento manual'
      };
      
    } catch (error) {
      console.error('❌ [Webplan CSP] Erro:', error);
      
      let userMessage = error.message;
      
      if (error.message.includes('FormSubmit') || error.message.includes('fetch')) {
        userMessage = 'Erro de conexão. Entre em contato via WhatsApp: (11) 95930-5175';
      }
      
      return {
        success: false,
        message: userMessage,
        error: error.message,
        suggested_action: 'Entre em contato via WhatsApp: (11) 95930-5175'
      };
    }
  }

  /**
   * Configura formulário HTML
   */
  function configurarFormularioWebplan(formSelector, config = {}) {
    function initForm() {
      const form = document.querySelector(formSelector);
      if (!form) {
        console.error('❌ [Webplan CSP] Formulário não encontrado:', formSelector);
        return;
      }
      
      console.log('✅ [Webplan CSP] Formulário configurado (modo CSP):', formSelector);
      
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('input[type="submit"]');
        const originalText = submitBtn ? (submitBtn.textContent || submitBtn.value) : '';
        
        // Loading state
        if (submitBtn) {
          submitBtn.disabled = true;
          if (submitBtn.textContent !== undefined) {
            submitBtn.textContent = config.loadingText || 'Enviando...';
          } else {
            submitBtn.value = config.loadingText || 'Enviando...';
          }
        }
        
        try {
          const formData = new FormData(form);
          const data = {
            name: formData.get('name') || formData.get('nome'),
            email: formData.get('email'),
            phone: formData.get('phone') || formData.get('telefone'),
            message: formData.get('message') || formData.get('mensagem'),
            operadora: config.operadora || formData.get('operadora') || 'main',
            subject: config.subject || formData.get('subject') || formData.get('assunto') || 'Lead do site'
          };
          
          if (!data.name || !data.email || !data.phone) {
            throw new Error('Por favor, preencha todos os campos obrigatórios');
          }
          
          const result = await enviarLeadWebplan(data);
          
          if (result.success) {
            if (config.onSuccess) {
              config.onSuccess(result, form);
            } else {
              let message = result.message;
              if (result.note) {
                message += '\n\nObservação: ' + result.note;
              }
              alert(message);
              form.reset();
            }
          } else {
            if (config.onError) {
              config.onError(result, form);
            } else {
              let message = result.message;
              if (result.suggested_action) {
                message += '\n\n' + result.suggested_action;
              }
              alert(message);
            }
          }
          
        } catch (error) {
          if (config.onError) {
            config.onError({ 
              success: false, 
              message: error.message,
              suggested_action: 'Entre em contato via WhatsApp: (11) 95930-5175'
            }, form);
          } else {
            alert('Erro: ' + error.message + '\n\nEntre em contato via WhatsApp: (11) 95930-5175');
          }
          
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            if (submitBtn.textContent !== undefined) {
              submitBtn.textContent = originalText;
            } else {
              submitBtn.value = originalText;
            }
          }
        }
      });
    }
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initForm);
    } else {
      initForm();
    }
  }

  /**
   * Testa se CSP permite FormSubmit
   */
  async function testarConexao() {
    try {
      console.log('🔍 [Webplan CSP] Testando FormSubmit...');
      
      // Tentar fazer uma requisição HEAD para FormSubmit
      const response = await fetch('https://formsubmit.co/ajax/test', {
        method: 'HEAD'
      });
      
      console.log('✅ [Webplan CSP] FormSubmit acessível!');
      return { 
        success: true, 
        message: 'FormSubmit funcionando! (Modo CSP ativo)',
        mode: 'csp_compatible'
      };
      
    } catch (error) {
      console.warn('⚠️ [Webplan CSP] Erro de conectividade:', error.message);
      return { 
        success: false, 
        message: 'Problemas de conectividade detectados',
        fallback_available: false
      };
    }
  }

  // API pública
  const WebplanFormsCSP = {
    enviarLead: enviarLeadWebplan,
    configurarFormulario: configurarFormularioWebplan,
    normalizeOperadora: normalizeOperadora,
    testarConexao: testarConexao,
    version: '1.2.0-csp'
  };

  // Exportar
  if (typeof window !== 'undefined') {
    window.WebplanForms = WebplanFormsCSP;
    window.WebplanFormsCSP = WebplanFormsCSP; // Alias específico
  }
  
  console.log('🛡️ [Webplan CSP] Biblioteca v1.2.0-csp carregada (compatível com CSP)!');
  console.log('📧 [Webplan CSP] Modo: FormSubmit apenas (sem Supabase direto)');
  
})();
