# 📋 Guia Completo: Integrando Outros Sites ao Sistema Webplan

## 🎯 Objetivo
Este documento explica como configurar formulários de outros sites para enviarem dados para o mesmo sistema Supabase do admin panel Webplan, centralizando todos os leads em uma única planilha.

---

## 📊 Informações do Sistema Atual

### 🔗 Credenciais Supabase
- **URL**: `https://xtixrumedzekulqmxtzz.supabase.co`
- **Chave Anônima**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0aXhydW1lZHpla3VscW14dHp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MzI4ODIsImV4cCI6MjA3MTMwODg4Mn0.dqhBXNGKOxSW_qiT6UzwMG4anPI4DhHubgLJuTODXi4`

### 🗃️ Estrutura da Tabela `leads`
```sql
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  operadora TEXT NOT NULL,
  subject TEXT,
  ip_address TEXT,
  user_agent TEXT,
  source_page TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  status TEXT DEFAULT 'novo',
  priority INTEGER DEFAULT 3,
  assigned_to TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 🛠️ Métodos de Integração

### 1. **Método JavaScript (Recomendado)**

#### 📁 **Arquivo: formulario-webplan.js**
```javascript
// Configuração do Supabase
const SUPABASE_URL = 'https://xtixrumedzekulqmxtzz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0aXhydW1lZHpla3VscW14dHp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MzI4ODIsImV4cCI6MjA3MTMwODg4Mn0.dqhBXNGKOxSW_qiT6UzwMG4anPI4DhHubgLJuTODXi4';

// Função para normalizar nome da operadora
function normalizeOperadora(operadora) {
  const operadoraMap = {
    'SulAmérica': 'sulamerica',
    'Porto Seguro': 'porto_seguro',
    'Bradesco': 'bradesco',
    'Amil': 'amil',
    'Alice': 'alice',
    'Unimed': 'unimed',
    'MedSenior': 'medsenior',
    'São Camilo': 'sao_camilo',
    'NotreDame': 'notredame',
    'OneHealth': 'onehealth',
    'Prevent Senior': 'prevent_senior',
    'Qualicorp': 'qualicorp',
    'Blue Med': 'blue_med',
    'main': 'main'
  };
  
  return operadoraMap[operadora] || operadora.toLowerCase().replace(/\s+/g, '_');
}

// Função para obter IP do cliente
async function getClientIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Erro ao obter IP:', error);
    return null;
  }
}

// Função para extrair UTM parameters
function getUTMParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get('utm_source'),
    utm_medium: urlParams.get('utm_medium'),
    utm_campaign: urlParams.get('utm_campaign')
  };
}

// Função principal para enviar lead
async function enviarLeadWebplan(formData) {
  try {
    console.log('🚀 Enviando lead para Webplan...');
    
    // Validar dados obrigatórios
    if (!formData.name || !formData.email || !formData.phone || !formData.operadora) {
      throw new Error('Campos obrigatórios: name, email, phone, operadora');
    }
    
    // Obter informações adicionais
    const [clientIP, utmParams] = await Promise.all([
      getClientIP(),
      Promise.resolve(getUTMParams())
    ]);
    
    // Preparar dados para envio
    const leadData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message || '',
      operadora: normalizeOperadora(formData.operadora),
      subject: formData.subject || 'Lead externo',
      ip_address: clientIP,
      user_agent: navigator.userAgent,
      source_page: window.location.href,
      utm_source: utmParams.utm_source,
      utm_medium: utmParams.utm_medium,
      utm_campaign: utmParams.utm_campaign,
      status: 'novo',
      priority: 3
    };
    
    // Enviar para Supabase
    const response = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(leadData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Erro HTTP ${response.status}: ${errorData.message || 'Erro desconhecido'}`);
    }
    
    const result = await response.json();
    console.log('✅ Lead enviado com sucesso:', result);
    
    return {
      success: true,
      message: 'Lead enviado com sucesso!',
      data: result
    };
    
  } catch (error) {
    console.error('❌ Erro ao enviar lead:', error);
    return {
      success: false,
      message: error.message || 'Erro interno do sistema',
      error: error
    };
  }
}

