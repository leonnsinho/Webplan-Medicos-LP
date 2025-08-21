# 🚀 Guia de Teste e Integração Supabase - WebPlan Seguros

## Status Atual
✅ **Supabase configurado**
✅ **Cliente configurado** (src/lib/supabase.ts)
✅ **Serviços criados** (src/services/leadService.ts)
✅ **Hook React criado** (src/hooks/useLeadSubmission.ts)
✅ **Página de teste criada** (src/pages/SupabaseTestPage.tsx)
✅ **Servidor rodando** (http://localhost:3003)

## 🧪 Como Testar a Integração

### 1. Acesse a Página de Teste
- Abra: http://localhost:3003/teste-supabase
- Você verá um formulário completo com campos de teste

### 2. Execute o SQL no Supabase (SE AINDA NÃO FEZ)
```sql
-- Copie e cole o conteúdo de SUPABASE_SCRIPT_COMPLETO.sql no SQL Editor do Supabase
-- Execute uma seção por vez se houver erros
```

### 3. Teste a Conexão
- Clique em **"Testar Conexão"** primeiro
- Deve mostrar: ✅ Conexão com Supabase bem-sucedida

### 4. Teste o Envio de Lead
- Preencha os campos do formulário
- Clique em **"Testar Envio de Lead"**
- Deve mostrar: ✅ Sucesso! Lead enviado com sucesso

## 🔧 Próximos Passos

### 1. Aplicar nos Formulários Existentes
Substituir o código FormSubmit por Supabase em:
- ✅ SulamericaPage.tsx (em andamento)
- 🔲 PortoSeguroPage.tsx
- 🔲 BradescoPage.tsx
- 🔲 AlicePage.tsx
- 🔲 AmilPage.tsx
- 🔲 UnimedPage.tsx
- 🔲 MedSeniorPage.tsx
- 🔲 SaoCamiloPage.tsx

### 2. Padrão de Integração
```typescript
// Importar o hook
import { useLeadSubmission } from '../hooks/useLeadSubmission';

// No componente
const { submitLead, isSubmitting } = useLeadSubmission();

// No handleSubmit
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const leadData = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    operadora: 'SulAmérica', // Nome da operadora
    subject: 'Interesse em plano SulAmérica',
    message: formData.message || 'Cliente interessado em cotação'
  };

  const result = await submitLead(leadData);
  
  if (result.success) {
    // Redirecionar para página de sucesso
    navigate('/sucesso');
  } else {
    // Mostrar erro
    alert('Erro ao enviar: ' + result.error);
  }
};
```

## 🎯 Vantagens da Nova Implementação

### ✅ Substituição do FormSubmit
- **Antes**: Emails não chegavam, sem controle
- **Agora**: Banco de dados centralizado, 100% confiável

### ✅ Sistema Profissional
- Rastreamento de leads
- Status de acompanhamento
- Prioridades
- Histórico completo

### ✅ Analytics Integrados
- Origem dos leads (UTM)
- Páginas de origem
- IP e User Agent
- Estatísticas por operadora

### ✅ Administração
- Dashboard para gerenciar leads
- Filtros e buscas
- Exportação de dados
- Relatórios automáticos

## 🚨 Problemas Comuns e Soluções

### Erro de Conexão
```bash
# Verificar variáveis de ambiente
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY
```

### Erro de Permissão
- Verificar RLS (Row Level Security) no Supabase
- Confirmar que as políticas estão ativas

### Erro de Campos Obrigatórios
- Verificar se todos os campos necessários estão sendo enviados
- Ver console do navegador para detalhes

## 📊 Monitoramento

### Console do Navegador
Todos os logs estão sendo exibidos no console:
- 🚀 Início das operações
- ✅ Sucessos
- ❌ Erros detalhados

### Supabase Dashboard
- Table Editor: Ver leads criados
- Logs: Monitorar atividade
- Auth: Gerenciar usuários (futuramente)

## 🎉 Resultado Final

Quando tudo estiver funcionando:
1. ✅ Todos os formulários salvarão no banco
2. ✅ Emails chegando sem falhas
3. ✅ Dashboard administrativo funcional
4. ✅ Analytics completos de conversão
5. ✅ Sistema profissional de CRM

---

**Próximo passo**: Teste a página http://localhost:3003/teste-supabase e me confirme se está funcionando!
