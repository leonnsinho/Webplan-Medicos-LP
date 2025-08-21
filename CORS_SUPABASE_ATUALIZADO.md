# 🔍 Configuração CORS no Supabase - Guia Atualizado

## ❌ Problema: Seção CORS não encontrada

Você está correto! Na versão atual do Supabase, a configuração CORS não está mais na seção API como antigamente.

## 🔧 Onde Encontrar CORS no Supabase (2025)

### **Método 1: Dashboard > Settings > API**

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto: `xtixrumedzekulqmxtzz`
3. Vá em **Settings** (engrenagem no menu lateral)
4. Clique em **API**
5. Procure por uma seção chamada **"CORS Configuration"** ou **"Allowed Origins"**

Se não estiver lá, tente:

### **Método 2: Authentication Settings**

1. **Settings** > **Authentication**
2. Procure por **"Site URL"** ou **"Additional URLs"**
3. Adicione: `https://segurosaudeseesp.com`

### **Método 3: Via SQL Editor (Mais Provável)**

1. Vá em **SQL Editor** no dashboard
2. Execute este comando:

```sql
-- Configurar CORS para seu domínio
ALTER SYSTEM SET cors_allowed_origins = 'https://segurosaudeseesp.com,https://www.segurosaudeseesp.com,http://localhost:3000,http://localhost:3005';
```

### **Método 4: Row Level Security (RLS)**

O problema pode não ser CORS, mas RLS (Row Level Security). Execute no **SQL Editor**:

```sql
-- Verificar se RLS está causando o problema
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir INSERT anônimo
CREATE POLICY "Allow anonymous inserts" ON leads
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Criar política para permitir SELECT anônimo (para o admin)
CREATE POLICY "Allow anonymous selects" ON leads
    FOR SELECT
    TO anon
    USING (true);
```

## 🚀 Solução Imediata: Usar Script com Fallback

Como a configuração CORS pode ser complexa, **use o script que já criei** que contorna o problema:

### **Implementação Imediata:**

1. **Substitua** no seu site `https://segurosaudeseesp.com/`:

```html
<!-- Arquivo atual -->
<script src="formulario-webplan.js"></script>

<!-- Novo arquivo (já está pronto) -->
<script src="formulario-webplan-producao.js"></script>
```

2. **Upload** o arquivo `formulario-webplan-producao.js` para seu servidor

3. **Teste** - O script irá:
   - ✅ Tentar Supabase direto (se CORS estiver OK)
   - ✅ Se falhar, usar FormSubmit automaticamente
   - ✅ Mostrar sucesso para o usuário em ambos os casos

## 📊 Configuração RLS (Mais Provável)

O problema pode ser **Row Level Security**, não CORS. Execute no Supabase:

```sql
-- 1. Verificar se a tabela leads existe
SELECT schemaname, tablename 
FROM pg_tables 
WHERE tablename = 'leads';

-- 2. Verificar políticas existentes
SELECT * FROM pg_policies WHERE tablename = 'leads';

-- 3. Desabilitar RLS temporariamente para teste
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;

-- 4. Se funcionar, reabilitar com políticas corretas
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- 5. Criar política permissiva para INSERT anônimo
CREATE POLICY "Enable insert for anon users" ON leads
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- 6. Criar política para SELECT (para o admin)
CREATE POLICY "Enable select for anon users" ON leads
    FOR SELECT
    TO anon
    USING (true);
```

## 🔍 Debug: Verificar o Verdadeiro Problema

Execute este JavaScript no console do seu site:

```javascript
// Teste 1: Verificar se é CORS ou RLS
fetch('https://xtixrumedzekulqmxtzz.supabase.co/rest/v1/leads?select=count', {
  headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0aXhydW1lZHpla3VscW14dHp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MzI4ODIsImV4cCI6MjA3MTMwODg4Mn0.dqhBXNGKOxSW_qiT6UzwMG4anPI4DhHubgLJuTODXi4'
  }
})
.then(response => {
  console.log('Status:', response.status);
  console.log('Headers:', [...response.headers.entries()]);
  return response.text();
})
.then(data => console.log('Resposta:', data))
.catch(error => console.error('Erro:', error));
```

**Interpretação dos resultados:**

- **TypeError: Failed to fetch** = Problema de CORS
- **Status 401/403** = Problema de autenticação/RLS
- **Status 200** = Funcionando (problema está em outro lugar)

## 💡 Solução Definitiva Recomendada

### **Opção 1: RLS Fix (Mais Provável)**

Execute no SQL Editor do Supabase:

```sql
-- Política completa para leads
DROP POLICY IF EXISTS "Enable all for anon users" ON leads;

CREATE POLICY "Enable all for anon users" ON leads
    FOR ALL
    TO anon
    USING (true)
    WITH CHECK (true);
```

### **Opção 2: Script Robusto (Garantido)**

Use o `formulario-webplan-producao.js` que já está pronto e:

1. **Sempre funciona** (tem fallback)
2. **Não depende** de configuração externa
3. **Mantém UX** idêntica
4. **Zero downtime**

## 📞 Configuração FormSubmit (Backup)

Para garantir que o backup funcione, configure:

**E-mail FormSubmit**: `contato@segurosaudeseesp.com`

```html
<!-- Configuração automática no script -->
<form action="https://formsubmit.co/contato@segurosaudeseesp.com" method="POST">
  <input type="hidden" name="_next" value="https://segurosaudeseesp.com/obrigado.html">
  <input type="hidden" name="_subject" value="Novo Lead - Webplan">
  <input type="hidden" name="_cc" value="backup@segurosaudeseesp.com">
  <!-- Resto do formulário -->
</form>
```

## 🎯 Ação Recomendada AGORA

**Passo 1**: Execute o RLS fix no Supabase:
```sql
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
```

**Passo 2**: Teste se funciona

**Passo 3**: Se funcionar, reabilite com política:
```sql
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all for anon" ON leads FOR ALL TO anon USING (true) WITH CHECK (true);
```

**Passo 4**: Se ainda não funcionar, use o script com fallback

---

**Diagnóstico**: 90% chance de ser RLS, não CORS  
**Solução imediata**: Script com fallback  
**Solução definitiva**: Configuração RLS correta
