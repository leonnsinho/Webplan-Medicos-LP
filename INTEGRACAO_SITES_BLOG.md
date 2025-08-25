# 🌐 Integração dos Sites com o Sistema de Blog

## 🎯 Visão Geral

Este documento explica como conectar os três sites da Webplan ao sistema de blog multi-site já configurado no Supabase. Cada site consumirá conteúdo do blog de forma independente, mas centralizada no mesmo banco de dados.

## 📋 Sites a Integrar

- **Webplan Engenharia** (`engenharia.webplan.com.br`)
- **Webplan Enfermeiros** (`enfermeiros.webplan.com.br`) 
- **Site Oficial** (`webplan.com.br`)

## 🔧 Configuração Inicial

### 1. Obter IDs dos Sites

Primeiro, execute esta query no Supabase para obter os IDs dos sites:

```sql
SELECT id, name, display_name, domain FROM sites ORDER BY name;
```

**Resultado esperado:**
```
| id                                   | name                | display_name        | domain                        |
|--------------------------------------|---------------------|---------------------|-------------------------------|
| uuid-engenharia                     | webplan-engenharia  | Webplan Engenharia  | engenharia.webplan.com.br     |
| uuid-enfermeiros                    | webplan-enfermeiros | Webplan Enfermeiros | enfermeiros.webplan.com.br    |
| uuid-oficial                        | site-oficial        | Site Oficial        | webplan.com.br                |
```

### 2. Configuração das Variáveis de Ambiente

Para cada site, crie um arquivo `.env` com as configurações do Supabase:

```bash
# .env (para cada site)
VITE_SUPABASE_URL=https://sua-url-do-supabase.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_publica_anonima_do_supabase
VITE_SITE_ID=uuid-do-site-especifico
```

## 🏗️ Estrutura de Arquivos para Cada Site

### Estrutura Recomendada:

```
site-webplan-engenharia/
├── src/
│   ├── components/
│   │   ├── blog/
│   │   │   ├── BlogList.jsx
│   │   │   ├── BlogPost.jsx
│   │   │   ├── BlogCard.jsx
│   │   │   ├── BlogSidebar.jsx
│   │   │   └── BlogSearch.jsx
│   │   └── layout/
│   │       ├── Header.jsx
│   │       ├── Footer.jsx
│   │       └── Navigation.jsx
│   ├── pages/
│   │   ├── BlogIndexPage.jsx
│   │   ├── BlogPostPage.jsx
│   │   └── BlogCategoryPage.jsx
│   ├── services/
│   │   └── blogService.js
│   ├── lib/
│   │   └── supabase.js
│   └── utils/
│       ├── formatters.js
│       └── seo.js
```

## 📝 Implementação dos Serviços

### 1. Configuração do Cliente Supabase

Crie o arquivo `src/lib/supabase.js`:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Configurações do Supabase não encontradas nas variáveis de ambiente');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ID específico do site (obtido da query SQL acima)
export const SITE_ID = import.meta.env.VITE_SITE_ID;

if (!SITE_ID) {
  throw new Error('SITE_ID não configurado nas variáveis de ambiente');
}
```

### 2. Serviço de Blog

Crie o arquivo `src/services/blogService.js`:

```javascript
import { supabase, SITE_ID } from '../lib/supabase';

export class BlogService {
  
  // ================================
  // LISTAGEM DE POSTS
  // ================================
  
  /**
   * Busca posts publicados do site
   */
  static async getPosts({
    page = 1,
    limit = 10,
    category = null,
    search = null,
    featured = false
  } = {}) {
    try {
      let query = supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          slug,
          excerpt,
          featured_image,
          featured_image_alt,
          published_at,
          reading_time,
          views,
          likes,
          featured,
          blog_authors!inner(
            name,
            bio,
            avatar_url
          ),
          blog_post_categories!inner(
            blog_categories!inner(
              name,
              slug
            )
          ),
          blog_post_tags!inner(
            blog_tags!inner(
              name,
              slug
            )
          )
        `, { count: 'exact' })
        .eq('site_id', SITE_ID)
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      // Filtro por destaque
      if (featured) {
        query = query.eq('featured', true);
      }

      // Filtro por categoria
      if (category) {
        query = query.eq('blog_post_categories.blog_categories.slug', category);
      }

      // Filtro por busca
      if (search) {
        query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%,content.ilike.%${search}%`);
      }

