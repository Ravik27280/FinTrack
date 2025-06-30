import React from 'react';

interface BoltBadgeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'gradient';
}

export const BoltBadge: React.FC<BoltBadgeProps> = ({ 
  className = '', 
  size = 'md',
  variant = 'default'
}) => {
  const sizes = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10'
  };

  const variants = {
    default: 'https://img.shields.io/badge/Built%20with-Bolt.new-FF6B6B?style=for-the-badge&logo=bolt&logoColor=white',
    minimal: 'https://img.shields.io/badge/Built%20with-Bolt.new-000000?style=flat-square&logo=bolt&logoColor=white',
    gradient: 'https://img.shields.io/badge/Built%20with-Bolt.new-FF6B6B?style=for-the-badge&logo=bolt&logoColor=white&gradient=true'
  };

  return (
    <div className={`inline-flex items-center ${className}`}>
      <img 
        src={variants[variant]}
        alt="Built with Bolt.new"
        className={`${sizes[size]} transition-all duration-300 hover:scale-105 cursor-pointer`}
        onClick={() => window.open('https://bolt.new', '_blank')}
      />
    </div>
  );
};