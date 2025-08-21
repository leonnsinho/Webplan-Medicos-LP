/*!
 * Webplan Forms Integration - Versão Produção
 * Sistema de integração com fallback para problemas de CORS
 * Versão 1.1 - 21/08/2025
 */

(function() {
  'use strict';

  // Configuração do Supabase
  const SUPABASE_URL = 'https://xtixrumedzekulqmxtzz.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0aXhydW1lZHpla3VscW14dHp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MzI4ODIsImV4cCI6MjA3MTMwODg4Mn0.dqhBXNGKOxSW_qiT6UzwMG4anPI4DhHubgLJuTODXi4';
  
  // URL do proxy/fallback (você pode criar uma função serverless)
  const PROXY_URL = 'https://api.segurosaudeseesp.com/webhook/lead'; // Exemplo

  // Cache para rate limiting
  const requestCache = new Map();
  
  /**
   * Normaliza nome da operadora para o formato do banco
   */
  function normalizeOperadora(operadora) {
    const operadoraMap = {
      'SulAmérica': 'sulamerica',
      'sulamerica': 'sulamerica',
      'Porto Seguro': 'porto_seguro',
      'porto_seguro': 'porto_seguro',
      'Bradesco': 'bradesco',
      'bradesco': 'bradesco',
      'Amil': 'amil',
      'amil': 'amil',
      'Alice': 'alice',
      'alice': 'alice',
      'Unimed': 'unimed',
      'unimed': 'unimed',
      'MedSenior': 'medsenior',
      'medsenior': 'medsenior',
      'São Camilo': 'sao_camilo',
      'sao_camilo': 'sao_camilo',
      'NotreDame': 'notredame',
      'notredame': 'notredame',
      'OneHealth': 'onehealth',
      'onehealth': 'onehealth',
      'Prevent Senior': 'prevent_senior',
      'prevent_senior': 'prevent_senior',
      'Qualicorp': 'qualicorp',
      'qualicorp': 'qualicorp',
      'Blue Med': 'blue_med',
      'blue_med': 'blue_med',
      'main': 'main',
      'principal': 'main',
      'geral': 'main'
    };
    
    return operadoraMap[operadora] || operadora.toLowerCase().replace(/\s+/g, '_');
  }

  /**
   * Obtém IP do cliente usando serviço externo
   */
  async function getClientIP() {
    // CSP pode bloquear api.ipify.org, então vamos skip
    try {
      // Tentar apenas se CSP permitir
      const response = await fetch('https://api.ipify.org?format=json', {
        timeout: 2000
      });
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.warn('⚠️ [Webplan] CSP bloqueou serviço de IP (normal):', error.message);
      // Retornar null - não é crítico para o funcionamento
      return null;
    }
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
      console.warn('⚠️ [Webplan] Erro ao extrair UTM:', error.message);
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
   * Valida telefone (formato brasileiro)
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
    const maxRequests = 5;
    
    const requests = requestCache.get(identifier) || [];
    const recentRequests = requests.filter(time => now - time < windowMs);
    
    if (recentRequests.length >= maxRequests) {
      console.warn('⚠️ [Webplan] Rate limit atingido para:', identifier);
      return false;
    }
    
    recentRequests.push(now);
    requestCache.set(identifier, recentRequests);
    
    return true;
  }

  /**
   * Envia lead diretamente para Supabase
   */
  async function enviarViaSupabase(leadData) {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(leadData),
      mode: 'cors',
      credentials: 'omit'
    });
    
    if (!response.ok) {
      let errorMessage = `Erro HTTP ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error?.message || errorMessage;
      } catch (e) {
        errorMessage = await response.text() || errorMessage;
      }
      throw new Error(errorMessage);
    }
    
    return await response.json();
  }

  /**
   * Fallback via FormSubmit (como backup)
   */
  async function enviarViaFormSubmit(leadData) {
    const formData = new FormData();
    
    // Dados principais
    formData.append('name', leadData.name);
    formData.append('email', leadData.email);
    formData.append('phone', leadData.phone);
    formData.append('message', leadData.message || 'Sem mensagem');
    formData.append('operadora', leadData.operadora);
    formData.append('subject', leadData.subject);
    
    // Metadados
    formData.append('source_page', leadData.source_page);
    formData.append('ip_address', leadData.ip_address || 'N/A');
    formData.append('user_agent', leadData.user_agent);
    formData.append('utm_source', leadData.utm_source || 'N/A');
    formData.append('utm_medium', leadData.utm_medium || 'N/A');
    formData.append('utm_campaign', leadData.utm_campaign || 'N/A');
    
    // Configurações do FormSubmit
    formData.append('_next', 'https://segurosaudeseesp.com/obrigado.html');
    formData.append('_subject', `Novo Lead - ${leadData.operadora} - ${leadData.name}`);
    formData.append('_cc', 'contato@segurosaudeseesp.com');
    
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
   * Função principal para enviar lead
   */
  async function enviarLeadWebplan(formData) {
    try {
      console.log('🚀 [Webplan] Enviando lead...');
      
      // Validar dados obrigatórios
      if (!formData.name || !formData.name.trim()) {
        throw new Error('Nome é obrigatório');
      }
      
      if (!formData.email || !formData.email.trim()) {
        throw new Error('E-mail é obrigatório');
      }
      
      if (!isValidEmail(formData.email)) {
        throw new Error('E-mail inválido');
      }
      
      if (!formData.phone || !formData.phone.trim()) {
        throw new Error('Telefone é obrigatório');
      }
      
      if (!isValidPhone(formData.phone)) {
        throw new Error('Telefone inválido');
      }
      
      if (!formData.operadora || !formData.operadora.trim()) {
        throw new Error('Operadora é obrigatória');
      }

      // Rate limiting
      if (!checkRateLimit(formData.email)) {
        throw new Error('Muitas tentativas. Aguarde 1 minuto.');
      }
      
      // Obter informações adicionais
      const [clientIP, utmParams] = await Promise.all([
        getClientIP(),
        Promise.resolve(getUTMParams())
      ]);
      
      // Preparar dados para envio
      const leadData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        message: formData.message ? formData.message.trim() : '',
        operadora: normalizeOperadora(formData.operadora),
        subject: formData.subject ? formData.subject.trim() : 'Lead do site',
        ip_address: clientIP,
        user_agent: navigator.userAgent,
        source_page: window.location.href,
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        status: 'novo',
        priority: 3
      };
      
      // Remover campos vazios
      Object.keys(leadData).forEach(key => {
        if (leadData[key] === null || leadData[key] === undefined || leadData[key] === '') {
          delete leadData[key];
        }
      });
      
      console.log('📊 [Webplan] Dados preparados para envio');
      
      let result;
      
      // Tentativa 1: Supabase direto
      try {
        console.log('🎯 [Webplan] Tentando envio direto via Supabase...');
        result = await enviarViaSupabase(leadData);
        
        console.log('✅ [Webplan] Sucesso via Supabase!');
        return {
          success: true,
          message: 'Lead enviado com sucesso!',
          data: result[0] || result,
          method: 'supabase'
        };
        
      } catch (supabaseError) {
        console.warn('⚠️ [Webplan] Falha no Supabase:', supabaseError.message);
        
        // Se for erro de CORS, tentar FormSubmit como backup
        if (supabaseError.name === 'TypeError' && supabaseError.message.includes('fetch')) {
          console.log('📧 [Webplan] Tentando backup via FormSubmit...');
          
          try {
            await enviarViaFormSubmit(leadData);
            
            console.log('✅ [Webplan] Sucesso via FormSubmit (backup)!');
            return {
              success: true,
              message: 'Lead enviado com sucesso! (Em breve um especialista entrará em contato)',
              method: 'formsubmit_backup',
              warning: 'Enviado via backup - dados podem não aparecer imediatamente no painel'
            };
            
          } catch (formSubmitError) {
            console.error('❌ [Webplan] Ambos os métodos falharam');
            throw new Error(`Erro de conexão. FormSubmit também falhou: ${formSubmitError.message}`);
          }
        } else {
          // Re-throw erro original se não for CORS
          throw supabaseError;
        }
      }
      
    } catch (error) {
      console.error('❌ [Webplan] Erro final:', error);
      
      // Mensagens amigáveis
      let userMessage = error.message;
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        userMessage = 'Problema de conexão detectado. Por favor, entre em contato via WhatsApp: (11) 95930-5175';
      } else if (error.message.includes('duplicate') || error.message.includes('unique')) {
        userMessage = 'Este e-mail já foi cadastrado. Tente usar outro e-mail ou entre em contato diretamente.';
      }
      
      return {
        success: false,
        message: userMessage,
        error: error.message,
        technical_error: error,
        suggested_action: 'Entre em contato via WhatsApp: (11) 95930-5175'
      };
    }
  }

  /**
   * Configura formulário HTML para envio automático
   */
  function configurarFormularioWebplan(formSelector, config = {}) {
    function initForm() {
      const form = document.querySelector(formSelector);
      if (!form) {
        console.error('❌ [Webplan] Formulário não encontrado:', formSelector);
        return;
      }
      
      console.log('✅ [Webplan] Formulário configurado:', formSelector);
      
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('input[type="submit"]');
        const originalText = submitBtn ? (submitBtn.textContent || submitBtn.value) : '';
        
        // Mostrar loading
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
            throw new Error('Por favor, preencha todos os campos obrigatórios (nome, e-mail e telefone)');
          }
          
          const result = await enviarLeadWebplan(data);
          
          if (result.success) {
            if (config.onSuccess) {
              config.onSuccess(result, form);
            } else {
              let message = result.message;
              if (result.warning) {
                message += '\n\nObservação: ' + result.warning;
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
          console.error('💥 [Webplan] Erro no formulário:', error);
          
          if (config.onError) {
            config.onError({ 
              success: false, 
              message: error.message,
              suggested_action: 'Entre em contato via WhatsApp: (11) 95930-5175'
            }, form);
          } else {
            alert('Erro inesperado: ' + error.message + '\n\nEntre em contato via WhatsApp: (11) 95930-5175');
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
   * Testa conexão com Supabase
   */
  async function testarConexao() {
    try {
      console.log('🔍 [Webplan] Testando conexão...');
      
      const response = await fetch(`${SUPABASE_URL}/rest/v1/leads?select=count`, {
        method: 'HEAD',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        },
        mode: 'cors'
      });
      
      if (response.ok) {
        console.log('✅ [Webplan] Conexão direta OK!');
        return { success: true, message: 'Conexão direta com Webplan funcionando!' };
      } else {
        throw new Error(`Status ${response.status}: ${response.statusText}`);
      }
      
    } catch (error) {
      console.warn('⚠️ [Webplan] Conexão direta falhou:', error.message);
      return { 
        success: false, 
        message: 'Conexão direta falhou - formulários usarão método de backup',
        fallback_available: true
      };
    }
  }

  // API pública
  const WebplanForms = {
    enviarLead: enviarLeadWebplan,
    configurarFormulario: configurarFormularioWebplan,
    normalizeOperadora: normalizeOperadora,
    testarConexao: testarConexao,
    version: '1.1.0'
  };

  // Exportar
  if (typeof window !== 'undefined') {
    window.WebplanForms = WebplanForms;
  }
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = WebplanForms;
  }
  
  console.log('🚀 [Webplan] Biblioteca v1.1.0 carregada com fallback para CORS!');
  
})();