// Função auxiliar para formulários HTML básicos
function configurarFormularioWebplan(formSelector, config = {}) {
  const form = document.querySelector(formSelector);
  if (!form) {
    console.error('Formulário não encontrado:', formSelector);
    return;
  }
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Mostrar loading
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
    }
    
    try {
      // Coletar dados do formulário
      const formData = new FormData(form);
      const data = {
        name: formData.get('name') || formData.get('nome'),
        email: formData.get('email'),
        phone: formData.get('phone') || formData.get('telefone'),
        message: formData.get('message') || formData.get('mensagem'),
        operadora: config.operadora || formData.get('operadora') || 'main',
        subject: config.subject || formData.get('subject') || formData.get('assunto') || 'Lead do site'
      };
      
      // Enviar lead
      const result = await enviarLeadWebplan(data);
      
      if (result.success) {
        // Sucesso
        if (config.onSuccess) {
          config.onSuccess(result);
        } else {
          alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
          form.reset();
        }
      } else {
        // Erro
        if (config.onError) {
          config.onError(result);
        } else {
          alert('Erro ao enviar mensagem: ' + result.message);
        }
      }
      
    } catch (error) {
      console.error('Erro no formulário:', error);
      if (config.onError) {
        config.onError({ success: false, message: error.message });
      } else {
        alert('Erro inesperado. Tente novamente.');
      }
    } finally {
      // Restaurar botão
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    }
  });
}

// Exportar funções para uso global
window.WebplanForms = {
  enviarLead: enviarLeadWebplan,
  configurarFormulario: configurarFormularioWebplan,
  normalizeOperadora: normalizeOperadora
};
```

#### 📝 **Como usar no seu site:**

1. **Incluir o script:**
```html
<script src="formulario-webplan.js"></script>
```

2. **Exemplo de uso simples:**
```javascript
// Para formulário específico de uma operadora
WebplanForms.configurarFormulario('#meu-formulario', {
  operadora: 'Amil',
  subject: 'Lead do site da Amil',
  onSuccess: function(result) {
    console.log('Sucesso!', result);
    // Redirecionar ou mostrar mensagem personalizada
  },
  onError: function(result) {
    console.error('Erro:', result);
    // Tratar erro personalizado
  }
});
```

3. **Exemplo de uso avançado:**
```javascript
// Para envio manual (com mais controle)
document.getElementById('enviar').addEventListener('click', async function() {
  const resultado = await WebplanForms.enviarLead({
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '11999999999',
    message: 'Interessado em plano de saúde',
    operadora: 'Bradesco',
    subject: 'Lead via WhatsApp'
  });
  
  if (resultado.success) {
    console.log('Lead enviado!');
  } else {
    console.error('Erro:', resultado.message);
  }
});
```

---

### 2. **Método PHP (Para Backend)**

#### 📁 **Arquivo: webplan-api.php**
```php
<?php
class WebplanAPI {
    private $supabaseUrl = 'https://xtixrumedzekulqmxtzz.supabase.co';
    private $supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0aXhydW1lZHpla3VscW14dHp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MzI4ODIsImV4cCI6MjA3MTMwODg4Mn0.dqhBXNGKOxSW_qiT6UzwMG4anPI4DhHubgLJuTODXi4';
    
