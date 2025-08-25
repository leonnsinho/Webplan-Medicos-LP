import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface BlogSearchProps {
  onSearch: (term: string) => void;
  placeholder?: string;
  initialValue?: string;
}

export const BlogSearch: React.FC<BlogSearchProps> = ({ 
  onSearch, 
  placeholder = "Buscar posts...",
  initialValue = ""
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Busca em tempo real com debounce
    if (value.length === 0) {
      onSearch('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
        />
        <Search 
          size={20} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 text-white px-4 py-1.5 rounded-md hover:bg-red-700 transition-colors text-sm"
      >
        Buscar
      </button>
    </form>
  );
};
