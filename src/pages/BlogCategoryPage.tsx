import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BlogList } from '../components/blog/BlogList';
import { BlogService } from '../services/blogService';
import { BlogCategory } from '../lib/blogSupabase';
import { generateBlogListSEO } from '../utils/seo';
import AnimatedSection from '../components/AnimatedSection';
import { ArrowLeft } from 'lucide-react';

export const BlogCategoryPage: React.FC = () => {
  const { category: categorySlug } = useParams<{ category: string }>();
  const [category, setCategory] = useState<BlogCategory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categorySlug) {
      loadCategory();
    }
  }, [categorySlug]);

  const loadCategory = async () => {
    if (!categorySlug) return;

    try {
      const categories = await BlogService.getCategories();
      const foundCategory = categories.find(cat => cat.slug === categorySlug);
      
      if (foundCategory) {
        setCategory(foundCategory);
        generateBlogListSEO(
          `${foundCategory.name} | Blog Webplan Médicos`,
          foundCategory.description || `Posts sobre ${foundCategory.name} - Webplan Médicos`
        );
      }
    } catch (error) {
      console.error('Erro ao carregar categoria:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <div className="py-16">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Categoria não encontrada</h1>
            <p className="text-gray-600 mb-8">A categoria solicitada não existe ou foi removida.</p>
            <Link to="/blog" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors inline-block">
              Voltar para o Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <AnimatedSection className="bg-gradient-to-r from-red-600 to-red-700 text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <div className="flex items-center space-x-2 text-red-100">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-white">{category.name}</span>
            </div>
          </nav>

          {/* Botão Voltar */}
          <div className="mb-6">
            <Link
              to="/blog"
              className="flex items-center text-red-100 hover:text-white transition-colors w-fit"
            >
              <ArrowLeft size={20} className="mr-2" />
              Voltar para o Blog
            </Link>
          </div>

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </AnimatedSection>

      {/* Posts da categoria */}
      <AnimatedSection className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogList 
            category={categorySlug}
            limit={12}
            showSearch={true}
            showPagination={true}
            title={`Posts em ${category.name}`}
          />
        </div>
      </AnimatedSection>
    </div>
  );
};
