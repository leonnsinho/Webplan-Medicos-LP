import { useEffect } from 'react';

interface StructuredDataProps {
  data: object;
}

const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  useEffect(() => {
    // Criar ou atualizar script de dados estruturados
    let script = document.querySelector('script[type="application/ld+json"]#structured-data');

    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('id', 'structured-data');
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data);

    return () => {
      // Limpar ao desmontar
      const existingScript = document.querySelector('script[type="application/ld+json"]#structured-data');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [data]);

  return null;
};

export default StructuredData;
