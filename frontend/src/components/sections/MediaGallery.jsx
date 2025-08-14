import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getMedia } from '../../services/api';
import { getOptimizedUrl } from '../../utils/cloudinary';
import LoadingSpinner from '../LoadingSpinner';

const MediaGallery = ({ language }) => {
  const [activeTab, setActiveTab] = useState('photos');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded text content
  const content = {
    english: {
      title: "Media Gallery",
      subtitle: "Capturing Sacred Moments",
      photos: "Photos",
      videos: "Videos"
    },
    marathi: {
      title: "मीडिया गॅलरी",
      subtitle: "पवित्र क्षणांचे चित्रण",
      photos: "फोटो",
      videos: "व्हिडिओ"
    }
  };
  
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const [photosRes, videosRes] = await Promise.all([
          getMedia('photo'),
          getMedia('video')
        ]);
        setPhotos(photosRes.data);
        setVideos(videosRes.data);
      } catch (error) {
        console.error("Failed to fetch media:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);

  const currentContent = content[language];

  const openLightbox = (imageSrc) => {
    setCurrentImage(imageSrc);
    setLightboxOpen(true);
  };

  if (loading) {
    return (
      <section id="media" className="py-20 bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-red-900 mb-4 font-inter">
              {currentContent.title}
            </h2>
            <p className="text-xl text-orange-700 font-medium">
              {currentContent.subtitle}
            </p>
          </div>
          <div className="flex justify-center">
            <LoadingSpinner size="lg" color="orange" text="Loading Gallery..." />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="media" className="py-20 bg-gradient-to-b from-amber-50 to-orange-50">
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

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-full p-2 shadow-lg border border-orange-200">
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-6 py-3 rounded-full font-medium transition-all whitespace-nowrap ${
                activeTab === 'photos'
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                  : 'text-orange-700 hover:bg-orange-100'
              }`}
            >
              <i className="ri-image-line w-4 h-4 mr-2 inline-block"></i>
              {currentContent.photos}
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-6 py-3 rounded-full font-medium transition-all whitespace-nowrap ${
                activeTab === 'videos'
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                  : 'text-orange-700 hover:bg-orange-100'
              }`}
            >
              <i className="ri-video-line w-4 h-4 mr-2 inline-block"></i>
              {currentContent.videos}
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'photos' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {photos.map((photo) => (
              <div 
                key={photo._id} 
                className="bg-white/70 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300 md:hover:scale-105 cursor-pointer"
                onClick={() => openLightbox(photo.url)}
              >
                <img
                  src={getOptimizedUrl(photo.url, { width: 360, height: 240, quality: 'auto' })}
                  alt={photo.title}
                  className="w-full h-40 md:h-48 object-cover object-top"
                  loading="lazy"
                />
                <div className="p-4">
                  <h3 className="text-base md:text-lg font-semibold text-red-800">{photo.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {videos.map((video) => (
              <div key={video._id} className="bg-white/70 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="relative">
                  <img
                    src={getOptimizedUrl(video.url, { width: 360, height: 240, quality: 'auto' })}
                    alt={video.title}
                    className="w-full h-40 md:h-48 object-cover object-top"
                    loading="lazy"
                  />
                  <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg transition-colors">
                      <i className="ri-play-fill text-white text-xl md:text-2xl"></i>
                    </div>
                  </a>
                </div>
                <div className="p-4">
                  <h3 className="text-base md:text-lg font-semibold text-red-800">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setLightboxOpen(false)}>
          <div className="relative max-w-4xl max-h-full">
            <img
              src={currentImage}
              alt="Gallery"
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <i className="ri-close-line text-white text-xl"></i>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

MediaGallery.propTypes = {
  language: PropTypes.string.isRequired,
};

export default MediaGallery;
