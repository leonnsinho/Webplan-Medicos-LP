import React, { useEffect } from 'react';
import { CheckCircle, ArrowLeft, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Removed auto redirect for SEO purposes
    // Users can manually navigate back when ready
  }, [navigate]);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      'Olá! Acabei de enviar uma solicitação pelo site e gostaria de acelerar o atendimento.'
    );
    const whatsappUrl = `https://wa.me/5511959305175?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12">
          {/* Success Icon */}
          <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="text-green-600" size={50} />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Mensagem Enviada com <span className="text-green-600">Sucesso!</span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Obrigado pelo seu interesse em nossos planos de saúde!<br/>
            Recebemos sua solicitação e em breve um de nossos especialistas entrará em contato.
          </p>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-2xl p-6 mb-8">
            <h3 className="font-semibold text-blue-900 mb-4">Próximos passos:</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-blue-800">Analisaremos seu perfil e necessidades</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-blue-800">Prepararemos uma cotação personalizada</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-blue-800">Entraremos em contato em até 2 horas úteis</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-all duration-200"
            >
              <ArrowLeft size={20} />
              Voltar ao Site
            </button>
            
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              <MessageCircle size={20} />
              Falar no WhatsApp
            </button>
          </div>

          {/* User action notice */}
          <p className="text-sm text-gray-500 mt-6">
            Use os botões acima para navegar ou entre em contato via WhatsApp
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
