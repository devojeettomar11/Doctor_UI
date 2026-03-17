import React from 'react';

const loader = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-gray-200 border-t-blue-600 ${sizes[size]} ${className}`}
      />
    </div>
  );
};

export default loader;
