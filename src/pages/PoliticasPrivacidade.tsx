import { useEffect } from 'react';
import { Shield, Lock, Eye, Users, FileText, AlertTriangle } from 'lucide-react';
import { updatePageMeta } from '../utils/seo';

function PoliticasPrivacidade() {
  useEffect(() => {
    // Scroll para o topo da página
    window.scrollTo(0, 0);
    
    updatePageMeta(
      'Política de Privacidade | WebPlan Médicos - Proteção dos seus Dados',
      'Conheça nossa política de privacidade e como protegemos seus dados pessoais. WebPlan Médicos - transparência e segurança no tratamento das suas informações.',
      'Política de Privacidade | WebPlan Médicos',
      'Nossa política de privacidade explica como coletamos, usamos e protegemos seus dados pessoais de acordo com a LGPD.'
    );

    return () => {
      updatePageMeta(
        'Planos de Saúde para Médicos - WebPlan | Até 30% de Desconto',
        'Planos de saúde especiais para médicos com até 30% de desconto. Cobertura nacional, melhores operadoras: Amil, SulAmérica, NotreDame. Cotação gratuita online.',
        'Planos de Saúde para Médicos - WebPlan | Até 30% de Desconto',
        'Especialistas em planos de saúde para médicos há 12+ anos. Cotação grátis online! Unimed, Amil, Bradesco, Porto Seguro. Atendimento personalizado.'
      );
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-8 shadow-xl">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Política de Privacidade
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Transparência e segurança no tratamento dos seus dados pessoais
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left max-w-2xl mx-auto">
              <p className="text-blue-100 leading-relaxed">
                <strong>Última atualização:</strong> Setembro de 2025<br/>
                <strong>Vigência:</strong> Esta política está em vigor desde a data de sua publicação
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Introdução */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Introdução</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="mb-4">
                  Todas as suas informações pessoais recolhidas, serão usadas para o ajudar a tornar a sua visita no nosso site a mais produtiva e agradável possível.
                </p>
                <p className="mb-4">
                  A garantia da confidencialidade dos dados pessoais dos utilizadores do nosso site é muito importante.
                </p>
                <p className="mb-4">
                  Todas as informações pessoais relativas a clientes ou visitantes que usem o site serão tratadas em concordância com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) e demais legislações aplicáveis.
                </p>
                <p>
                  O uso do site pressupõe a aceitação deste Acordo de Privacidade. Nossa equipe reserva-se ao direito de alterar este acordo sem aviso prévio. Deste modo, recomendamos que consulte a nossa política de privacidade com regularidade de forma a estar sempre atualizado.
                </p>
              </div>
            </div>

            {/* Coleta de Dados */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Coleta de Dados</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="mb-4">
                  O site oferece diversos conteúdos gratuitos, porém a utilização de alguns serviços como a cotação gratuita somente poderá ser feita mediante solicitação e submissão de formulário de contato com informações pessoais necessárias.
                </p>
                <p className="mb-4">
                  A informação pessoal recolhida pode incluir:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Nome completo</li>
                  <li>Endereço de e-mail</li>
                  <li>Número de telefone e/ou celular</li>
                  <li>Endereço residencial</li>
                  <li>Data de nascimento</li>
                  <li>Informações sobre quantidade de vidas e idades</li>
                  <li>Dados sobre CNPJ (quando aplicável)</li>
                </ul>
                <p>
                  Estas informações são solicitadas apenas através do formulário de solicitação de cotação de seguros e planos de saúde.
                </p>
              </div>
            </div>

            {/* Cookies e Web Beacons */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mr-4">
                  <FileText className="w-6 h-6 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Cookies e Web Beacons</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="mb-4">
                  Utilizamos cookies para armazenar informação, tais como as suas preferências pessoais quando visita o nosso website.
                </p>
                <p className="mb-4">
                  Em adição também utilizamos ferramentas de publicidade de terceiros no nosso website, incluindo Google Analytics e Google Ads. Algumas destas ferramentas poderão utilizar tecnologias como os cookies e/ou web beacons, que armazenarão informações a respeito de usuários para posteriormente oferecer nossos anúncios mais relevantes.
                </p>
                <p>
                  A qualquer momento você pode desligar os seus cookies, nas opções do seu browser (navegador), ou efetuando alterações nas ferramentas de programas Anti-Virus. No entanto, isso poderá alterar a forma como interage com o nosso website, ou outros websites. Isso poderá afetar ou não permitir que faça logins em programas, sites ou fóruns da nossa e de outras redes.
                </p>
              </div>
            </div>

            {/* Segurança */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                  <Lock className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Segurança</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p>
                  Todas as informações coletadas nesse website são armazenadas de maneira segura, utilizando um protocolo de segurança SSL (Secure Sockets Layer) que envia suas informações de maneira criptografada, a mesma utilizada em sites de bancos e comércios eletrônicos.
                </p>
              </div>
            </div>

            {/* Utilização dos Dados */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Utilização dos Dados</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="mb-4">
                  <strong>Não cedemos ou comercializamos seus dados a terceiros.</strong> Eles serão de uso exclusivo para:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Enviar cotação de seguros e planos de saúde quando solicitado por você usuário através de nosso formulário de contato</li>
                  <li>Entrar em contato para esclarecimentos sobre sua solicitação</li>
                  <li>Fornecer suporte durante o processo de contratação</li>
                  <li>Enviar informações relevantes sobre produtos e serviços (mediante seu consentimento)</li>
                </ul>
                <p>
                  Seus dados poderão ser compartilhados apenas com as operadoras de planos de saúde para fins de cotação, sempre com seu conhecimento e consentimento prévio.
                </p>
              </div>
            </div>

            {/* Comportamento do Usuário */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Sobre o Comportamento do Usuário</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="mb-4">
                  O usuário concorda que é proibido por lei:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Prejudicar os direitos e interesses de terceiros</li>
                  <li>Inutilizar, modificar ou impedir, em todo ou em parte, qualquer área do site</li>
                  <li>Tentar violar os meios técnicos de proteção ao conteúdo do site</li>
                  <li>Utilizar o conteúdo do site com finalidade comercial de venda de serviços</li>
                </ul>
                
                <p className="mb-4">
                  Nas áreas onde existe troca de informações, o usuário concorda que é proibido por lei difundir, disponibilizar ou transmitir conteúdo que:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Ameace a integridade física, moral e psicológica</li>
                  <li>Contrarie o disposto na Constituição Federal Brasileira e nas Convenções Internacionais no que diz respeito aos direitos fundamentais</li>
                  <li>Promova atos que contenham calúnia, difamação, injúria</li>
                  <li>Induza qualquer tipo de discriminação, seja ela sexual, racial, étnica, religiosa, etária, social</li>
                  <li>Difunda serviços ilegais, violentos, imorais, pornográficos, degradantes</li>
                  <li>Crie ansiedade, angústia, desespero, temor, depressão</li>
                  <li>Induza a erro sobre o verdadeiro teor da vontade do usuário, utilizando-se de informações falsas, imprecisas, confusas</li>
                  <li>Esteja protegido pelo direito de autoria e propriedade</li>
                  <li>Tenha qualquer tipo de vírus que prejudique o pleno funcionamento do site e/ou do equipamento de terceiros</li>
                </ul>
              </div>
            </div>

            {/* Informações da Empresa */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8 border border-blue-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Informações da Empresa</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Razão Social:</h3>
                  <p className="text-gray-700 mb-4">WebPlan Corretora de Seguros Ltda</p>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">CNPJ:</h3>
                  <p className="text-gray-700 mb-4">22.729.507/0001-13</p>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">SUSEP:</h3>
                  <p className="text-gray-700 mb-4">202017143</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Endereço:</h3>
                  <p className="text-gray-700 mb-4">
                    Edifício Itália<br/>
                    Avenida Ipiranga, 344<br/>
                    República, São Paulo - SP<br/>
                    CEP: 01046-001
                  </p>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">Contato:</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Telefone:</strong> (11) 4116-5378<br/>
                    <strong>WhatsApp:</strong> (11) 95930-5175<br/>
                    <strong>E-mail:</strong> atendimento@segurosaudeweb.com
                  </p>
                </div>
              </div>
            </div>

            {/* Direitos do Usuário */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Seus Direitos (LGPD)</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="mb-4">
                  De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Acesso:</strong> Saber se tratamos seus dados e quais são eles</li>
                  <li><strong>Correção:</strong> Solicitar a correção de dados incompletos, inexatos ou desatualizados</li>
                  <li><strong>Eliminação:</strong> Solicitar a exclusão de dados pessoais tratados com seu consentimento</li>
                  <li><strong>Portabilidade:</strong> Solicitar a transferência de dados para outro fornecedor</li>
                  <li><strong>Revogação:</strong> Revogar seu consentimento a qualquer momento</li>
                  <li><strong>Informação:</strong> Obter informações sobre como compartilhamos seus dados</li>
                </ul>
                <p className="mt-4">
                  Para exercer seus direitos, entre em contato conosco através dos canais disponibilizados acima.
                </p>
              </div>
            </div>

            {/* Footer da Política */}
            <div className="text-center mt-12 p-6 bg-gray-100 rounded-xl">
              <p className="text-gray-600 text-sm">
                Esta Política de Privacidade foi atualizada em <strong>Setembro de 2025</strong> e está em conformidade com a 
                Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Em caso de dúvidas sobre esta política, entre em contato conosco através dos nossos canais de atendimento.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default PoliticasPrivacidade;
