import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NavItem } from '../types';
import logoImage from '../assets/images/Logotipo.svg';

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Escritório', href: '/sobre' },
  { 
    label: 'Operadoras', 
    href: '#', 
    hasDropdown: true,
    dropdownItems: [
      { label: 'Amil', href: '/amil' },
      { label: 'SulAmérica', href: '/sulamerica' },
      { label: 'São Camilo', href: '/sao-camilo' },
      { label: 'Alice', href: '/alice' },
      { label: 'Porto Seguro', href: '/porto-seguro' },
      { label: 'Bradesco Saúde', href: '/bradesco' },
      { label: 'Seguros Unimed', href: '/unimed' },
      { label: 'MedSênior', href: '/medsenior' }
    ]
  },
  { label: 'Blog', href: '/blog' },
  { label: 'Contato', href: '#contato' }
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    const handleClickOutside = (event: MouseEvent) => {
      const navbar = document.getElementById('mobile-navbar');
      if (navbar && !navbar.contains(event.target as Node)) {
        setIsOpen(false);
        setOpenDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavigation = (href: string) => {
    if (href.startsWith('#')) {
      // É um link de âncora
      if (location.pathname === '/') {
        // Já estamos na página inicial, fazer scroll
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Estamos em outra página, navegar para home e depois fazer scroll
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else if (href === '/') {
      // Navegação para Home
      if (location.pathname === '/') {
        // Já estamos na home, fazer scroll para o topo (hero section)
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Navegar para home
        navigate('/');
      }
    } else {
      // Para outras rotas (como /sobre), navegar diretamente
      navigate(href);
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Navbar */}
      <motion.nav 
        className="fixed top-4 left-4 right-4 z-50 transition-all duration-500 ease-out"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className={`mx-auto transition-all duration-500 ease-out ${
          isScrolled 
            ? 'max-w-5xl' 
            : 'max-w-6xl'
        }`}>
        <motion.div 
          id="mobile-navbar"
          className={`relative transition-all duration-500 ease-out ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-xl shadow-2xl border border-gray-200/50'
              : 'bg-white/90 backdrop-blur-lg shadow-xl border border-gray-100/30'
          } rounded-xl sm:rounded-2xl px-3 sm:px-6 ${
            isScrolled ? 'py-2 sm:py-3' : 'py-3 sm:py-4'
          }`}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00655D]/20 via-transparent to-[#00655D]/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          <div className="flex justify-between items-center relative z-10">
            {/* Logo with Animation */}
            <motion.div 
              className="flex-shrink-0 group flex items-center gap-1 sm:gap-2 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="relative flex-shrink-0"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <img src={logoImage} alt="Logotipo" className="h-8 sm:h-10" />
                <motion.div 
                  className="absolute -top-2 -right-2 w-2 h-2 bg-[#00655D] rounded-full opacity-0 group-hover:opacity-100"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </motion.div>
              <motion.span 
                className="font-bold text-[#005A53] text-sm sm:text-lg md:text-xl group-hover:text-[#00655D] transition-all duration-300 truncate"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="font-bold">Web</span><span className="font-light">Plan</span>
              </motion.span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className={`flex items-center transition-all duration-500 ${
                isScrolled ? 'space-x-0.5' : 'space-x-1'
              }`}>
                {navItems.map((item, index) => (
                  <div key={item.label} className="relative">
                    {item.hasDropdown ? (
                      <div 
                        className="relative group"
                        onMouseEnter={() => setOpenDropdown(item.label)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        <motion.button
                          className={`relative group transition-all duration-500 text-[#005A53] hover:text-[#00655D] font-medium rounded-xl hover:bg-teal-50/50 flex items-center gap-1 ${
                            isScrolled ? 'px-3 py-1.5' : 'px-4 py-2'
                          }`}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="relative z-10">{item.label}</span>
                          <ChevronDown 
                            size={16} 
                            className={`transform transition-transform duration-200 ${
                              openDropdown === item.label ? 'rotate-180' : ''
                            }`} 
                          />
                          
                          {/* Hover Background Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-teal-100 to-teal-50 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
                          
                          {/* Active Indicator */}
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#00655D] group-hover:w-3/4 transition-all duration-300" />
                        </motion.button>

                        {/* Dropdown Menu */}
                        <div className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200/50 transition-all duration-300 z-50 ${
                          openDropdown === item.label ? 'opacity-100 visible transform translate-y-0' : 'opacity-0 invisible transform translate-y-2'
                        }`}>
                          <div className="py-2">
                            {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                              <motion.button
                                key={dropdownItem.label}
                                onClick={() => {
                                  navigate(dropdownItem.href);
                                  setOpenDropdown(null);
                                }}
                                className="w-full text-left px-4 py-3 text-[#005A53] hover:text-[#00655D] hover:bg-teal-50 transition-all duration-200 flex items-center gap-3"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ 
                                  opacity: openDropdown === item.label ? 1 : 0,
                                  x: openDropdown === item.label ? 0 : -10
                                }}
                                transition={{ duration: 0.2, delay: dropdownIndex * 0.05 }}
                              >
                                <div className="w-2 h-2 bg-[#00655D] rounded-full"></div>
                                {dropdownItem.label}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <motion.button
                        onClick={() => handleNavigation(item.href)}
                        className={`relative group transition-all duration-500 text-[#005A53] hover:text-[#00655D] font-medium rounded-xl hover:bg-teal-50/50 ${
                          isScrolled ? 'px-3 py-1.5' : 'px-4 py-2'
                        }`}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10">{item.label}</span>
                        
                        {/* Hover Background Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-100 to-teal-50 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
                        
                        {/* Active Indicator */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#00655D] group-hover:w-3/4 transition-all duration-300" />
                      </motion.button>
                    )}
                  </div>
                ))}
                
                {/* Phone Number */}
                <motion.a
                  href="tel:+551141165378"
                  className={`ml-3 flex items-center gap-2 text-[#005A53] hover:text-[#00655D] font-medium transition-all duration-500 rounded-xl hover:bg-teal-50/50 ${
                    isScrolled ? 'px-3 py-2' : 'px-4 py-2.5'
                  }`}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="(11) 4116-5378"
                >
                  <Phone size={18} className="text-[#00655D]" />
                  <motion.span 
                    className="hidden lg:inline whitespace-nowrap overflow-hidden"
                    animate={{ 
                      width: isScrolled ? 0 : 'auto',
                      opacity: isScrolled ? 0 : 1,
                      marginLeft: isScrolled ? 0 : 8
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    (11) 4116-5378
                  </motion.span>
                </motion.a>
                
                {/* CTA Button */}
                <motion.button
                  onClick={() => handleNavigation('#contato')}
                  className={`ml-4 bg-gradient-to-r from-[#00655D] to-[#005A53] hover:from-[#005A53] hover:to-[#004B44] text-white rounded-xl font-semibold transition-all duration-500 transform hover:scale-105 hover:shadow-lg shadow-teal-200/50 ${
                    isScrolled ? 'px-4 py-2 text-sm' : 'px-6 py-2.5 text-base'
                  }`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-2">
                    {isScrolled ? 'Cotação' : 'Cotação Grátis'}
                    <ChevronDown size={16} className="transform rotate-[-90deg]" />
                  </span>
                </motion.button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative group p-2 text-[#005A53] hover:text-[#00655D] transition-colors duration-200"
              >
                <div className="absolute inset-0 bg-teal-100 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200" />
                <div className="relative z-10">
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden transition-all duration-300 ${
            isOpen ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="border-t border-gray-200/50 pt-4 pb-2 bg-white/95 backdrop-blur-sm rounded-b-xl">
              <div className="space-y-1 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-200 scrollbar-track-transparent">
                {navItems.map((item, index) => (
                  <div key={item.label}>
                    {item.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                          className="flex w-full items-center justify-between px-4 py-3 text-[#005A53] hover:text-[#00655D] hover:bg-teal-50/50 rounded-xl font-medium transition-all duration-200"
                          style={{ 
                            animationDelay: `${index * 50}ms`,
                            animation: isOpen ? 'slideInFromLeft 0.3s ease-out' : 'none'
                          }}
                        >
                          <span>{item.label}</span>
                          <ChevronDown 
                            size={16} 
                            className={`transform transition-transform duration-200 ${
                              openDropdown === item.label ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>
                        
                        {/* Mobile Dropdown Items */}
                        <div className={`overflow-hidden transition-all duration-300 ${
                          openDropdown === item.label ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                          <div className="pl-4 space-y-1 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-300 scrollbar-track-teal-50 rounded">
                            {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                              <motion.button
                                key={dropdownItem.label}
                                onClick={() => {
                                  navigate(dropdownItem.href);
                                  setIsOpen(false);
                                  setOpenDropdown(null);
                                }}
                                className="flex w-full items-center gap-3 px-4 py-2.5 text-[#00655D] hover:text-[#005A53] hover:bg-teal-50/70 rounded-lg font-medium transition-all duration-200 text-sm"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ 
                                  opacity: openDropdown === item.label ? 1 : 0,
                                  x: openDropdown === item.label ? 0 : -10
                                }}
                                transition={{ duration: 0.2, delay: dropdownIndex * 0.03 }}
                              >
                                <div className="w-1.5 h-1.5 bg-[#00655D] rounded-full flex-shrink-0"></div>
                                <span className="truncate">{dropdownItem.label}</span>
                              </motion.button>
                            ))}
                            {/* Indicador de scroll se necessário */}
                            {item.dropdownItems && item.dropdownItems.length > 6 && (
                              <div className="text-center py-1 text-xs text-[#00655D] italic">
                                ↓ Role para ver mais ↓
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleNavigation(item.href)}
                        className="block w-full text-left px-4 py-3 text-[#005A53] hover:text-[#00655D] hover:bg-teal-50/50 rounded-xl font-medium transition-all duration-200"
                        style={{ 
                          animationDelay: `${index * 50}ms`,
                          animation: isOpen ? 'slideInFromLeft 0.3s ease-out' : 'none'
                        }}
                      >
                        {item.label}
                      </button>
                    )}
                  </div>
                ))}
                
                {/* Phone Number Mobile */}
                <a
                  href="tel:+551141165378"
                  className="flex items-center gap-3 px-4 py-3 text-[#005A53] hover:text-[#00655D] hover:bg-teal-50/50 rounded-xl font-medium transition-all duration-200"
                  style={{ 
                    animationDelay: `${navItems.length * 50}ms`,
                    animation: isOpen ? 'slideInFromLeft 0.3s ease-out' : 'none'
                  }}
                >
                  <Phone size={20} className="text-[#00655D]" />
                  <span>(11) 4116-5378</span>
                </a>
                
                <button
                  onClick={() => handleNavigation('#contato')}
                  className="w-full mt-3 bg-gradient-to-r from-[#00655D] to-[#005A53] text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg"
                >
                  Cotação Grátis
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        </div>
      </motion.nav>

      {/* Custom Animations */}
      <style>{`
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        /* Scrollbar para mobile */
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .scrollbar-thumb-blue-300::-webkit-scrollbar-thumb {
          background-color: #93c5fd;
          border-radius: 3px;
        }
        
        .scrollbar-thumb-blue-200::-webkit-scrollbar-thumb {
          background-color: #bfdbfe;
          border-radius: 3px;
        }
        
        .scrollbar-track-blue-50::-webkit-scrollbar-track {
          background-color: #eff6ff;
          border-radius: 3px;
        }
        
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </>
  );
};

export default Navbar;