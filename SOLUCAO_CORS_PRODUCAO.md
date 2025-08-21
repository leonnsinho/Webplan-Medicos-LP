# 🚨 Solução para Erro CORS - Domínio Produção

## ❌ Problema Identificado

**Erro**: `TypeError: Failed to fetch`  
**Causa**: CORS (Cross-Origin Resource Sharing) - O Supabase não está configurado para aceitar requisições do domínio `https://segurosaudeseesp.com/`

## 🛠️ Soluções Disponíveis

### **Solução 1: Configurar CORS no Supabase (Recomendada)**

1. **Acesse o painel do Supabase**: https://supabase.com/dashboard
2. **Vá em Settings > API**
3. **Adicione o domínio** na seção "CORS origins":
   ```
   https://segurosaudeseesp.com
   https://www.segurosaudeseesp.com
   ```

### **Solução 2: Usar Script com Fallback (Implementação Imediata)**

Substitua o arquivo `formulario-webplan.js` por `formulario-webplan-producao.js` que inclui:

- ✅ **Tentativa primária**: Supabase direto
- ✅ **Fallback automático**: FormSubmit como backup
- ✅ **Mensagens claras**: Orientação para WhatsApp se falhar
- ✅ **Rate limiting**: Previne spam

### **Solução 3: Criar Proxy Server (Avançada)**

#### **Opção 3.1: Netlify Function**

Crie o arquivo `netlify/functions/lead-proxy.js`:

```javascript
exports.handler = async (event, context) => {
  // Permitir apenas POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }
  
  try {
    const leadData = JSON.parse(event.body);
    
    // Validar dados obrigatórios
    if (!leadData.name || !leadData.email || !leadData.phone) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Campos obrigatórios faltando' })
      };
    }
    
    // Enviar para Supabase
    const response = await fetch('https://xtixrumedzekulqmxtzz.supabase.co/rest/v1/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0aXhydW1lZHpla3VscW14dHp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MzI4ODIsImV4cCI6MjA3MTMwODg4Mn0.dqhBXNGKOxSW_qiT6UzwMG4anPI4DhHubgLJuTODXi4',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0aXhydW1lZHpla3VscW14dHp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MzI4ODIsImV4cCI6MjA3MTMwODg4Mn0.dqhBXNGKOxSW_qiT6UzwMG4anPI4DhHubgLJuTODXi4'
      },
      body: JSON.stringify(leadData)
    });
    
    const result = await response.json();
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://segurosaudeseesp.com',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ success: true, data: result })
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

#### **Opção 3.2: Cloudflare Worker**

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://segurosaudeseesp.com',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }
  
  try {
    const leadData = await request.json();
    
    const response = await fetch('https://xtixrumedzekulqmxtzz.supabase.co/rest/v1/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0aXhydW1lZHpla3VscW14dHp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MzI4ODIsImV4cCI6MjA3MTMwODg4Mn0.dqhBXNGKOxSW_qiT6UzwMG4anPI4DhHubgLJuTODXi4',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0aXhydW1lZHpla3VscW14dHp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MzI4ODIsImV4cCI6MjA3MTMwODg4Mn0.dqhBXNGKOxSW_qiT6UzwMG4anPI4DhHubgLJuTODXi4'
      },
      body: JSON.stringify(leadData)
    });
    
    const result = await response.json();
    
    return new Response(JSON.stringify({ success: true, data: result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}
```

## 🚀 Implementação Imediata (Recomendada)

### **Passo 1: Substituir Script**

No seu site `https://segurosaudeseesp.com/`, substitua:

```html
<!-- Remover -->
<script src="formulario-webplan.js"></script>

<!-- Adicionar -->
<script src="formulario-webplan-producao.js"></script>
```

### **Passo 2: Testar Funcionamento**

O novo script irá:

1. **Tentar Supabase direto** (ideal)
2. **Se falhar por CORS**: Usar FormSubmit como backup
3. **Mostrar mensagens claras** para o usuário

### **Passo 3: Monitorar Logs**

Abra o console (F12) e veja as mensagens:

- ✅ `Sucesso via Supabase!` = Funcionando perfeitamente
- ⚠️ `Sucesso via FormSubmit (backup)!` = Funcionando por backup
- ❌ `Ambos os métodos falharam` = Problema maior

## 📧 Configuração do FormSubmit (Backup)

Se usar o fallback, configure no FormSubmit:

1. **E-mail de destino**: `contato@segurosaudeseesp.com`
2. **Página de redirecionamento**: `https://segurosaudeseesp.com/obrigado.html`
3. **Cópia para**: Adicione outros e-mails se necessário

## 📊 Vantagens de Cada Solução

| Solução | Prós | Contras |
|---------|------|---------|
| **CORS no Supabase** | ✅ Direto ao admin<br>✅ Dados em tempo real | ⚠️ Precisa acesso ao Supabase |
| **Script com Fallback** | ✅ Implementação imediata<br>✅ Sempre funciona | ⚠️ Backup via e-mail |
| **Proxy Server** | ✅ Controle total<br>✅ Sem dependências | ⚠️ Mais complexo |

## 🔧 Testando a Solução

### **Teste 1: Console do Navegador**

```javascript
// Cole no console do site
WebplanForms.testarConexao().then(result => {
  console.log('Resultado:', result);
  if (result.success) {
    alert('✅ Conexão OK!');
  } else {
    alert('⚠️ Usando fallback: ' + result.message);
  }
});
```

### **Teste 2: Envio Manual**

```javascript
// Teste de envio manual
WebplanForms.enviarLead({
  name: 'Teste CORS',
  email: 'teste@email.com',
  phone: '11999999999',
  operadora: 'Amil',
  subject: 'Teste de produção'
}).then(result => {
  console.log('Resultado:', result);
  alert(result.message);
});
```

## 📞 Ações Imediatas

1. **Substitua** o script pelo `formulario-webplan-producao.js`
2. **Teste** um envio no site
3. **Verifique** se aparece no admin ou se usa backup
4. **Configure** CORS no Supabase quando possível

## 🆘 Se Ainda Não Funcionar

1. **Verifique** console do navegador (F12)
2. **Confirme** que script está carregando
3. **Teste** em navegador privado/incógnito
4. **Entre em contato** com logs do console

---

**Status**: 🟡 Solução com fallback implementada  
**Próximo passo**: Configurar CORS no Supabase para funcionamento direto  
**Backup**: FormSubmit garantindo que nenhum lead seja perdido
