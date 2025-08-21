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
