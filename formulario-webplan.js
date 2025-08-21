/*!
 * Webplan Forms Integration
 * Sistema de integração de formulários externos com Supabase + FormSubmit fallback
 * Versão 1.1 - 21/08/2025
 * 
 * Funcionalidades:
 * - Envia para Supabase (aparece no painel admin automaticamente)
 * - Fallback para FormSubmit se Supabase falhar (CSP compatible)
 * - Validações completas, rate limiting, UTM tracking
 * 
 * Como usar:
 * 1. Incluir este arquivo no seu site
 * 2. Usar WebplanForms.configurarFormulario() ou WebplanForms.enviarLead()
 * 
 * Exemplo:
 * WebplanForms.configurarFormulario('#meu-form', {
 *   operadora: 'Amil',
 *   subject: 'Lead do meu site'
 * });
 */

(function() {
  'use strict';

  // Configuração do Supabase
  const SUPABASE_URL = 'https://xtixrumedzekulqmxtzz.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0aXhydW1lZHpla3VscW14dHp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MzI4ODIsImV4cCI6MjA3MTMwODg4Mn0.dqhBXNGKOxSW_qiT6UzwMG4anPI4DhHubgLJuTODXi4';

  // Cache para rate limiting
  const requestCache = new Map();
  
  /**
   * Normaliza nome da operadora para o formato do banco
   * @param {string} operadora - Nome da operadora
   * @returns {string} Nome normalizado
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
   * @returns {Promise<string|null>} IP do cliente
   */
  async function getClientIP() {
    try {
      const response = await fetch('https://api.ipify.org?format=json', {
        timeout: 3000
      });
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.warn('⚠️ [Webplan] Não foi possível obter IP (CSP pode estar bloqueando):', error.message);
      return null;
    }
  }

  /**
   * Envia via FormSubmit como fallback
   * @param {object} leadData - Dados do lead
   * @returns {Promise<object>} Resultado do envio
   */
  async function enviarViaFormSubmit(leadData) {
    console.log('📧 [Webplan] Enviando via FormSubmit...');
    
    const formData = new FormData();
    
    // Dados principais
    formData.append('name', leadData.name);
    formData.append('email', leadData.email);
    formData.append('phone', leadData.phone);
    formData.append('message', leadData.message || 'Interessado em cotação');
    formData.append('operadora', leadData.operadora);
    formData.append('subject', `🎯 Novo Lead - ${leadData.operadora} - ${leadData.name}`);
    
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
    formData.append('_cc', 'contato@segurosaudeseesp.com');
    formData.append('_captcha', 'false');
    formData.append('_template', 'table');
    
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
   * Extrai parâmetros UTM da URL
   * @returns {object} Objeto com parâmetros UTM
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
   * @param {string} email - E-mail para validar
   * @returns {boolean} True se válido
   */
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Valida telefone (formato brasileiro)
   * @param {string} phone - Telefone para validar
   * @returns {boolean} True se válido
   */
  function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[\d\s\(\)\-]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  /**
   * Implementa rate limiting simples
   * @param {string} identifier - Identificador único (IP, email, etc)
   * @returns {boolean} True se pode prosseguir
   */
  function checkRateLimit(identifier) {
    const now = Date.now();
    const windowMs = 60000; // 1 minuto
    const maxRequests = 5; // Máximo 5 requests por minuto
    
    const requests = requestCache.get(identifier) || [];
    const recentRequests = requests.filter(time => now - time < windowMs);
    
    if (recentRequests.length >= maxRequests) {
      console.warn('⚠️ [Webplan] Rate limit atingido para:', identifier);
      return false;
    }
    
    recentRequests.push(now);
    requestCache.set(identifier, recentRequests);
    
    // Limpar cache antigo
    if (requestCache.size > 1000) {
      const keysToDelete = Array.from(requestCache.keys()).slice(0, 100);
      keysToDelete.forEach(key => requestCache.delete(key));
    }
    
    return true;
  }

  /**
   * Função principal para enviar lead para o Supabase
   * @param {object} formData - Dados do formulário
   * @returns {Promise<object>} Resultado do envio
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

      // Rate limiting por e-mail
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
        subject: formData.subject ? formData.subject.trim() : 'Lead externo',
        ip_address: clientIP,
        user_agent: navigator.userAgent,
        source_page: window.location.href,
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        status: 'novo',
        priority: 3
      };
      
      // Remover campos vazios/null
      Object.keys(leadData).forEach(key => {
        if (leadData[key] === null || leadData[key] === undefined || leadData[key] === '') {
          delete leadData[key];
        }
      });
      
      console.log('📊 [Webplan] Dados preparados:', {
        ...leadData,
        user_agent: leadData.user_agent ? '...' : undefined // Truncar para log
      });
      
      // Tentar Supabase primeiro
      try {
        console.log('🎯 [Webplan] Tentando Supabase...');
        
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
        
        const result = await response.json();
        console.log('✅ [Webplan] Lead enviado para Supabase:', result[0]?.id || 'ID não retornado');
        
        return {
          success: true,
          message: 'Lead enviado com sucesso! Em breve um especialista entrará em contato.',
          data: result[0] || result,
          method: 'supabase'
        };
        
      } catch (supabaseError) {
        console.warn('⚠️ [Webplan] Supabase falhou, tentando FormSubmit:', supabaseError.message);
        
        // Se Supabase falhar, tentar FormSubmit
        try {
          await enviarViaFormSubmit(leadData);
          
          console.log('✅ [Webplan] Lead enviado via FormSubmit (fallback)');
          
          return {
            success: true,
            message: 'Lead enviado com sucesso! Em breve um especialista entrará em contato.',
            method: 'formsubmit',
            fallback_used: true,
            note: 'Dados enviados por e-mail - aparecerão no painel após processamento manual'
          };
          
        } catch (formSubmitError) {
          console.error('❌ [Webplan] FormSubmit também falhou:', formSubmitError.message);
          throw new Error(`Falha nos dois métodos: Supabase (${supabaseError.message}) e FormSubmit (${formSubmitError.message})`);
        }
      }
      
    } catch (error) {
      console.error('❌ [Webplan] Erro ao enviar lead:', error);
      
      // Mensagens de erro amigáveis
      let userMessage = error.message;
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        userMessage = 'Erro de conexão. Possível problema de CORS ou rede. Entre em contato via WhatsApp: (11) 95930-5175';
      } else if (error.message.includes('duplicate') || error.message.includes('unique')) {
        userMessage = 'Este e-mail já foi cadastrado. Tente usar outro e-mail.';
      } else if (error.message.includes('policy') || error.message.includes('RLS')) {
        userMessage = 'Erro de configuração do sistema. Contacte o suporte.';
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        userMessage = 'Erro de conexão. Verifique sua internet e tente novamente.';
      } else if (error.message.includes('CORS') || error.message.includes('CSP')) {
        userMessage = 'Erro de configuração do servidor. Entre em contato via WhatsApp: (11) 95930-5175';
      } else if (error.message.includes('Falha nos dois métodos')) {
        userMessage = 'Erro de conexão. Entre em contato via WhatsApp: (11) 95930-5175';
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
   * @param {string} formSelector - Seletor CSS do formulário
   * @param {object} config - Configurações do formulário
   */
  function configurarFormularioWebplan(formSelector, config = {}) {
    // Aguardar DOM estar pronto
    function initForm() {
      const form = document.querySelector(formSelector);
      if (!form) {
        console.error('❌ [Webplan] Formulário não encontrado:', formSelector);
        return;
      }
      
      console.log('✅ [Webplan] Formulário configurado:', formSelector);
      
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Encontrar botão de submit
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
          // Coletar dados do formulário
          const formData = new FormData(form);
          const data = {
            name: formData.get('name') || formData.get('nome'),
            email: formData.get('email'),
            phone: formData.get('phone') || formData.get('telefone'),
            message: formData.get('message') || formData.get('mensagem'),
            operadora: config.operadora || formData.get('operadora') || 'main',
            subject: config.subject || formData.get('subject') || formData.get('assunto') || 'Lead do site'
          };
          
          // Verificar se campos obrigatórios estão preenchidos
          if (!data.name || !data.email || !data.phone) {
            throw new Error('Por favor, preencha todos os campos obrigatórios (nome, e-mail e telefone)');
          }
          
          // Enviar lead
          const result = await enviarLeadWebplan(data);
          
          if (result.success) {
            // Sucesso - callback personalizado ou padrão
            if (config.onSuccess) {
              config.onSuccess(result, form);
            } else {
              alert(config.successMessage || 'Mensagem enviada com sucesso! Em breve entraremos em contato.');
              form.reset();
            }
          } else {
            // Erro - callback personalizado ou padrão
            if (config.onError) {
              config.onError(result, form);
            } else {
              alert((config.errorMessage || 'Erro ao enviar mensagem: ') + result.message);
            }
          }
          
        } catch (error) {
          console.error('💥 [Webplan] Erro no formulário:', error);
          
          if (config.onError) {
            config.onError({ success: false, message: error.message }, form);
          } else {
            alert('Erro inesperado: ' + error.message);
          }
          
        } finally {
          // Restaurar botão
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
    
    // Executar quando DOM estiver pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initForm);
    } else {
      initForm();
    }
  }

  /**
   * Testa conexão com Supabase
   * @returns {Promise<object>} Resultado do teste
   */
  async function testarConexao() {
    try {
      console.log('🔍 [Webplan] Testando conexão...');
      
      const response = await fetch(`${SUPABASE_URL}/rest/v1/leads?select=count`, {
        method: 'HEAD',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });
      
      if (response.ok) {
        console.log('✅ [Webplan] Conexão OK!');
        return { success: true, message: 'Conexão com Webplan funcionando!' };
      } else {
        throw new Error(`Status ${response.status}: ${response.statusText}`);
      }
      
    } catch (error) {
      console.error('❌ [Webplan] Erro na conexão:', error);
      return { success: false, message: 'Erro de conexão: ' + error.message };
    }
  }

  // API pública
  const WebplanForms = {
    /**
     * Envia lead manualmente
     * @param {object} formData - Dados do lead
     * @returns {Promise<object>} Resultado do envio
     */
    enviarLead: enviarLeadWebplan,
    
    /**
     * Configura formulário para envio automático
     * @param {string} formSelector - Seletor do formulário
     * @param {object} config - Configurações
     */
    configurarFormulario: configurarFormularioWebplan,
    
    /**
     * Normaliza nome da operadora
     * @param {string} operadora - Nome da operadora
     * @returns {string} Nome normalizado
     */
    normalizeOperadora: normalizeOperadora,
    
    /**
     * Testa conexão com o servidor
     * @returns {Promise<object>} Resultado do teste
     */
    testarConexao: testarConexao,
    
    /**
     * Versão da biblioteca
     */
    version: '1.1.0'
  };

  // Exportar para uso global
  if (typeof window !== 'undefined') {
    window.WebplanForms = WebplanForms;
  }
  
  // Suporte para AMD/CommonJS
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = WebplanForms;
  }
  
  // Log de inicialização
  console.log('🚀 [Webplan] Biblioteca carregada com sucesso! Versão:', WebplanForms.version);
  
})();
