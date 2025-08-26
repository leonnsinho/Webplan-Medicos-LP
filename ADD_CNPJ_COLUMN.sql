-- SQL para adicionar a coluna tem_cnpj na tabela leads
-- Execute este comando no seu painel do Supabase

ALTER TABLE leads 
ADD COLUMN tem_cnpj BOOLEAN DEFAULT false;

-- Comentário da coluna para documentação
COMMENT ON COLUMN leads.tem_cnpj IS 'Indica se o cliente possui CNPJ (pessoa jurídica)';

-- Verificar se a coluna foi criada corretamente
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'leads' 
  AND column_name IN ('idade', 'tem_cnpj');

-- Exemplo de consulta para verificar os dados
-- SELECT name, email, idade, tem_cnpj, created_at FROM leads ORDER BY created_at DESC LIMIT 10;
