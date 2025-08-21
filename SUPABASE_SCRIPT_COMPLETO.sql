-- 🚀 WebPlan Seguros - Script de Criação do Banco Supabase
-- Execute na ordem apresentada para evitar erros de dependências

-- ============================================================================
-- 1. TABELA PRINCIPAL DE LEADS (sem FK primeiro)
-- ============================================================================
CREATE TABLE leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Informações do Cliente
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    message TEXT,
    
    -- Informações da Operadora
    operadora VARCHAR(100) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    
    -- Informações de Sistema
    ip_address INET,
    user_agent TEXT,
    source_page VARCHAR(255),
    utm_source VARCHAR(255),
    utm_medium VARCHAR(255),
    utm_campaign VARCHAR(255),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Status de Acompanhamento
    status VARCHAR(50) DEFAULT 'novo',
    priority INTEGER DEFAULT 3,
    assigned_to UUID, -- FK será adicionada depois
    notes TEXT,
    
    -- Constraints
    CONSTRAINT leads_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT leads_operadora_check CHECK (operadora IN (
        'sulamerica', 'alice', 'porto_seguro', 'bradesco', 'unimed', 
        'medsenior', 'amil', 'notredame', 'onehealth', 'prevent_senior',
        'qualicorp', 'sao_camilo', 'blue_med'
    )),
    CONSTRAINT leads_status_check CHECK (status IN (
        'novo', 'contatado', 'interessado', 'proposta_enviada', 
        'negociacao', 'fechado', 'perdido', 'reagendado'
    )),
    CONSTRAINT leads_priority_check CHECK (priority BETWEEN 1 AND 5)
);

-- Índices para performance
CREATE INDEX idx_leads_operadora ON leads(operadora);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_priority_status ON leads(priority, status);

-- ============================================================================
-- 2. TABELA DE OPERADORAS
-- ============================================================================
CREATE TABLE operadoras (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    logo_url TEXT,
    primary_color VARCHAR(7),
    secondary_color VARCHAR(7),
    
    -- Configurações específicas
    has_cnpj_plan BOOLEAN DEFAULT FALSE,
    has_individual_plan BOOLEAN DEFAULT TRUE,
    has_family_plan BOOLEAN DEFAULT TRUE,
    has_business_plan BOOLEAN DEFAULT FALSE,
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir dados das operadoras
INSERT INTO operadoras (code, name, logo_url, primary_color, secondary_color, has_cnpj_plan, has_business_plan, display_order) VALUES
('sulamerica', 'SulAmérica', '/images/planos_de_saúde_sulamérica_apcd.webp', '#0066CC', '#004499', TRUE, TRUE, 1),
('alice', 'Alice', '/images/Alice.svg', '#8B5CF6', '#7C3AED', TRUE, FALSE, 2),
('porto_seguro', 'Porto Seguro', '/images/porto-seguro.png', '#FF6B35', '#E55A2B', TRUE, TRUE, 3),
('bradesco', 'Bradesco Saúde', '/images/bradesco_saude.webp', '#CC092F', '#A50E2D', TRUE, TRUE, 4),
('unimed', 'Unimed', '/images/seguros-unimed.png', '#00A859', '#008F4D', TRUE, TRUE, 5),
('medsenior', 'MedSênior', '/images/LOGO-MED-SENIOR.png', '#2563EB', '#1D4ED8', TRUE, FALSE, 6),
('amil', 'Amil', '/images/amil_saúde_apcd.webp', '#0EA5E9', '#0284C7', TRUE, TRUE, 7),
('notredame', 'NotreDame Intermédica', '/images/NotreDame Intermedica CAASP.png', '#DC2626', '#B91C1C', TRUE, TRUE, 8),
('onehealth', 'OneHealth', '/images/onehealth apcd.avif', '#059669', '#047857', TRUE, FALSE, 9),
('prevent_senior', 'Prevent Senior', '/images/Prevent_Senior_logo.png', '#7C2D12', '#92400E', FALSE, FALSE, 10),
('qualicorp', 'Qualicorp', '/images/quali-corp.png', '#1E40AF', '#1E3A8A', TRUE, TRUE, 11),
('sao_camilo', 'São Camilo', '/images/Logo-Plano-Sao-Camilo.png', '#BE185D', '#A21CAF', TRUE, FALSE, 12),
('blue_med', 'Blue Med', '/images/blue.webp', '#1E3A8A', '#1E40AF', TRUE, FALSE, 13);

-- ============================================================================
-- 3. TABELA DE USUÁRIOS ADMINISTRATIVOS
-- ============================================================================
CREATE TABLE admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Informações pessoais
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    
    -- Autenticação (Supabase Auth)
    auth_user_id UUID UNIQUE,
    
    -- Permissões
    role VARCHAR(50) DEFAULT 'vendedor',
    permissions JSONB DEFAULT '{}',
    
    -- Configurações
    is_active BOOLEAN DEFAULT TRUE,
    can_view_all_leads BOOLEAN DEFAULT FALSE,
    assigned_operadoras TEXT[],
    
    -- Métricas
    total_leads_assigned INTEGER DEFAULT 0,
    total_leads_closed INTEGER DEFAULT 0,
    conversion_rate DECIMAL(5,2) DEFAULT 0.00,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE,
    
    -- Constraints
    CONSTRAINT admin_users_role_check CHECK (role IN ('admin', 'gerente', 'vendedor', 'readonly')),
    CONSTRAINT admin_users_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- ============================================================================
-- 4. TABELA DE TIPOS DE PLANOS
-- ============================================================================
CREATE TABLE plan_types (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    operadora_id UUID REFERENCES operadoras(id) ON DELETE CASCADE,
    
    code VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    
    -- Configurações
    is_active BOOLEAN DEFAULT TRUE,
    requires_cnpj BOOLEAN DEFAULT FALSE,
    min_age INTEGER,
    max_age INTEGER,
    coverage_area TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT plan_types_category_check CHECK (category IN (
        'cnpj', 'individual', 'familiar', 'empresarial', 'adesao', 'cooperativo'
    )),
    UNIQUE(operadora_id, code)
);

-- ============================================================================
-- 5. ADICIONAR FOREIGN KEYS
-- ============================================================================
-- Adicionar FK para assigned_to na tabela leads
ALTER TABLE leads 
ADD CONSTRAINT fk_leads_assigned_to 
FOREIGN KEY (assigned_to) REFERENCES admin_users(id) ON DELETE SET NULL;

-- ============================================================================
-- 6. TABELA DE HISTÓRICO DE INTERAÇÕES
-- ============================================================================
CREATE TABLE lead_interactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    admin_user_id UUID REFERENCES admin_users(id),
    
    -- Detalhes da interação
    interaction_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    outcome VARCHAR(100),
    
    -- Agendamento
    scheduled_for TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    
    -- Metadados
    metadata JSONB DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT lead_interactions_type_check CHECK (interaction_type IN (
        'call', 'email', 'whatsapp', 'sms', 'meeting', 'note', 'proposal_sent', 'contract_sent'
    )),
    CONSTRAINT lead_interactions_outcome_check CHECK (outcome IN (
        'positive', 'negative', 'neutral', 'callback_scheduled', 'no_answer', 
        'email_sent', 'proposal_sent', 'closed_won', 'closed_lost'
    ))
);

