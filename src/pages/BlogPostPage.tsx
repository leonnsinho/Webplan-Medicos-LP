import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, Share2, Clock, Eye, Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import { BlogService } from '../services/blogService';
import { BlogPostWithDetails } from '../lib/blogSupabase';
import { formatDate, formatReadingTime, formatViews } from '../utils/formatters';
import { generateSEOTags } from '../utils/seo';
import AnimatedSection from '../components/AnimatedSection';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (slug) {
      loadPost();
    }
  }, [slug]);

  const loadPost = async () => {
    if (!slug) return;

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
      setPost(prev => prev ? { ...prev, likes: newLikes } : null);
      setLiked(true);
    } catch (err) {
      console.error('Erro ao curtir post:', err);
    }
  };

  const handleShare = async () => {
    if (!post) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href
        });
      } catch (err) {
        // Usuário cancelou o compartilhamento
      }
    } else {
      // Fallback: copiar URL
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copiado para a área de transferência!');
      } catch (err) {
        console.error('Erro ao copiar link:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-8"></div>
            <div className="h-64 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <div className="py-16">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post não encontrado</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <div className="space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Voltar
              </button>
              <Link to="/blog" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors inline-block">
                Ir para o Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-red-600 transition-colors">Blog</Link>
            {post.categories && post.categories[0] && (
              <>
                <span>/</span>
                <Link 
                  to={`/blog/categoria/${post.categories[0].slug}`} 
                  className="hover:text-red-600 transition-colors"
                >
                  {post.categories[0].name}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-gray-500">{post.title}</span>
          </div>
        </nav>

        {/* Botão Voltar */}
        <AnimatedSection className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-red-600 hover:text-red-700 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Voltar
          </button>
        </AnimatedSection>

        {/* Header */}
        <AnimatedSection>
          <header className="mb-8">
            {/* Categorias */}
            {post.categories && post.categories.length > 0 && (
              <div className="mb-4">
                {post.categories.map(category => (
                  <Link
                    key={category.id}
                    to={`/blog/categoria/${category.slug}`}
                    className="inline-block bg-red-100 text-red-700 text-sm px-3 py-1 rounded mr-2 hover:bg-red-200 transition-colors"
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
            <div className="flex flex-wrap items-center justify-between border-b border-gray-200 pb-6 gap-4">
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
                      <p className="font-medium text-gray-900 flex items-center">
                        <User size={16} className="mr-1" />
                        {post.author.name}
                      </p>
                      {post.author.bio && (
                        <p className="text-sm text-gray-600">{post.author.bio}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                {/* Data */}
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  {formatDate(post.published_date)}
                </div>

                {/* Tempo de leitura */}
                {post.reading_time && (
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    {formatReadingTime(post.reading_time)}
                  </div>
                )}

                {/* Visualizações */}
                <div className="flex items-center">
                  <Eye size={16} className="mr-1" />
                  {formatViews(post.views)}
                </div>
              </div>
            </div>
          </header>
        </AnimatedSection>

        {/* Imagem destacada */}
        {post.featured_image && (
          <AnimatedSection className="mb-8">
            <img
              src={post.featured_image}
              alt={post.featured_image_alt || post.title}
              className="w-full rounded-lg shadow-lg"
            />
          </AnimatedSection>
        )}

        {/* Conteúdo */}
        <AnimatedSection className="mb-8">
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </AnimatedSection>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <AnimatedSection className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
              <Tag size={20} className="mr-2" />
              Tags:
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Link
                  key={tag.id}
                  to={`/blog/tag/${tag.slug}`}
                  className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded hover:bg-gray-200 transition-colors"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* Ações */}
        <AnimatedSection>
          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <div className="flex items-center space-x-4">
              {/* Curtir */}
              <button
                onClick={handleLike}
                disabled={liked}
                className={`flex items-center space-x-2 px-4 py-2 rounded transition-colors ${
                  liked 
                    ? 'bg-red-100 text-red-700 cursor-not-allowed' 
                    : 'bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-700'
                }`}
              >
                <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
                <span>{post.likes} curtidas</span>
              </button>

              {/* Compartilhar */}
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors"
              >
                <Share2 size={20} />
                <span>Compartilhar</span>
              </button>
            </div>

            <div className="text-sm text-gray-500 flex items-center">
              <Eye size={16} className="mr-1" />
              {formatViews(post.views)} visualizações
            </div>
          </div>
        </AnimatedSection>
      </article>
    </div>
  );
};