      // Paginação
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;

      // Processar dados para formato mais amigável
      const posts = (data || []).map(post => ({
        ...post,
        author: post.blog_authors,
        categories: post.blog_post_categories?.map(pc => pc.blog_categories) || [],
        tags: post.blog_post_tags?.map(pt => pt.blog_tags) || [],
        published_date: new Date(post.published_at),
        url: `/blog/${post.slug}`
      }));

      return {
        posts,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
        currentPage: page,
        hasMore: (page * limit) < (count || 0)
      };

    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      throw error;
    }
  }

  /**
   * Busca posts em destaque
   */
  static async getFeaturedPosts(limit = 5) {
    return this.getPosts({ featured: true, limit });
  }

  /**
   * Busca posts recentes
   */
  static async getRecentPosts(limit = 10) {
    return this.getPosts({ limit });
  }

  // ================================
  // POST INDIVIDUAL
  // ================================
  
  /**
   * Busca um post específico pelo slug
   */
  static async getPost(slug) {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          blog_authors!inner(
            name,
            bio,
            avatar_url,
            email,
            social_links
          ),
          blog_post_categories!inner(
            blog_categories!inner(
              id,
              name,
              slug,
              description
            )
          ),
          blog_post_tags!inner(
            blog_tags!inner(
              id,
              name,
              slug
            )
          )
        `)
        .eq('site_id', SITE_ID)
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) throw error;

      if (!data) {
        return null;
      }

      // Processar dados
      const post = {
        ...data,
        author: data.blog_authors,
        categories: data.blog_post_categories?.map(pc => pc.blog_categories) || [],
        tags: data.blog_post_tags?.map(pt => pt.blog_tags) || [],
        published_date: new Date(data.published_at),
        url: `/blog/${data.slug}`
      };

      // Registrar visualização
      await this.trackView(data.id);

      return post;

    } catch (error) {
      console.error('Erro ao buscar post:', error);
      throw error;
    }
  }

  // ================================
  // CATEGORIAS E TAGS
  // ================================
  
  /**
   * Busca todas as categorias do site
   */
  static async getCategories() {
    try {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .eq('site_id', SITE_ID)
        .eq('active', true)
        .order('name');

      if (error) throw error;

      return (data || []).map(category => ({
        ...category,
        url: `/blog/categoria/${category.slug}`
      }));

    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      throw error;
    }
  }

  /**
   * Busca posts por categoria
   */
  static async getPostsByCategory(categorySlug, options = {}) {
    return this.getPosts({ 
      ...options, 
      category: categorySlug 
    });
  }

  /**
   * Busca todas as tags do site
   */
  static async getTags() {
    try {
      const { data, error } = await supabase
        .from('blog_tags')
        .select('*')
        .eq('site_id', SITE_ID)
        .eq('active', true)
        .order('name');

      if (error) throw error;

      return (data || []).map(tag => ({
        ...tag,
        url: `/blog/tag/${tag.slug}`
      }));

    } catch (error) {
      console.error('Erro ao buscar tags:', error);
      throw error;
    }
  }

  // ================================
  // BUSCA
  // ================================
  
  /**
   * Busca posts por termo
   */
  static async searchPosts(searchTerm, options = {}) {
    return this.getPosts({ 
      ...options, 
      search: searchTerm 
    });
  }

  // ================================
  // ANALYTICS
  // ================================
  
  /**
   * Registra visualização de post
   */
  static async trackView(postId) {
    try {
      // Registrar no analytics
      await supabase
        .from('blog_analytics')
        .insert({
          post_id: postId,
          event_type: 'view',
          referrer: document.referrer,
          user_agent: navigator.userAgent,
          created_at: new Date().toISOString()
        });

      // Incrementar contador de visualizações
      await supabase
        .from('blog_posts')
        .update({ 
          views: supabase.raw('views + 1') 
        })
        .eq('id', postId);

    } catch (error) {
      console.error('Erro ao registrar visualização:', error);
      // Não falhar silenciosamente para não impactar UX
    }
  }

  /**
   * Registra curtida em post
   */
  static async likePost(postId) {
    try {
      // Registrar no analytics
      await supabase
        .from('blog_analytics')
        .insert({
          post_id: postId,
          event_type: 'like',
          created_at: new Date().toISOString()
        });

      // Incrementar contador de curtidas
      const { data, error } = await supabase
        .from('blog_posts')
        .update({ 
          likes: supabase.raw('likes + 1') 
        })
        .eq('id', postId)
        .select('likes')
        .single();

      if (error) throw error;

      return data.likes;

    } catch (error) {
      console.error('Erro ao curtir post:', error);
      throw error;
    }
  }

  // ================================
  // UTILITÁRIOS
  // ================================
  
  /**
   * Gera sitemap dos posts
   */
  static async generateSitemap() {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('slug, updated_at')
        .eq('site_id', SITE_ID)
        .eq('status', 'published')
        .order('updated_at', { ascending: false });

      if (error) throw error;

      return (data || []).map(post => ({
        url: `/blog/${post.slug}`,
        lastModified: post.updated_at
      }));

    } catch (error) {
      console.error('Erro ao gerar sitemap:', error);
      throw error;
    }
  }
}
```

## 🎨 Componentes de Interface

### 1. Lista de Posts - `src/components/blog/BlogList.jsx`

```jsx
import React, { useState, useEffect } from 'react';
import { BlogService } from '../../services/blogService';
import { BlogCard } from './BlogCard';
import { BlogPagination } from './BlogPagination';
import { BlogSearch } from './BlogSearch';

export const BlogList = ({ 
  category = null, 
  featured = false,
  limit = 10,
  showSearch = true,
  showPagination = true 
}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });
  const [searchTerm, setSearchTerm] = useState('');

  const loadPosts = async (page = 1, search = '') => {
    try {
      setLoading(true);
      setError(null);

      const options = {
        page,
        limit,
        category,
        search: search || undefined,
        featured
      };

      const result = await BlogService.getPosts(options);
      
      setPosts(result.posts);
      setPagination({
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        total: result.total
      });

    } catch (err) {
      console.error('Erro ao carregar posts:', err);
      setError('Erro ao carregar posts. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [category, featured, limit]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    loadPosts(1, term);
  };

  const handlePageChange = (page) => {
    loadPosts(page, searchTerm);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && posts.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={() => loadPosts()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Busca */}
      {showSearch && (
        <BlogSearch 
          onSearch={handleSearch}
          placeholder="Buscar posts..."
        />
      )}

      {/* Resultados */}
      {searchTerm && (
        <div className="text-gray-600">
          {pagination.total > 0 
            ? `${pagination.total} resultado(s) encontrado(s) para "${searchTerm}"`
            : `Nenhum resultado encontrado para "${searchTerm}"`
          }
        </div>
      )}

      {/* Lista de Posts */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Nenhum post encontrado
          </h3>
          <p className="text-gray-600">
            {searchTerm 
              ? 'Tente buscar com outros termos.'
              : 'Em breve teremos conteúdo aqui!'
            }
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {/* Paginação */}
          {showPagination && pagination.totalPages > 1 && (
            <BlogPagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};
```

### 2. Card de Post - `src/components/blog/BlogCard.jsx`

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate, formatReadingTime } from '../../utils/formatters';

