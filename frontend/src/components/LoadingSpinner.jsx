import React from 'react';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'orange', 
  text = 'Loading...', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-20 w-20'
  };

  const colorClasses = {
    orange: 'border-orange-500',
    red: 'border-red-500',
    amber: 'border-amber-500',
    yellow: 'border-yellow-500'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div 
        className={`${sizeClasses[size]} ${colorClasses[color]} border-4 border-t-transparent rounded-full animate-spin`}
      ></div>
      {text && (
        <p className={`mt-4 text-${color}-700 font-medium text-center`}>
          {text}
        </p>
      )}
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  color: PropTypes.oneOf(['orange', 'red', 'amber', 'yellow']),
  text: PropTypes.string,
  className: PropTypes.string
};

export default LoadingSpinner;
