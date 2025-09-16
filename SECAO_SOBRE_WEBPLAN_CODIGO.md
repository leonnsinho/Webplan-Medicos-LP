# 📄 Seção "Sobre a WebPlan" - Código Isolado

## 🎯 Componente React/TypeScript Completo

### Imports Necessários
```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Award, Clock } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
```

### Código da Seção
```tsx
{/* Seção Sobre a WebPlan */}
<section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <AnimatedSection direction="up" className="text-center mb-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-6">
        Sobre a WebPlan
      </h2>
      <p className="text-xl text-blue-600 font-semibold mb-4">
        Transparência e Compromisso
      </p>
      <div className="max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed space-y-4">
        <p>
          A WebPlan Corretora de Seguros atua de forma <strong>independente</strong>, oferecendo 
          orientação especializada para profissionais da engenharia.
        </p>
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg">
          <p className="text-amber-800 font-medium">
            <strong>Importante:</strong> Não possuímos vínculo institucional com organizações 
            profissionais ou entidades de classe, mas conhecemos profundamente os benefícios 
            e planos de saúde aceitos por profissionais dessas categorias.
          </p>
        </div>
      </div>
    </AnimatedSection>

    {/* Nossa Especialização */}
    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
      <AnimatedSection direction="left">
        <h3 className="text-2xl font-bold text-blue-800 mb-6">Nossa Especialização</h3>
        <div className="space-y-4">
          {[
            { icon: Users, text: "Planos de saúde para engenheiros e arquitetos" },
            { icon: Shield, text: "Orientação sobre benefícios profissionais" },
            { icon: Award, text: "Consultoria especializada em seguros" },
            { icon: Clock, text: "Atendimento personalizado por categoria" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                <item.icon className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection direction="right">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100">
          <div className="text-center">
            <h4 className="text-2xl font-bold text-blue-800 mb-4">
              WebPlan Corretora de Seguros
            </h4>
            <div className="space-y-3 text-gray-600">
              <p className="text-lg">
                <strong>CNPJ:</strong> 22.729.507/0001-13
              </p>
              <div className="border-t border-blue-100 pt-4 mt-4">
                <p className="text-xl font-semibold text-blue-700">
                  Mais de 10 anos de experiência
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </div>
</section>
```

## 🎨 Versão HTML/CSS Puro (Para Sites Não-React)

### HTML
```html
<!-- Seção Sobre a WebPlan -->
<section class="sobre-webplan-section">
  <div class="container">
    <!-- Título Principal -->
    <div class="header-content">
      <h2>Sobre a WebPlan</h2>
      <p class="subtitle">Transparência e Compromisso</p>
      <div class="description">
        <p>
          A WebPlan Corretora de Seguros atua de forma <strong>independente</strong>, oferecendo 
          orientação especializada para profissionais da engenharia.
        </p>
        <div class="important-notice">
          <p>
            <strong>Importante:</strong> Não possuímos vínculo institucional com organizações 
            profissionais ou entidades de classe, mas conhecemos profundamente os benefícios 
            e planos de saúde aceitos por profissionais dessas categorias.
          </p>
        </div>
      </div>
    </div>

    <!-- Conteúdo Principal -->
    <div class="main-content">
      <!-- Nossa Especialização -->
      <div class="especialização-content">
        <h3>Nossa Especialização</h3>
        <div class="especialização-list">
          <div class="especialização-item">
            <div class="icon-container">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <p>Planos de saúde para engenheiros e arquitetos</p>
          </div>
          <div class="especialização-item">
            <div class="icon-container">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <p>Orientação sobre benefícios profissionais</p>
          </div>
          <div class="especialização-item">
            <div class="icon-container">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="8" r="7"/>
                <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"/>
              </svg>
            </div>
            <p>Consultoria especializada em seguros</p>
          </div>
          <div class="especialização-item">
            <div class="icon-container">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
            </div>
            <p>Atendimento personalizado por categoria</p>
          </div>
        </div>
      </div>

      <!-- Informações da Empresa -->
      <div class="company-info">
        <div class="company-card">
          <h4>WebPlan Corretora de Seguros</h4>
          <p><strong>CNPJ:</strong> 22.729.507/0001-13</p>
          <div class="experience">
            <p>Mais de 10 anos de experiência</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

### CSS
```css
/* Seção Sobre a WebPlan */
.sobre-webplan-section {
  padding: 80px 0;
  background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);
}

