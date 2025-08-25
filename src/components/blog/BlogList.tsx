import React, { useState, useEffect } from 'react';
import { BlogService, GetPostsOptions } from '../../services/blogService';
import { BlogCard } from './BlogCard';
import { BlogPagination } from './BlogPagination';
import { BlogSearch } from './BlogSearch';
import { BlogPostWithDetails } from '../../lib/blogSupabase';

interface BlogListProps {
  category?: string;
  featured?: boolean;
  limit?: number;
  showSearch?: boolean;
  showPagination?: boolean;
  title?: string;
}

interface PaginationState {
  currentPage: number;
  totalPages: number;
  total: number;
}

export const BlogList: React.FC<BlogListProps> = ({ 
  category = undefined, 
  featured = false,
  limit = 10,
  showSearch = true,
  showPagination = true,
  title
}) => {
  const [posts, setPosts] = useState<BlogPostWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });
  const [searchTerm, setSearchTerm] = useState('');

  const loadPosts = async (page = 1, search = '') => {
    try {
      setLoading(true);
      setError(null);

      const options: GetPostsOptions = {
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

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    loadPosts(1, term);
  };

  const handlePageChange = (page: number) => {
    loadPosts(page, searchTerm);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && posts.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={() => loadPosts()}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Título da seção */}
      {title && (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
        </div>
      )}

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
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
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
