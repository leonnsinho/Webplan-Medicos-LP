import { BlogPostWithDetails } from '../lib/blogSupabase';

/**
 * Gera   document.title = title || 'Blog | Webplan Médicos';
  updateMetaTag('description', description || 'Fique por dentro das últimas novidades sobre planos de saúde para médicos e profissionais de saúde.');
  
  // Open Graph tags
  updateMetaTag('og:title', title || 'Blog Webplan Médicos', 'property');
  updateMetaTag('og:description', description || 'Fique por dentro das últimas novidades sobre planos de saúde para médicos.', 'property');liza tags SEO para o post
 */
export const generateSEOTags = (post: BlogPostWithDetails): void => {
  // Título
  document.title = post.meta_title || `${post.title} | Blog Webplan Médicos`;

  // Meta description
  updateMetaTag('description', post.meta_description || post.excerpt);

  // Meta keywords
  if (post.meta_keywords) {
    updateMetaTag('keywords', post.meta_keywords);
  }

  // Open Graph
  updateMetaTag('og:title', post.title, 'property');
  updateMetaTag('og:description', post.excerpt || '', 'property');
  updateMetaTag('og:type', 'article', 'property');
  updateMetaTag('og:url', window.location.href, 'property');
  
  if (post.featured_image) {
    updateMetaTag('og:image', post.featured_image, 'property');
  }

  // Twitter Cards
  updateMetaTag('twitter:card', 'summary_large_image', 'name');
  updateMetaTag('twitter:title', post.title, 'name');
  updateMetaTag('twitter:description', post.excerpt || '', 'name');
  
  if (post.featured_image) {
    updateMetaTag('twitter:image', post.featured_image, 'name');
  }

  // Canonical URL
  if (post.canonical_url) {
    updateLinkTag('canonical', post.canonical_url);
  }

  // Article meta
  updateMetaTag('article:published_time', post.published_at || '', 'property');
  updateMetaTag('article:modified_time', post.updated_at, 'property');
  updateMetaTag('article:author', post.author?.name, 'property');

  // Limpar tags existentes de categorias e tags
  document.querySelectorAll('meta[property="article:section"]').forEach(el => el.remove());
  document.querySelectorAll('meta[property="article:tag"]').forEach(el => el.remove());

  // Categories
  if (post.categories && post.categories.length > 0) {
    post.categories.forEach(category => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'article:section');
      meta.content = category.name;
      document.head.appendChild(meta);
    });
  }

  // Tags
  if (post.tags && post.tags.length > 0) {
    post.tags.forEach(tag => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'article:tag');
      meta.content = tag.name;
      document.head.appendChild(meta);
    });
  }
};

/**
 * Gera tags SEO para página de listagem do blog
 */
export const generateBlogListSEO = (title?: string, description?: string): void => {
  document.title = title || 'Blog | Webplan Médicos';
  updateMetaTag('description', description || 'Fique por dentro das últimas novidades sobre planos de saúde para médicos e profissionais de saúde.');
  
  // Open Graph
  updateMetaTag('og:title', title || 'Blog Webplan Médicos', 'property');
  updateMetaTag('og:description', description || 'Fique por dentro das últimas novidades sobre planos de saúde para médicos.', 'property');
  updateMetaTag('og:type', 'website', 'property');
  updateMetaTag('og:url', window.location.href, 'property');
  
  // Twitter Cards
  updateMetaTag('twitter:card', 'summary', 'name');
  updateMetaTag('twitter:title', title || 'Blog Webplan Médicos', 'name');
  updateMetaTag('twitter:description', description || 'Fique por dentro das últimas novidades sobre planos de saúde para médicos.', 'name');
};

/**
 * Atualiza ou cria meta tag
 */
const updateMetaTag = (name: string, content: string | undefined, attribute = 'name'): void => {
  if (!content) return;

  let meta = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  
  meta.setAttribute('content', content);
};

/**
 * Atualiza ou cria link tag
 */
const updateLinkTag = (rel: string, href: string): void => {
  if (!href) return;

  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  
  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    document.head.appendChild(link);
  }
  
  link.href = href;
};
