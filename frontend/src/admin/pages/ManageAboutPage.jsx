import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getContent, updateContent } from '../../services/api';
import ImageUpload from '../components/ImageUpload'; // Import the uploader

const ManageAboutPage = () => {
  const [formData, setFormData] = useState({
    imageUrl: '',
    statYears: '',
    statDevotees: '',
    statVolunteers: '',
    statInitiatives: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const { data } = await getContent('about');
        if (data.content) {
          setFormData(data.content);
        }
      } catch (err) {
        setError('Failed to fetch about section content.');
      } finally {
        setLoading(false);
      }
    };
    fetchAboutContent();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
      await updateContent('about', formData);
      setSuccess('About section updated successfully!');
    } catch (err) {
      setError('Failed to update about section.');
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
      <h1 className="text-2xl font-bold mb-4">Manage About Section</h1>
      
      <form onSubmit={handleSubmit} className="max-w-xl bg-white p-8 rounded-lg shadow-md space-y-6">
        <ImageUpload 
          label="Main Image"
          value={formData.imageUrl}
          onUploadSuccess={handleImageUploadSuccess}
        />

        <h2 className="text-lg font-semibold text-gray-800 pt-4 border-t">Statistics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="statYears" className="block text-sm font-medium text-gray-700">Years of Service</label>
            <input
              type="text"
              name="statYears"
              id="statYears"
              value={formData.statYears}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="statDevotees" className="block text-sm font-medium text-gray-700">Devotees (e.g., 50K+)</label>
            <input
              type="text"
              name="statDevotees"
              id="statDevotees"
              value={formData.statDevotees}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="statVolunteers" className="block text-sm font-medium text-gray-700">Volunteers (e.g., 200+)</label>
            <input
              type="text"
              name="statVolunteers"
              id="statVolunteers"
              value={formData.statVolunteers}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="statInitiatives" className="block text-sm font-medium text-gray-700">Social Initiatives (e.g., 15+)</label>
            <input
              type="text"
              name="statInitiatives"
              id="statInitiatives"
              value={formData.statInitiatives}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        
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

export default ManageAboutPage;
