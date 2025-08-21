# 📋 Mapeamento de Operadoras - WebPlan Seguros

## 🎯 Padronização para Banco de Dados

### Formato no Banco (constraint check)
```sql
CONSTRAINT leads_operadora_check CHECK (operadora IN (
    'sulamerica', 'alice', 'porto_seguro', 'bradesco', 'unimed', 
    'medsenior', 'amil', 'notredame', 'onehealth', 'prevent_senior',
    'qualicorp', 'sao_camilo', 'blue_med'
))
```

### Mapeamento Completo

| Nome Exibido | Valor no Banco | Página |
|-------------|----------------|---------|
| SulAmérica | `sulamerica` | `/sulamerica` |
| Porto Seguro | `porto_seguro` | `/porto-seguro` |
| Bradesco Saúde | `bradesco` | `/bradesco` |
| Amil | `amil` | `/amil` |
| Alice | `alice` | `/alice` |
| Unimed | `unimed` | `/unimed` |
| MedSenior | `medsenior` | `/medsenior` |
| São Camilo | `sao_camilo` | `/sao-camilo` |
| NotreDame Intermédica | `notredame` | `/notredame` |
| OneHealth | `onehealth` | `/onehealth` |
| Prevent Senior | `prevent_senior` | `/prevent-senior` |
| Qualicorp | `qualicorp` | `/qualicorp` |
| Blue Med | `blue_med` | `/blue-med` |

## 🔧 Como Usar nos Formulários

### 1. Em TypeScript (leadService normaliza automaticamente)
```typescript
const leadData = {
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  operadora: 'SulAmérica', // ✅ Aceita nome amigável
  subject: 'Interesse em plano',
  message: formData.message
}

// leadService.createLead() converte automaticamente para 'sulamerica'
```

### 2. Para Cada Página
- **SulamericaPage.tsx**: `operadora: 'SulAmérica'`
- **PortoSeguroPage.tsx**: `operadora: 'Porto Seguro'`
- **BradescoPage.tsx**: `operadora: 'Bradesco'`
- **AmilPage.tsx**: `operadora: 'Amil'`
- **AlicePage.tsx**: `operadora: 'Alice'`
- **UnimedPage.tsx**: `operadora: 'Unimed'`
- **MedSeniorPage.tsx**: `operadora: 'MedSenior'`
- **SaoCamiloPage.tsx**: `operadora: 'São Camilo'`

## ✅ Validação Automática

O `leadService.ts` tem uma função `normalizeOperadoraName()` que:

1. **Aceita nomes amigáveis**: 'SulAmérica', 'Porto Seguro'
2. **Converte automaticamente**: 'sulamerica', 'porto_seguro'
3. **Garante compatibilidade**: Com constraint do banco

## 🚨 Importante

- ✅ **Use nomes amigáveis** nos formulários React
- ✅ **leadService normaliza** automaticamente
- ❌ **Não use** nomes do banco diretamente no frontend
- ✅ **Constraint protege** contra valores inválidos