    private function normalizeOperadora($operadora) {
        $operadoraMap = [
            'SulAmérica' => 'sulamerica',
            'Porto Seguro' => 'porto_seguro',
            'Bradesco' => 'bradesco',
            'Amil' => 'amil',
            'Alice' => 'alice',
            'Unimed' => 'unimed',
            'MedSenior' => 'medsenior',
            'São Camilo' => 'sao_camilo',
            'NotreDame' => 'notredame',
            'OneHealth' => 'onehealth',
            'Prevent Senior' => 'prevent_senior',
            'Qualicorp' => 'qualicorp',
            'Blue Med' => 'blue_med',
            'main' => 'main'
        ];
        
        return $operadoraMap[$operadora] ?? strtolower(str_replace(' ', '_', $operadora));
    }
    
    private function getClientIP() {
        $ipKeys = ['HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'];
        foreach ($ipKeys as $key) {
            if (array_key_exists($key, $_SERVER) === true) {
                foreach (explode(',', $_SERVER[$key]) as $ip) {
                    $ip = trim($ip);
                    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false) {
                        return $ip;
                    }
                }
            }
        }
        return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    }
    
    public function enviarLead($dados) {
        // Validar dados obrigatórios
        $required = ['name', 'email', 'phone', 'operadora'];
        foreach ($required as $field) {
            if (empty($dados[$field])) {
                return [
                    'success' => false,
                    'message' => "Campo obrigatório não preenchido: {$field}"
                ];
            }
        }
        
        // Preparar dados para envio
        $leadData = [
            'name' => $dados['name'],
            'email' => $dados['email'],
            'phone' => $dados['phone'],
            'message' => $dados['message'] ?? '',
            'operadora' => $this->normalizeOperadora($dados['operadora']),
            'subject' => $dados['subject'] ?? 'Lead externo',
            'ip_address' => $this->getClientIP(),
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
            'source_page' => (isset($_SERVER['HTTPS']) ? 'https' : 'http') . "://{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}",
            'utm_source' => $_GET['utm_source'] ?? null,
            'utm_medium' => $_GET['utm_medium'] ?? null,
            'utm_campaign' => $_GET['utm_campaign'] ?? null,
            'status' => 'novo',
            'priority' => 3
        ];
        
        // Remover campos null
        $leadData = array_filter($leadData, function($value) {
            return $value !== null;
        });
        
        // Enviar para Supabase
        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL => $this->supabaseUrl . '/rest/v1/leads',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode($leadData),
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
                'apikey: ' . $this->supabaseKey,
                'Authorization: Bearer ' . $this->supabaseKey,
                'Prefer: return=representation'
            ]
        ]);
        
        $response = curl_exec($curl);
        $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);
        
        if ($httpCode === 201) {
            return [
                'success' => true,
                'message' => 'Lead enviado com sucesso!',
                'data' => json_decode($response, true)
            ];
        } else {
            return [
                'success' => false,
                'message' => 'Erro ao enviar lead: ' . $response,
                'http_code' => $httpCode
            ];
        }
    }
}

// Exemplo de uso
if ($_POST) {
    $webplan = new WebplanAPI();
    $resultado = $webplan->enviarLead([
        'name' => $_POST['name'],
        'email' => $_POST['email'],
        'phone' => $_POST['phone'],
        'message' => $_POST['message'] ?? '',
        'operadora' => $_POST['operadora'] ?? 'main',
        'subject' => $_POST['subject'] ?? 'Lead do formulário'
    ]);
    
    header('Content-Type: application/json');
    echo json_encode($resultado);
    exit;
}
?>
```

---

### 3. **Método Python (Flask/Django)**

#### 📁 **Arquivo: webplan_api.py**
```python
import requests
import json
from urllib.parse import urlparse, parse_qs
import os

