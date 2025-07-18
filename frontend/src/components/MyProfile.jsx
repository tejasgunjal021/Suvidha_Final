import { useEffect, useState } from "react";
import { useUserStore } from "../stores/useUserStore.js";
import { getVendorByUserId, updateVendor } from "../api.js"; // Ensure you have updateVendor in your API
import LoadingSpinner from "./LoadingSpinner";
import toast from 'react-hot-toast'; // For notifications

const MyProfile = () => {
  const { user } = useUserStore();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State for editing mode
  const [formData, setFormData] = useState({
    occupation: '',
    location: '',
    description: '',
    category: '',
    address: '',
    price: '',
  });

  useEffect(() => {
    const fetchVendor = async () => {
      if (!user) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      try {
        const userId = user._id;
        const response = await getVendorByUserId(userId);
        const matchedVendor = response.data.find(vendor => vendor.userId._id === userId);

        if (matchedVendor) {
          setVendor(matchedVendor);
          setFormData({
            occupation: matchedVendor.occupation || '',
            location: matchedVendor.location || '',
            description: matchedVendor.description || '',
            category: matchedVendor.category || '',
            address: matchedVendor.address || '',
            price: matchedVendor.price || '',
          });
        } else {
          setError("Vendor not found.");
        }

      } catch (err) {
        console.error(err);
        setError("Failed to fetch vendor profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const vendorId = vendor._id; // Get the vendor ID from the vendor state
    const success = await updateVendor(vendorId, formData); // Use vendorId for update

    if (success) {
      toast.success("Vendor profile updated successfully!");
      setIsEditing(false); // Exit editing mode
      setVendor((prevVendor) => ({
        ...prevVendor,
        ...formData
      }));
    } else {
      toast.error("Failed to update vendor profile. Please try again.");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-600 mb-4 text-center">Vendor Profile</h2>
      
      <div className="flex items-center justify-center mb-6">
        {vendor?.profileImage ? (
          <img
            src={vendor.profileImage}
            alt={`${user?.name}'s profile`}
            className="w-32 h-32 rounded-full border-4 border-purple-600 shadow-lg"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-300 border-4 border-purple-600 shadow-lg" />
        )}
      </div>

      <h3 className="text-xl font-semibold text-center">{user?.name || "No name provided"}</h3>
      <p className="text-center text-gray-300"><strong>Email:</strong> {user?.email || "No email provided"}</p>

      <form onSubmit={handleUpdate} className="mt-4 p-4 bg-gray-700 rounded-lg shadow-md">
        <h4 className="text-lg font-bold text-purple-500">About Vendor</h4>
        <div className="mt-1">
          <label className="block text-gray-300">Occupation:</label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-gray-800 text-gray-300"
            disabled={!isEditing}
          />
        </div>
        <div className="mt-1">
          <label className="block text-gray-300">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-gray-800 text-gray-300"
            disabled={!isEditing}
          />
        </div>
        <div className="mt-1">
          <label className="block text-gray-300">Address:</label> {/* Address field */}
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-gray-800 text-gray-300"
            disabled={!isEditing}
          />
        </div>
        <div className="mt-1">
          <label className="block text-gray-300">Price:</label> {/* Price field */}
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-gray-800 text-gray-300"
            disabled={!isEditing}
            required
          />
        </div>
        <div className="mt-1">
          <label className="block text-gray-300">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-gray-800 text-gray-300"
            disabled={!isEditing}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange} // Use handleInputChange to update state
            className="w-full px-4 py-2 border bg-gray-700 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
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

        <div className="flex justify-between mt-4">
          <button 
            type="button" 
            onClick={() => setIsEditing(prev => !prev)} 
            className="bg-purple-600 text-white px-4 py-2 rounded-md"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          
          {isEditing && (
            <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-md">
              Save Changes
            </button>
          )}
        </div>
      </form>

      <div className="mt-6">
        <h4 className="text-lg font-semibold text-purple-500">Gallery</h4>
        <div className="grid grid-cols-3 gap-4 mt-2">
          {vendor?.galleryImages?.length > 0 ? (
            vendor.galleryImages.map((image, index) => (
              <div key={index} className="w-full h-40 overflow-hidden rounded-lg shadow-md">
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform transform hover:scale-105"
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No gallery images available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
