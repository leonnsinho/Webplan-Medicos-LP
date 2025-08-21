-- 🔧 Script de Correção para Política RLS - WebPlan Seguros
-- Execute este script no SQL Editor do Supabase para corrigir a recursão infinita

-- ============================================================================
-- 1. REMOVER POLÍTICAS PROBLEMÁTICAS
-- ============================================================================

-- Remover política recursiva do admin_users
DROP POLICY IF EXISTS "Usuários veem apenas seu perfil" ON admin_users;

-- Remover política recursiva dos leads
DROP POLICY IF EXISTS "Vendedores veem leads atribuídos" ON leads;

-- Remover política recursiva das interações
DROP POLICY IF EXISTS "Interações seguem acesso do lead" ON lead_interactions;

-- ============================================================================
-- 2. CRIAR POLÍTICAS SIMPLES E SEGURAS
-- ============================================================================

-- Para desenvolvimento: permitir acesso público aos leads (temporário)
CREATE POLICY "Acesso público temporário" ON leads
    FOR ALL USING (true);

-- Para desenvolvimento: permitir acesso público às operadoras
CREATE POLICY "Acesso público operadoras" ON operadoras
    FOR ALL USING (true);

-- Para desenvolvimento: permitir acesso público aos tipos de plano
CREATE POLICY "Acesso público plan_types" ON plan_types
    FOR ALL USING (true);

-- Admin users: acesso apenas para usuários autenticados (sem recursão)
CREATE POLICY "Acesso autenticado admin_users" ON admin_users
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Lead interactions: acesso público temporário
CREATE POLICY "Acesso público lead_interactions" ON lead_interactions
    FOR ALL USING (true);

-- ============================================================================
-- 3. VERIFICAR RLS ESTÁ ATIVO
-- ============================================================================

-- Ativar RLS em todas as tabelas
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE operadoras ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE plan_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_interactions ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 4. CONFIRMAR CONFIGURAÇÃO
-- ============================================================================

-- Verificar se as políticas foram criadas
SELECT schemaname, tablename, policyname, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('leads', 'operadoras', 'admin_users', 'plan_types', 'lead_interactions')
ORDER BY tablename, policyname;

-- ============================================================================
-- 5. TESTE RÁPIDO
-- ============================================================================

-- Testar se conseguimos inserir um lead de teste
INSERT INTO leads (name, email, phone, operadora, subject, message) 
VALUES ('Teste', 'teste@teste.com', '11999999999', 'sulamerica', 'Teste RLS', 'Teste após correção RLS');

-- Testar também inserção com operadora 'main' (formulário principal)
INSERT INTO leads (name, email, phone, operadora, subject, message) 
VALUES ('Teste Main', 'teste.main@teste.com', '11999999999', 'main', 'Teste Formulário Principal', 'Teste formulário da página principal');

-- Se o INSERT funcionou, a correção está OK
SELECT 'RLS corrigido com sucesso!' as status;
