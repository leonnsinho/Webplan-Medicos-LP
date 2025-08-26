import React, { useEffect } from 'react';
import { BlogList } from '../components/blog/BlogList';
import { generateBlogListSEO } from '../utils/seo';
import AnimatedSection from '../components/AnimatedSection';

export const BlogIndexPage: React.FC = () => {
  useEffect(() => {
    generateBlogListSEO(
      'Blog | Webplan Médicos',
      'Fique por dentro das últimas novidades sobre planos de saúde para médicos e profissionais de saúde. Dicas, análises e muito mais!'
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <AnimatedSection className="bg-gradient-to-r from-red-600 to-red-700 text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Blog Webplan Médicos
          </h1>
          <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
            Fique por dentro das últimas novidades sobre planos de saúde para médicos e profissionais de saúde
          </p>
        </div>
      </AnimatedSection>

      {/* Todos os posts */}
      <AnimatedSection className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Artigos e Novidades
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Conteúdo atualizado sobre planos de saúde e benefícios para profissionais da medicina
            </p>
          </div>
          
          <BlogList 
            limit={12}
            showSearch={true}
            showPagination={true}
          />
        </div>
      </AnimatedSection>
    </div>
  );
};
