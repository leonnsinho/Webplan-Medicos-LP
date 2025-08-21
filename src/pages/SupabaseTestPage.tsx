import React, { useState } from 'react';
import { useLeadSubmission } from '../hooks/useLeadSubmission';
import AnimatedSection from '../components/AnimatedSection';

const SupabaseTestPage: React.FC = () => {
  const { submitLead, testConnection, isSubmitting } = useLeadSubmission();
  const [testResult, setTestResult] = useState<string>('');
  const [testData, setTestData] = useState({
    name: 'João Silva',
    email: 'teste@example.com',
    phone: '11999999999',
    operadora: 'SulAmérica', // Nome amigável (será normalizado automaticamente)
    subject: 'Teste de Integração Supabase',
    message: 'Este é um teste da integração com o Supabase'
  });

  const handleTestConnection = async () => {
    setTestResult('Testando conexão...');
    
    try {
      const result = await testConnection();
      setTestResult(`${result.success ? '✅' : '❌'} ${result.message}`);
    } catch (err) {
      setTestResult(`❌ Erro na conexão: ${err instanceof Error ? err.message : 'Erro desconhecido'}`);
    }
  };

  const handleTestSubmission = async () => {
    setTestResult('Testando envio de lead...');
    
    try {
      const result = await submitLead(testData);
      
      if (result.success) {
        setTestResult(`✅ Sucesso! Lead enviado com sucesso para a base de dados`);
      } else {
        setTestResult(`❌ Erro: ${result.error || 'Erro desconhecido'}`);
      }
    } catch (err) {
      setTestResult(`❌ Erro no envio: ${err instanceof Error ? err.message : 'Erro desconhecido'}`);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setTestData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Teste da Integração Supabase
            </h1>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  value={testData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={testData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  value={testData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Operadora
                </label>
                <select
                  value={testData.operadora}
                  onChange={(e) => handleInputChange('operadora', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="SulAmérica">SulAmérica</option>
                  <option value="Porto Seguro">Porto Seguro</option>
                  <option value="Bradesco">Bradesco</option>
                  <option value="Amil">Amil</option>
                  <option value="Alice">Alice</option>
                  <option value="Unimed">Unimed</option>
                  <option value="MedSenior">MedSenior</option>
                  <option value="São Camilo">São Camilo</option>
                  <option value="NotreDame">NotreDame</option>
                  <option value="OneHealth">OneHealth</option>
                  <option value="Prevent Senior">Prevent Senior</option>
                  <option value="Qualicorp">Qualicorp</option>
                  <option value="Blue Med">Blue Med</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assunto
                </label>
                <input
                  type="text"
                  value={testData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem
                </label>
                <textarea
                  value={testData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={handleTestConnection}
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Testando...' : 'Testar Conexão'}
                </button>

                <button
                  onClick={handleTestSubmission}
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Enviando...' : 'Testar Envio de Lead'}
                </button>
              </div>

              {testResult && (
                <div className={`p-4 rounded-lg ${
                  testResult.includes('✅') 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  <p className="font-medium">{testResult}</p>
                </div>
              )}
            </div>

            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Status da Configuração:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✅ Supabase Client configurado</li>
                <li>✅ Hook useLeadSubmission criado</li>
                <li>✅ Service leadService implementado</li>
                <li>✅ Tipos TypeScript definidos</li>
              </ul>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default SupabaseTestPage;
