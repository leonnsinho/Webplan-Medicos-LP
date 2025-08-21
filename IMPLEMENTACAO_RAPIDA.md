# 🚀 Integração Rápida - Webplan Forms

## ⚡ Implementação em 2 Minutos

### 1. **Baixar o arquivo**
Copie o arquivo `formulario-webplan.js` para seu site.

### 2. **Incluir no HTML**
```html
<script src="formulario-webplan.js"></script>
```

### 3. **Configurar formulário**
```javascript
WebplanForms.configurarFormulario('#meu-formulario', {
  operadora: 'Amil', // Nome da operadora
  subject: 'Lead do meu site'
});
```

## 📋 HTML do Formulário

Seu formulário deve ter estes campos (names exatos):

```html
<form id="meu-formulario">
  <input type="text" name="name" placeholder="Nome" required>
  <input type="email" name="email" placeholder="E-mail" required>
  <input type="tel" name="phone" placeholder="Telefone" required>
  <select name="operadora">
    <option value="Amil">Amil</option>
    <option value="Bradesco">Bradesco</option>
    <!-- ... outras operadoras ... -->
  </select>
  <textarea name="message" placeholder="Mensagem"></textarea>
  <button type="submit">Enviar</button>
</form>
```

## 🗂️ Operadoras Disponíveis

| Nome para usar | Aparece no admin como |
|---------------|----------------------|
| Amil | amil |
| Bradesco | bradesco |
| SulAmérica | sulamerica |
| Porto Seguro | porto_seguro |
| Alice | alice |
| Unimed | unimed |
| MedSenior | medsenior |
| São Camilo | sao_camilo |
| NotreDame | notredame |
| OneHealth | onehealth |
| Prevent Senior | prevent_senior |
| Qualicorp | qualicorp |
| Blue Med | blue_med |
| main | main (para outros) |

## 📊 Ver Resultados

Leads aparecerão em: **http://localhost:3005** (Admin Panel)

## 🧪 Testar

1. Abra `exemplo-integracao.html` no navegador
2. Preencha e envie o formulário
3. Verifique no admin panel

## 🆘 Problemas?

1. **Erro 401**: Verificar se as credenciais estão corretas
2. **Formulário não envia**: Verificar console (F12) para erros
3. **Não aparece no admin**: Verificar se operadora está correta

## 📞 Campos Obrigatórios

- ✅ **name** (nome)
- ✅ **email** (e-mail)  
- ✅ **phone** (telefone)
- ✅ **operadora** (operadora)

## 🔧 Personalização Avançada

```javascript
WebplanForms.configurarFormulario('#meu-form', {
  operadora: 'Amil',
  subject: 'Lead específico',
  
  onSuccess: function(result) {
    alert('Sucesso!');
    // Redirecionar, mostrar popup, etc.
  },
  
  onError: function(result) {
    alert('Erro: ' + result.message);
  }
});
```

---

**✅ Pronto!** Agora todos os formulários enviarão para o mesmo sistema Webplan.

**🎯 Admin Panel**: http://localhost:3005
