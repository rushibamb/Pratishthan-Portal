import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllYears, getHighlightsByYear, createYear, deleteYear, addPhotoToYear, deletePhotoFromYear, addVideoToYear, deleteVideoFromYear } from '../../services/api';
import ImageUpload from '../components/ImageUpload'; // Import the new component

const ManageHighlightsPage = () => {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [highlights, setHighlights] = useState({ photos: [], videos: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'year', 'photo', 'video'
  const [formData, setFormData] = useState({});

  const fetchYears = async () => {
    setLoading(true);
    try {
      const { data } = await getAllYears();
      setYears(data);
    } catch (err) {
      setError('Failed to fetch years.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYears();
  }, []);

  const handleSelectYear = async (year) => {
    setLoading(true);
    setSelectedYear(year);
    try {
      const { data } = await getHighlightsByYear(year);
      setHighlights(data);
    } catch (err) {
      setError(`Failed to fetch highlights for ${year}.`);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (type, initialData = {}) => {
    setModalType(type);
    setFormData(initialData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType('');
    setFormData({});
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUploadSuccess = (url) => {
    setFormData(prev => ({ ...prev, src: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      switch (modalType) {
        case 'year':
          await createYear(formData);
          await fetchYears();
          break;
        case 'photo':
          await addPhotoToYear(selectedYear, formData);
          break;
        case 'video':
          await addVideoToYear(selectedYear, formData);
          break;
        default:
          break;
      }
      if (selectedYear) await handleSelectYear(selectedYear);
      handleCloseModal();
    } catch (err) {
      setError('Failed to save data.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
    setLoading(true);
    try {
      switch (type) {
        case 'year':
          await deleteYear(id);
          await fetchYears();
          setSelectedYear(null);
          break;
        case 'photo':
          await deletePhotoFromYear(selectedYear, id);
          break;
        case 'video':
          await deleteVideoFromYear(selectedYear, id);
          break;
        default:
          break;
      }
      if (selectedYear) await handleSelectYear(selectedYear);
    } catch (err) {
      setError(`Failed to delete ${type}.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Link to="/admin/dashboard" className="text-orange-600 hover:underline mb-4 inline-block">&larr; Back to Dashboard</Link>
      <h1 className="text-2xl font-bold mb-4">Manage Past Highlights</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!selectedYear ? (
        <div>
          <button onClick={() => handleOpenModal('year', { year: '' })} className="mb-4 px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">Add New Year</button>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <ul className="space-y-2">
              {years.map(year => (
                <li key={year} className="p-2 border-b flex justify-between items-center">
                  <span className="font-semibold">{year}</span>
                  <div>
                    <button onClick={() => handleSelectYear(year)} className="mr-2 px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Manage</button>
                    <button onClick={() => handleDelete('year', year)} className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={() => setSelectedYear(null)} className="mb-4 text-orange-600 hover:underline">&larr; Back to Years List</button>
          <h2 className="text-xl font-bold mb-4">Managing Year: {selectedYear}</h2>
          
          {/* Photo Management */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Photos</h3>
              <button onClick={() => handleOpenModal('photo', { title: '', src: '' })} className="px-3 py-1 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">Add Photo</button>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md grid grid-cols-2 md:grid-cols-4 gap-4">
              {highlights.photos.map(photo => (
                <div key={photo._id} className="border rounded-md p-2 text-center">
                  <img src={photo.src} alt={photo.title} className="w-full h-32 object-cover mb-2"/>
                  <p className="font-semibold text-sm truncate">{photo.title}</p>
                  <button onClick={() => handleDelete('photo', photo._id)} className="mt-2 px-2 py-1 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700">Delete</button>
                </div>
              ))}
            </div>
          </div>

          {/* Video Management */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Videos</h3>
              <button onClick={() => handleOpenModal('video', { title: '', thumbnail: '' })} className="px-3 py-1 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">Add Video</button>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-4">
              {highlights.videos.map(video => (
                <div key={video._id} className="border rounded-md p-2 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img src={video.thumbnail} alt={video.title} className="w-24 h-16 object-cover"/>
                    <p className="font-semibold">{video.title}</p>
                  </div>
                  <button onClick={() => handleDelete('video', video._id)} className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">Delete</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Add New {modalType}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {modalType === 'year' && (
                <input type="text" name="year" placeholder="Year (e.g., 2024)" value={formData.year || ''} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm" />
              )}
              {modalType === 'photo' && (
                <>
                  <input type="text" name="title" placeholder="Photo Title" value={formData.title || ''} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm" />
                  <ImageUpload 
                    label="Photo"
                    value={formData.src}
                    onUploadSuccess={handleImageUploadSuccess}
                  />
                </>
              )}
              {modalType === 'video' && (
                <>
                  <input type="text" name="title" placeholder="Video Title" value={formData.title || ''} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm" />
                  <input type="text" name="thumbnail" placeholder="Thumbnail URL" value={formData.thumbnail || ''} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm" />
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

export default ManageHighlightsPage;
