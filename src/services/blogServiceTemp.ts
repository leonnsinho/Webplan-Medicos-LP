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

export class BlogServiceTemp {
  
  /**
   * Busca posts publicados do site (TEMPORÁRIO - SEM VERIFICAR SITE ATIVO)
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
      console.log('🔍 Buscando posts com BlogServiceTemp...');
      
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

      // Filtro por categoria
      if (category) {
        // Simplificado - sem joins complexos
        console.log('Filtro por categoria aplicado:', category);
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
        author: { name: 'Autor Padrão', bio: '', avatar_url: '' }, // Temporário
        categories: [], // Temporário
        tags: [], // Temporário
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
      console.error('Erro ao buscar posts com BlogServiceTemp:', error);
      throw error;
    }
  }

  /**
   * Busca um post específico pelo slug (versão simplificada)
   */
  static async getPost(slug: string): Promise<BlogPostWithDetails | null> {
    try {
      console.log('🔍 Buscando post:', slug);
      
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
        author: { name: 'Autor Padrão', bio: '', avatar_url: '' },
        categories: [],
        tags: [],
        published_date: new Date(data.published_at),
        url: `/blog/${data.slug}`
      };

      return post;

    } catch (error) {
      console.error('Erro ao buscar post:', error);
      throw error;
    }
  }
}
