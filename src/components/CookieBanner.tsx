import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Shield, BarChart3, Target, Settings, X } from 'lucide-react';
import { useCookieConsent, type CookiePreferences } from '../hooks/useCookieConsent';

interface CookieTypeInfo {
  key: keyof CookiePreferences;
  name: string;
  description: string;
  icon: React.ReactNode;
  required: boolean;
  color: string;
}

const cookieTypes: CookieTypeInfo[] = [
  {
    key: 'necessary',
    name: 'Necessários',
    description: 'Essenciais para o funcionamento básico do site. Não podem ser desabilitados.',
    icon: <Shield className="w-5 h-5" />,
    required: true,
    color: 'text-green-600',
  },
  {
    key: 'analytics',
    name: 'Analytics',
    description: 'Nos ajudam a entender como você usa o site para melhorarmos a experiência.',
    icon: <BarChart3 className="w-5 h-5" />,
    required: false,
    color: 'text-blue-600',
  },
  {
    key: 'marketing',
    name: 'Marketing',
    description: 'Usados para mostrar anúncios relevantes e medir a eficácia das campanhas.',
    icon: <Target className="w-5 h-5" />,
    required: false,
    color: 'text-purple-600',
  },
  {
    key: 'preferences',
    name: 'Preferências',
    description: 'Lembram suas configurações para personalizar sua experiência no site.',
    icon: <Settings className="w-5 h-5" />,
    required: false,
    color: 'text-orange-600',
  },
];

const CookieBanner: React.FC = () => {
  const {
    showBanner,
    preferences,
    acceptAll,
    rejectAll,
    updatePreferences,
  } = useCookieConsent();

  const [showSettings, setShowSettings] = useState(false);
  const [tempPreferences, setTempPreferences] = useState<CookiePreferences>(preferences);

  if (!showBanner) return null;

  const handleTogglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Can't disable necessary cookies

    setTempPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSaveCustom = () => {
    updatePreferences(tempPreferences);
  };

  const handleAcceptAll = () => {
    acceptAll();
  };

  const handleRejectAll = () => {
    rejectAll();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-4 border-blue-600 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto p-6">
          {!showSettings ? (
            // Main Banner
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Cookie className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    🍪 Cookies e Privacidade
                  </h3>
                </div>
                <p className="text-gray-600 mb-2">
                  Utilizamos cookies para melhorar sua experiência, analisar o tráfego e personalizar o conteúdo.
                </p>
                <p className="text-sm text-gray-500">
                  Ao continuar navegando, você concorda com nossa política de cookies. Você pode personalizar suas preferências a qualquer momento.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <button
                  onClick={handleRejectAll}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Rejeitar Todos
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Personalizar
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-lg"
                >
                  Aceitar Todos
                </button>
              </div>
            </div>
          ) : (
            // Settings Panel
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Settings className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Configurar Cookies
                  </h3>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <p className="text-gray-600">
                Escolha quais tipos de cookies você deseja permitir. Cookies necessários são sempre habilitados.
              </p>

              <div className="grid gap-4">
                {cookieTypes.map((type) => (
                  <div
                    key={type.key}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`${type.color} bg-gray-50 p-2 rounded-full`}>
                          {type.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                            {type.name}
                            {type.required && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                Obrigatório
                              </span>
                            )}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {type.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => handleTogglePreference(type.key)}
                          disabled={type.required}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            tempPreferences[type.key]
                              ? 'bg-blue-600'
                              : 'bg-gray-300'
                          } ${type.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              tempPreferences[type.key] ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveCustom}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-lg"
                >
                  Salvar Preferências
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieBanner;