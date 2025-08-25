import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye, Star } from 'lucide-react';
import { BlogPostWithDetails } from '../../lib/blogSupabase';
import { formatDate, formatReadingTime, formatViews } from '../../utils/formatters';

interface BlogCardProps {
  post: BlogPostWithDetails;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const {
    title,
    excerpt,
    featured_image,
    featured_image_alt,
    url,
    published_date,
    reading_time,
    author,
    categories,
    views,
    featured
  } = post;

  return (
    <article className={`bg-white rounded-2xl shadow-card hover:shadow-card-hover overflow-hidden transition-all duration-500 hover:-translate-y-3 transform border border-gray-100 ${featured ? 'ring-2 ring-red-400 shadow-red-100' : ''}`}>
      {/* Imagem Destacada */}
      {featured_image && (
        <Link to={url} className="block relative">
          <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
            <img
              src={featured_image}
              alt={featured_image_alt || title}
              className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            {featured && (
              <div className="absolute top-4 left-4">
                <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 text-xs font-bold rounded-full flex items-center shadow-2xl">
                  <Star size={12} className="mr-1" />
                  DESTAQUE
                </span>
              </div>
            )}
          </div>
        </Link>
      )}

      <div className="p-6 bg-gradient-to-br from-white to-gray-50">
        {/* Categorias */}
        {categories && categories.length > 0 && (
          <div className="mb-4">
            {categories.slice(0, 2).map(category => (
              <Link
                key={category.id}
                to={`/blog/categoria/${category.slug}`}
                className="inline-block bg-gradient-to-r from-red-100 to-red-50 text-red-700 text-xs font-bold px-4 py-2 rounded-full mr-2 hover:from-red-200 hover:to-red-100 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}

        {/* Título */}
        <h2 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 leading-tight">
          <Link to={url} className="hover:text-red-600 transition-colors duration-300 hover:underline">
            {title}
          </Link>
        </h2>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
            {excerpt}
          </p>
        )}

        {/* Meta informações */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-6 p-3 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex items-center space-x-4">
            {/* Autor */}
            {author && (
              <div className="flex items-center space-x-2">
                {author.avatar_url && (
                  <img
                    src={author.avatar_url}
                    alt={author.name}
                    className="w-7 h-7 rounded-full border-2 border-white shadow-md"
                  />
                )}
                <span className="font-semibold text-gray-700">{author.name}</span>
              </div>
            )}

            {/* Data */}
            <time className="text-gray-500 font-medium">
              {formatDate(published_date)}
            </time>
          </div>

          <div className="flex items-center space-x-4">
            {/* Tempo de leitura */}
            {reading_time && (
              <div className="flex items-center space-x-1 text-gray-600">
                <Clock size={14} className="text-red-500" />
                <span className="font-medium">{formatReadingTime(reading_time)}</span>
              </div>
            )}

            {/* Visualizações */}
            {views > 0 && (
              <div className="flex items-center space-x-1 text-gray-600">
                <Eye size={14} className="text-red-500" />
                <span className="font-medium">{formatViews(views)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Botão Ler Mais */}
        <Link
          to={url}
          className="group inline-flex items-center justify-center w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <span>Ler artigo completo</span>
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
};
