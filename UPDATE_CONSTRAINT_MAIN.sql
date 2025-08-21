-- 🔧 Atualização de Constraint - Adicionar 'main' para formulário principal
-- Execute este comando no SQL Editor do Supabase

-- Remover constraint antigo
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_operadora_check;

-- Adicionar constraint atualizado incluindo 'main'
ALTER TABLE leads ADD CONSTRAINT leads_operadora_check CHECK (operadora IN (
    'main', 'sulamerica', 'alice', 'porto_seguro', 'bradesco', 'unimed', 
    'medsenior', 'amil', 'notredame', 'onehealth', 'prevent_senior',
    'qualicorp', 'sao_camilo', 'blue_med'
));

-- Testar inserção com 'main'
INSERT INTO leads (name, email, phone, operadora, subject, message) 
VALUES ('Teste Main', 'teste.main@teste.com', '11999999999', 'main', 'Teste Formulário Principal', 'Teste do formulário da página principal');

-- Verificar se funcionou
SELECT 'Constraint atualizado com sucesso! Operadora main aceita.' as status;
