# 🔧 WebPlan Seguros - Configuração e Integração Supabase

## 📋 Checklist de Implementação

### 1. ✅ Setup Inicial do Supabase
- [ ] Criar conta no Supabase
- [ ] Criar novo projeto
- [ ] Executar scripts SQL do arquivo `SUPABASE_DATABASE_SETUP.md`
- [ ] Configurar autenticação (email/senha)
- [ ] Configurar RLS (Row Level Security)
- [ ] Obter chaves da API (anon key e service role key)

### 2. ✅ Configuração no Frontend
- [ ] Instalar cliente Supabase: `npm install @supabase/supabase-js`
- [ ] Configurar variáveis de ambiente
- [ ] Criar serviço de API
- [ ] Substituir FormSubmit por Supabase
- [ ] Implementar feedback visual

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://sua-url-do-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-chave-de-servico-aqui

# App Configuration
VITE_APP_NAME=WebPlan Seguros
VITE_APP_VERSION=1.0.0
```

## 📝 Configuração do Cliente Supabase

Crie o arquivo `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos TypeScript para as tabelas
export interface Lead {
  id?: string
  name: string
  email: string
  phone: string
  message?: string
  operadora: string
  subject: string
  ip_address?: string
  user_agent?: string
  source_page?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  status?: 'novo' | 'contatado' | 'interessado' | 'proposta_enviada' | 'negociacao' | 'fechado' | 'perdido' | 'reagendado'
  priority?: 1 | 2 | 3 | 4 | 5
  assigned_to?: string
  notes?: string
  created_at?: string
  updated_at?: string
}

export interface Operadora {
  id?: string
  code: string
  name: string
  logo_url?: string
  primary_color?: string
  secondary_color?: string
  has_cnpj_plan?: boolean
  has_individual_plan?: boolean
  has_family_plan?: boolean
  has_business_plan?: boolean
  is_active?: boolean
  display_order?: number
  created_at?: string
  updated_at?: string
}

export interface AdminUser {
  id?: string
  name: string
  email: string
  phone?: string
  auth_user_id?: string
  role?: 'admin' | 'gerente' | 'vendedor' | 'readonly'
  permissions?: Record<string, any>
  is_active?: boolean
  can_view_all_leads?: boolean
  assigned_operadoras?: string[]
  total_leads_assigned?: number
  total_leads_closed?: number
  conversion_rate?: number
  created_at?: string
  updated_at?: string
  last_login?: string
}

export interface LeadInteraction {
  id?: string
  lead_id: string
  admin_user_id?: string
  interaction_type: 'call' | 'email' | 'whatsapp' | 'sms' | 'meeting' | 'note' | 'proposal_sent' | 'contract_sent'
  title: string
  description?: string
  outcome?: 'positive' | 'negative' | 'neutral' | 'callback_scheduled' | 'no_answer' | 'email_sent' | 'proposal_sent' | 'closed_won' | 'closed_lost'
  scheduled_for?: string
  completed_at?: string
  metadata?: Record<string, any>
  created_at?: string
}
```

## 🛠️ Serviço de API para Leads

Crie o arquivo `src/services/leadService.ts`:

```typescript
import { supabase, Lead } from '../lib/supabase'

interface CreateLeadData extends Omit<Lead, 'id' | 'created_at' | 'updated_at'> {
  // Dados extras que podemos capturar
  browser_info?: string
  screen_resolution?: string
  referrer?: string
}

class LeadService {
  // Criar um novo lead
  async createLead(leadData: CreateLeadData): Promise<{ success: boolean; data?: Lead; error?: string }> {
    try {
      console.log('🚀 [Supabase] Enviando lead:', leadData)
      
      // Capturar informações adicionais do browser
      const enrichedData: Partial<Lead> = {
        ...leadData,
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

  // Buscar IP do cliente (opcional)
  private async getClientIP(): Promise<string | undefined> {
    try {
      const response = await fetch('https://api.ipify.org?format=json')
      const data = await response.json()
      return data.ip
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
}

export const leadService = new LeadService()
```

## 🔄 Exemplo de Integração no Formulário

Exemplo de como atualizar o `handleSubmit` das páginas de operadoras:

```typescript
import { leadService } from '../services/leadService'

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  console.log('🟢 [Supabase] Função handleSubmit foi chamada!')
  
  if (validateForm()) {
    setLoading(true) // Adicionar estado de loading
    console.log('✅ [Supabase] Validação aprovada, enviando para Supabase...')
    
    try {
      const result = await leadService.createLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        operadora: 'sulamerica', // ou a operadora específica
        subject: formData.subject
      })

      if (result.success) {
        console.log('🎉 [Supabase] Lead criado com sucesso!', result.data)
        setShowSuccessPopup(true)
        
        // Reset form
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: 'sulamerica_cnpj_enfermeiros',
            message: ''
          })
        }, 1000)
      } else {
        console.error('❌ [Supabase] Erro ao criar lead:', result.error)
        alert('Erro ao enviar formulário. Tente novamente.')
      }
    } catch (error) {
      console.error('💥 [Supabase] Erro inesperado:', error)
      alert('Erro interno. Tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
  } else {
    console.log('❌ [Supabase] Validação falhou:', errors)
  }
}
```

## 📊 Dashboard Básico - Componente de Estatísticas

```typescript
import React, { useEffect, useState } from 'react'
import { leadService } from '../services/leadService'

interface Stats {
  total_leads: number
  leads_hoje: number
  leads_mes: number
  conversion_rate: number
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await leadService.getQuickStats()
        setStats(data)
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  if (loading) {
    return <div className="animate-pulse">Carregando estatísticas...</div>
  }

  if (!stats) {
    return <div className="text-red-500">Erro ao carregar dados</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">Total de Leads</h3>
        <p className="text-3xl font-bold text-blue-600">{stats.total_leads}</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">Leads Hoje</h3>
        <p className="text-3xl font-bold text-green-600">{stats.leads_hoje}</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">Leads Este Mês</h3>
        <p className="text-3xl font-bold text-purple-600">{stats.leads_mes}</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">Taxa de Conversão</h3>
        <p className="text-3xl font-bold text-orange-600">{stats.conversion_rate}%</p>
      </div>
    </div>
  )
}

export default Dashboard
```

## 🎯 Benefícios da Migração para Supabase

### ✅ Vantagens sobre FormSubmit:
1. **Controle Total**: Seus dados ficam no seu banco
2. **Tempo Real**: Atualizações instantâneas
3. **Segurança**: RLS e controle de acesso
4. **Escalabilidade**: Suporta crescimento
5. **Analytics**: Relatórios detalhados
6. **Integrações**: APIs customizáveis
7. **Backup**: Dados seguros e recuperáveis

### 📈 Funcionalidades Adicionais:
- Sistema de notificações em tempo real
- Dashboard administrativo completo
- Relatórios e métricas avançadas
- Sistema de follow-up automatizado
- Integração com WhatsApp/Email
- Controle de pipeline de vendas
- Auditoria completa de ações

## 🚀 Roteiro de Implementação

1. **Fase 1**: Setup básico do Supabase ✅
2. **Fase 2**: Migração dos formulários
3. **Fase 3**: Dashboard administrativo
4. **Fase 4**: Sistema de notificações
5. **Fase 5**: Relatórios avançados
6. **Fase 6**: Integrações externas

Quer que eu continue com a implementação da integração nos formulários?