-- Índices para performance
CREATE INDEX idx_lead_interactions_lead_id ON lead_interactions(lead_id);
CREATE INDEX idx_lead_interactions_created_at ON lead_interactions(created_at DESC);
CREATE INDEX idx_lead_interactions_type ON lead_interactions(interaction_type);

-- ============================================================================
-- 7. VIEWS PARA RELATÓRIOS
-- ============================================================================

-- VIEW: Resumo de Leads por Operadora
CREATE VIEW v_leads_summary_by_operadora AS
SELECT 
    o.name as operadora_name,
    o.code as operadora_code,
    COUNT(l.id) as total_leads,
    COUNT(CASE WHEN l.status = 'novo' THEN 1 END) as leads_novos,
    COUNT(CASE WHEN l.status = 'contatado' THEN 1 END) as leads_contatados,
    COUNT(CASE WHEN l.status = 'fechado' THEN 1 END) as leads_fechados,
    COUNT(CASE WHEN l.status = 'perdido' THEN 1 END) as leads_perdidos,
    ROUND(
        (COUNT(CASE WHEN l.status = 'fechado' THEN 1 END)::DECIMAL / 
         NULLIF(COUNT(l.id), 0)) * 100, 2
    ) as conversion_rate,
    DATE(l.created_at) as data
FROM operadoras o
LEFT JOIN leads l ON o.code = l.operadora
GROUP BY o.name, o.code, DATE(l.created_at)
ORDER BY DATE(l.created_at) DESC, total_leads DESC;

-- VIEW: Performance dos Vendedores
CREATE VIEW v_sales_performance AS
SELECT 
    au.name as vendedor_name,
    au.email as vendedor_email,
    COUNT(l.id) as total_leads_assigned,
    COUNT(CASE WHEN l.status = 'fechado' THEN 1 END) as leads_fechados,
    COUNT(CASE WHEN l.status = 'perdido' THEN 1 END) as leads_perdidos,
    ROUND(
        (COUNT(CASE WHEN l.status = 'fechado' THEN 1 END)::DECIMAL / 
         NULLIF(COUNT(l.id), 0)) * 100, 2
    ) as conversion_rate,
    COUNT(CASE WHEN l.created_at >= NOW() - INTERVAL '30 days' THEN 1 END) as leads_last_30_days,
    COUNT(CASE WHEN l.created_at >= NOW() - INTERVAL '7 days' THEN 1 END) as leads_last_7_days
