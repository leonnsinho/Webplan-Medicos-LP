/**
 * Formata data para exibição
 */
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Formata tempo de leitura
 */
export const formatReadingTime = (minutes: number): string => {
  if (minutes < 1) return 'Menos de 1 min de leitura';
  if (minutes === 1) return '1 min de leitura';
  return `${minutes} min de leitura`;
};

/**
 * Trunca texto
 */
export const truncateText = (text: string, maxLength = 150): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Formata número de visualizações
 */
export const formatViews = (views: number): string => {
  if (views < 1000) return views.toString();
  if (views < 1000000) return `${(views / 1000).toFixed(1)}k`;
  return `${(views / 1000000).toFixed(1)}M`;
};

/**
 * Formata data relativa (ex: "há 2 dias")
 */
export const formatRelativeDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Hoje';
  if (diffInDays === 1) return 'Ontem';
  if (diffInDays < 7) return `Há ${diffInDays} dias`;
  if (diffInDays < 30) return `Há ${Math.floor(diffInDays / 7)} semanas`;
  if (diffInDays < 365) return `Há ${Math.floor(diffInDays / 30)} meses`;
  return `Há ${Math.floor(diffInDays / 365)} anos`;
};
