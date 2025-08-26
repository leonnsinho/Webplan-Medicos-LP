import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye, Star, ArrowRight, Tag, Calendar, User } from 'lucide-react';
import { BlogPostWithDetails } from '../../lib/blogSupabase';
import { formatDate, formatReadingTime, formatViews } from '../../utils/formatters';

interface BlogCardProps {
  post: BlogPostWithDetails;
}

// Função para converter Markdown no frontend
function renderMarkdown(markdown: string): string {
  if (!markdown) return '';
  
  let html = markdown;
  
  // Negrito
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
  
  // Itálico
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, 
    '<a href="$2" class="text-blue-600 hover:text-blue-800 underline" target="_blank">$1</a>');
  
  // Títulos
  html = html.replace(/^##\s+(.+)$/gm, 
    '<h2 class="text-2xl font-bold text-gray-900 mb-4 mt-6">$1</h2>');
  
  // Converter quebras de linha em parágrafos
  const lines = html.split('\n');
  const paragraphs = lines.map(line => {
    if (line.trim() && !line.startsWith('<h') && !line.includes('<img') && !line.includes('<strong') && !line.includes('<em')) {
      return `<p class="mb-4 leading-relaxed">${line}</p>`;
    }
    return line;
  });
  
  return paragraphs.join('\n');
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
    <article className={`group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-blue-200 hover:border-blue-400 flex flex-col ${featured_image ? 'h-[480px]' : 'h-[320px]'}`}>
      {/* Imagem Destacada - só renderiza se existir */}
      {featured_image && (
        <Link to={url} className="block flex-shrink-0">
          <div className="relative overflow-hidden h-48">
            <img
              src={featured_image}
              alt={featured_image_alt || title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {featured && (
              <div className="absolute top-3 right-3">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 text-xs font-bold rounded-full flex items-center">
                  <Star size={12} className="mr-1" />
                  Destaque
                </span>
              </div>
            )}
          </div>
        </Link>
      )}

      {/* Conteúdo - layout adaptativo baseado na presença de imagem */}
      <div className={`p-6 ${featured_image ? 'flex-1 flex flex-col' : 'flex-1 flex flex-col'}`}>
        {/* Categorias */}
        {categories && categories.length > 0 && (
          <div className="mb-4">
            {categories.slice(0, 2).map(category => (
              <Link
                key={category.id}
                to={`/blog/categoria/${category.slug}`}
                className="inline-flex items-center bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full mr-2 hover:bg-gray-200 transition-colors duration-200"
              >
                <Tag size={12} className="mr-1 text-red-500" />
                {category.name}
              </Link>
            ))}
          </div>
        )}

        {/* Título */}
        <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
          <Link to={url} className="hover:text-red-600 transition-colors duration-200">
            <span dangerouslySetInnerHTML={{ __html: renderMarkdown(title) }} />
          </Link>
        </h2>

        {/* Excerpt */}
        {excerpt && (
          <div 
            className={`text-gray-600 mb-4 line-clamp-3 leading-relaxed text-sm ${featured_image ? 'flex-grow' : ''}`}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(excerpt) }}
          />
        )}

        {/* Meta informações */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center space-x-3">
            {/* Autor */}
            {author && (
              <div className="flex items-center space-x-2">
                {author.avatar_url ? (
                  <img
                    src={author.avatar_url}
                    alt={author.name}
                    className="w-5 h-5 rounded-full"
                  />
                ) : (
                  <User size={12} className="text-gray-400" />
                )}
                <span className="font-medium">{author.name}</span>
              </div>
            )}

            {/* Data */}
            <div className="flex items-center space-x-1">
              <Calendar size={12} className="text-gray-400" />
              <time>{formatDate(published_date)}</time>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Tempo de leitura */}
            {reading_time && (
              <div className="flex items-center space-x-1">
                <Clock size={12} className="text-gray-400" />
                <span>{formatReadingTime(reading_time)}</span>
              </div>
            )}

            {/* Visualizações */}
            {views > 0 && (
              <div className="flex items-center space-x-1">
                <Eye size={12} className="text-gray-400" />
                <span>{formatViews(views)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Botão Ler Mais - com layout condicional */}
        <Link
          to={url}
          className={`group inline-flex items-center justify-center w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium ${featured_image ? 'mt-auto' : 'mt-2'}`}
        >
          <span>Ler artigo completo</span>
          <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </article>
  );
};
