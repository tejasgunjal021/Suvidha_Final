/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect } from 'react';
import { createVendor } from '../api'; // API function to submit form data
import { useNavigate } from 'react-router-dom';
import axios from '../lib/axios'; // Import axios

const AddVendor = () => {
  const [formData, setFormData] = useState({
    address: '',
    occupation: '',
    description: '',
    location: '',
    category: '',
    price: '',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state
  const navigate = useNavigate();
  const galleryInputRef = useRef(null);

  // Fetch current user data on component mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('/auth/current');
        setUserId(response.data._id);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setError("Failed to fetch user data. Please try again.");
      }
    };

    fetchCurrentUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file); // Store the file in state
    }
  };

  const handleAddGalleryImage = () => {
    if (galleryInputRef.current) {
      galleryInputRef.current.click();
    }
  };

  const handleGalleryChange = (e) => {
    const newImages = Array.from(e.target.files);
    setGalleryImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError("User ID is not set. Please try again.");
      return;
    }

    if (!formData.address.trim() || !formData.occupation.trim() || !formData.location.trim() || !formData.category.trim() ||  !formData.price.trim()) {
      setError("Please fill out all required fields.");
      return;
    }

    const data = new FormData();
    data.append('userId', userId);
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (profileImage) {
      data.append('image', profileImage);
    }
    if (galleryImages.length > 0) {
      galleryImages.forEach((file) => data.append('gallery', file));
    }

    try {
      setLoading(true); // Set loading state
      const response = await createVendor(data);
      const vendorId = response.data._id;

      await axios.patch(`/auth/${userId}/role`, { role: 'admin' });

      navigate(`/secret-dashboard`);
      resetForm();
    } catch (error) {
      setError('Failed to create vendor. Please try again.');
      console.error('Error creating vendor:', error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const resetForm = () => {
    setFormData({
      address: '',
      occupation: '',
      description: '',
      location: '',
      category: '',
      price: '',
    });
    setProfileImage(null);
    setGalleryImages([]);
    setError(''); // Reset error message
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h2 className="text-3xl font-bold text-center mb-6">Become a Vendor</h2>
      {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8" encType="multipart/form-data">
        
        {/* Profile Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profileImage">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            className="bg-gray-600"
          />
        </div>

        {/* Address Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border bg-gray-600 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            required
          />
        </div>

        {/* Occupation Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="occupation">
            Occupation
          </label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="w-full px-4 py-2 border bg-gray-600 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            required
          />
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border bg-gray-600 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            placeholder="Describe your services..."
          />
        </div>

        {/* Location Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border bg-gray-600 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            required
          />
        </div>

        {/* Price Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border bg-gray-600 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            required
          />
        </div>

        {/* Category Field (Updated to Dropdown) */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border bg-gray-600 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="cleaning">Cleaning</option>
            <option value="repair">Repair</option>
            <option value="painting">Painting</option>
            <option value="shifting">Shifting</option>
            <option value="plumber">Plumber</option>
            <option value="electric">Electrician</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Profile Image Preview */}
        {profileImage && (
          <div className="mb-4">
            <h3 className="text-sm font-bold">Profile Image Preview:</h3>
            <img src={URL.createObjectURL(profileImage)} alt="Profile" className="w-full h-auto mb-2" />
          </div>
        )}

        {/* Gallery Images Preview */}
        {galleryImages.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-bold">Gallery Images Preview:</h3>
            <div className="grid grid-cols-3 gap-2">
              {galleryImages.map((image, index) => (
                <div key={index} className="relative">
                  <img src={URL.createObjectURL(image)} alt={`Gallery Image ${index + 1}`} className="w-full h-auto" />
                  <button
                    type="button"
                    className="absolute top-0 right-0 text-red-500"
                    onClick={() => {
                      const updatedImages = galleryImages.filter((_, i) => i !== index);
                      setGalleryImages(updatedImages);
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Gallery Images Button */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gallery">
            Gallery Images
          </label>
          <input
            type="file"
            name="gallery"
            accept="image/*"
            multiple
            className='bg-gray-600'
            onChange={handleGalleryChange}
            ref={galleryInputRef} // Reference to the input
            style={{ display: 'none' }} // Hide the file input
          />
          <button
            type="button"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            onClick={handleAddGalleryImage}
          >
            Add Gallery Images
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Submitting...' : 'Submit Vendor'}
        </button>
      </form>
    </div>
  );
};

export default AddVendor;
