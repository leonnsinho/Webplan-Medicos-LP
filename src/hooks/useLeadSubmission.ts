import { useState } from 'react'
import { leadService } from '../services/leadService'
import { Lead } from '../lib/supabase'

interface UseLeadSubmissionResult {
  isSubmitting: boolean
  submitLead: (leadData: Omit<Lead, 'id' | 'created_at' | 'updated_at' | 'status' | 'priority'>) => Promise<{ success: boolean; error?: string }>
  testConnection: () => Promise<{ success: boolean; message: string }>
}

export const useLeadSubmission = (): UseLeadSubmissionResult => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitLead = async (leadData: Omit<Lead, 'id' | 'created_at' | 'updated_at' | 'status' | 'priority'>) => {
    setIsSubmitting(true)
    
    try {
      console.log('🚀 [Hook] Iniciando envio do lead:', leadData)
      
      const result = await leadService.createLead(leadData)
      
      if (result.success) {
        console.log('✅ [Hook] Lead enviado com sucesso!')
        return { success: true }
      } else {
        console.error('❌ [Hook] Erro ao enviar lead:', result.error)
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('💥 [Hook] Erro inesperado:', error)
      return { success: false, error: 'Erro interno do sistema' }
    } finally {
      setIsSubmitting(false)
    }
  }

  const testConnection = async () => {
    console.log('🔍 [Hook] Testando conexão com Supabase...')
    const result = await leadService.testConnection()
    console.log('📊 [Hook] Resultado do teste:', result)
    return result
  }

  return {
    isSubmitting,
    submitLead,
    testConnection
  }
}
