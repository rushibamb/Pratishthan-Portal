import React, { useState, useRef } from 'react';
import { uploadImage } from '../../services/api';

const ImageUpload = ({ label, value, onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const { data } = await uploadImage(formData);
      onUploadSuccess(data.imageUrl); // Pass the new URL to the parent component
    } catch (err) {
      setError('Image upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleButtonClick = () => {
    // Trigger the hidden file input click event
    fileInputRef.current.click();
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 flex items-center space-x-4">
        {value ? (
          <img src={value} alt="Preview" className="w-20 h-20 object-cover rounded-md bg-gray-100" />
        ) : (
          <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-md text-gray-400">
            No Image
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden" // Hide the default file input
        />
        <button
          type="button"
          onClick={handleButtonClick}
          disabled={uploading}
          className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </div>
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      <input
        type="text"
        value={value || ''}
        readOnly
        placeholder="Image URL will appear here after upload"
        className="mt-2 w-full text-sm text-gray-500 bg-gray-50 border-gray-300 rounded-md shadow-sm"
      />
    </div>
  );
};

export default ImageUpload;
