import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getMembers } from '../../services/api';

const TrustMembers = ({ language }) => {
  const [featuredMembers, setFeaturedMembers] = useState([]);
  const [generalMembers, setGeneralMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const content = {
    english: {
      title: "Trust Members",
      subtitle: "Our Dedicated Leadership Team",
      allMembersTitle: "All Trust Members",
      allMembersSubtitle: "Complete list of our dedicated team members"
    },
    marathi: {
      title: "ट्रस्ट सदस्य",
      subtitle: "आमची समर्पित नेतृत्व टीम",
      allMembersTitle: "सर्व ट्रस्ट सदस्य",
      allMembersSubtitle: "आमच्या समर्पित टीम सदस्यांची संपूर्ण यादी"
    }
  };

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const [featuredRes, generalRes] = await Promise.all([
          getMembers(true),  // Get featured members
          getMembers(false)  // Get general members
        ]);
        setFeaturedMembers(featuredRes.data);
        setGeneralMembers(generalRes.data);
      } catch (error) {
        console.error("Failed to fetch members:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const currentContent = content[language];

  // Function to create an optimized Cloudinary URL for thumbnails
  const getOptimizedUrl = (url, width = 128) => {
    if (!url || typeof url !== 'string') return '';
    const parts = url.split('/upload/');
    if (parts.length < 2) return url; // Return original URL if format is unexpected
    // w_128 = 128px wide, h_128 = 128px high, c_fill = crop to fill, q_auto = auto quality
    return `${parts[0]}/upload/w_${width},h_${width},c_fill,q_auto/${parts[1]}`;
  };

  if (loading) {
    return <div className="py-20 text-center">Loading Members...</div>;
  }

  return (
    <section id="trust-members" className="py-20 bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* **FIX: Only render the Featured Members section if there are any** */}
        {featuredMembers.length > 0 && (
          <>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-red-900 mb-4">
                {currentContent.title}
              </h2>
              <p className="text-xl text-orange-700 font-medium">
                {currentContent.subtitle}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredMembers.map((member) => (
                <div key={member._id} className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="text-center">
                    <div className="relative mb-4">
                      <img
                        src={getOptimizedUrl(member.imageUrl)}
                        alt={member.name[language]}
                        className="w-32 h-32 rounded-full mx-auto object-cover object-top shadow-lg"
                      />
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                        <i className="ri-user-star-line text-white w-5 h-5 flex items-center justify-center"></i>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-red-800 mb-2">
                      {member.name[language]}
                    </h3>
                    <p className="text-orange-700 font-medium mb-4">
                      {member.designation[language]}
                    </p>
                    <div className="flex justify-center gap-3">
                      {member.phone && (
                        <a 
                          href={`tel:${member.phone}`}
                          className="w-10 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center transition-colors"
                          title={`Call ${member.name[language]}`}
                        >
                          <i className="ri-phone-line w-4 h-4 flex items-center justify-center"></i>
                        </a>
                      )}
                      {member.email && (
                        <a 
                          href={`mailto:${member.email}`}
                          className="w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                          title={`Email ${member.name[language]}`}
                        >
                          <i className="ri-mail-line w-4 h-4 flex items-center justify-center"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* All Members Section */}
        <div className="mt-20 pt-16 border-t border-orange-200">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-red-900 mb-4">
              {currentContent.allMembersTitle}
            </h3>
            <p className="text-lg text-orange-700 font-medium">
              {currentContent.allMembersSubtitle}
            </p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-orange-200">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {generalMembers.map((member) => (
                <div key={member._id} className="text-center">
                  <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:scale-105">
                    {member.imageUrl ? (
                      <img 
                        src={getOptimizedUrl(member.imageUrl, 64)} 
                        alt={member.name[language]}
                        className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-white"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i className="ri-user-line text-white text-2xl"></i>
                      </div>
                    )}
                    <p className="text-red-800 font-semibold text-sm">
                      {member.name[language]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

TrustMembers.propTypes = {
  language: PropTypes.string.isRequired,
};

export default TrustMembers;
