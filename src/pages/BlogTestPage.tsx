import React, { useState, useEffect } from 'react';
import { blogSupabase, SITE_ID } from '../lib/blogSupabase';

export const BlogTestPage: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'success' | 'error'>('testing');
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [siteInfo, setSiteInfo] = useState<any>(null);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      console.log('🔍 Testando conexão com o blog...');
      console.log('Site ID:', SITE_ID);
      
      // Teste 1: Verificar conexão básica
      console.log('📡 Testando conexão básica...');
      const { data: testData, error: testError } = await blogSupabase
        .from('blog_posts')
        .select('count')
        .limit(1);

      if (testError) {
        throw new Error(`Erro de conexão: ${testError.message}`);
      }

      console.log('✅ Conexão básica OK');

      // Teste 2: Verificar site específico
      console.log('🏢 Verificando informações do site...');
      const { data: siteData, error: siteError } = await blogSupabase
        .from('sites')
        .select('*')
        .eq('id', SITE_ID)
        .single();

      if (siteError) {
        console.error('❌ Erro ao buscar site:', siteError);
      } else {
        console.log('✅ Site encontrado:', siteData);
        setSiteInfo(siteData);
      }

      // Teste 3: Buscar todos os posts (sem filtro de site)
      console.log('📄 Buscando todos os posts...');
      const { data: allPosts, error: allPostsError } = await blogSupabase
        .from('blog_posts')
        .select('*')
        .limit(10);

      if (allPostsError) {
        console.error('❌ Erro ao buscar todos os posts:', allPostsError);
      } else {
        console.log('📊 Total de posts encontrados:', allPosts?.length || 0);
        console.log('Posts:', allPosts);
      }

      // Teste 4: Buscar posts do site específico
      console.log('🎯 Buscando posts do site específico...');
      const { data: sitePosts, error: sitePostsError } = await blogSupabase
        .from('blog_posts')
        .select('*')
        .eq('site_id', SITE_ID);

      if (sitePostsError) {
        console.error('❌ Erro ao buscar posts do site:', sitePostsError);
        throw new Error(`Erro ao buscar posts: ${sitePostsError.message}`);
      }

      console.log('📝 Posts do site encontrados:', sitePosts?.length || 0);
      console.log('Posts do site:', sitePosts);
      setPosts(sitePosts || []);

      // Teste 5: Buscar posts publicados
      console.log('📢 Buscando posts publicados...');
      const { data: publishedPosts, error: publishedError } = await blogSupabase
        .from('blog_posts')
        .select('*')
        .eq('site_id', SITE_ID)
        .eq('status', 'published');

      if (publishedError) {
        console.error('❌ Erro ao buscar posts publicados:', publishedError);
      } else {
        console.log('📰 Posts publicados encontrados:', publishedPosts?.length || 0);
        console.log('Posts publicados:', publishedPosts);
      }

      setConnectionStatus('success');

    } catch (err: any) {
      console.error('❌ Erro no teste:', err);
      setError(err.message);
      setConnectionStatus('error');
    }
  };

  const testBlogService = async () => {
    try {
      console.log('🧪 Testando BlogService...');
      const { BlogService } = await import('../services/blogService');
      
      const result = await BlogService.getPosts({ limit: 5 });
      console.log('📊 Resultado do BlogService:', result);
      
    } catch (err: any) {
      console.error('❌ Erro no BlogService:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            🧪 Teste de Conexão do Blog
          </h1>

          {/* Status da Conexão */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Status da Conexão:</h2>
            <div className={`p-4 rounded-lg ${
              connectionStatus === 'testing' ? 'bg-yellow-100 text-yellow-800' :
              connectionStatus === 'success' ? 'bg-green-100 text-green-800' :
              'bg-red-100 text-red-800'
            }`}>
              {connectionStatus === 'testing' && '⏳ Testando conexão...'}
              {connectionStatus === 'success' && '✅ Conexão estabelecida com sucesso!'}
              {connectionStatus === 'error' && `❌ Erro: ${error}`}
            </div>
          </div>

          {/* Informações do Site */}
          {siteInfo && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Informações do Site:</h2>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p><strong>ID:</strong> {siteInfo.id}</p>
                <p><strong>Nome:</strong> {siteInfo.name}</p>
                <p><strong>Display Name:</strong> {siteInfo.display_name}</p>
                <p><strong>Domínio:</strong> {siteInfo.domain}</p>
                <p><strong>Ativo:</strong> {siteInfo.is_active ? 'Sim' : 'Não'}</p>
              </div>
            </div>
          )}

          {/* Posts Encontrados */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Posts Encontrados ({posts.length}):</h2>
            {posts.length === 0 ? (
              <div className="bg-yellow-50 p-4 rounded-lg text-yellow-800">
                ⚠️ Nenhum post encontrado para este site
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post, index) => (
                  <div key={post.id || index} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-gray-600">
                      <strong>Status:</strong> {post.status} | 
                      <strong> ID:</strong> {post.id} | 
                      <strong> Site ID:</strong> {post.site_id}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Criado:</strong> {new Date(post.created_at).toLocaleString()}
                    </p>
                    {post.published_at && (
                      <p className="text-sm text-gray-600">
                        <strong>Publicado:</strong> {new Date(post.published_at).toLocaleString()}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Botões de Teste */}
          <div className="space-x-4">
            <button
              onClick={testConnection}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              🔄 Testar Novamente
            </button>
            
            <button
              onClick={testBlogService}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              🧪 Testar BlogService
            </button>

            <button
              onClick={() => window.open('https://enkijdqewoikjczpfgch.supabase.co', '_blank')}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              🌐 Abrir Painel Supabase
            </button>
          </div>

          {/* Informações de Debug */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold mb-2">Informações de Debug:</h3>
            <p><strong>Site ID configurado:</strong> {SITE_ID}</p>
            <p><strong>URL do Blog Supabase:</strong> {import.meta.env.VITE_BLOG_SUPABASE_URL}</p>
            <p><strong>Chave configurada:</strong> {import.meta.env.VITE_BLOG_SUPABASE_ANON_KEY ? 'Sim' : 'Não'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
