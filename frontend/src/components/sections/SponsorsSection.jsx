import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getSponsors } from '../../services/api';

const SponsorsSection = ({ language }) => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hardcoded text content
  const content = {
    english: {
      title: "Our Sponsors",
      subtitle: "Grateful to Our Generous Supporters"
    },
    marathi: {
      title: "आमचे प्रायोजक",
      subtitle: "आमच्या उदार समर्थकांचा आभार"
    }
  };

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const { data } = await getSponsors();
        setSponsors(data);
      } catch (error) {
        console.error("Failed to fetch sponsors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSponsors();
  }, []);

  useEffect(() => {
    if (sponsors.length === 0) return;
    // Carousel logic
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sponsors.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [sponsors]);

  const currentContent = content[language];

  if (loading) {
    return <div className="py-20 text-center">Loading Sponsors...</div>;
  }

  return (
    <section id="sponsors" className="py-20 bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-red-900 mb-4 font-inter">
            {currentContent.title}
          </h2>
          <p className="text-xl text-orange-700 font-medium">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Sponsors Carousel */}
        <div className="relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-lg shadow-lg border border-orange-200 p-8">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {sponsors.map((sponsor) => (
              <div key={sponsor._id} className="w-full flex-shrink-0">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center p-4">
                    <img
                      src={sponsor.logoUrl}
                      alt={sponsor.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-red-800 mb-2">{sponsor.name}</h3>
                    <p className="text-lg text-orange-600 font-medium mb-3">
                      {sponsor.category[language]}
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      {sponsor.description[language]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {sponsors.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-orange-500' : 'bg-orange-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Sponsor Categories */}
       

        {/* Become a Sponsor */}
        
      </div>
    </section>
  );
};

SponsorsSection.propTypes = {
  language: PropTypes.string.isRequired,
};

export default SponsorsSection;
