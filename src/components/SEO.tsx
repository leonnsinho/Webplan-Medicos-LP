import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "Planos de Saúde para Enfermeiros - WebPlan | Até 30% de Desconto",
  description = "Planos de saúde especiais para enfermeiros com até 30% de desconto. Cobertura nacional, melhores operadoras: Amil, SulAmérica, NotreDame. Cotação gratuita online.",
  keywords = "planos de saúde enfermeiros, planos saúde COREN, seguro saúde enfermeiro, planos saúde coletivo enfermeiros, desconto plano saúde enfermeiro, Amil enfermeiros, SulAmérica enfermeiros, NotreDame enfermeiros, planos saúde São Paulo, cotação plano saúde, WebPlan seguros",
  ogImage = "https://segurosaudeseesp.com/og-image.jpg",
  canonicalUrl = "https://segurosaudeseesp.com/"
}) => {
  useEffect(() => {
    // Atualizar título
    document.title = title;

    // Atualizar meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Atualizar meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }

    // Atualizar Open Graph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    // Atualizar Open Graph description
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }

    // Atualizar Open Graph URL
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', canonicalUrl);
    }

    // Atualizar Open Graph image
    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) {
      ogImageMeta.setAttribute('content', ogImage);
    }

    // Atualizar URL canônica
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', canonicalUrl);
    }

    // Atualizar Twitter Card title
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }

    // Atualizar Twitter Card description
    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description);
    }

    // Atualizar Twitter Card URL
    const twitterUrl = document.querySelector('meta[property="twitter:url"]');
    if (twitterUrl) {
      twitterUrl.setAttribute('content', canonicalUrl);
    }

    // Atualizar Twitter Card image
    const twitterImage = document.querySelector('meta[property="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute('content', ogImage);
    }
  }, [title, description, keywords, ogImage, canonicalUrl]);

  return null;
};

export default SEO;
