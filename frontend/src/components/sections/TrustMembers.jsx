import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getMembers } from '../../services/api';
import { getOptimizedUrl } from '../../utils/cloudinary';

const TrustMembers = ({ language }) => {
  const [featuredMembers, setFeaturedMembers] = useState([]);
  const [generalMembers, setGeneralMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const content = {
    english: {
      title: "Trust Members",
      subtitle: "Our Dedicated Leadership Team",
      allMembersTitle: "All Trust Members",
      allMembersSubtitle: "Scroll to see all our dedicated team members"
    },
    marathi: {
      title: "ट्रस्ट सदस्य",
      subtitle: "आमची समर्पित नेतृत्व टीम",
      allMembersTitle: "सर्व ट्रस्ट सदस्य",
      allMembersSubtitle: "आमच्या सर्व समर्पित टीम सदस्यांना पाहण्यासाठी स्क्रोल करा"
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredMembers.map((member) => (
                <div key={member._id} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="text-center">
                    <div className="relative mb-4">
                      <div className="w-24 h-24 mx-auto rounded-full overflow-hidden shadow-lg border-3 border-orange-100">
                        {member.imageUrl ? (
                          <img
                            src={getOptimizedUrl(member.imageUrl, { width: 128, height: 128 })}
                            alt={member.name?.[language] || 'Member'}
                            className="w-full h-full object-cover object-top"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                            <i className="ri-user-line text-white text-3xl"></i>
                          </div>
                        )}
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                        <i className="ri-user-star-line text-white text-lg"></i>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-red-800 mb-2 leading-tight">
                      {member.name?.[language] || 'Member Name'}
                    </h3>
                    <p className="text-base text-orange-700 font-medium mb-4">
                      {member.designation?.[language] || 'Member'}
                    </p>
                    <div className="flex justify-center gap-3">
                      {member.phone && (
                        <a 
                          href={`tel:${member.phone}`}
                          className="w-10 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md"
                          title={`Call ${member.name?.[language] || 'Member'}`}
                        >
                          <i className="ri-phone-line text-base"></i>
                        </a>
                      )}
                      {member.email && (
                        <a 
                          href={`mailto:${member.email}`}
                          className="w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md"
                          title={`Email ${member.name?.[language] || 'Member'}`}
                        >
                          <i className="ri-mail-line text-base"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* All Members Section with Scrollable Grid */}
        <div className="mt-20 pt-16 border-t border-orange-200">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-red-900 mb-4">
              {currentContent.allMembersTitle}
            </h3>
            <p className="text-lg text-orange-700 font-medium">
              {currentContent.allMembersSubtitle}
            </p>
          </div>
          
          {/* Scrollable Members Container */}
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-orange-200">
            {/* Desktop: 5-6 rows, Mobile: 4-5 rows */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {generalMembers.map((member) => (
                <div key={member._id} className="text-center group">
                  <div className="member-card bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-orange-300">
                    <div className="text-center">
                      <div className="relative mb-4">
                        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden shadow-lg border-3 border-orange-100">
                          {member.imageUrl ? (
                            <img 
                              src={getOptimizedUrl(member.imageUrl, { width: 64, height: 64 })} 
                              alt={member.name?.[language] || 'Member'}
                              className="w-full h-full object-cover object-top"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                              <i className="ri-user-line text-white text-3xl"></i>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="member-card-text">
                        <h4 className="text-xl font-bold text-gray-900 leading-tight line-clamp-2">
                          {member.name?.[language] || 'Member Name'}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Scroll Indicator */}
            {generalMembers.length > 20 && (
              <div className="text-center mt-6 pt-4 border-t border-orange-200">
                <div className="flex items-center justify-center gap-2 text-orange-600 text-sm">
                  <i className="ri-mouse-line"></i>
                  <span>Scroll to see more members</span>
                  <i className="ri-arrow-down-line animate-bounce"></i>
                </div>
              </div>
            )}
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