FROM admin_users au
LEFT JOIN leads l ON au.id = l.assigned_to
WHERE au.is_active = TRUE
GROUP BY au.id, au.name, au.email
ORDER BY conversion_rate DESC, total_leads_assigned DESC;

-- VIEW: Leads Pendentes por Prioridade
CREATE VIEW v_pending_leads AS
SELECT 
    l.id,
    l.name,
    l.email,
    l.phone,
    l.operadora,
    o.name as operadora_name,
    l.status,
    l.priority,
    l.created_at,
    au.name as assigned_to_name,
    EXTRACT(DAYS FROM NOW() - l.created_at) as days_since_created,
    (
        SELECT COUNT(*) 
        FROM lead_interactions li 
        WHERE li.lead_id = l.id
    ) as total_interactions
FROM leads l
LEFT JOIN operadoras o ON l.operadora = o.code
LEFT JOIN admin_users au ON l.assigned_to = au.id
WHERE l.status NOT IN ('fechado', 'perdido')
ORDER BY l.priority ASC, l.created_at ASC;

-- ============================================================================
-- 8. CONFIGURAÇÕES DE SEGURANÇA (RLS)
-- ============================================================================

-- Ativar RLS nas tabelas principais
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_interactions ENABLE ROW LEVEL SECURITY;

-- Política para leads: vendedores só veem seus próprios leads, admins veem todos
CREATE POLICY "Vendedores veem apenas seus leads" ON leads
    FOR ALL USING (
        assigned_to = (
            SELECT id FROM admin_users 
            WHERE auth_user_id = auth.uid()
        )
        OR 
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE auth_user_id = auth.uid() 
            AND (role IN ('admin', 'gerente') OR can_view_all_leads = TRUE)
        )
    );

-- Política para admin_users: usuários só veem seu próprio perfil, admins veem todos
CREATE POLICY "Usuários veem apenas seu perfil" ON admin_users
    FOR ALL USING (
        auth_user_id = auth.uid()
        OR 
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE auth_user_id = auth.uid() 
            AND role IN ('admin', 'gerente')
        )
    );

-- Política para lead_interactions: seguem as mesmas regras dos leads
CREATE POLICY "Interações seguem acesso do lead" ON lead_interactions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM leads l 
            WHERE l.id = lead_id 
            AND (
                l.assigned_to = (
                    SELECT id FROM admin_users 
                    WHERE auth_user_id = auth.uid()
                )
                OR 
                EXISTS (
                    SELECT 1 FROM admin_users 
                    WHERE auth_user_id = auth.uid() 
                    AND (role IN ('admin', 'gerente') OR can_view_all_leads = TRUE)
                )
            )
        )
    );

-- ============================================================================
-- 9. TRIGGERS PARA ATUALIZAÇÃO AUTOMÁTICA
-- ============================================================================

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_leads_updated_at 
    BEFORE UPDATE ON leads 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_operadoras_updated_at 
    BEFORE UPDATE ON operadoras 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at 
    BEFORE UPDATE ON admin_users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger para atualizar métricas dos vendedores
CREATE OR REPLACE FUNCTION update_admin_user_metrics()
RETURNS TRIGGER AS $$
BEGIN
    -- Atualizar métricas quando um lead é atribuído ou seu status muda
    IF TG_OP = 'UPDATE' AND OLD.assigned_to != NEW.assigned_to THEN
        -- Atualizar métricas do vendedor anterior
        IF OLD.assigned_to IS NOT NULL THEN
            UPDATE admin_users 
            SET 
                total_leads_assigned = (
                    SELECT COUNT(*) FROM leads 
                    WHERE assigned_to = OLD.assigned_to
                ),
                total_leads_closed = (
                    SELECT COUNT(*) FROM leads 
                    WHERE assigned_to = OLD.assigned_to AND status = 'fechado'
                )
            WHERE id = OLD.assigned_to;
        END IF;
        
        -- Atualizar métricas do novo vendedor
        IF NEW.assigned_to IS NOT NULL THEN
            UPDATE admin_users 
            SET 
                total_leads_assigned = (
                    SELECT COUNT(*) FROM leads 
                    WHERE assigned_to = NEW.assigned_to
                ),
                total_leads_closed = (
                    SELECT COUNT(*) FROM leads 
                    WHERE assigned_to = NEW.assigned_to AND status = 'fechado'
                )
            WHERE id = NEW.assigned_to;
        END IF;
    END IF;
    
    -- Recalcular conversion_rate
    UPDATE admin_users 
    SET conversion_rate = CASE 
        WHEN total_leads_assigned > 0 THEN 
            ROUND((total_leads_closed::DECIMAL / total_leads_assigned) * 100, 2)
        ELSE 0 
    END
    WHERE id IN (OLD.assigned_to, NEW.assigned_to);
    
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_admin_metrics_trigger
    AFTER UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_admin_user_metrics();

-- ============================================================================
-- ✅ SCRIPT COMPLETO - TODAS AS TABELAS CRIADAS COM SUCESSO!
-- ============================================================================
