import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAllYears, getHighlightsByYear } from '../../services/api';
import { getOptimizedUrl } from '../../utils/cloudinary';

const PastHighlights = ({ language }) => {
  const [years, setYears] = useState([]);
  const [activeYear, setActiveYear] = useState(null);
  const [highlights, setHighlights] = useState({ photos: [], videos: [] });
  const [loading, setLoading] = useState(true);

  // Hardcoded text content
  const content = {
    english: {
      title: "Past Years' Highlights",
      subtitle: "Celebrating Our Journey Through Time"
    },
    marathi: {
      title: "मागील वर्षांच्या खास क्षणा",
      subtitle: "काळाच्या प्रवासात आमच्या उत्सवाची आठवण"
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const { data: yearData } = await getAllYears();
        setYears(yearData);
        // If there are years, set the first one as active and fetch its content
        if (yearData.length > 0) {
          setActiveYear(yearData[0]);
          const { data: highlightData } = await getHighlightsByYear(yearData[0]);
          setHighlights(highlightData);
        }
      } catch (error) {
        console.error("Failed to fetch past highlights:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const handleYearClick = async (year) => {
    if (year === activeYear) return;
    setLoading(true);
    setActiveYear(year);
    try {
      const { data } = await getHighlightsByYear(year);
      setHighlights(data);
    } catch (error) {
      console.error(`Failed to fetch highlights for year ${year}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const currentContent = content[language];

  return (
    <section className="py-20 bg-gradient-to-b from-orange-50 to-amber-50">
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

        {/* Year Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-full p-2 shadow-lg border border-orange-200">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => handleYearClick(year)}
                className={`px-6 py-3 rounded-full font-medium transition-all whitespace-nowrap ${
                  activeYear === year
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                    : 'text-orange-700 hover:bg-orange-100'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center">Loading Highlights...</div>
        ) : (
          <div className="space-y-12">
            {/* Photos Section */}
            <div>
              <h3 className="text-2xl font-bold text-red-800 mb-6 text-center">
                {language === 'english' ? 'Photo Highlights' : 'फोटो हायलाइट्स'}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {highlights.photos.map((photo) => (
                  <div key={photo._id} className="bg-white/70 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <img
                      src={getOptimizedUrl(photo.src, { width: 400, height: 300 })}
                      alt={photo.title}
                      className="w-full h-48 object-cover object-top"
                    />
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-red-800">{photo.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Videos Section */}
            <div>
              <h3 className="text-2xl font-bold text-red-800 mb-6 text-center">
                {language === 'english' ? 'Video Highlights' : 'व्हिडिओ हायलाइट्स'}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {highlights.videos.map((video) => (
                  <div key={video._id} className="bg-white/70 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className="relative">
                      <img
                        src={getOptimizedUrl(video.thumbnail, { width: 400, height: 300 })}
                        alt={video.title}
                        className="w-full h-48 object-cover object-top"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg transition-colors">
                          <i className="ri-play-fill text-white text-2xl"></i>
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-red-800">{video.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

PastHighlights.propTypes = {
  language: PropTypes.string.isRequired,
};

export default PastHighlights;
