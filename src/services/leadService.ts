import { supabase, Lead } from '../lib/supabase'

interface CreateLeadData extends Omit<Lead, 'id' | 'created_at' | 'updated_at'> {
  // Dados extras que podemos capturar
  browser_info?: string
  screen_resolution?: string
  referrer?: string
}

class LeadService {
  // Mapear nomes das operadoras para o formato do banco
  private normalizeOperadoraName(operadora: string): string {
    const operadoraMap: Record<string, string> = {
      // Formulário principal
      'main': 'main',
      'principal': 'main',
      'geral': 'main',
      
      // Operadoras específicas
      'SulAmérica': 'sulamerica',
      'sulamerica': 'sulamerica',
      'Porto Seguro': 'porto_seguro',
      'porto_seguro': 'porto_seguro',
      'Amil': 'amil',
      'amil': 'amil',
      'Alice': 'alice',
      'alice': 'alice',
      'MedSenior': 'medsenior',
      'medsenior': 'medsenior',
      'NotreDame': 'notredame',
      'notredame': 'notredame',
      'OneHealth': 'onehealth',
      'onehealth': 'onehealth',
      'Prevent Senior': 'prevent_senior',
      'prevent_senior': 'prevent_senior',
      'Qualicorp': 'qualicorp',
      'qualicorp': 'qualicorp',
      'Blue Med': 'blue_med',
      'blue_med': 'blue_med'
    }
    
    return operadoraMap[operadora] || operadora.toLowerCase().replace(/\s+/g, '_')
  }
  // Criar um novo lead
  async createLead(leadData: CreateLeadData): Promise<{ success: boolean; data?: Lead; error?: string }> {
    try {
      console.log('🚀 [Supabase] Enviando lead:', leadData)
      
      // Normalizar nome da operadora
      const normalizedOperadora = this.normalizeOperadoraName(leadData.operadora)
      
      // Capturar informações adicionais do browser
      const enrichedData: Partial<Lead> = {
        ...leadData,
        operadora: normalizedOperadora, // Usar operadora normalizada
        ip_address: await this.getClientIP(),
        user_agent: navigator.userAgent,
        source_page: window.location.href,
        status: 'novo',
        priority: 3
      }

      // Extrair UTM parameters se existirem
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('utm_source')) enrichedData.utm_source = urlParams.get('utm_source')!
      if (urlParams.get('utm_medium')) enrichedData.utm_medium = urlParams.get('utm_medium')!
      if (urlParams.get('utm_campaign')) enrichedData.utm_campaign = urlParams.get('utm_campaign')!

      const { data, error } = await supabase
        .from('leads')
        .insert([enrichedData])
        .select()
        .single()

      if (error) {
        console.error('❌ [Supabase] Erro ao criar lead:', error)
        return { success: false, error: error.message }
      }

      console.log('✅ [Supabase] Lead criado com sucesso:', data)
      return { success: true, data }
    } catch (error) {
      console.error('💥 [Supabase] Erro inesperado:', error)
      return { success: false, error: 'Erro interno do servidor' }
    }
  }

  // Buscar leads por operadora
  async getLeadsByOperadora(operadora: string): Promise<Lead[]> {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('operadora', operadora)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('❌ [Supabase] Erro ao buscar leads:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('💥 [Supabase] Erro inesperado:', error)
      return []
    }
  }

  // Atualizar status de um lead
  async updateLeadStatus(
    leadId: string, 
    status: Lead['status'], 
    notes?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const updateData: Partial<Lead> = { status }
      if (notes) updateData.notes = notes

      const { error } = await supabase
        .from('leads')
        .update(updateData)
        .eq('id', leadId)

      if (error) {
        console.error('❌ [Supabase] Erro ao atualizar lead:', error)
        return { success: false, error: error.message }
      }

      console.log('✅ [Supabase] Lead atualizado com sucesso')
      return { success: true }
    } catch (error) {
      console.error('💥 [Supabase] Erro inesperado:', error)
      return { success: false, error: 'Erro interno do servidor' }
    }
  }

  // Buscar IP do cliente (opcional) - Desabilitado por CSP
  private async getClientIP(): Promise<string | undefined> {
    try {
      // CSP pode bloquear api.ipify.org, então retornamos undefined
      console.log('⚠️ [LeadService] getClientIP desabilitado (CSP restriction)');
      return undefined;
      
      // Código original comentado para referência:
      // const response = await fetch('https://api.ipify.org?format=json')
      // const data = await response.json()
      // return data.ip
    } catch {
      return undefined
    }
  }

  // Verificar se email já existe
  async checkEmailExists(email: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('id')
        .eq('email', email)
        .limit(1)

      if (error) {
        console.error('❌ [Supabase] Erro ao verificar email:', error)
        return false
      }

      return (data && data.length > 0)
    } catch (error) {
      console.error('💥 [Supabase] Erro inesperado:', error)
      return false
    }
  }

  // Estatísticas rápidas
  async getQuickStats(): Promise<{
    total_leads: number
    leads_hoje: number
    leads_mes: number
    conversion_rate: number
  }> {
    try {
      const hoje = new Date().toISOString().split('T')[0]
      const inicioMes = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()

      const [totalResult, hojeResult, mesResult, fechadosResult] = await Promise.all([
        supabase.from('leads').select('id', { count: 'exact', head: true }),
        supabase.from('leads').select('id', { count: 'exact', head: true }).gte('created_at', hoje),
        supabase.from('leads').select('id', { count: 'exact', head: true }).gte('created_at', inicioMes),
        supabase.from('leads').select('id', { count: 'exact', head: true }).eq('status', 'fechado')
      ])

      const total = totalResult.count || 0
      const hoje_count = hojeResult.count || 0
      const mes_count = mesResult.count || 0
      const fechados_count = fechadosResult.count || 0

      return {
        total_leads: total,
        leads_hoje: hoje_count,
        leads_mes: mes_count,
        conversion_rate: total > 0 ? Math.round((fechados_count / total) * 100) : 0
      }
    } catch (error) {
      console.error('💥 [Supabase] Erro ao buscar estatísticas:', error)
      return {
        total_leads: 0,
        leads_hoje: 0,
        leads_mes: 0,
        conversion_rate: 0
      }
    }
  }

  // Buscar todos os leads (com paginação)
  async getAllLeads(page = 1, pageSize = 50): Promise<{ leads: Lead[], totalCount: number }> {
    try {
      const offset = (page - 1) * pageSize

      const [leadsResult, countResult] = await Promise.all([
        supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false })
          .range(offset, offset + pageSize - 1),
        supabase
          .from('leads')
          .select('id', { count: 'exact', head: true })
      ])

      if (leadsResult.error) {
        console.error('❌ [Supabase] Erro ao buscar leads:', leadsResult.error)
        return { leads: [], totalCount: 0 }
      }

      return {
        leads: leadsResult.data || [],
        totalCount: countResult.count || 0
      }
    } catch (error) {
      console.error('💥 [Supabase] Erro inesperado:', error)
      return { leads: [], totalCount: 0 }
    }
  }

  // Buscar leads por status
  async getLeadsByStatus(status: Lead['status']): Promise<Lead[]> {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('status', status)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('❌ [Supabase] Erro ao buscar leads por status:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('💥 [Supabase] Erro inesperado:', error)
      return []
    }
  }

  // Testar conexão com Supabase
  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      console.log('🔍 [Service] Testando conexão com Supabase...')
      
      // Teste 1: Verificar se o cliente está configurado
      if (!supabase) {
        throw new Error('Cliente Supabase não configurado')
      }
      
      // Teste 2: Verificar URLs e chaves
      const url = import.meta.env.VITE_SUPABASE_URL
      const key = import.meta.env.VITE_SUPABASE_ANON_KEY
      
      if (!url || !key) {
        throw new Error('Variáveis de ambiente Supabase não configuradas')
      }
      
      console.log('✅ [Service] Cliente e variáveis OK')
      
      // Teste 3: Tentar uma consulta simples
      const { data, error } = await supabase
        .from('leads')
        .select('count', { count: 'exact', head: true })
      
      if (error) {
        console.error('❌ [Service] Erro na consulta:', error)
        
        // Se for erro de RLS, ainda consideramos conexão básica OK
        if (error.message.includes('policy') || error.message.includes('recursion')) {
          console.log('⚠️ [Service] Erro de política RLS detectado')
          return {
            success: true,
            message: '⚠️ Conexão OK, mas RLS precisa correção. Execute CORRECAO_RLS_SUPABASE.sql no Supabase'
          }
        }
        
        return { success: false, message: `Erro de conexão: ${error.message}` }
      }
      
      console.log('✅ [Service] Conexão com Supabase OK!')
      return { success: true, message: `✅ Conexão com Supabase funcionando! Total de leads: ${data || 0}` }
      
    } catch (error) {
      console.error('💥 [Service] Erro inesperado:', error)
      return { 
        success: false, 
        message: `Erro inesperado: ${error instanceof Error ? error.message : 'Erro desconhecido'}` 
      }
    }
  }
}

export const leadService = new LeadService()