.sobre-webplan-section .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header Content */
.header-content {
  text-align: center;
  margin-bottom: 64px;
}

.header-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e40af;
  margin-bottom: 24px;
}

.header-content .subtitle {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2563eb;
  margin-bottom: 16px;
}

.header-content .description {
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.125rem;
  color: #374151;
  line-height: 1.7;
}

.important-notice {
  background-color: #fffbeb;
  border-left: 4px solid #f59e0b;
  padding: 16px;
  margin: 24px 0;
  border-radius: 0 8px 8px 0;
}

.important-notice p {
  color: #92400e;
  font-weight: 500;
  margin: 0;
}

/* Main Content */
.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  margin-bottom: 64px;
}

/* Nossa Especialização */
.especialização-content h3 {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1e40af;
  margin-bottom: 24px;
}

.especialização-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.especialização-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.icon-container {
  background-color: #dbeafe;
  padding: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.icon {
  width: 24px;
  height: 24px;
  color: #2563eb;
  stroke-width: 2;
}

.especialização-item p {
  color: #374151;
  font-size: 1.125rem;
  line-height: 1.7;
  margin: 0;
}

/* Company Info */
.company-card {
  background-color: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  border: 1px solid #dbeafe;
  text-align: center;
}

.company-card h4 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e40af;
  margin-bottom: 16px;
}

.company-card p {
  color: #6b7280;
  font-size: 1.125rem;
  margin-bottom: 16px;
}

.experience {
  border-top: 1px solid #dbeafe;
  padding-top: 16px;
  margin-top: 16px;
}

.experience p {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1d4ed8;
  margin: 0;
}

/* Responsivo */
@media (max-width: 768px) {
  .sobre-webplan-section {
    padding: 60px 0;
  }
  
  .header-content h2 {
    font-size: 2rem;
  }
  
  .main-content {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  .company-card {
    padding: 24px;
  }
}
```

## 🔄 Personalização para Outras Profissões

### Para Adaptação Rápida:
```tsx
// Mude apenas essas variáveis no topo do componente:
const PROFISSAO = "engenharia"; // ou "enfermagem", "medicina", etc.
const COR_PRINCIPAL = "blue"; // ou "green", "red", "purple", etc.
const TITULO_SECAO = "Sobre a WebPlan";
const CNPJ = "22.729.507/0001-13";
const ANOS_EXPERIENCIA = "10";

// O texto se adapta automaticamente:
const TEXTO_ESPECIALIZAÇÃO = `para profissionais da ${PROFISSAO}`;
const LISTA_ESPECIALIZAÇÃO = [
  `Planos de saúde para ${PROFISSAO === "engenharia" ? "engenheiros e arquitetos" : "profissionais de " + PROFISSAO}`,
  "Orientação sobre benefícios profissionais",
  "Consultoria especializada em seguros", 
  "Atendimento personalizado por categoria"
];
```

## 📝 Instruções de Uso

1. **Para React/TypeScript**: Copie o código da seção React completa
2. **Para HTML/CSS**: Use a versão HTML + CSS
3. **Personalização**: Ajuste cores, textos e profissão conforme necessário
4. **Responsivo**: O código já inclui responsividade mobile
5. **Animações**: As animações são opcionais (remova framer-motion se não usar)

## 🎯 Resultado Final
Esta seção cria um layout profissional e confiável que estabelece transparência e credibilidade da WebPlan, adaptável para qualquer site de seguros ou corretora.