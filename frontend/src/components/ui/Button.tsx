import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 backdrop-blur-md';
  
  const variants = {
    primary: 'bg-blue-600/90 text-white hover:bg-blue-700/90 focus:ring-blue-500/50 shadow-lg shadow-blue-500/25 border border-blue-500/30',
    secondary: 'bg-green-600/90 text-white hover:bg-green-700/90 focus:ring-green-500/50 shadow-lg shadow-green-500/25 border border-green-500/30',
    outline: 'border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800 focus:ring-blue-500/50 backdrop-blur-md',
    ghost: 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 focus:ring-gray-500/50',
    glass: 'bg-white/20 dark:bg-slate-800/20 text-gray-800 dark:text-white border border-gray-300/50 dark:border-slate-600/50 hover:bg-white/30 dark:hover:bg-slate-800/30 focus:ring-blue-500/50 backdrop-blur-md'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};