/* eslint-disable react/prop-types */
import { useState } from "react";

const VendorForm = ({ onSubmit, initialData }) => {
  const [vendor, setVendor] = useState({
    name: initialData?.name || "",
    address: initialData?.address || "",
    occupation: initialData?.occupation || "",
    description: initialData?.description || "",
    image: initialData?.image || "",
    gallery: initialData?.gallery || [],
    email: initialData?.email || "",
    location: initialData?.location || "", // New field: location
    category: initialData?.category || "", // New field: category
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendor({ ...vendor, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(vendor);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-r from-purple-500 to-indigo-500 p-8 rounded shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">Vendor Information</h2>
      
      {/* Name Field */}
      <div className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={vendor.name}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded w-full px-4 py-2 focus:outline-none focus:ring focus:ring-purple-300"
        />
      </div>

      {/* Address Field */}
      <div className="mb-4">
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={vendor.address}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded w-full px-4 py-2 focus:outline-none focus:ring focus:ring-purple-300"
        />
      </div>

      {/* Occupation Field */}
      <div className="mb-4">
        <input
          type="text"
          name="occupation"
          placeholder="Occupation"
          value={vendor.occupation}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded w-full px-4 py-2 focus:outline-none focus:ring focus:ring-purple-300"
        />
      </div>

      {/* Description Field */}
      <div className="mb-4">
        <textarea
          name="description"
          placeholder="Description"
          value={vendor.description}
          onChange={handleChange}
          rows="4"
          className="border border-gray-300 rounded w-full px-4 py-2 focus:outline-none focus:ring focus:ring-purple-300"
        />
      </div>

      {/* Email Field */}
      <div className="mb-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={vendor.email}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded w-full px-4 py-2 focus:outline-none focus:ring focus:ring-purple-300"
        />
      </div>

      {/* Profile Image Field */}
      <div className="mb-4">
        <input
          type="text"
          name="image"
          placeholder="Profile Image URL"
          value={vendor.image}
          onChange={handleChange}
          className="border border-gray-300 rounded w-full px-4 py-2 focus:outline-none focus:ring focus:ring-purple-300"
        />
      </div>

      {/* Gallery Field */}
      <div className="mb-4">
        <input
          type="text"
          name="gallery"
          placeholder="Gallery Image URLs (comma separated)"
          value={vendor.gallery.join(",")}
          onChange={(e) =>
            setVendor({ ...vendor, gallery: e.target.value.split(",") })
          }
          className="border border-gray-300 rounded w-full px-4 py-2 focus:outline-none focus:ring focus:ring-purple-300"
        />
      </div>

      {/* New Location Field */}
      <div className="mb-4">
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={vendor.location}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded w-full px-4 py-2 focus:outline-none focus:ring focus:ring-purple-300"
        />
      </div>

      {/* New Category Field */}
      <div className="mb-4">
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={vendor.category}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded w-full px-4 py-2 focus:outline-none focus:ring focus:ring-purple-300"
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="bg-purple-600 text-white rounded w-full py-2 hover:bg-purple-700 transition duration-300"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default VendorForm;
