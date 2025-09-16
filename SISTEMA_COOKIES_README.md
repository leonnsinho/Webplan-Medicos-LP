# 🍪 Sistema de Cookies - WebPlan

Sistema completo de gerenciamento de cookies implementado no site, incluindo conformidade com LGPD e GDPR.

## 📋 O que foi implementado

### 1. **Banner de Cookies Inteligente**
- ✅ Aparece apenas na primeira visita
- ✅ Design responsivo e atrativo
- ✅ Opções: Aceitar Todos, Rejeitar Todos, Personalizar
- ✅ Explicação clara sobre cada tipo de cookie

### 2. **Tipos de Cookies Gerenciados**
- **Necessários** ⚡ (sempre ativos): Funcionamento básico
- **Analytics** 📊 (opcional): Google Analytics
- **Marketing** 🎯 (opcional): Facebook Pixel, remarketing  
- **Preferências** ⚙️ (opcional): Configurações do usuário

### 3. **Funcionalidades Avançadas**
- ✅ Armazenamento das preferências do usuário
- ✅ Botão "Configurar Cookies" no footer
- ✅ Animações suaves
- ✅ Interface intuitiva

## 🔧 Configuração de Ferramentas

### Google Analytics 4 (GA4)
1. Acesse [Google Analytics](https://analytics.google.com/)
2. Crie uma propriedade GA4
3. Copie seu **ID de medição** (formato: G-XXXXXXXXX)
4. No arquivo `src/hooks/useCookieConsent.ts`, substitua:
```typescript
// Linha 53 - Descomente e substitua o ID
initializeGoogleAnalytics('G-SUA-ID-AQUI');
```

### Facebook Pixel
1. Acesse [Facebook Business](https://business.facebook.com/)
2. Vá em **Eventos > Pixels**
3. Copie seu **ID do Pixel** 
4. No arquivo `src/hooks/useCookieConsent.ts`, substitua:
```typescript
// Linha 59 - Descomente e substitua o ID
initializeFacebookPixel('SEU-PIXEL-ID-AQUI');
```

## 📱 Como Funciona

### Para o Usuário:
1. **Primeira visita** → Banner aparece automaticamente
2. **Aceitar todos** → Todas as ferramentas são ativadas
3. **Personalizar** → Escolhe quais tipos aceitar
4. **Rejeitar todos** → Apenas cookies necessários
5. **Reconfigurar** → Clica em "Configurar Cookies" no footer

### Para o Desenvolvedor:
```typescript
// Verificar se analytics está habilitado
const { preferences } = useCookieConsent();
if (preferences.analytics) {
  // Executar código de analytics
}
```

## 🎨 Personalização Visual

### Cores e Estilos
O banner usa as cores do tema azul da WebPlan:
- **Primária**: `bg-blue-600` 
- **Texto**: `text-white`, `text-blue-800`
- **Bordas**: `border-blue-100`

### Modificar Textos
Edite em `src/components/CookieBanner.tsx`:
- Linha 41: Título principal
- Linha 45: Subtítulo  
- Linha 47-50: Descrição principal
- Linha 63-76: Textos dos tipos de cookies

## 📊 Compliance Legal

### LGPD (Brasil) ✅
- ✅ Consentimento explícito antes de coletar dados
- ✅ Opção de rejeitar cookies não-essenciais  
- ✅ Transparência sobre uso dos dados
- ✅ Possibilidade de retirar consentimento

### GDPR (Europa) ✅
- ✅ Banner aparece antes de qualquer coleta
- ✅ Consentimento granular por categoria
- ✅ Direito de reconfigurar a qualquer momento
- ✅ Informações claras sobre finalidade

## 🔍 Monitoramento

### Console do Navegador
O sistema mostra logs quando as ferramentas são ativadas:
```javascript
// Analytics aceito
"Google Analytics inicializado"

// Marketing aceito  
"Ferramentas de marketing inicializadas"
```

### LocalStorage
As preferências ficam salvas em:
- `webplan_cookie_consent`: "true" quando aceito
- `webplan_cookie_preferences`: JSON com as escolhas

## 🚀 Próximos Passos

1. **Adicionar Google Analytics ID real**
2. **Configurar Facebook Pixel ID real** 
3. **Testar com usuários reais**
4. **Adicionar mais ferramentas se necessário**
5. **Criar política de privacidade detalhada**

## ❓ Perguntas Frequentes

**Q: O banner vai aparecer sempre?**
A: Não, apenas na primeira visita. Depois fica salvo no navegador.

**Q: Como resetar para testar?**  
A: Clique em "Configurar Cookies" no footer ou limpe o localStorage.

**Q: Preciso do Google Analytics?**
A: Não é obrigatório, mas é muito útil para entender seus visitantes.

**Q: É obrigatório por lei?**
A: Sim, a LGPD exige consentimento para cookies que não sejam técnicos.

---

**Sistema implementado com sucesso! 🎉**  
*Banner de cookies profissional e conforme com a legislação brasileira.*