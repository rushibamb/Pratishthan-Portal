import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const LazySection = ({ children, threshold = 0.1, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Add a small delay to ensure smooth loading
          setTimeout(() => setIsLoaded(true), 100);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={className}>
      {isVisible ? (
        <div className={`transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {children}
        </div>
      ) : (
        <div className="h-96 bg-gradient-to-br from-orange-50 to-amber-50 animate-pulse rounded-lg"></div>
      )}
    </div>
  );
};

LazySection.propTypes = {
  children: PropTypes.node.isRequired,
  threshold: PropTypes.number,
  className: PropTypes.string
};

export default LazySection;
