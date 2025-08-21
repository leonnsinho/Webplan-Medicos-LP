-- 🛠️ CORREÇÃO RLS SUPABASE - Execute no SQL Editor
-- Acesse: https://supabase.com/dashboard > SQL Editor
-- Cole e execute este código:

-- 1. Verificar estado atual da tabela leads
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled,
    hasinserts,
    hasselects
FROM pg_tables 
LEFT JOIN pg_class ON pg_class.relname = pg_tables.tablename
LEFT JOIN pg_authid ON pg_authid.oid = pg_class.relowner
WHERE tablename = 'leads';

-- 2. Verificar políticas existentes
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'leads';

-- 3. Remover todas as políticas existentes (limpar)
DROP POLICY IF EXISTS "Enable insert for anon users" ON leads;
DROP POLICY IF EXISTS "Enable select for anon users" ON leads;
DROP POLICY IF EXISTS "Enable all for anon users" ON leads;
DROP POLICY IF EXISTS "Allow anonymous inserts" ON leads;
DROP POLICY IF EXISTS "Allow anonymous selects" ON leads;
DROP POLICY IF EXISTS "Allow anon access" ON leads;

-- 4. OPÇÃO A: Desabilitar RLS completamente (mais simples)
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;

-- OU se preferir manter RLS ativo:

-- 4. OPÇÃO B: Habilitar RLS com política permissiva
-- ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Criar política que permite tudo para usuários anônimos
-- CREATE POLICY "webplan_anon_access" ON leads
--     FOR ALL 
--     TO anon 
--     USING (true) 
--     WITH CHECK (true);

-- 5. Verificar se funcionou
SELECT 
    'RLS Status' as check_type,
    CASE 
        WHEN rowsecurity THEN 'ENABLED' 
        ELSE 'DISABLED' 
    END as status
FROM pg_tables 
LEFT JOIN pg_class ON pg_class.relname = pg_tables.tablename
WHERE tablename = 'leads';

-- 6. Testar insert (opcional)
-- INSERT INTO leads (name, email, phone, operadora, subject, message) 
-- VALUES ('Teste RLS', 'teste.rls@email.com', '11999999999', 'main', 'Teste', 'Teste de RLS');

-- 7. Verificar se o insert funcionou
-- SELECT COUNT(*) as total_leads FROM leads;

-- 📊 RESULTADO ESPERADO:
-- Se RLS = DISABLED: ✅ Formulários devem funcionar
-- Se RLS = ENABLED com política: ✅ Formulários devem funcionar
-- Se ainda não funcionar: Problema é CORS, não RLS
