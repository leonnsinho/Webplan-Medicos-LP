import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye, Star, ArrowRight, Tag, Calendar, User } from 'lucide-react';
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
    slug,
    published_date,
    reading_time,
    author,
    categories,
    views,
    featured
  } = post;

  const url = `/blog/${slug}`;

  return (
    <article className="group relative h-[480px] overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 transform-gpu border-2 border-blue-200 hover:border-blue-400">
      {/* Background com blur effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-slate-100 opacity-90"></div>
      <div className="absolute inset-0 backdrop-blur-sm bg-gray-100/70 border border-blue-300/20 rounded-2xl shadow-2xl"></div>
      
      {/* Imagem Destacada */}
      {featured_image && (
        <Link to={url} className="block relative z-10">
          <div className="relative overflow-hidden h-48 rounded-t-2xl">
            <img
              src={featured_image}
              alt={featured_image_alt || title}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            {featured && (
              <div className="absolute top-4 right-4">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 text-sm font-bold rounded-full flex items-center shadow-xl animate-pulse">
                  <Star size={14} className="mr-2" />
                  Destaque
                </span>
              </div>
            )}
          </div>
        </Link>
      )}

      <div className="relative z-10 p-8 h-full flex flex-col justify-between">
        {/* Categorias com efeito glassmorphism */}
        {categories && categories.length > 0 && (
          <div className="mb-6">
            {categories.slice(0, 2).map(category => (
              <Link
                key={category.id}
                to={`/blog/categoria/${category.slug}`}
                className="inline-flex items-center backdrop-blur-md bg-gray-200/40 border border-gray-300/50 text-gray-800 text-sm px-4 py-2 rounded-full mr-3 hover:bg-gray-300/50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Tag size={12} className="mr-2 text-red-500" />
                {category.name}
              </Link>
            ))}
          </div>
        )}

        {/* Título com gradiente */}
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-red-600 to-gray-900 bg-clip-text text-transparent mb-4 line-clamp-2 leading-tight">
          <Link to={url} className="hover:from-red-600 hover:via-red-700 hover:to-red-800 transition-all duration-300">
            {title}
          </Link>
        </h2>

        {/* Excerpt com background glassmorphism */}
        {excerpt && (
          <div className="backdrop-blur-sm bg-gray-200/30 border border-gray-300/40 rounded-xl p-4 mb-6">
            <p className="text-gray-700 line-clamp-4 leading-relaxed">
              {excerpt}
            </p>
          </div>
        )}

        {/* Meta informações com cards separados */}
        <div className="space-y-3 mb-6">
          {/* Autor */}
          {author && (
            <div className="flex items-center space-x-3 backdrop-blur-sm bg-gray-200/35 border border-gray-300/40 rounded-lg p-3">
              {author.avatar_url ? (
                <img
                  src={author.avatar_url}
                  alt={author.name}
                  className="w-8 h-8 rounded-full border-2 border-gray-300 shadow-md"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
              )}
              <span className="font-semibold text-gray-800">{author.name}</span>
            </div>
          )}

          {/* Data e estatísticas */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2 backdrop-blur-sm bg-gray-200/35 border border-gray-300/40 rounded-lg p-3">
              <Calendar size={16} className="text-red-500" />
              <time className="text-sm font-medium text-gray-700">{formatDate(published_date)}</time>
            </div>

            {reading_time && (
              <div className="flex items-center space-x-2 backdrop-blur-sm bg-gray-200/35 border border-gray-300/40 rounded-lg p-3">
                <Clock size={16} className="text-red-500" />
                <span className="text-sm font-medium text-gray-700">{formatReadingTime(reading_time)}</span>
              </div>
            )}
          </div>

          {views > 0 && (
            <div className="flex items-center justify-center space-x-2 backdrop-blur-sm bg-gray-200/35 border border-gray-300/40 rounded-lg p-3">
              <Eye size={16} className="text-red-500" />
              <span className="text-sm font-medium text-gray-700">{formatViews(views)} visualizações</span>
            </div>
          )}
        </div>

        {/* Botão com efeito neon */}
        <Link
          to={url}
          className="group relative inline-flex items-center justify-center w-full bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white px-8 py-4 rounded-xl hover:from-red-600 hover:via-red-700 hover:to-red-800 transition-all duration-300 font-semibold shadow-2xl hover:shadow-red-500/50 transform hover:scale-105 border border-red-400/50 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-red-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <span className="relative z-10">Ler artigo completo</span>
          <ArrowRight size={18} className="relative z-10 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
        </Link>
      </div>
    </article>
  );
};
