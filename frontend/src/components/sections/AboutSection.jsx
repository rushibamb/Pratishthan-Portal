import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getContent } from '../../services/api';
import logo from '../../assets/logo_f.jpg';

const AboutSection = ({ language }) => {
  // State for dynamic content
  const [content, setContent] = useState({
    imageUrl: '',
    statYears: '',
    statDevotees: '',
    statVolunteers: '',
    statInitiatives: '',
  });
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // Hardcoded text content (as per admin feature list)
  const textContent = {
    english: {
      title: "About Our Mandal",
      subtitle: "A Legacy of Faith and Service",
      description: "Established in 1985, our Ganpati Mandal Trust has been serving the community with unwavering devotion and dedication. We organize the grand Ganeshotsav celebration every year, bringing together thousands of devotees in a spirit of unity and faith.",
      extendedDescription: "Our journey began with a small group of devotees who shared a common vision of preserving our cultural heritage and serving the community. Over the decades, we have grown from a modest gathering to a vibrant organization that touches thousands of lives annually. Our commitment extends beyond religious celebrations to encompass education, healthcare, and social welfare programs that benefit the entire community.",
      vision: "Our Vision",
      visionText: "To preserve and promote the rich cultural heritage of Ganeshotsav while serving the community through various social initiatives and maintaining the spiritual essence of Lord Ganesha's teachings.",
      mission: "Our Mission",
      missionText: "To create an inclusive environment where people from all walks of life can come together to celebrate, learn, and grow spiritually while contributing to social welfare and cultural preservation.",
      readMore: "Read More",
      readLess: "Read Less"
    },
    marathi: {
      title: "आमच्या मंडळाविषयी",
      subtitle: "श्रद्धा आणि सेवेचा वारसा",
      description: "1985 मध्ये स्थापन झालेल्या आमच्या गणपती मंडळ ट्रस्टने अटूट भक्ती आणि समर्पणाने समाजाची सेवा केली आहे. आम्ही दरवर्षी भव्य गणेशोत्सवाचे आयोजन करतो, हजारो भक्तांना एकत्र आणून एकता आणि श्रद्धेच्या भावनेने जोडतो.",
      extendedDescription: "आमची प्रवासाची सुरुवात एका लहान भक्तांच्या गटाने केली ज्यांनी आमचा सांस्कृतिक वारसा जपण्याचे आणि समाजाची सेवा करण्याचे सामायिक ध्येय सामायिक केले. दशकांमध्ये, आम्ही एका साध्या सभेपासून एका जीवंत संस्थेमध्ये वाढलो आहोत जी दरवर्षी हजारो जीवांना स्पर्श करते. आमची प्रतिबद्धता धार्मिक उत्सवांपलीकडे शिक्षण, आरोग्यसेवा आणि सामाजिक कल्याण कार्यक्रमांपर्यंत विस्तारते जे संपूर्ण समाजाला फायदा देतात.",
      vision: "आमचे ध्येय",
      visionText: "गणेशोत्सवाचा समृद्ध सांस्कृतिक वारसा जपून ठेवणे आणि त्याचा प्रचार करणे, तसेच विविध सामाजिक उपक्रमांद्वारे समाजसेवा करणे आणि श्री गणेशाच्या शिकवणीचे आध्यात्मिक सार राखणे.",
      mission: "आमचे ध्येय",
      missionText: "एक समावेशक वातावरण निर्माण करणे जिथे सर्व वर्गातील लोक एकत्र येऊन उत्सव साजरा करू शकतील, शिकू शकतील आणि आध्यात्मिक वाढ करू शकतील तसेच सामाजिक कल्याण आणि सांस्कृतिक संरक्षणात योगदान देऊ शकतील.",
      readMore: "अधिक वाचा",
      readLess: "कमी वाचा"
    }
  };

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const { data } = await getContent('about');
        if (data.content) {
          setContent(data.content);
        }
      } catch (error) {
        console.error("Failed to fetch about content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAboutContent();
  }, []);

  const currentText = textContent[language];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-red-900 mb-4 font-inter">
            {currentText.title}
          </h2>
          <p className="text-xl text-orange-700 font-medium">
            {currentText.subtitle}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Image - now dynamic */}
          <div className="relative">
            <img
              src={content.imageUrl}
              alt="Temple Interior"
              className="rounded-lg shadow-2xl w-full h-90 object-cover object-top"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full flex items-center justify-center shadow-lg overflow-hidden border-2 border-yellow-300">
              <img src={logo} alt="Logo" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Text Content - with read more functionality */}
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              {currentText.description}
            </p>
            
            {/* Extended description with read more toggle */}
            {currentText.extendedDescription && (
              <div>
                {isExpanded && (
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    {currentText.extendedDescription}
                  </p>
                )}
                <button
                  onClick={toggleExpanded}
                  className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200 mb-4"
                >
                  <span>{isExpanded ? currentText.readLess : currentText.readMore}</span>
                  <i className={`ri-arrow-${isExpanded ? 'up' : 'down'}-line transition-transform duration-200`}></i>
                </button>
              </div>
            )}

            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-orange-200">
              <h3 className="text-2xl font-bold text-red-800 mb-3 flex items-center gap-3">
                <i className="ri-eye-line text-yellow-600 w-6 h-6 flex items-center justify-center"></i>
                {currentText.vision}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {currentText.visionText}
              </p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-orange-200">
              <h3 className="text-2xl font-bold text-red-800 mb-3 flex items-center gap-3">
                <i className="ri-target-line text-yellow-600 w-6 h-6 flex items-center justify-center"></i>
                {currentText.mission}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {currentText.missionText}
              </p>
            </div>
          </div>
        </div>

        {/* Statistics - now dynamic */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-orange-200">
            <div className="text-3xl font-bold text-red-800 mb-2">{content.statYears}</div>
            <div className="text-orange-700 font-medium">Years of Service</div>
          </div>
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-orange-200">
            <div className="text-3xl font-bold text-red-800 mb-2">{content.statDevotees}</div>
            <div className="text-orange-700 font-medium">Devotees</div>
          </div>
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-orange-200">
            <div className="text-3xl font-bold text-red-800 mb-2">{content.statVolunteers}</div>
            <div className="text-orange-700 font-medium">Volunteers</div>
          </div>
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-orange-200">
            <div className="text-3xl font-bold text-red-800 mb-2">{content.statInitiatives}</div>
            <div className="text-orange-700 font-medium">Social Initiatives</div>
          </div>
        </div>
      </div>
    </section>
  );
};

AboutSection.propTypes = {
  language: PropTypes.string.isRequired,
};

export default AboutSection;
