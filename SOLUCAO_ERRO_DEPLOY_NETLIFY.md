# Solução: Erro de Deploy Netlify - "vite não é reconhecido"

**Data:** 10/11/2025  
**Problema:** Build falhando no Netlify com erro "vite não é reconhecido como um comando interno"

---

## 🔴 Erro Original

```bash
C:\Users\leonr\OneDrive\Escritorio\Projetos\Partimap\partimap-frontend>netlify deploy

❯ build.command from netlify.toml
$ npm run build

> bg2-frontend@0.0.0 build
> vite build

'vite' não é reconhecido como um comando interno
ou externo, um programa operável ou um arquivo em lotes.

"build.command" failed
────────────────────────────────────────────────────────────────

  Error message
  Command failed with exit code 1: npm run build
```

---

## 🔍 Diagnóstico

### Tentativa 1: Reinstalar com npm install

```bash
cd c:\Users\leonr\OneDrive\Escritorio\Projetos\Partimap\partimap-frontend
npm install
```

**Resultado:**
```
npm error code ERR_INVALID_ARG_TYPE
npm error The "from" argument must be of type string. Received undefined
```

❌ **Falhou** - npm corrupted/broken

---

### Tentativa 2: Limpar cache do npm

```bash
npm cache clean --force
```

**Resultado:**
```
npm warn using --force Recommended protections disabled.
```

✅ Cache limpo, mas problema persiste

---

### Tentativa 3: Remover package-lock.json e reinstalar

```bash
del package-lock.json
npm install
```

**Resultado:**
```
added 5 packages, removed 437 packages, changed 13 packages
```

⚠️ **Problema identificado:** Removeu 437 pacotes! Isso indica que `node_modules` estava seriamente corrompido.

---

### Tentativa 4: Testar build após reinstalação parcial

```bash
npm run build
```

**Resultado:**
```
X [ERROR] Cannot start service: Host version "0.25.9" does not match binary version "0.25.12"

failed to load config from vite.config.js
Error: The service was stopped
```

❌ **Novo problema:** Conflito de versão do **esbuild**

**Causa:** 
- `esbuild` tem versão no JavaScript (`0.25.9`)
- E versão do binário nativo (`0.25.12`)
- Incompatibilidade causa falha do Vite

---

## ✅ Solução Final

### Passo 1: Remover COMPLETAMENTE node_modules

```bash
cd c:\Users\leonr\OneDrive\Escritorio\Projetos\Partimap\partimap-frontend
rmdir /s /q node_modules
```

**Por que isso funciona:**
- Remove todos os binários nativos corrompidos
- Remove todas as versões conflitantes
- Força reinstalação limpa de tudo

---

### Passo 2: Reinstalar todas as dependências do zero

```bash
npm install
```

**Resultado:**
```
added 1255 packages, and audited 1257 packages in 32s

267 packages are looking for funding
  run `npm fund` for details

2 moderate security vulnerabilities

To address all issues, run:
  npm audit fix
```

✅ **Sucesso:** Instalou 1255 pacotes (número correto!)

---

### Passo 3: Testar build

```bash
npm run build
```

**Resultado:**
```
vite v7.2.2 building client environment for production...
✓ 1856 modules transformed.

dist/index.html                        0.78 kB │ gzip:   0.39 kB
dist/assets/index-DGj4HePl.css       116.40 kB │ gzip:  15.91 kB
dist/assets/index-DA182LCd.js        979.45 kB │ gzip: 227.29 kB

✓ built in 6.67s
```

✅ **Build bem-sucedido!**

---

## 📊 Análise do Problema

### Root Cause (Causa Raiz)

**node_modules corrompido** devido a:

1. **Instalação incompleta anterior**
   - Possível interrupção durante `npm install`
   - Falha de rede durante download
   - Permissões de arquivo

2. **Conflito de versões do esbuild**
   - Host JavaScript: `v0.25.9`
   - Binário nativo: `v0.25.12`
   - Incompatibilidade entre package e binary

3. **Cache do npm inconsistente**
   - Versões antigas em cache
   - Metadata corrompida

---

## 🛠️ Comandos de Solução (Resumo)

```bash
# 1. Limpar cache
npm cache clean --force

# 2. Remover package-lock
del package-lock.json

# 3. Remover node_modules COMPLETAMENTE
rmdir /s /q node_modules

# 4. Reinstalar tudo
npm install

# 5. Testar build
npm run build

# 6. Deploy (se build OK)
netlify deploy --prod
```

---

## ⚠️ Sinais de node_modules Corrompido

Se você ver esses sintomas, faça limpeza completa:

