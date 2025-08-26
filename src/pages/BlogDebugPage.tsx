import React, { useState } from 'react';
import { blogSupabase, SITE_ID } from '../lib/blogSupabase';

export const BlogDebugPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [activating, setActivating] = useState(false);
  const [results, setResults] = useState<any>({});

  // Função para ativar o site
  const activateSite = async () => {
    setActivating(true);
    try {
      console.log('🔄 Tentando ativar site...');
      
      // Primeiro, vamos verificar se conseguimos ler o site
      const { data: siteData, error: readError } = await blogSupabase
        .from('sites')
        .select('*')
        .eq('id', SITE_ID)
        .single();

      if (readError) {
        console.error('Erro ao ler site:', readError);
        throw new Error(`Erro ao ler site: ${readError.message}`);
      }

      console.log('Site atual:', siteData);

      // Agora tentar atualizar
      const { data, error } = await blogSupabase
        .from('sites')
        .update({ active: true })
        .eq('id', SITE_ID)
        .select();

      if (error) {
        console.error('Erro ao atualizar:', error);
        throw new Error(`Erro ao ativar site: ${error.message}`);
      }

      console.log('Site atualizado:', data);
      alert('✅ Site ativado com sucesso!');
      
      // Limpar resultados antigos e reexecutar os testes
      setResults({});
      setTimeout(() => {
        runTests();
      }, 1000); // Aguardar 1 segundo para garantir que a atualização foi processada
    } catch (error: any) {
      console.error('Erro completo:', error);
      alert(`❌ Erro ao ativar site: ${error.message}`);
    } finally {
      setActivating(false);
    }
  };

  const runTests = async () => {
    setLoading(true);
    const testResults: any = {};

    try {
      // 1. Teste de conexão básica
      console.log('🔗 Testando conexão...');
      const { data: connectionTest, error: connectionError } = await blogSupabase
        .from('blog_posts')
        .select('id')
        .limit(1);
      
      testResults.connection = {
        success: !connectionError,
        error: connectionError?.message
      };

      // 2. Verificar se o site existe
      console.log('🏢 Verificando site...');
      const { data: siteData, error: siteError } = await blogSupabase
        .from('sites')
        .select('*')
        .eq('id', SITE_ID);
      
      testResults.site = {
        exists: siteData && siteData.length > 0,
        data: siteData?.[0],
        error: siteError?.message
      };

      // 3. Contar todos os posts
      console.log('📊 Contando todos os posts...');
      const { count: totalPosts, error: countError } = await blogSupabase
        .from('blog_posts')
        .select('*', { count: 'exact', head: true });
      
      testResults.totalPosts = {
        count: totalPosts,
        error: countError?.message
      };

      // 4. Buscar posts do site
      console.log('🎯 Buscando posts do site...');
      const { data: sitePosts, error: sitePostsError, count: sitePostsCount } = await blogSupabase
        .from('blog_posts')
        .select('*', { count: 'exact' })
        .eq('site_id', SITE_ID);
      
      testResults.sitePosts = {
        count: sitePostsCount,
        posts: sitePosts,
        error: sitePostsError?.message
      };

      // 5. Buscar posts publicados
      console.log('📢 Buscando posts publicados...');
      const { data: publishedPosts, error: publishedError, count: publishedCount } = await blogSupabase
        .from('blog_posts')
        .select('*', { count: 'exact' })
        .eq('site_id', SITE_ID)
        .eq('status', 'published');
      
      testResults.publishedPosts = {
        count: publishedCount,
        posts: publishedPosts,
        error: publishedError?.message
      };

      // 6. Listar todos os sites disponíveis
      console.log('🌐 Listando todos os sites...');
      const { data: allSites, error: allSitesError } = await blogSupabase
        .from('sites')
        .select('*');
      
      testResults.allSites = {
        sites: allSites,
        error: allSitesError?.message
      };

    } catch (error: any) {
      testResults.generalError = error.message;
    }

    setResults(testResults);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🔍 Debug do Blog - Médicos
          </h1>

          <div className="mb-6 flex gap-3">
            <button
              onClick={runTests}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? '⏳ Executando testes...' : '🧪 Executar Testes'}
            </button>
            <button
              onClick={activateSite}
              disabled={activating}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {activating ? '⏳ Ativando...' : '🟢 Ativar Site'}
            </button>
          </div>

          {Object.keys(results).length > 0 && (
            <div className="space-y-6">
              {/* Informações de Configuração */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">⚙️ Configuração:</h2>
                <p><strong>Site ID:</strong> {SITE_ID}</p>
                <p><strong>URL Supabase:</strong> {import.meta.env.VITE_BLOG_SUPABASE_URL}</p>
                <p><strong>Chave configurada:</strong> {import.meta.env.VITE_BLOG_SUPABASE_ANON_KEY ? '✅ Sim' : '❌ Não'}</p>
              </div>

              {/* Teste de Conexão */}
              <div className={`p-4 rounded-lg ${results.connection?.success ? 'bg-green-50' : 'bg-red-50'}`}>
                <h2 className="text-lg font-semibold mb-2">
                  {results.connection?.success ? '✅' : '❌'} Conexão com Supabase:
                </h2>
                {results.connection?.error && (
                  <p className="text-red-600">Erro: {results.connection.error}</p>
                )}
              </div>

              {/* Verificação do Site */}
              <div className={`p-4 rounded-lg ${results.site?.exists ? 'bg-green-50' : 'bg-yellow-50'}`}>
                <h2 className="text-lg font-semibold mb-2">
                  {results.site?.exists ? '✅' : '⚠️'} Site no banco:
                </h2>
                {results.site?.data ? (
                  <div>
                    <p><strong>Nome:</strong> {results.site.data.name}</p>
                    <p><strong>Display Name:</strong> {results.site.data.display_name}</p>
                    <p><strong>Domínio:</strong> {results.site.data.domain}</p>
                    <p><strong>Ativo:</strong> {results.site.data.is_active ? 'Sim' : 'Não'}</p>
                  </div>
                ) : (
                  <p className="text-yellow-600">Site não encontrado no banco de dados!</p>
                )}
              </div>

              {/* Total de Posts */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">📊 Total de Posts no banco:</h2>
                <p className="text-2xl font-bold">{results.totalPosts?.count || 0}</p>
              </div>

              {/* Posts do Site */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">🎯 Posts do site Médicos:</h2>
                <p className="text-2xl font-bold">{results.sitePosts?.count || 0}</p>
                {results.sitePosts?.posts && results.sitePosts.posts.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {results.sitePosts.posts.map((post: any) => (
                      <div key={post.id} className="bg-white p-3 rounded border">
                        <h3 className="font-semibold">{post.title}</h3>
                        <p className="text-sm text-gray-600">
                          Status: {post.status} | ID: {post.id}
                        </p>
                        <p className="text-sm text-gray-600">
                          Criado: {new Date(post.created_at).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Posts Publicados */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">📢 Posts Publicados:</h2>
                <p className="text-2xl font-bold">{results.publishedPosts?.count || 0}</p>
                {results.publishedPosts?.posts && results.publishedPosts.posts.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {results.publishedPosts.posts.map((post: any) => (
                      <div key={post.id} className="bg-white p-3 rounded border">
                        <h3 className="font-semibold">{post.title}</h3>
                        <p className="text-sm text-gray-600">
                          Publicado: {post.published_at ? new Date(post.published_at).toLocaleString() : 'Não definido'}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Todos os Sites */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">🌐 Todos os Sites Disponíveis:</h2>
                {results.allSites?.sites && (
                  <div className="space-y-2">
                    {results.allSites.sites.map((site: any) => (
                      <div key={site.id} className="bg-white p-3 rounded border">
                        <h3 className="font-semibold">{site.display_name}</h3>
                        <p className="text-sm text-gray-600">
                          ID: {site.id} | Nome: {site.name} | Domínio: {site.domain}
                        </p>
                        <p className="text-sm text-gray-600">
                          Ativo: {site.is_active ? 'Sim' : 'Não'}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Erros Gerais */}
              {results.generalError && (
                <div className="bg-red-50 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold mb-2">❌ Erro Geral:</h2>
                  <p className="text-red-600">{results.generalError}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
