# 🚨 CORREÇÃO URGENTE - Erro RLS Supabase

## ❌ Problema Identificado
**Erro**: `infinite recursion detected in policy for relation "admin_users"`

**Causa**: As políticas RLS (Row Level Security) estão causando recursão infinita porque tentam consultar a própria tabela `admin_users` para verificar permissões.

## 🔧 SOLUÇÃO RÁPIDA

### 1. Acesse o Supabase Dashboard
- Vá para: https://app.supabase.com
- Entre no seu projeto WebPlan Seguros
- Clique em **SQL Editor** no menu lateral

### 2. Execute o Script de Correção
Copie e cole TODO o conteúdo do arquivo `CORRECAO_RLS_SUPABASE.sql` no SQL Editor e execute.

**OU execute estes comandos um por vez:**

```sql
-- 1. Remover políticas problemáticas
DROP POLICY IF EXISTS "Usuários veem apenas seu perfil" ON admin_users;
DROP POLICY IF EXISTS "Vendedores veem leads atribuídos" ON leads;
DROP POLICY IF EXISTS "Interações seguem acesso do lead" ON lead_interactions;

-- 2. Criar políticas simples (temporárias para desenvolvimento)
CREATE POLICY "Acesso público temporário" ON leads FOR ALL USING (true);
CREATE POLICY "Acesso público operadoras" ON operadoras FOR ALL USING (true);
CREATE POLICY "Acesso público plan_types" ON plan_types FOR ALL USING (true);
CREATE POLICY "Acesso autenticado admin_users" ON admin_users FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Acesso público lead_interactions" ON lead_interactions FOR ALL USING (true);

-- 3. Garantir que RLS está ativo
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE operadoras ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE plan_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_interactions ENABLE ROW LEVEL SECURITY;
```

### 3. Teste Novamente
Após executar o script:
1. Volte para: http://localhost:3003/teste-supabase
2. Clique em **"Testar Conexão"**
3. Deve mostrar: ✅ Conexão com Supabase funcionando!

## 🎯 O Que Mudou

### ❌ Antes (Problemático)
```sql
-- Política recursiva que causava erro
CREATE POLICY "Usuários veem apenas seu perfil" ON admin_users
    FOR ALL USING (
        auth_user_id = auth.uid()
        OR 
        EXISTS (
            SELECT 1 FROM admin_users  -- 🚨 RECURSÃO AQUI!
            WHERE auth_user_id = auth.uid() 
            AND role IN ('admin', 'gerente')
        )
    );
```

### ✅ Agora (Corrigido)
```sql
-- Política simples sem recursão
CREATE POLICY "Acesso público temporário" ON leads 
    FOR ALL USING (true);

CREATE POLICY "Acesso autenticado admin_users" ON admin_users
    FOR ALL USING (auth.uid() IS NOT NULL);
```

## 🔒 Segurança

**Nota de Segurança**: As políticas atuais são **temporárias para desenvolvimento**. Elas permitem acesso mais amplo para que possamos testar a funcionalidade básica.

**Em produção**, criaremos políticas mais restritivas que:
- Usuários só veem seus próprios leads
- Admins veem todos os leads
- Vendedores veem apenas leads atribuídos

## 🚀 Próximo Passo

Depois de executar a correção:
1. ✅ Teste a conexão (deve funcionar)
2. ✅ Teste o envio de lead (deve funcionar)
3. ✅ Aplique nos formulários existentes

**Execute a correção agora e me confirme se funcionou!**
