// 🔍 DIAGNÓSTICO RÁPIDO - Cole no Console do Navegador
// Execute no site https://segurosaudeseesp.com/

console.log('🚀 Iniciando diagnóstico Webplan...');

// Configurações
const SUPABASE_URL = 'https://xtixrumedzekulqmxtzz.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0aXhydW1lZHpla3VscW14dHp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MzI4ODIsImV4cCI6MjA3MTMwODg4Mn0.dqhBXNGKOxSW_qiT6UzwMG4anPI4DhHubgLJuTODXi4';

async function diagnosticoCompleto() {
  console.log('📍 Domínio atual:', window.location.origin);
  console.log('📄 URL completa:', window.location.href);
  
  // Teste 1: Conectividade básica
  console.log('\n🔍 TESTE 1: Conectividade Básica');
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      headers: { 'apikey': SUPABASE_KEY }
    });
    console.log('✅ Status:', response.status);
    console.log('📊 Headers CORS recebidos:');
    response.headers.forEach((value, key) => {
      if (key.toLowerCase().includes('access-control')) {
        console.log(`   ${key}: ${value}`);
      }
    });
  } catch (error) {
    console.log('❌ Erro:', error.name, error.message);
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.log('🚨 DIAGNÓSTICO: Problema de CORS detectado!');
      console.log('🔧 SOLUÇÃO: Use o script com fallback');
      return 'CORS';
    }
  }
  
  // Teste 2: Verificar tabela leads
  console.log('\n🔍 TESTE 2: Acesso à Tabela Leads');
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/leads?select=count`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });
    
    console.log('✅ Status:', response.status);
    
    if (response.status === 401) {
      console.log('🚨 DIAGNÓSTICO: Problema de autenticação!');
      console.log('🔧 SOLUÇÃO: Verificar chave API');
      return 'AUTH';
    }
    
    if (response.status === 403) {
      console.log('🚨 DIAGNÓSTICO: Problema de RLS (Row Level Security)!');
      console.log('🔧 SOLUÇÃO: Configurar políticas RLS no Supabase');
      return 'RLS';
    }
    
    const data = await response.text();
    console.log('📊 Resposta:', data);
    
  } catch (error) {
    console.log('❌ Erro:', error.name, error.message);
    return 'NETWORK';
  }
  
  // Teste 3: Tentar inserir um lead
  console.log('\n🔍 TESTE 3: Tentativa de Insert');
  try {
    const testLead = {
      name: 'Teste Diagnóstico',
      email: `teste.${Date.now()}@diagnostico.com`,
      phone: '11999999999',
      operadora: 'main',
      subject: 'Teste de diagnóstico',
      message: 'Lead gerado pelo diagnóstico automático'
    };
    
    const response = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(testLead)
    });
    
    console.log('✅ Status INSERT:', response.status);
    
    if (response.ok) {
      const result = await response.json();
      console.log('🎉 SUCCESS! Lead inserido com sucesso!');
      console.log('📊 Dados inseridos:', result);
      console.log('✅ DIAGNÓSTICO: Sistema funcionando perfeitamente!');
      return 'SUCCESS';
    } else {
      const errorData = await response.text();
      console.log('📊 Erro detalhado:', errorData);
      
      if (response.status === 401) return 'AUTH';
      if (response.status === 403) return 'RLS';
      return 'INSERT_ERROR';
    }
    
  } catch (error) {
    console.log('❌ Erro no insert:', error.name, error.message);
    return 'INSERT_FAILED';
  }
}

// Executar diagnóstico
diagnosticoCompleto().then(resultado => {
  console.log('\n🎯 RESULTADO FINAL:', resultado);
  
  switch(resultado) {
    case 'CORS':
      console.log('\n🚨 PROBLEMA: CORS não configurado');
      console.log('🔧 SOLUÇÃO IMEDIATA: Use formulario-webplan-producao.js');
      console.log('🔧 SOLUÇÃO DEFINITIVA: Configurar CORS no Supabase ou usar proxy');
      break;
      
    case 'RLS':
      console.log('\n🚨 PROBLEMA: Row Level Security bloqueando');
      console.log('🔧 SOLUÇÃO: Execute no SQL Editor do Supabase:');
      console.log(`
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
-- OU --
CREATE POLICY "Allow anon access" ON leads FOR ALL TO anon USING (true) WITH CHECK (true);
      `);
      break;
      
    case 'AUTH':
      console.log('\n🚨 PROBLEMA: Chave API inválida');
      console.log('🔧 SOLUÇÃO: Verificar SUPABASE_ANON_KEY');
      break;
      
    case 'SUCCESS':
      console.log('\n🎉 TUDO FUNCIONANDO!');
      console.log('✅ O sistema está operacional no seu domínio');
      break;
      
    default:
      console.log('\n⚠️ PROBLEMA INDEFINIDO');
      console.log('🔧 SOLUÇÃO: Use formulario-webplan-producao.js como fallback');
  }
  
  console.log('\n📞 Suporte: Se precisar de ajuda, envie estes logs');
});

// Informações adicionais
console.log('\n📋 INFORMAÇÕES DO SISTEMA:');
console.log('🌐 User Agent:', navigator.userAgent);
console.log('🔧 Suporte a Fetch:', typeof fetch !== 'undefined');
console.log('🔧 Suporte a CORS:', 'withCredentials' in new XMLHttpRequest());
console.log('📍 Referrer:', document.referrer || 'Direto');
console.log('🔗 Protocol:', window.location.protocol);
