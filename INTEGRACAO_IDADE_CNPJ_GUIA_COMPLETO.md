# INTEGRAÇÃO DOS CAMPOS IDADE E CNPJ - GUIA COMPLETO

## 1. SQL PARA ADICIONAR COLUNA CNPJ NO SUPABASE

Execute este comando no painel SQL do Supabase:

```sql
-- Adicionar coluna tem_cnpj na tabela leads
ALTER TABLE leads 
ADD COLUMN tem_cnpj BOOLEAN DEFAULT false;

-- Adicionar comentário para documentação
COMMENT ON COLUMN leads.tem_cnpj IS 'Indica se o cliente possui CNPJ (pessoa jurídica)';

-- Verificar se as colunas foram criadas corretamente
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'leads' 
  AND column_name IN ('idade', 'tem_cnpj');
```

## 2. TIPOS TYPESCRIPT JÁ ATUALIZADOS

Os arquivos `src/types/index.ts` e `src/lib/supabase.ts` já foram atualizados com:

```typescript
// FormData (src/types/index.ts)
export interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  idade: string;
  tem_cnpj: boolean;
}

// Lead (src/lib/supabase.ts)
export interface Lead {
  // ... outros campos existentes
  idade?: string;
  tem_cnpj?: boolean;
  // ... resto dos campos
}
```

## 3. FORMULÁRIO PRINCIPAL (ContactForm.tsx) - JÁ ATUALIZADO

O formulário principal já foi atualizado com os novos campos.

## 4. ATUALIZAÇÕES NECESSÁRIAS NAS PÁGINAS DAS OPERADORAS

Para cada página de operadora (AmilPage.tsx, BradescoPage.tsx, etc.), faça as seguintes alterações:

### 4.1 Atualizar o estado inicial do formData:

**ANTES:**
```typescript
const [formData, setFormData] = useState<ContactFormData>({
  name: '',
  email: '',
  phone: '',
  subject: 'operadora_default',
  message: ''
});
```

**DEPOIS:**
```typescript
const [formData, setFormData] = useState<ContactFormData>({
  name: '',
  email: '',
  phone: '',
  subject: 'operadora_default',
  message: '',
  idade: '',
  tem_cnpj: false
});
```

### 4.2 Atualizar a função handleInputChange:

**ANTES:**
```typescript
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  
  // Clear error when user starts typing
  if (errors[name as keyof ContactFormData]) {
    setErrors(prev => ({ ...prev, [name]: '' }));
  }
};
```

**DEPOIS:**
```typescript
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  const { name, value, type } = e.target;
  const checked = (e.target as HTMLInputElement).checked;
  
  setFormData(prev => ({ 
    ...prev, 
    [name]: type === 'checkbox' ? checked : value 
  }));
  
  // Clear error when user starts typing
  if (errors[name as keyof ContactFormData]) {
    setErrors(prev => ({ ...prev, [name]: '' }));
  }
};
```

### 4.3 Atualizar o leadData no handleSubmit:

**ANTES:**
```typescript
const leadData = {
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  operadora: 'NomeOperadora',
  subject: `Operadora - ${formData.subject}`,
  message: formData.message || 'Mensagem padrão'
};
```

**DEPOIS:**
```typescript
const leadData = {
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  operadora: 'NomeOperadora',
  subject: `Operadora - ${formData.subject}`,
  message: formData.message || 'Mensagem padrão',
  idade: formData.idade,
  tem_cnpj: formData.tem_cnpj
};
```

### 4.4 Atualizar a limpeza do formulário:

**ANTES:**
```typescript
setFormData({
  name: '',
  email: '',
  phone: '',
  subject: 'operadora_default',
  message: ''
});
```

**DEPOIS:**
```typescript
setFormData({
  name: '',
  email: '',
  phone: '',
  subject: 'operadora_default',
  message: '',
  idade: '',
  tem_cnpj: false
});
```

### 4.5 Atualizar o array de campos no formulário:

