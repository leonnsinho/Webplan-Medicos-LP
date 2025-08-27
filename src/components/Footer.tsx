import React from 'react';
import { MapPin, Phone, Mail, Building } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#005A53] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
          {/* Contact Information */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Informações de Contato</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="text-teal-300 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-medium">Telefone</p>
                  <p className="text-teal-200">(11) 4116-5378</p>
                  <p className="text-teal-200">(11) 95930-5175</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="text-teal-300 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-medium">E-mail</p>
                  <p className="text-teal-200">atendimento@segurosaudeweb.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="text-teal-300 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-medium">Endereço</p>
                  <p className="text-teal-200">
                    Avenida Ipiranga, 344<br />
                    República, São Paulo - SP<br />
                    Edifício Itália<br />
                    CEP: 01046-001
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-6">Dados da Empresa</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Building className="text-teal-300 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-medium">Razão Social</p>
                  <p className="text-teal-200"><span className="font-bold">Web</span><span className="font-light">Plan</span> Corretora de Seguros</p>
                </div>
              </div>
              
              <div>
                <p className="font-medium">CNPJ</p>
                <p className="text-teal-200">22.729.507/0001-13</p>
              </div>
              
              <div>
                <p className="font-medium">SUSEP</p>
                <p className="text-teal-200">202017143</p>
              </div>
            </div>
          </div>

          {/* About & Credits */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-6">Sobre Nós</h3>
            
            <div className="space-y-4">
              <p className="text-teal-200 leading-relaxed">
                Especialistas em planos de saúde para profissionais da medicina,
                oferecendo as melhores condições do mercado com atendimento personalizado.
              </p>
              
              <div className="space-y-2">
                <p className="font-medium">Horário de Atendimento</p>
                <p className="text-teal-200">Todos os dias de 8h às 20h</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-teal-700 mt-12 pt-8">
          <div className="flex justify-center items-center">
            <p className="text-teal-200">
              © 2025 <span className="font-bold">Web</span><span className="font-light">Plan</span>. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;