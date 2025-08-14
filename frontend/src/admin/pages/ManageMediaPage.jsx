import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMedia, createMediaItem, updateMediaItem, deleteMediaItem } from '../../services/api';
import ImageUpload from '../components/ImageUpload'; // Import the new component

const ManageMediaPage = () => {
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('photos');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    mediaType: 'photo',
    title: '',
    url: '',
    videoUrl: '',
  });

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const [photosRes, videosRes] = await Promise.all([
        getMedia('photo'),
        getMedia('video'),
      ]);
      setPhotos(photosRes.data);
      setVideos(videosRes.data);
    } catch (err) {
      setError('Failed to fetch media items.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleOpenModal = (item = null, type = 'photo') => {
    setCurrentItem(item);
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        mediaType: type,
        title: '',
        url: '',
        videoUrl: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUploadSuccess = (newUrl) => {
    setFormData(prev => ({ ...prev, url: newUrl }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (currentItem) {
        await updateMediaItem(currentItem._id, formData);
      } else {
        await createMediaItem(formData);
      }
      await fetchMedia();
      handleCloseModal();
    } catch (err) {
      setError('Failed to save media item.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setLoading(true);
      try {
        await deleteMediaItem(id);
        await fetchMedia();
      } catch (err) {
        setError('Failed to delete media item.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-6">
      <Link to="/admin/dashboard" className="text-orange-600 hover:underline mb-4 inline-block">&larr; Back to Dashboard</Link>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Media Gallery</h1>
        <button onClick={() => handleOpenModal(null, activeTab === 'photos' ? 'photo' : 'video')} className="px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">
          Add New {activeTab === 'photos' ? 'Photo' : 'Video'}
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="border-b border-gray-200 mb-4">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button onClick={() => setActiveTab('photos')} className={`${activeTab === 'photos' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Photos</button>
          <button onClick={() => setActiveTab('videos')} className={`${activeTab === 'videos' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Videos</button>
        </nav>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        {activeTab === 'photos' ? (
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photos.map(photo => (
              <li key={photo._id} className="border rounded-md p-2 text-center">
                <img src={photo.url} alt={photo.title} className="w-full h-32 object-cover mb-2"/>
                <p className="font-semibold text-sm truncate">{photo.title}</p>
                <div className="space-x-2 mt-2">
                  <button onClick={() => handleOpenModal(photo, 'photo')} className="px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Edit</button>
                  <button onClick={() => handleDelete(photo._id)} className="px-2 py-1 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-4">
            {videos.map(video => (
              <li key={video._id} className="p-4 border rounded-md flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img src={video.url} alt={video.title} className="w-24 h-16 object-cover"/>
                  <p className="font-bold">{video.title}</p>
                </div>
                <div className="space-x-2">
                  <button onClick={() => handleOpenModal(video, 'video')} className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Edit</button>
                  <button onClick={() => handleDelete(video._id)} className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-4">{currentItem ? 'Edit' : 'Add'} {formData.mediaType === 'photo' ? 'Photo' : 'Video'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">{formData.mediaType === 'photo' ? 'Caption' : 'Title'}</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              
              {formData.mediaType === 'photo' ? (
                <ImageUpload 
                  label="Photo"
                  value={formData.url}
                  onUploadSuccess={handleImageUploadSuccess}
                />
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium">Thumbnail</label>
                    <ImageUpload 
                      label="Video Thumbnail"
                      value={formData.url}
                      onUploadSuccess={handleImageUploadSuccess}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Video URL (e.g., YouTube)</label>
                    <input type="text" name="videoUrl" value={formData.videoUrl} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
                  </div>
                </>
              )}

              <div className="flex justify-end space-x-4 pt-4">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">{loading ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMediaPage;