class WebplanAPI:
    def __init__(self):
        self.supabase_url = 'https://xtixrumedzekulqmxtzz.supabase.co'
        self.supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0aXhydW1lZHpla3VscW14dHp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MzI4ODIsImV4cCI6MjA3MTMwODg4Mn0.dqhBXNGKOxSW_qiT6UzwMG4anPI4DhHubgLJuTODXi4'
    
    def normalize_operadora(self, operadora):
        operadora_map = {
            'SulAmérica': 'sulamerica',
            'Porto Seguro': 'porto_seguro',
            'Bradesco': 'bradesco',
            'Amil': 'amil',
            'Alice': 'alice',
            'Unimed': 'unimed',
            'MedSenior': 'medsenior',
            'São Camilo': 'sao_camilo',
            'NotreDame': 'notredame',
            'OneHealth': 'onehealth',
            'Prevent Senior': 'prevent_senior',
            'Qualicorp': 'qualicorp',
            'Blue Med': 'blue_med',
            'main': 'main'
        }
        return operadora_map.get(operadora, operadora.lower().replace(' ', '_'))
    
    def get_client_ip(self, request):
        # Para Flask
        if hasattr(request, 'environ'):
            x_forwarded_for = request.environ.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                return x_forwarded_for.split(',')[0]
            return request.environ.get('REMOTE_ADDR')
        
        # Para Django
        elif hasattr(request, 'META'):
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                return x_forwarded_for.split(',')[0]
            return request.META.get('REMOTE_ADDR')
        
        return '0.0.0.0'
    
    def enviar_lead(self, dados, request=None):
        # Validar dados obrigatórios
        required_fields = ['name', 'email', 'phone', 'operadora']
        for field in required_fields:
            if not dados.get(field):
                return {
                    'success': False,
                    'message': f'Campo obrigatório não preenchido: {field}'
                }
        
        # Preparar dados para envio
        lead_data = {
            'name': dados['name'],
            'email': dados['email'],
            'phone': dados['phone'],
            'message': dados.get('message', ''),
            'operadora': self.normalize_operadora(dados['operadora']),
            'subject': dados.get('subject', 'Lead externo'),
            'ip_address': self.get_client_ip(request) if request else None,
            'user_agent': request.headers.get('User-Agent') if request else '',
            'source_page': request.url if request else '',
            'utm_source': dados.get('utm_source'),
            'utm_medium': dados.get('utm_medium'),
            'utm_campaign': dados.get('utm_campaign'),
            'status': 'novo',
            'priority': 3
        }
        
        # Remover campos None
        lead_data = {k: v for k, v in lead_data.items() if v is not None}
        
        try:
            # Enviar para Supabase
            headers = {
                'Content-Type': 'application/json',
                'apikey': self.supabase_key,
                'Authorization': f'Bearer {self.supabase_key}',
                'Prefer': 'return=representation'
            }
            
            response = requests.post(
                f'{self.supabase_url}/rest/v1/leads',
                headers=headers,
                json=lead_data
            )
            
            if response.status_code == 201:
                return {
                    'success': True,
                    'message': 'Lead enviado com sucesso!',
                    'data': response.json()
                }
            else:
                return {
                    'success': False,
                    'message': f'Erro ao enviar lead: {response.text}',
                    'status_code': response.status_code
                }
                
        except Exception as e:
            return {
                'success': False,
                'message': f'Erro inesperado: {str(e)}'
            }

# Exemplo de uso com Flask
from flask import Flask, request, jsonify

app = Flask(__name__)
webplan = WebplanAPI()

@app.route('/enviar-lead', methods=['POST'])
def enviar_lead():
    dados = request.get_json()
    resultado = webplan.enviar_lead(dados, request)
    return jsonify(resultado)

# Exemplo de uso com Django
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def enviar_lead_django(request):
    if request.method == 'POST':
        dados = json.loads(request.body)
        webplan = WebplanAPI()
        resultado = webplan.enviar_lead(dados, request)
        return JsonResponse(resultado)
