import React, { useState } from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/logo_f.jpg';

export default function Navbar({ language, toggleLanguage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const content = {
    english: {
      home: "Home",
      about: "About Us",
      trustMembers: "Trust Members",
      events: "Events",
      media: "Media",
      social: "Social Work",
      cultural: "Cultural",
      sponsors: "Sponsors",
      highlights: "Highlights",
      contact: "Contact Us",
      langToggle: "मराठी"
    },
    marathi: {
      home: "मुख्य पृष्ठ",
      about: "आमच्याबद्दल",
      trustMembers: "ट्रस्ट सदस्य",
      events: "कार्यक्रम",
      media: "मीडिया",
      social: "सामाजिक कार्य",
      cultural: "सांस्कृतिक",
      sponsors: "प्रायोजक",
      highlights: "हायलाइट्स",
      contact: "संपर्क",
      langToggle: "English"
    }
  };

  const currentContent = content[language];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-orange-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="navbar-logo-container w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-2 border-orange-200 rounded-full overflow-hidden">
              <img 
                src={logo} 
                alt="Logo" 
                className="w-full h-full object-cover" 
              />
            </div>
            <span className="text-lg sm:text-xl font-bold text-red-900 font-pacifico leading-none">
              मानाचा पहिला गणपती
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scrollToSection('home')}
              className={`h-10 flex items-center px-4 rounded-lg text-red-800 hover:text-orange-600 hover:bg-orange-50 font-medium transition-all duration-200 cursor-pointer border border-transparent hover:border-orange-200 min-w-fit ${language === 'marathi' ? 'font-marathi' : ''}`}
            >
              {currentContent.home}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className={`h-10 flex items-center px-4 rounded-lg text-red-800 hover:text-orange-600 hover:bg-orange-50 font-medium transition-all duration-200 cursor-pointer border border-transparent hover:border-orange-200 min-w-fit ${language === 'marathi' ? 'font-marathi' : ''}`}
            >
              {currentContent.about}
            </button>
            <button
              onClick={() => scrollToSection('trust-members')}
              className={`h-10 flex items-center px-4 rounded-lg text-red-800 hover:text-orange-600 hover:bg-orange-50 font-medium transition-all duration-200 cursor-pointer border border-transparent hover:border-orange-200 min-w-fit ${language === 'marathi' ? 'font-marathi' : ''}`}
            >
              {currentContent.trustMembers}
            </button>
            <button
              onClick={() => scrollToSection('events')}
              className={`h-10 flex items-center px-4 rounded-lg text-red-800 hover:text-orange-600 hover:bg-orange-50 font-medium transition-all duration-200 cursor-pointer border border-transparent hover:border-orange-200 min-w-fit ${language === 'marathi' ? 'font-marathi' : ''}`}
            >
              {currentContent.events}
            </button>
            <button
              onClick={() => scrollToSection('media')}
              className={`h-10 flex items-center px-4 rounded-lg text-red-800 hover:text-orange-600 hover:bg-orange-50 font-medium transition-all duration-200 cursor-pointer border border-transparent hover:border-orange-200 min-w-fit ${language === 'marathi' ? 'font-marathi' : ''}`}
            >
              {currentContent.media}
            </button>
            <button
              onClick={() => scrollToSection('highlights')}
              className={`h-10 flex items-center px-4 rounded-lg text-red-800 hover:text-orange-600 hover:bg-orange-50 font-medium transition-all duration-200 cursor-pointer border border-transparent hover:border-orange-200 min-w-fit ${language === 'marathi' ? 'font-marathi' : ''}`}
            >
              {currentContent.highlights}
            </button>
            <button
              onClick={() => scrollToSection('sponsors')}
              className={`h-10 flex items-center px-4 rounded-lg text-red-800 hover:text-orange-600 hover:bg-orange-50 font-medium transition-all duration-200 cursor-pointer border border-transparent hover:border-orange-200 min-w-fit ${language === 'marathi' ? 'font-marathi' : ''}`}
            >
              {currentContent.sponsors}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`h-10 flex items-center px-4 rounded-lg text-red-800 hover:text-orange-600 hover:bg-orange-50 font-medium transition-all duration-200 cursor-pointer border border-transparent hover:border-orange-200 min-w-fit ${language === 'marathi' ? 'font-marathi' : ''}`}
            >
              {currentContent.contact}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={`bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 whitespace-nowrap shadow-md hover:shadow-lg ${language === 'marathi' ? 'font-marathi' : ''}`}
            >
              <i className="ri-translate-2-line w-4 h-4 flex items-center justify-center"></i>
              {currentContent.langToggle}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className={`bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 whitespace-nowrap shadow-md hover:shadow-lg ${language === 'marathi' ? 'font-marathi' : ''}`}
            >
              <i className="ri-translate-2-line w-4 h-4 flex items-center justify-center"></i>
              {currentContent.langToggle}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-red-800 hover:text-orange-600 transition-colors p-2 rounded-lg hover:bg-orange-50"
            >
              <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl w-6 h-6 flex items-center justify-center`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-b border-orange-200">
            <div className="px-6 py-4 space-y-2">
              <button
                onClick={() => scrollToSection('home')}
                className={`block w-full text-left text-red-800 hover:text-orange-600 font-medium transition-all duration-200 py-3 px-4 rounded-lg hover:bg-orange-50 cursor-pointer border border-transparent hover:border-orange-200 ${language === 'marathi' ? 'font-marathi' : ''}`}
              >
                {currentContent.home}
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`block w-full text-left text-red-800 hover:text-orange-600 font-medium transition-all duration-200 py-3 px-4 rounded-lg hover:bg-orange-50 cursor-pointer border border-transparent hover:border-orange-200 ${language === 'marathi' ? 'font-marathi' : ''}`}
              >
                {currentContent.about}
              </button>
              <button
                onClick={() => scrollToSection('trust-members')}
                className={`block w-full text-left text-red-800 hover:text-orange-600 font-medium transition-all duration-200 py-3 px-4 rounded-lg hover:bg-orange-50 cursor-pointer border border-transparent hover:border-orange-200 ${language === 'marathi' ? 'font-marathi' : ''}`}
              >
                {currentContent.trustMembers}
              </button>
              <button
                onClick={() => scrollToSection('events')}
                className={`block w-full text-left text-red-800 hover:text-orange-600 font-medium transition-all duration-200 py-3 px-4 rounded-lg hover:bg-orange-50 cursor-pointer border border-transparent hover:border-orange-200 ${language === 'marathi' ? 'font-marathi' : ''}`}
              >
                {currentContent.events}
              </button>
              <button
                onClick={() => scrollToSection('media')}
                className={`block w-full text-left text-red-800 hover:text-orange-600 font-medium transition-all duration-200 py-3 px-4 rounded-lg hover:bg-orange-50 cursor-pointer border border-transparent hover:border-orange-200 ${language === 'marathi' ? 'font-marathi' : ''}`}
              >
                {currentContent.media}
              </button>
              <button
                onClick={() => scrollToSection('highlights')}
                className={`block w-full text-left text-red-800 hover:text-orange-600 font-medium transition-all duration-200 py-3 px-4 rounded-lg hover:bg-orange-50 cursor-pointer border border-transparent hover:border-orange-200 ${language === 'marathi' ? 'font-marathi' : ''}`}
              >
                {currentContent.highlights}
              </button>
              <button
                onClick={() => scrollToSection('sponsors')}
                className={`block w-full text-left text-red-800 hover:text-orange-600 font-medium transition-all duration-200 py-3 px-4 rounded-lg hover:bg-orange-50 cursor-pointer border border-transparent hover:border-orange-200 ${language === 'marathi' ? 'font-marathi' : ''}`}
              >
                {currentContent.sponsors}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`block w-full text-left text-red-800 hover:text-orange-600 font-medium transition-all duration-200 py-3 px-4 rounded-lg hover:bg-orange-50 cursor-pointer border border-transparent hover:border-orange-200 ${language === 'marathi' ? 'font-marathi' : ''}`}
              >
                {currentContent.contact}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  language: PropTypes.string.isRequired,
  toggleLanguage: PropTypes.func.isRequired,
};