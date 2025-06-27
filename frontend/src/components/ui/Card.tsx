import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  padding = 'md',
  glass = true
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const glassClasses = glass 
    ? 'bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10' 
    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700';
  
  return (
    <div className={`rounded-2xl shadow-xl ${glassClasses} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
};