# CSP - Content Security Policy - Guia Completo

## O que é CSP?

Content Security Policy (CSP) é um mecanismo de segurança que ajuda a detectar e mitigar certos tipos de ataques, incluindo Cross Site Scripting (XSS) e data injection attacks.

## Por que está bloqueando nossos formulários?

O seu site (https://segurosaudeseesp.com/) tem um CSP configurado que só permite conexões para:
- `'self'` (próprio domínio)
- `https://formsubmit.co`
- `https://wa.me`

Quando tentamos conectar ao Supabase (`https://xtixrumedzekulqmxtzz.supabase.co`), o navegador bloqueia.

## Soluções Disponíveis

### Solução 1: Atualizar CSP (Recomendado)

**Localizar o CSP:**
O CSP pode estar em:
1. **Meta tag HTML** (no `<head>` do site):
   ```html
   <meta http-equiv="Content-Security-Policy" content="connect-src 'self' https://formsubmit.co https://wa.me">
   ```

2. **Header do servidor** (no arquivo de configuração do servidor ou .htaccess):
   ```
   Content-Security-Policy: connect-src 'self' https://formsubmit.co https://wa.me
   ```

3. **Cloudflare** (se estiver usando):
   - Dashboard do Cloudflare > Security > Page Rules ou Transform Rules

**Atualização necessária:**
```
connect-src 'self' https://formsubmit.co https://wa.me https://xtixrumedzekulqmxtzz.supabase.co
```

### Solução 2: Usar versão CSP-Compatível

Use o arquivo `formulario-webplan-csp.js` que criamos. Esta versão:
- ✅ Só usa FormSubmit (permitido pelo CSP atual)
- ✅ Não tenta conectar ao Supabase
- ✅ Funciona imediatamente
- ❌ Leads não aparecem automaticamente no painel admin

**Implementação:**
```html
<script src="https://segurosaudeseesp.com/js/formulario-webplan-csp.js"></script>
<script>
// Configurar formulário
WebplanFormsCSP.configurarFormulario('#meuFormulario', {
  operadora: 'Amil',
  subject: 'Lead da página Amil',
  loadingText: 'Enviando...',
  onSuccess: function(result, form) {
    alert('✅ ' + result.message);
    form.reset();
  },
  onError: function(error, form) {
    alert('❌ ' + error.message);
  }
});
</script>
```

## Como identificar onde está o CSP?

### Método 1: Inspecionar código-fonte
1. Acesse https://segurosaudeseesp.com/
2. Clique com botão direito > "Ver código-fonte"
3. Procure por "Content-Security-Policy"

### Método 2: DevTools
1. F12 > aba "Network"
2. Recarregue a página
3. Clique na primeira requisição
4. Procure por "content-security-policy" nos headers

### Método 3: Ferramentas online
- https://csp-evaluator.withgoogle.com/
- Insira a URL do seu site

## Exemplo de CSP atualizado

**Antes:**
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://formsubmit.co https://wa.me; font-src 'self'
```

**Depois:**
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://formsubmit.co https://wa.me https://xtixrumedzekulqmxtzz.supabase.co https://enkijdqewoikjczpfgch.supabase.co; font-src 'self'
```

## Teste após atualização

Após atualizar o CSP, teste com:
```javascript
WebplanForms.testarConexao().then(result => {
  console.log('Teste de conexão:', result);
});
```

## Vantagens de cada solução

### Atualizar CSP:
- ✅ Leads aparecem automaticamente no painel
- ✅ Análises em tempo real
- ✅ Filtros e estatísticas
- ✅ Backup automático
- ❌ Requer acesso ao servidor/Cloudflare

### Versão CSP:
- ✅ Funciona imediatamente
- ✅ Não requer alterações no servidor
- ✅ Usa sistema já permitido (FormSubmit)
- ❌ Leads não aparecem automaticamente no painel
- ❌ Necessário processamento manual

## Recomendação

**Para produção imediata:** Use `formulario-webplan-csp.js`
**Para longo prazo:** Atualize o CSP para incluir o Supabase

## Suporte

WhatsApp: (11) 95930-5175
E-mail: contato@segurosaudeseesp.com