```

---

## 🔧 Configurações por Tipo de Site

### **WordPress**
```php
// functions.php
function webplan_enqueue_scripts() {
    wp_enqueue_script('webplan-forms', get_template_directory_uri() . '/js/formulario-webplan.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'webplan_enqueue_scripts');

// Shortcode para formulário
function webplan_formulario_shortcode($atts) {
    $atts = shortcode_atts(array(
        'operadora' => 'main',
        'subject' => 'Lead do WordPress'
    ), $atts);
    
    ob_start();
    ?>
    <form id="webplan-form-<?php echo uniqid(); ?>" class="webplan-form">
        <input type="text" name="name" placeholder="Nome completo" required>
        <input type="email" name="email" placeholder="E-mail" required>
        <input type="tel" name="phone" placeholder="Telefone" required>
        <textarea name="message" placeholder="Mensagem"></textarea>
        <button type="submit">Enviar</button>
    </form>
    <script>
    WebplanForms.configurarFormulario('#webplan-form-<?php echo uniqid(); ?>', {
        operadora: '<?php echo esc_js($atts['operadora']); ?>',
        subject: '<?php echo esc_js($atts['subject']); ?>'
    });
    </script>
    <?php
    return ob_get_clean();
}
add_shortcode('webplan_form', 'webplan_formulario_shortcode');
```

### **HTML Estático**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Meu Site</title>
</head>
<body>
    <form id="meu-formulario">
        <input type="text" name="name" placeholder="Nome" required>
        <input type="email" name="email" placeholder="E-mail" required>
        <input type="tel" name="phone" placeholder="Telefone" required>
        <select name="operadora">
            <option value="Amil">Amil</option>
            <option value="Bradesco">Bradesco</option>
            <option value="SulAmérica">SulAmérica</option>
        </select>
        <textarea name="message" placeholder="Mensagem"></textarea>
        <button type="submit">Enviar</button>
    </form>

    <script src="formulario-webplan.js"></script>
    <script>
        WebplanForms.configurarFormulario('#meu-formulario', {
            subject: 'Lead do meu site',
            onSuccess: function(result) {
                alert('Obrigado! Recebemos sua mensagem.');
                // Opcional: redirecionar
                window.location.href = '/obrigado.html';
            }
        });
    </script>
</body>
</html>
```

### **React/Next.js**
```jsx
import { useState } from 'react';

const FormularioWebplan = ({ operadora = 'main', subject = 'Lead React' }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const enviarLead = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const resultado = await window.WebplanForms.enviarLead({
        ...formData,
        operadora,
        subject
      });

      if (resultado.success) {
        alert('Mensagem enviada com sucesso!');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        alert('Erro: ' + resultado.message);
      }
    } catch (error) {
      alert('Erro inesperado: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={enviarLead}>
      <input
        type="text"
        placeholder="Nome"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
      <input
        type="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />
      <input
        type="tel"
        placeholder="Telefone"
        value={formData.phone}
        onChange={(e) => setFormData({...formData, phone: e.target.value})}
        required
      />
      <textarea
        placeholder="Mensagem"
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
};

export default FormularioWebplan;
```

---

## 📝 Campos Obrigatórios e Opcionais

### ✅ **Obrigatórios**
- `name` - Nome completo
- `email` - E-mail válido
- `phone` - Telefone/WhatsApp
- `operadora` - Nome da operadora

### 📋 **Opcionais**
- `message` - Mensagem personalizada
- `subject` - Assunto do lead
- `utm_source` - Origem da campanha
- `utm_medium` - Meio da campanha
- `utm_campaign` - Nome da campanha

### 🤖 **Automáticos** (Capturados automaticamente)
- `ip_address` - IP do cliente
- `user_agent` - Navegador usado
- `source_page` - URL da página
- `status` - Sempre 'novo'
- `priority` - Sempre 3
- `created_at` - Data/hora atual
- `updated_at` - Data/hora atual

---

## 🗂️ Mapeamento de Operadoras

As operadoras devem ser enviadas com os nomes exatos, que serão automaticamente normalizados:

| Nome Enviado | Valor no Banco |
|--------------|----------------|
| SulAmérica | sulamerica |
| Porto Seguro | porto_seguro |
| Bradesco | bradesco |
| Amil | amil |
| Alice | alice |
| Unimed | unimed |
| MedSenior | medsenior |
| São Camilo | sao_camilo |
| NotreDame | notredame |
| OneHealth | onehealth |
| Prevent Senior | prevent_senior |
| Qualicorp | qualicorp |
| Blue Med | blue_med |
| main | main |

---

## 🧪 Testes e Debugging

### **Teste Simples no Console**
```javascript
// Copie e cole no console do navegador
fetch('https://xtixrumedzekulqmxtzz.supabase.co/rest/v1/leads', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0aXhydW1lZHpla3VscW14dHp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MzI4ODIsImV4cCI6MjA3MTMwODg4Mn0.dqhBXNGKOxSW_qiT6UzwMG4anPI4DhHubgLJuTODXi4',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0aXhydW1lZHpla3VscW14dHp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MzI4ODIsImV4cCI6MjA3MTMwODg4Mn0.dqhBXNGKOxSW_qiT6UzwMG4anPI4DhHubgLJuTODXi4'
  },
  body: JSON.stringify({
    name: 'Teste Lead',
    email: 'teste@email.com',
    phone: '11999999999',
    operadora: 'main',
    subject: 'Teste de integração',
    message: 'Este é um teste de integração'
  })
})
.then(response => response.json())
.then(data => console.log('Sucesso:', data))
.catch(error => console.error('Erro:', error));
```

### **Verificar Logs**
- Abra o console do navegador (F12)
- Veja mensagens que começam com 🚀, ✅ ou ❌
- Verifique se há erros de CORS ou rede

---

## 🔒 Segurança e Boas Práticas

### **Validação de Dados**
- Sempre validar e-mail no frontend e backend
- Sanitizar campos de texto
- Limitar tamanho das mensagens
- Implementar CAPTCHA se necessário

### **Rate Limiting**
```javascript
// Exemplo de rate limiting simples
const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60000; // 1 minuto
  const maxRequests = 5;
  
  const requests = rateLimitMap.get(ip) || [];
  const recentRequests = requests.filter(time => now - time < windowMs);
  
  if (recentRequests.length >= maxRequests) {
    return false; // Rate limit exceeded
  }
  
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return true;
}
```

### **Proteção CORS**
Se tiver problemas de CORS, configure no Supabase:
```sql
-- No painel do Supabase, adicionar nas configurações de CORS:
-- https://meusite.com
-- https://www.meusite.com
```

---

## 📊 Monitoramento no Admin Panel

Após implementar em outros sites, você poderá:

1. **Ver todos os leads** no admin panel: http://localhost:3005
2. **Filtrar por operadora** específica
3. **Identificar origem** pela coluna `source_page`
4. **Acompanhar conversões** e métricas
5. **Exportar dados** para análise

---

## 🆘 Resolução de Problemas

### **Erro 401 (Unauthorized)**
- Verificar se a chave API está correta
- Confirmar se RLS está configurado

### **Erro 400 (Bad Request)**
- Verificar se todos os campos obrigatórios estão presentes
- Validar formato do e-mail
- Confirmar que operadora é uma string válida

### **Erro de CORS**
- Adicionar domínio nas configurações do Supabase
- Verificar se headers estão corretos

### **Lead não aparece no admin**
- Verificar se foi criado no banco correto
- Confirmar filtros no admin panel
- Verificar campo `operadora` normalizado

---

## 📞 Contato e Suporte

Para dúvidas ou problemas na implementação:

1. **Verificar logs** no console do navegador
2. **Testar** com o script de teste fornecido
3. **Confirmar** que todos os campos obrigatórios estão sendo enviados
4. **Validar** credenciais do Supabase

---

**Data de criação**: 21/08/2025  
**Versão**: 1.0  
**Compatibilidade**: Todos os sites com JavaScript habilitado
