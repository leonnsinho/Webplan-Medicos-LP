import React, { useEffect, useState } from 'react';
import { BlogServiceTemp } from '../services/blogServiceTemp';
import { generateBlogListSEO } from '../utils/seo';
import AnimatedSection from '../components/AnimatedSection';

export const BlogIndexPageTemp: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    generateBlogListSEO(
      'Blog | Webplan Enfermeiros (TESTE)',
      'Fique por dentro das últimas novidades sobre planos de saúde para enfermeiros e profissionais de saúde. Dicas, análises e muito mais!'
    );

    const fetchPosts = async () => {
      try {
        console.log('🚀 Carregando posts com BlogServiceTemp...');
        const result = await BlogServiceTemp.getPosts({ limit: 10 });
        setPosts(result.posts);
      } catch (err: any) {
        console.error('❌ Erro ao carregar posts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <AnimatedSection className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Blog Webplan Enfermeiros (TESTE)
          </h1>
          <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
            Versão de teste - ignorando status do site
          </p>
        </div>
      </AnimatedSection>

      {/* Posts */}
      <AnimatedSection className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Posts Recentes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Testando busca de posts ignorando status do site
            </p>
          </div>

          {loading && (
            <div className="text-center py-8">
              <div className="text-lg">⏳ Carregando posts...</div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-red-800 mb-2">❌ Erro:</h3>
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div>
              {posts.length === 0 ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800">⚠️ Nenhum post encontrado</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                        {post.excerpt && (
                          <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                        )}
                        <div className="text-xs text-gray-500">
                          <p>Publicado: {post.published_at ? new Date(post.published_at).toLocaleDateString('pt-BR') : 'N/A'}</p>
                          <p>Status: {post.status}</p>
                        </div>
                        <a 
                          href={`/blog/${post.slug}`}
                          className="inline-block mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                          Ler mais
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </AnimatedSection>
    </div>
  );
};
