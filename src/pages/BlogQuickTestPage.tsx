import React, { useState, useEffect } from 'react';
import { BlogServiceTemp } from '../services/blogServiceTemp';

export const BlogQuickTestPage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('🚀 Testando busca de posts...');
        setLoading(true);
        setError(null);
        
        const result = await BlogServiceTemp.getPosts({ limit: 10 });
        console.log('📄 Resultado:', result);
        
        setPosts(result.posts);
      } catch (err: any) {
        console.error('❌ Erro ao buscar posts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🧪 Teste Rápido - Posts do Blog
          </h1>

          {loading && (
            <div className="text-center py-8">
              <div className="text-lg">⏳ Carregando posts...</div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h2 className="text-lg font-semibold text-red-800 mb-2">❌ Erro:</h2>
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold">📊 Resultados:</h2>
                <p className="text-gray-600">Total de posts encontrados: {posts.length}</p>
              </div>

              {posts.length === 0 ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800">⚠️ Nenhum post encontrado</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {posts.map((post) => (
                    <div key={post.id} className="border rounded-lg p-4 bg-gray-50">
                      <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Slug:</strong> {post.slug}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Status:</strong> {post.status}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Site ID:</strong> {post.site_id}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Publicado em:</strong> {post.published_at ? new Date(post.published_at).toLocaleString('pt-BR') : 'Não definido'}
                      </p>
                      {post.excerpt && (
                        <p className="text-gray-700 text-sm mt-2">{post.excerpt}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
