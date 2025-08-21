# 🎯 Integração Supabase - Formulário Principal Atualizado

## ✅ **CONCLUÍDO**

### Formulário Principal (ContactForm.tsx)
- ✅ **Importado useLeadSubmission**
- ✅ **Substituído FormSubmit por Supabase**
- ✅ **Operadora configurada como 'main'**
- ✅ **Estado de loading implementado**
- ✅ **Tratamento de erro melhorado**

## 🧪 **TESTE AGORA**

### 1. Execute no Supabase (se ainda não fez)
```sql
-- No SQL Editor do Supabase, execute:
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_operadora_check;
ALTER TABLE leads ADD CONSTRAINT leads_operadora_check CHECK (operadora IN (
    'main', 'sulamerica', 'alice', 'porto_seguro', 'bradesco', 'unimed', 
    'medsenior', 'amil', 'notredame', 'onehealth', 'prevent_senior',
    'qualicorp', 'sao_camilo', 'blue_med'
));
```

### 2. Teste o Formulário Principal
1. Acesse: http://localhost:3003/
2. Role até "Entre em Contato"
3. Preencha o formulário
4. Clique em "Enviar Solicitação"
5. Deve mostrar: "Mensagem Enviada!" ✅

### 3. Verificar no Supabase
- Vá para Table Editor > leads
- Verifique se há um novo registro com operadora = 'main'

## 📋 **PRÓXIMAS PÁGINAS PARA ATUALIZAR**

### Padrão de Integração
Para cada página de operadora, substituir o handleSubmit por:

```typescript
// 1. Importar no início
import { useLeadSubmission } from '../hooks/useLeadSubmission';

// 2. No componente
const { submitLead, isSubmitting } = useLeadSubmission();

// 3. No handleSubmit
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (validateForm()) {
    const leadData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      operadora: 'SulAmérica', // Nome da operadora específica
      subject: 'Interesse em plano SulAmérica',
      message: formData.message || 'Cliente interessado em cotação'
    };

    const result = await submitLead(leadData);
    
    if (result.success) {
      navigate('/sucesso'); // Ou mostrar popup
    } else {
      alert('Erro ao enviar: ' + result.error);
    }
  }
};

// 4. No botão submit
disabled={isSubmitting}
{isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
```

### Lista de Páginas
1. **✅ ContactForm.tsx** (página principal) → `operadora: 'main'`
2. **🔲 SulamericaPage.tsx** → `operadora: 'SulAmérica'`
3. **🔲 PortoSeguroPage.tsx** → `operadora: 'Porto Seguro'`
4. **🔲 BradescoPage.tsx** → `operadora: 'Bradesco'`
5. **🔲 AmilPage.tsx** → `operadora: 'Amil'`
6. **🔲 AlicePage.tsx** → `operadora: 'Alice'`
7. **🔲 UnimedPage.tsx** → `operadora: 'Unimed'`
8. **🔲 MedSeniorPage.tsx** → `operadora: 'MedSenior'`
9. **🔲 SaoCamiloPage.tsx** → `operadora: 'São Camilo'`

## 🎯 **VANTAGENS DA MIGRAÇÃO**

### ❌ Antes (FormSubmit)
- Emails não chegavam
- Sem controle de entrega
- Dependência externa
- Sem rastreamento

### ✅ Agora (Supabase)
- 100% confiável
- Banco próprio
- Rastreamento completo
- Analytics integrados
- Sistema profissional

## 🚀 **PRÓXIMO PASSO**

**Teste o formulário principal agora:**
1. Execute o UPDATE_CONSTRAINT_MAIN.sql no Supabase
2. Teste o formulário em http://localhost:3003/
3. Confirme se chegou no banco
4. Depois aplicamos nas páginas específicas!

---

**Status**: Formulário principal migrado com sucesso! 🎉
