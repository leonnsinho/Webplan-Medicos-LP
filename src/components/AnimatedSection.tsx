import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  duration?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 50, opacity: 0 };
      case 'down':
        return { y: -50, opacity: 0 };
      case 'left':
        return { x: -50, opacity: 0 };
      case 'right':
        return { x: 50, opacity: 0 };
      case 'fade':
        return { opacity: 0 };
      default:
        return { y: 50, opacity: 0 };
    }
  };

  const getFinalPosition = () => {
    return { x: 0, y: 0, opacity: 1 };
  };

  return (
    <motion.div
      className={className}
      initial={getInitialPosition()}
      whileInView={getFinalPosition()}
      viewport={{ 
        once: true, 
        amount: 0.1,
        margin: "0px 0px -100px 0px"
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
