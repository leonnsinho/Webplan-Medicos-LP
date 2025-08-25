import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlogService } from '../services/blogService';
import { BlogPostWithDetails } from '../lib/blogSupabase';
import { formatDate, formatReadingTime } from '../utils/formatters';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

export const BlogPreview: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const result = await BlogService.getFeaturedPosts(3);
      setPosts(result.posts);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-8 max-w-md mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-lg p-6">
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <BookOpen size={32} className="text-red-600 mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Blog Webplan
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fique por dentro das últimas novidades sobre planos de saúde para enfermeiros
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {posts.map((post, index) => (
            <AnimatedSection 
              key={post.id}
              delay={index * 0.1}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {post.featured_image && (
                <Link to={post.url}>
                  <img
                    src={post.featured_image}
                    alt={post.featured_image_alt || post.title}
                    className="w-full h-48 object-cover"
                  />
                </Link>
              )}
              
              <div className="p-6">
                {/* Categorias */}
                {post.categories && post.categories.length > 0 && (
                  <div className="mb-3">
                    <span className="inline-block bg-red-100 text-red-700 text-xs px-2 py-1 rounded">
                      {post.categories[0].name}
                    </span>
                  </div>
                )}

                {/* Título */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  <Link to={post.url} className="hover:text-red-600 transition-colors">
                    {post.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{formatDate(post.published_date)}</span>
                  {post.reading_time && (
                    <span className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {formatReadingTime(post.reading_time)}
                    </span>
                  )}
                </div>

                {/* Link */}
                <Link
                  to={post.url}
                  className="inline-flex items-center text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  Leia mais
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center bg-red-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Ver todos os posts
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};
