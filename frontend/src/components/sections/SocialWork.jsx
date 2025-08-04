import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getActivities } from '../../services/api';

const SocialWork = ({ language }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded text content
  const content = {
    english: {
      title: "Social Work Activities",
      subtitle: "Serving the Community with Compassion"
    },
    marathi: {
      title: "सामाजिक कार्य",
      subtitle: "करुणेने समाजसेवा"
    }
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Fetch activities specifically for the 'social' section
        const { data } = await getActivities('social');
        setActivities(data);
      } catch (error) {
        console.error("Failed to fetch social work activities:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const currentContent = content[language];

  if (loading) {
    return <div className="py-20 text-center">Loading Activities...</div>;
  }

  return (
    <section id="social" className="py-20 bg-gradient-to-b from-amber-50 to-orange-50">
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

        {/* Activities Grid - now dynamic */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <div key={activity._id} className="bg-white/70 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="relative">
                <img
                  src={activity.imageUrl}
                  alt={activity.title[language]}
                  className="w-full h-48 object-cover object-top"
                />
                <div className="absolute top-4 left-4 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                  <i className={`${activity.icon} text-white text-xl w-6 h-6 flex items-center justify-center`}></i>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-red-800 mb-3">
                  {activity.title[language]}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {activity.description[language]}
                </p>
                
                <button className="mt-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap">
                  {language === 'english' ? 'Learn More' : 'अधिक जाणून घ्या'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

SocialWork.propTypes = {
  language: PropTypes.string.isRequired,
};

export default SocialWork;