**ANTES:**
```typescript
{[
  { name: 'name', label: 'Nome Completo *', type: 'text', placeholder: 'Digite seu nome completo' },
  { name: 'email', label: 'E-mail *', type: 'email', placeholder: 'seu.email@exemplo.com' },
  { name: 'phone', label: 'Telefone/WhatsApp *', type: 'tel', placeholder: '(11) 99999-9999' }
].map((field, index) => (
  // ... componente do campo
  <input
    value={formData[field.name as keyof ContactFormData]}
    // ... outras props
  />
))}
```

**DEPOIS:**
```typescript
{[
  { name: 'name', label: 'Nome Completo *', type: 'text', placeholder: 'Digite seu nome completo' },
  { name: 'email', label: 'E-mail *', type: 'email', placeholder: 'seu.email@exemplo.com' },
  { name: 'phone', label: 'Telefone/WhatsApp *', type: 'tel', placeholder: '(11) 99999-9999' },
  { name: 'idade', label: 'Idade', type: 'text', placeholder: 'Digite sua idade' }
].map((field, index) => (
  // ... componente do campo
  <input
    value={formData[field.name as keyof Pick<ContactFormData, 'name' | 'email' | 'phone' | 'idade'>] as string}
    // ... outras props
  />
))}

{/* Adicionar DEPOIS do loop de campos, ANTES do campo subject */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: 0.8 }}
>
  <div className="flex items-center space-x-3">
    <input
      type="checkbox"
      id="tem_cnpj"
      name="tem_cnpj"
      checked={formData.tem_cnpj}
      onChange={handleInputChange}
      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
    />
    <label htmlFor="tem_cnpj" className="text-sm font-medium text-blue-700">
      Tenho CNPJ (Pessoa Jurídica)
    </label>
  </div>
</motion.div>
```

### 4.6 Ajustar delays das animações:

Atualize os delays dos campos seguintes para acomodar os novos campos:
- Campo subject: delay de 0.7 → 0.9
- Campo message: delay de 0.8 → 1.0  
- Botão submit: delay de 0.9 → 1.1

## 5. PÁGINAS QUE PRECISAM SER ATUALIZADAS

Execute as alterações acima nos seguintes arquivos:

1. ✅ src/components/ContactForm.tsx (JÁ ATUALIZADO)
2. ❌ src/pages/AmilPage.tsx (PARCIALMENTE ATUALIZADO)
3. ❌ src/pages/BradescoPage.tsx
4. ❌ src/pages/AlicePage.tsx  
5. ❌ src/pages/MedSeniorPage.tsx
6. ❌ src/pages/PortoSeguroPage.tsx
7. ❌ src/pages/SaoCamiloPage.tsx
8. ❌ src/pages/SulamericaPage.tsx
9. ❌ src/pages/UnimedPage.tsx

## 6. VERIFICAÇÃO FINAL

Após implementar todas as mudanças:

1. Execute o SQL no Supabase
2. Teste o formulário principal
3. Teste cada formulário de operadora
4. Verifique se os dados estão sendo salvos corretamente na tabela leads
5. Confirme que os campos idade e tem_cnpj aparecem no painel administrativo

## 7. EXEMPLO DE DADOS SALVOS

Após a implementação, os leads salvos terão esta estrutura:

```json
{
  "id": "uuid",
  "name": "João Silva",
  "email": "joao@email.com", 
  "phone": "(11) 99999-9999",
  "idade": "35",
  "tem_cnpj": true,
  "operadora": "Amil",
  "subject": "Amil - amil_adesao_enfermeiros",
  "message": "Interessado em plano empresarial",
  "created_at": "2025-01-25T10:30:00Z"
}
```

## 8. COMANDO PARA TESTAR NO SUPABASE

```sql
-- Verificar os últimos leads com os novos campos
SELECT 
  name, 
  email, 
  phone,
  idade,
  tem_cnpj,
  operadora,
  subject,
  created_at 
FROM leads 
ORDER BY created_at DESC 
LIMIT 10;
```