1. ❌ `npm install` remove centenas de pacotes
2. ❌ Erros de versão do esbuild/vite
3. ❌ "X is not recognized as internal command"
4. ❌ `npm error ERR_INVALID_ARG_TYPE`
5. ❌ Build funciona localmente mas falha no CI/CD

---

## 🔄 Prevenção Futura

### 1. Não interromper npm install
```bash
# Deixar completar mesmo que demore
npm install
```

### 2. Usar npm ci em CI/CD
```bash
# Mais confiável para builds automáticos
npm ci
```

### 3. Adicionar .gitignore correto
```gitignore
node_modules/
package-lock.json  # Opcional, depende do workflow
dist/
```

### 4. Lockfile no controle de versão
```bash
# Committar package-lock.json garante mesmas versões
git add package-lock.json
git commit -m "Lock dependencies"
```

### 5. Verificar integridade periodicamente
```bash
# Auditar dependências
npm audit

# Verificar packages desatualizados
npm outdated

# Atualizar com cuidado
npm update
```

---

## 📋 Checklist de Troubleshooting

Quando o build falhar, seguir nesta ordem:

- [ ] **1. Verificar mensagem de erro exata**
  - Erro de comando não encontrado?
  - Erro de versão?
  - Erro de sintaxe no código?

- [ ] **2. Tentar reinstalação simples**
  ```bash
  npm install
  ```

- [ ] **3. Limpar cache se falhar**
  ```bash
  npm cache clean --force
  ```

- [ ] **4. Remover lock file se persistir**
  ```bash
  del package-lock.json
  npm install
  ```

- [ ] **5. Limpeza COMPLETA como último recurso**
  ```bash
  rmdir /s /q node_modules
  del package-lock.json
  npm cache clean --force
  npm install
  ```

- [ ] **6. Verificar versões**
  ```bash
  node --version
  npm --version
  ```

- [ ] **7. Testar build local antes de deploy**
  ```bash
  npm run build
  npm run preview  # Testar o build
  ```

---

## 🎯 Lições Aprendidas

### ✅ O que funcionou
1. **Remoção completa** do `node_modules`
2. **Reinstalação limpa** de todas as dependências
3. **Sem tentar fixes parciais** quando há corrupção

### ❌ O que NÃO funcionou
1. **npm install** sozinho quando corrompido
2. **Apenas limpar cache** sem remover node_modules
3. **Tentar build** sem resolver dependências primeiro

### 💡 Insight Principal
> **Quando há conflito de versões nativas (esbuild, node-sass, etc), a única solução confiável é limpeza completa.**

---

## 📈 Comparação: Antes vs Depois

### Antes da Solução
```
❌ node_modules: parcialmente corrompido
❌ esbuild: v0.25.9 (JS) vs v0.25.12 (binary)
❌ vite: não encontrado no PATH
❌ build: falha total
❌ deploy: impossível
```

### Depois da Solução
```
✅ node_modules: 1255 packages instalados
✅ esbuild: v0.25.12 (JS e binary sincronizados)
✅ vite: v7.2.2 funcionando
✅ build: 6.67s, 979KB output
✅ deploy: pronto para produção
```

---

## 🚀 Próximos Passos Recomendados

1. **Deploy para produção:**
   ```bash
   netlify deploy --prod
   ```

2. **Verificar no Netlify:**
   - Build logs
   - Deploy URL
   - Performance

3. **Monitorar erros:**
   - Console do navegador
   - Sentry/Error tracking
   - User feedback

4. **Documentar package.json:**
   - Versões funcionando
   - Scripts de build
   - Configurações Netlify

---

## 📝 Comandos Finais Executados

```bash
# Sequência completa que resolveu:
cd c:\Users\leonr\OneDrive\Escritorio\Projetos\Partimap\partimap-frontend
npm cache clean --force
del package-lock.json
rmdir /s /q node_modules
npm install
npm run build
# ✅ Build successful in 6.67s

# Pronto para:
netlify deploy --prod
```

---

## 🔗 Referências

- [npm cache issues](https://docs.npmjs.com/cli/v10/commands/npm-cache)
- [esbuild platform issues](https://esbuild.github.io/api/#platform)
- [Vite troubleshooting](https://vitejs.dev/guide/troubleshooting.html)
- [Netlify build failures](https://docs.netlify.com/configure-builds/troubleshooting-tips/)

---

**Status Final:** ✅ **RESOLVIDO**  
**Tempo de resolução:** ~10 minutos  
**Método:** Limpeza completa + reinstalação

---

*Documentação gerada em: 10/11/2025*  
*Problema: Deploy Netlify*  
*Solução: Limpeza completa de node_modules*
