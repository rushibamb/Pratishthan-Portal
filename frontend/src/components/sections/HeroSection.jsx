import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getContent } from '../../services/api';
import { getOptimizedUrl } from '../../utils/cloudinary';
import logo from '../../assets/logo_f.jpg';

const HeroSection = ({ language }) => {
  const [content, setContent] = useState({
    heading: { english: '', marathi: '' },
    subtitle: { english: '', marathi: '' },
    imageUrl: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await getContent('hero');
        if (data.content) {
          setContent(data.content);
        }
      } catch (error) {
        console.error("Failed to fetch hero content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="relative h-[70vh] flex items-center justify-center bg-gradient-to-br from-orange-900 via-red-800 to-yellow-600">
        <div className="animate-pulse">
          <div className="w-20 h-20 mx-auto mb-6 bg-yellow-400/30 rounded-full flex items-center justify-center">
            <i className="ri-temple-line text-3xl text-yellow-200 w-8 h-8 flex items-center justify-center"></i>
          </div>
          <div className="text-yellow-200 text-xl font-medium">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <section id="home" className="relative min-h-[85vh] sm:min-h-[90vh] md:min-h-[95vh] flex items-center justify-center overflow-hidden pt-20 hero-section-xs">
      {/* Enhanced background with multiple layers */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed bg-no-repeat"
        style={{ 
          backgroundImage: `url('${getOptimizedUrl(content.imageUrl, { width: 1920, quality: 'auto' })}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.8) contrast(1.1)'
        }}
      />
      
      {/* Enhanced gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/85 via-red-900/75 to-yellow-600/65 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent z-10" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-400/10 rounded-full animate-pulse hidden md:block"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-orange-400/10 rounded-full animate-pulse delay-1000 hidden md:block"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-red-400/10 rounded-full animate-pulse delay-500 hidden lg:block"></div>
      </div>
      
      {/* Main content container */}
      <div className="relative z-20 max-w-5xl mx-auto px-3 sm:px-4 md:px-6 text-center flex flex-col justify-center min-h-full hero-content-xs py-8">
        <div className="mb-6 sm:mb-8 pt-8 sm:pt-10 md:pt-12 lg:pt-16">
          {/* Enhanced logo */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 sm:mb-6 md:mb-8 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300 animate-bounce hero-icon-xs overflow-hidden border-4 border-yellow-300 ">
            <img src={logo} alt="Ganesha Logo" className="w-full h-full object-cover" />
          </div>
          
          {/* Enhanced heading with responsive sizing */}
          {/* FIX: Added py-2 for vertical padding to prevent clipping */}
          <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 drop-shadow-2xl ${
            language === 'english' ? 'font-english leading-tight tracking-wide' : 'font-marathi-alt leading-relaxed tracking-wide'
          } bg-gradient-to-r from-yellow-300 via-orange-200 to-red-200 bg-clip-text text-transparent animate-fade-in-up px-2 sm:px-4 py-2 hero-heading-xs break-words relative z-10`}>
            {content.heading && content.heading[language]}
          </h1>
          
          {/* Enhanced subtitle with responsive sizing */}
          <p className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-6 sm:mb-8 md:mb-10 font-medium leading-relaxed font-subtitle ${
            language === 'english' ? 'tracking-wide' : 'tracking-normal'
          } text-yellow-100 drop-shadow-lg max-w-4xl mx-auto animate-fade-in-up delay-300 px-2 sm:px-4 hero-subtitle-xs`}>
            {content.subtitle && content.subtitle[language]}
          </p>
        </div>
      </div>
      
      {/* CTA buttons positioned at bottom center with Instagram */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={() => scrollToSection('about')}
          className="px-8 py-3 bg-yellow-500 text-orange-900 font-bold rounded-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          {language === 'english' ? 'Learn More' : 'अधिक जाणून घ्या'}
        </button>
        <Link
          to="/donation"
          className="px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <i className="ri-heart-line"></i>
          {language === 'english' ? 'Donate Now' : 'दान करा'}
        </Link>
        <a
          href="https://www.instagram.com/friendship_group_official/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-white/80 hover:bg-white text-red-700 hover:text-orange-600 rounded-full flex items-center justify-center shadow-lg transition-all"
          title="Follow us on Instagram"
        >
          <i className="ri-instagram-line text-2xl"></i>
        </a>
      </div>
    </section>
  );
};

HeroSection.propTypes = {
  language: PropTypes.string.isRequired,
};

export default HeroSection;
