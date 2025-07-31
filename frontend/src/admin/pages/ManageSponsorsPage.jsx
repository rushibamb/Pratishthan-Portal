import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSponsors, createSponsor, updateSponsor, deleteSponsor } from '../../services/api';
import ImageUpload from '../components/ImageUpload';

const ManageSponsorsPage = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSponsor, setCurrentSponsor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    logoUrl: '',
    description: { english: '', marathi: '' },
    category: { english: '', marathi: '' },
  });

  const fetchSponsors = async () => {
    try {
      const { data } = await getSponsors();
      setSponsors(data);
    } catch (err) {
      setError('Failed to fetch sponsors.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const handleOpenModal = (sponsor = null) => {
    setCurrentSponsor(sponsor);
    setError(''); // Clear errors when opening modal
    if (sponsor) {
      setFormData(sponsor);
    } else {
      setFormData({
        name: '',
        logoUrl: '',
        description: { english: '', marathi: '' },
        category: { english: '', marathi: '' },
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentSponsor(null);
  };

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
    setFormData(prev => ({ ...prev, logoUrl: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // **FIX: Add client-side validation**
    if (!formData.name || !formData.logoUrl || !formData.category.english || !formData.category.marathi || !formData.description.english || !formData.description.marathi) {
      setError('Please fill out all fields, including the logo image.');
      return;
    }

    setLoading(true);
    try {
      if (currentSponsor) {
        await updateSponsor(currentSponsor._id, formData);
      } else {
        await createSponsor(formData);
      }
      await fetchSponsors();
      handleCloseModal();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to save sponsor. Please check your input.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this sponsor?')) {
      setLoading(true);
      try {
        await deleteSponsor(id);
        await fetchSponsors();
      } catch (err) {
        setError('Failed to delete sponsor.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-6">
      <Link to="/admin/dashboard" className="text-orange-600 hover:underline mb-4 inline-block">&larr; Back to Dashboard</Link>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Sponsors</h1>
        <button onClick={() => handleOpenModal()} className="px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">Add New Sponsor</button>
      </div>

      {loading && !sponsors.length > 0 && <p>Loading sponsors...</p>}
      
      {error && !isModalOpen && <p className="text-red-600 mb-4">{error}</p>}

      <div className="bg-white p-4 rounded-lg shadow-md">
        <ul className="space-y-4">
          {sponsors.map(sponsor => (
            <li key={sponsor._id} className="p-4 border rounded-md flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img src={sponsor.logoUrl} alt={sponsor.name} className="w-16 h-16 object-contain rounded-full bg-gray-100"/>
                <div>
                  <p className="font-bold">{sponsor.name}</p>
                  <p className="text-sm text-gray-600">{sponsor.category.english}</p>
                </div>
              </div>
              <div className="space-x-2">
                <button onClick={() => handleOpenModal(sponsor)} className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Edit</button>
                <button onClick={() => handleDelete(sponsor._id)} className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full h-full overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{currentSponsor ? 'Edit Sponsor' : 'Add New Sponsor'}</h2>
            
            {error && <p className="text-red-600 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Sponsor Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <ImageUpload 
                label="Sponsor Logo"
                value={formData.logoUrl}
                onUploadSuccess={(url) => setFormData(prev => ({ ...prev, logoUrl: url }))}
              />
              <div>
                <label className="block text-sm font-medium">Category (English)</label>
                <input type="text" value={formData.category.english} onChange={(e) => handleChange(e, 'english', 'category')} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
              </div>
               <div>
                <label className="block text-sm font-medium">Category (Marathi)</label>
                <input type="text" value={formData.category.marathi} onChange={(e) => handleChange(e, 'marathi', 'category')} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium">Description (English)</label>
                <textarea value={formData.description.english} onChange={(e) => handleChange(e, 'english', 'description')} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium">Description (Marathi)</label>
                <textarea value={formData.description.marathi} onChange={(e) => handleChange(e, 'marathi', 'description')} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
              </div>
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

export default ManageSponsorsPage;
