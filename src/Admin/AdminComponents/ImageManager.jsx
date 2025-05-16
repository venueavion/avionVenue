import { useState } from 'react';
import { supabase } from '../supabaseClient'; // Assuming this path is correct
import './ImageManager.css'; // Import the new CSS file

import { categories } from './category-value';
import ImageGallery from './ImageGallery';
// SVG Icon for the file input area (can be kept as is or moved to CSS if preferred as background)
const FileUploadIcon = (props) => (
  <svg
    className="file-upload-icon" // Added a class for potential CSS targeting
    stroke="currentColor"
    fill="none"
    viewBox="0 0 48 48"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ImageManager() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('general');
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(''); // For displaying upload errors
  const [successMessage, setSuccessMessage] = useState(''); // For success messages

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setError(''); // Clear previous errors
    setSuccessMessage(''); // Clear previous success messages
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        // 10MB size limit
        setError('File is too large. Maximum size is 10MB.');
        setFile(null);
        setPreviewUrl(null);
        e.target.value = ''; // Reset file input
        return;
      }
      const allowedTypes = [
        'image/png',
        'image/jpeg',
        'image/gif',
        'image/webp',
      ];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError(
          'Invalid file type. Please upload a PNG, JPG, GIF, or WEBP image.'
        );
        setFile(null);
        setPreviewUrl(null);
        e.target.value = ''; // Reset file input
        return;
      }

      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFile(null);
      setPreviewUrl(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an image file to upload.');
      return;
    }

    setIsUploading(true);
    setError('');
    setSuccessMessage('');

    try {
      const token = (await supabase.auth.getSession()).data.session
        ?.access_token;
      if (!token) {
        throw new Error('Not authenticated. Please log in.');
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);

      const response = await fetch('http://localhost:3000/images/upload', {
        // Replace with your actual API endpoint
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Upload failed due to a server error.');
      }

      // const result = await response.json(); // Assuming server returns JSON
      setSuccessMessage('Image uploaded successfully!');

      // Reset form
      setFile(null);
      setPreviewUrl(null);
      setTitle('');
      setDescription('');
      setCategory('general');
      if (e.target.elements.fileInput) {
        e.target.elements.fileInput.value = '';
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(`Upload failed: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="image-manager-container bg-gray-900">
      <div className="upload-card">
        <div className="upload-header">
          <h2>Upload New Image</h2>
          <p>Fill in the details below to add an image to your gallery.</p>
        </div>

        {error && (
          <div className="message error-message" role="alert">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="message success-message" role="alert">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleUpload} className="upload-form">
          <div className="form-group">
            <label htmlFor="fileInput" className="form-label">
              Image File <span className="required-asterisk">*</span>
            </label>
            <div className="file-dropzone">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="file-preview-image"
                />
              ) : (
                <FileUploadIcon />
              )}
              <div className="file-dropzone-text">
                <label
                  htmlFor="fileInput"
                  className="file-input-label-button text-green-400"
                >
                  <span>Upload a file</span>
                  <input
                    id="fileInput"
                    name="fileInput"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg, image/gif, image/webp"
                    className="sr-only" // Visually hidden, label acts as button
                    required
                  />
                </label>
                <p className="drag-drop-text">or drag and drop</p>
              </div>
              <p className="file-instructions">
                PNG, JPG, GIF, WEBP up to 10MB
              </p>
              {file && <p className="selected-file-name">{file.name}</p>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              placeholder="e.g., Sunset Over The Mountains"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
              placeholder="A brief description of the image..."
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-select"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isUploading || !file}
          >
            {isUploading ? (
              <>
                <svg
                  className="spinner"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="bg-gray-400"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Uploading...
              </>
            ) : (
              'Upload Image'
            )}
          </button>
        </form>
      </div>
      <div>
        <ImageGallery />
      </div>
    </div>
  );
}
