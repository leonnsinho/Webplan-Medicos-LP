import { blogSupabase, SITE_ID, BlogPostWithDetails, BlogCategory, BlogTag } from '../lib/blogSupabase';

export interface PostsResponse {
  posts: BlogPostWithDetails[];
  total: number;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
}

export interface GetPostsOptions {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  featured?: boolean;
}

export class BlogService {
  
  // ================================
  // LISTAGEM DE POSTS
  // ================================
  
  /**
   * Busca posts publicados do site
   * VERSÃO SIMPLIFICADA - SEM VERIFICAR STATUS DO SITE
   */
  static async getPosts(options: GetPostsOptions = {}): Promise<PostsResponse> {
    const {
      page = 1,
      limit = 10,
      category = null,
      search = null,
      featured = false
    } = options;

    try {
      console.log('🔍 BlogService: Buscando posts...');
      
      let query = blogSupabase
        .from('blog_posts')
        .select(`
          id,
          title,
          slug,
          excerpt,
          content,
          featured_image,
          featured_image_alt,
          published_at,
          reading_time,
          views,
          likes,
          featured,
          status,
          site_id
        `, { count: 'exact' })
        .eq('site_id', SITE_ID)
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      // Filtro por destaque
      if (featured) {
        query = query.eq('featured', true);
      }

      // Filtro por categoria - simplificado
      if (category) {
        console.log('Filtro por categoria aplicado:', category);
        // TODO: Implementar filtro por categoria quando necessário
      }

      // Filtro por busca
      if (search) {
        query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%,content.ilike.%${search}%`);
      }

      // Paginação
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      console.log('🚀 Executando query...');
      const { data, error, count } = await query;

      if (error) {
        console.error('❌ Erro na query:', error);
        throw error;
      }

      console.log('✅ Posts encontrados:', data?.length || 0);

      // Processar dados para formato mais amigável (versão simplificada)
      const posts: BlogPostWithDetails[] = (data || []).map((post: any) => ({
        ...post,
        author: { 
          name: 'Webplan Enfermeiros', 
          bio: 'Especialistas em planos de saúde para enfermeiros', 
          avatar_url: '/Logotipo.svg' 
        },
        categories: [], // Simplificado por enquanto
        tags: [], // Simplificado por enquanto
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
  static async getFeaturedPosts(limit = 5): Promise<PostsResponse> {
    return this.getPosts({ featured: true, limit });
  }

  /**
   * Busca posts recentes
   */
  static async getRecentPosts(limit = 10): Promise<PostsResponse> {
    return this.getPosts({ limit });
  }

  // ================================
  // POST INDIVIDUAL
  // ================================
  
  /**
   * Busca um post específico pelo slug
   * VERSÃO SIMPLIFICADA - SEM VERIFICAR STATUS DO SITE
   */
  static async getPost(slug: string): Promise<BlogPostWithDetails | null> {
    try {
      console.log('🔍 BlogService: Buscando post:', slug);
      
      const { data, error } = await blogSupabase
        .from('blog_posts')
        .select('*')
        .eq('site_id', SITE_ID)
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) {
        console.error('❌ Erro ao buscar post:', error);
        throw error;
      }

      if (!data) {
        return null;
      }

      console.log('✅ Post encontrado:', data.title);

      // Processar dados (versão simplificada)
      const post: BlogPostWithDetails = {
        ...data,
        author: { 
          name: 'Webplan Enfermeiros', 
          bio: 'Especialistas em planos de saúde para enfermeiros', 
          avatar_url: '/Logotipo.svg' 
        },
        categories: [], // Simplificado por enquanto
        tags: [], // Simplificado por enquanto
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
   * VERSÃO SIMPLIFICADA - SEM VERIFICAR STATUS DO SITE
   */
  static async getCategories(): Promise<BlogCategory[]> {
    try {
      console.log('🔍 BlogService: Buscando categorias...');
      
      // Por enquanto, retornar categorias padrão
      return [
        {
          id: '1',
          name: 'Saúde',
          slug: 'saude',
          description: 'Posts sobre saúde e bem-estar',
          color: '#dc2626',
          active: true,
          site_id: SITE_ID,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ] as BlogCategory[];

    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      return [];
    }
  }

  /**
   * Busca posts por categoria
   */
  static async getPostsByCategory(categorySlug: string, options: Omit<GetPostsOptions, 'category'> = {}): Promise<PostsResponse> {
    return this.getPosts({ 
      ...options, 
      category: categorySlug 
    });
  }

  /**
   * Busca todas as tags do site
   * VERSÃO SIMPLIFICADA - SEM VERIFICAR STATUS DO SITE
   */
  static async getTags(): Promise<BlogTag[]> {
    try {
      console.log('🔍 BlogService: Buscando tags...');
      
      // Por enquanto, retornar tags padrão
      return [
        {
          id: '1',
          name: 'Planos de Saúde',
          slug: 'planos-de-saude',
          color: '#dc2626',
          active: true,
          site_id: SITE_ID,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ] as BlogTag[];

    } catch (error) {
      console.error('Erro ao buscar tags:', error);
      return [];
    }
  }

  // ================================
  // BUSCA
  // ================================
  
  /**
   * Busca posts por termo
   */
  static async searchPosts(searchTerm: string, options: Omit<GetPostsOptions, 'search'> = {}): Promise<PostsResponse> {
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
  static async trackView(postId: string): Promise<void> {
    try {
      // Registrar no analytics
      await blogSupabase
        .from('blog_analytics')
        .insert({
          post_id: postId,
          event_type: 'view',
          referrer: document.referrer,
          user_agent: navigator.userAgent,
          created_at: new Date().toISOString()
        });

      // Incrementar contador de visualizações (fallback se RPC não existir)
      try {
        await blogSupabase
          .rpc('increment_post_views', { post_id: postId });
      } catch (rpcError) {
        console.warn('RPC increment_post_views não disponível, fazendo busca e update manual');
        // Buscar visualizações atuais e incrementar
        const { data: currentPost } = await blogSupabase
          .from('blog_posts')
          .select('views')
          .eq('id', postId)
          .single();
        
        if (currentPost) {
          await blogSupabase
            .from('blog_posts')
            .update({ views: (currentPost.views || 0) + 1 })
            .eq('id', postId);
        }
      }

    } catch (error) {
      console.error('Erro ao registrar visualização:', error);
      // Não falhar silenciosamente para não impactar UX
    }
  }

  /**
   * Registra curtida em post
   */
  static async likePost(postId: string): Promise<number> {
    try {
      // Registrar no analytics
      await blogSupabase
        .from('blog_analytics')
        .insert({
          post_id: postId,
          event_type: 'like',
          created_at: new Date().toISOString()
        });

      // Incrementar contador de curtidas
      try {
        const { data, error } = await blogSupabase
          .rpc('increment_post_likes', { post_id: postId });

        if (error) throw error;
        return data || 0;
      } catch (rpcError) {
        console.warn('RPC increment_post_likes não disponível, fazendo busca e update manual');
        // Buscar curtidas atuais e incrementar
        const { data: currentPost } = await blogSupabase
          .from('blog_posts')
          .select('likes')
          .eq('id', postId)
          .single();
        
        if (currentPost) {
          const newLikes = (currentPost.likes || 0) + 1;
          await blogSupabase
            .from('blog_posts')
            .update({ likes: newLikes })
            .eq('id', postId);
          return newLikes;
        }
        return 0;
      }

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
  static async generateSitemap(): Promise<Array<{ url: string; lastModified: string }>> {
    try {
      const { data, error } = await blogSupabase
        .from('blog_posts')
        .select('slug, updated_at')
        .eq('site_id', SITE_ID)
        .eq('status', 'published')
        .order('updated_at', { ascending: false });

      if (error) throw error;

      return (data || []).map((post: any) => ({
        url: `/blog/${post.slug}`,
        lastModified: post.updated_at
      }));

    } catch (error) {
      console.error('Erro ao gerar sitemap:', error);
      throw error;
    }
  }
}
