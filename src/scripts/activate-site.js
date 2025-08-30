// Script para ativar o site no banco de dados
// Execute este arquivo diretamente no console do navegador ou como um script

const SITE_ID = '52857c4f-10ba-4fc3-8730-5054a1e676d1';
const SUPABASE_URL = 'https://enkijdqewoikjczpfgch.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVua2lqZHFld29pa2pjenBmZ2NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxMzQ2NDUsImV4cCI6MjA1MDcxMDY0NX0.YrjKV8x6oJtPP_ULg9FmzOhRgIIDYgY_l8_09-8QDR8';

// Criar cliente Supabase
const { createClient } = supabase;
const blogSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function activateSite() {
  try {
    console.log('🔄 Ativando site...');
    
    const { data, error } = await blogSupabase
      .from('blog_sites')
      .update({ active: true })
      .eq('id', SITE_ID)
      .select();

    if (error) {
      console.error('❌ Erro ao ativar site:', error);
      return false;
    }

    console.log('✅ Site ativado com sucesso!', data);
    return true;
  } catch (error) {
    console.error('❌ Erro:', error);
    return false;
  }
}

// Verificar status atual do site
async function checkSiteStatus() {
  try {
    const { data, error } = await blogSupabase
      .from('blog_sites')
      .select('*')
      .eq('id', SITE_ID)
      .single();

    if (error) {
      console.error('❌ Erro ao verificar site:', error);
      return;
    }

    console.log('📊 Status atual do site:', data);
    console.log('🟢 Ativo:', data.active ? 'Sim' : 'Não');
  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

// Executar
console.log('🚀 Iniciando ativação do site...');
checkSiteStatus().then(() => {
  activateSite().then((success) => {
    if (success) {
      console.log('🎉 Processo concluído! Verificando status final...');
      checkSiteStatus();
    }
  });
});
