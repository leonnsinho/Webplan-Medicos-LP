// Configurações de animação padrão para o projeto
export const animations = {
  // Animações de entrada para seções
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" as const }
  },
  
  fadeInDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" as const }
  },
  
  fadeInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" as const }
  },
  
  fadeInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" as const }
  },
  
  // Animações de hover
  scaleOnHover: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.2 }
  },
  
  // Animações de botões
  buttonPrimary: {
    whileHover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)"
    },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.2 }
  },
  
  // Animações de cards
  cardHover: {
    whileHover: { 
      scale: 1.02,
      y: -5,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
    },
    transition: { duration: 0.3 }
  },
  
  // Animações staggered para listas
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  },
  
  // Configurações de viewport
  viewport: {
    once: true,
    amount: 0.1,
    margin: "0px 0px -50px 0px"
  }
};

// Variantes para texto animado
export const textAnimations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  },
  child: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    }
  }
};

// Animações de página
export const pageTransitions = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: "easeOut" as const }
};
