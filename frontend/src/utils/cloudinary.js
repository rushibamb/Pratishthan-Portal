/**
 * Creates an optimized Cloudinary URL with specified transformations.
 * @param {string} url - The original Cloudinary image URL.
 * @param {object} options - Transformation options.
 * @param {number} [options.width] - The target width of the image.
 * @param {number} [options.height] - The target height of the image.
 * @param {string} [options.crop] - The crop mode (e.g., 'fill', 'fit').
 * @param {string} [options.quality] - The quality setting (e.g., 'auto').
 * @returns {string} The transformed Cloudinary URL.
 */
export const getOptimizedUrl = (url, { width, height, crop = 'fill', quality = 'auto' } = {}) => {
  if (!url || typeof url !== 'string') {
    return `https://placehold.co/${width || 100}x${height || 100}/eee/ccc?text=No+Image`;
  }
  
  const parts = url.split('/upload/');
  if (parts.length < 2) {
    return url;
  }

  const transformations = [];
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);
  if (quality) transformations.push(`q_${quality}`);

  return `${parts[0]}/upload/${transformations.join(',')}/${parts[1]}`;
};
