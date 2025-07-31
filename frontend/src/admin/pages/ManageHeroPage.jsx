import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getContent, updateContent } from '../../services/api';
import ImageUpload from '../components/ImageUpload'; // Import the uploader

const ManageHeroPage = () => {
  const [formData, setFormData] = useState({
    heading: { english: '', marathi: '' },
    subtitle: { english: '', marathi: '' },
    imageUrl: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const { data } = await getContent('hero');
        // Ensure the fetched data structure matches the form state
        if (data.content) {
          setFormData({
            heading: data.content.heading || { english: '', marathi: '' },
            subtitle: data.content.subtitle || { english: '', marathi: '' },
            imageUrl: data.content.imageUrl || '',
          });
        }
      } catch (err) {
        setError('Failed to fetch hero content.');
      } finally {
        setLoading(false);
      }
    };
    fetchHeroContent();
  }, []);

  const handleChange = (e, lang, field) => {
    const { name, value } = e.target;
    if (lang && field) {
      setFormData(prev => ({
        ...prev,
        [field]: { ...prev[field], [lang]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUploadSuccess = (url) => {
    setFormData(prev => ({ ...prev, imageUrl: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await updateContent('hero', formData);
      setSuccess('Hero section updated successfully!');
    } catch (err) {
      setError('Failed to update hero section.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.imageUrl) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-6">
      <Link to="/admin/dashboard" className="text-orange-600 hover:underline mb-4 inline-block">&larr; Back to Dashboard</Link>
      <h1 className="text-2xl font-bold mb-4">Manage Hero Section</h1>
      
      <form onSubmit={handleSubmit} className="max-w-xl bg-white p-8 rounded-lg shadow-md space-y-6">
        <div>
          <label htmlFor="heading_english" className="block text-sm font-medium text-gray-700">Heading (English)</label>
          <input
            type="text"
            name="heading_english"
            id="heading_english"
            value={formData.heading.english}
            onChange={(e) => handleChange(e, 'english', 'heading')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="heading_marathi" className="block text-sm font-medium text-gray-700">Heading (Marathi)</label>
          <input
            type="text"
            name="heading_marathi"
            id="heading_marathi"
            value={formData.heading.marathi}
            onChange={(e) => handleChange(e, 'marathi', 'heading')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="subtitle_english" className="block text-sm font-medium text-gray-700">Subtitle (English)</label>
          <input
            type="text"
            name="subtitle_english"
            id="subtitle_english"
            value={formData.subtitle.english}
            onChange={(e) => handleChange(e, 'english', 'subtitle')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="subtitle_marathi" className="block text-sm font-medium text-gray-700">Subtitle (Marathi)</label>
          <input
            type="text"
            name="subtitle_marathi"
            id="subtitle_marathi"
            value={formData.subtitle.marathi}
            onChange={(e) => handleChange(e, 'marathi', 'subtitle')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        
        <ImageUpload 
          label="Background Image"
          value={formData.imageUrl}
          onUploadSuccess={handleImageUploadSuccess}
        />
        
        {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
        {success && <p className="text-sm text-green-600 mt-4">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 font-semibold text-white bg-orange-600 rounded-md hover:bg-orange-700 disabled:bg-gray-400"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default ManageHeroPage;