export const BlogCard = ({ post }) => {
  const {
    title,
    excerpt,
    featured_image,
    featured_image_alt,
    url,
    published_date,
    reading_time,
    author,
    categories,
    views,
    featured
  } = post;

  return (
    <article className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${featured ? 'ring-2 ring-blue-500' : ''}`}>
      {/* Imagem Destacada */}
      {featured_image && (
        <Link to={url} className="block">
          <div className="aspect-w-16 aspect-h-9 relative">
            <img
              src={featured_image}
              alt={featured_image_alt || title}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            {featured && (
              <div className="absolute top-2 left-2">
                <span className="bg-blue-600 text-white px-2 py-1 text-xs font-medium rounded">
                  Destaque
                </span>
              </div>
            )}
          </div>
        </Link>
      )}

      <div className="p-6">
        {/* Categorias */}
        {categories && categories.length > 0 && (
          <div className="mb-3">
            {categories.slice(0, 2).map(category => (
              <Link
                key={category.id}
                to={category.url}
                className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mr-2 hover:bg-gray-200"
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}

        {/* Título */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          <Link to={url} className="hover:text-blue-600 transition-colors">
            {title}
          </Link>
        </h2>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {excerpt}
          </p>
        )}

        {/* Meta informações */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            {/* Autor */}
            {author && (
              <div className="flex items-center space-x-2">
                {author.avatar_url && (
                  <img
                    src={author.avatar_url}
                    alt={author.name}
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <span>{author.name}</span>
              </div>
            )}

            {/* Data */}
            <span>{formatDate(published_date)}</span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Tempo de leitura */}
            {reading_time && (
              <span>{formatReadingTime(reading_time)}</span>
            )}

            {/* Visualizações */}
            {views > 0 && (
              <span>{views} visualizações</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
```

### 3. Página de Post Individual - `src/pages/BlogPostPage.jsx`

```jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BlogService } from '../services/blogService';
import { formatDate, formatReadingTime } from '../utils/formatters';
import { generateSEOTags } from '../utils/seo';

export const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    loadPost();
  }, [slug]);

  const loadPost = async () => {
    try {
      setLoading(true);
      setError(null);

      const postData = await BlogService.getPost(slug);
      
      if (!postData) {
        setError('Post não encontrado');
        return;
      }

      setPost(postData);
      
      // Atualizar SEO
      generateSEOTags(postData);

    } catch (err) {
      console.error('Erro ao carregar post:', err);
      setError('Erro ao carregar post');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!post || liked) return;

    try {
      const newLikes = await BlogService.likePost(post.id);
      setPost(prev => ({ ...prev, likes: newLikes }));
      setLiked(true);
    } catch (err) {
      console.error('Erro ao curtir post:', err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-8"></div>
          <div className="h-64 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Post não encontrado</h1>
        <p className="text-gray-600 mb-8">{error}</p>
        <Link to="/blog" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Voltar para o Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm">
        <Link to="/" className="text-blue-600 hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/blog" className="text-blue-600 hover:underline">Blog</Link>
        {post.categories && post.categories[0] && (
          <>
            <span className="mx-2">/</span>
            <Link to={post.categories[0].url} className="text-blue-600 hover:underline">
              {post.categories[0].name}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="text-gray-600">{post.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        {/* Categorias */}
        {post.categories && post.categories.length > 0 && (
          <div className="mb-4">
            {post.categories.map(category => (
              <Link
                key={category.id}
                to={category.url}
                className="inline-block bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded mr-2 hover:bg-blue-200"
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}

        {/* Título */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Meta informações */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-6">
          <div className="flex items-center space-x-4">
            {/* Autor */}
            {post.author && (
              <div className="flex items-center space-x-3">
                {post.author.avatar_url && (
                  <img
                    src={post.author.avatar_url}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium text-gray-900">{post.author.name}</p>
                  {post.author.bio && (
                    <p className="text-sm text-gray-600">{post.author.bio}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="text-right text-sm text-gray-500">
            <p>{formatDate(post.published_date)}</p>
            {post.reading_time && (
              <p>{formatReadingTime(post.reading_time)}</p>
            )}
          </div>
        </div>
      </header>

      {/* Imagem destacada */}
      {post.featured_image && (
        <div className="mb-8">
          <img
            src={post.featured_image}
            alt={post.featured_image_alt || post.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Conteúdo */}
      <div 
        className="prose prose-lg max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <Link
                key={tag.id}
                to={tag.url}
                className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded hover:bg-gray-200"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Ações */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
        <div className="flex items-center space-x-4">
          {/* Curtir */}
          <button
            onClick={handleLike}
            disabled={liked}
            className={`flex items-center space-x-2 px-4 py-2 rounded ${
              liked 
                ? 'bg-red-100 text-red-700 cursor-not-allowed' 
                : 'bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-700'
            }`}
          >
            <span>❤️</span>
            <span>{post.likes} curtidas</span>
          </button>

          {/* Compartilhar */}
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: post.title,
                  text: post.excerpt,
                  url: window.location.href
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copiado para a área de transferência!');
              }
            }}
            className="flex items-center space-x-2 px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700"
          >
            <span>🔗</span>
            <span>Compartilhar</span>
          </button>
        </div>

        <div className="text-sm text-gray-500">
          {post.views} visualizações
        </div>
      </div>
    </article>
  );
};
```

## 🔧 Utilitários

### 1. Formatadores - `src/utils/formatters.js`

```javascript
/**
 * Formata data para exibição
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Formata tempo de leitura
 */
export const formatReadingTime = (minutes) => {
  if (minutes < 1) return 'Menos de 1 min de leitura';
  if (minutes === 1) return '1 min de leitura';
  return `${minutes} min de leitura`;
};

/**
 * Trunca texto
 */
export const truncateText = (text, maxLength = 150) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Formata número de visualizações
 */
export const formatViews = (views) => {
  if (views < 1000) return views.toString();
  if (views < 1000000) return `${(views / 1000).toFixed(1)}k`;
  return `${(views / 1000000).toFixed(1)}M`;
};
```

### 2. SEO - `src/utils/seo.js`

```javascript
/**
 * Gera e atualiza tags SEO para o post
 */
export const generateSEOTags = (post) => {
  // Título
  document.title = post.meta_title || `${post.title} | Blog Webplan`;

  // Meta description
  updateMetaTag('description', post.meta_description || post.excerpt);

  // Meta keywords
  if (post.meta_keywords) {
    updateMetaTag('keywords', post.meta_keywords);
  }

  // Open Graph
  updateMetaTag('og:title', post.title, 'property');
  updateMetaTag('og:description', post.excerpt, 'property');
  updateMetaTag('og:type', 'article', 'property');
  updateMetaTag('og:url', window.location.href, 'property');
  
  if (post.featured_image) {
    updateMetaTag('og:image', post.featured_image, 'property');
  }

  // Twitter Cards
  updateMetaTag('twitter:card', 'summary_large_image', 'name');
  updateMetaTag('twitter:title', post.title, 'name');
  updateMetaTag('twitter:description', post.excerpt, 'name');
  
  if (post.featured_image) {
    updateMetaTag('twitter:image', post.featured_image, 'name');
  }

  // Canonical URL
  if (post.canonical_url) {
    updateLinkTag('canonical', post.canonical_url);
  }

  // Article meta
  updateMetaTag('article:published_time', post.published_at, 'property');
  updateMetaTag('article:modified_time', post.updated_at, 'property');
  updateMetaTag('article:author', post.author?.name, 'property');

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
 * Atualiza ou cria meta tag
 */
const updateMetaTag = (name, content, attribute = 'name') => {
  if (!content) return;

  let meta = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  
  meta.content = content;
};

/**
 * Atualiza ou cria link tag
 */
const updateLinkTag = (rel, href) => {
  if (!href) return;

  let link = document.querySelector(`link[rel="${rel}"]`);
  
  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    document.head.appendChild(link);
  }
  
  link.href = href;
};
```

## 🎯 Configurações Específicas por Site

### Webplan Engenharia
```javascript
// .env
VITE_SITE_ID=uuid-engenharia
VITE_SITE_NAME="Webplan Engenharia"
VITE_SITE_THEME_COLOR="#2563eb" // blue-600
```

### Webplan Enfermeiros
```javascript
// .env
VITE_SITE_ID=uuid-enfermeiros
VITE_SITE_NAME="Webplan Enfermeiros"
VITE_SITE_THEME_COLOR="#dc2626" // red-600
```

### Site Oficial
```javascript
// .env
VITE_SITE_ID=uuid-oficial
VITE_SITE_NAME="Site Oficial Webplan"
VITE_SITE_THEME_COLOR="#7c3aed" // purple-600
```

## 🚀 Rotas e Navegação

### Configuração de Rotas (React Router)

```jsx
// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BlogIndexPage } from './pages/BlogIndexPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { BlogCategoryPage } from './pages/BlogCategoryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Outras rotas do site */}
        
        {/* Rotas do Blog */}
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/blog/categoria/:category" element={<BlogCategoryPage />} />
        <Route path="/blog/tag/:tag" element={<BlogTagPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## 📦 Instalação de Dependências

Para cada site, instale as dependências necessárias:

```bash
npm install @supabase/supabase-js
npm install react-router-dom
```

## ✅ Checklist de Implementação

Para cada site:

- [ ] Criar projeto/repositório do site
- [ ] Configurar variáveis de ambiente
- [ ] Instalar dependências do Supabase
- [ ] Implementar serviço de blog (`blogService.js`)
- [ ] Criar componentes de interface
- [ ] Configurar rotas do blog
- [ ] Implementar páginas (índice, post, categoria)
- [ ] Adicionar utilitários (formatters, SEO)
- [ ] Testar integração
- [ ] Configurar build/deploy

## 🔧 Comandos de Teste

Para testar a integração:

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Testar build
npm run build
```

Este sistema permitirá que cada site tenha seu próprio blog integrado, mas gerenciado centralmente pelo painel administrativo! 🎉
