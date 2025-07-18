import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVendorsByCategory } from '../api.js'; // Adjust based on your API setup
import VendorCard from './VendorCard'; // Adjust import based on your project structure
import LoadingSpinner from './LoadingSpinner.jsx';
import { motion } from 'framer-motion'; // For animations

const VendorsByCategory = () => {
  const { category } = useParams(); // Get category from URL params
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetchVendorsByCategory(category); // Fetch vendors based on category
        // console.log("API Response:", response);
        setVendors(response.data.vendors || []); // Fallback to empty array
      } catch (error) {
        console.error("Error fetching vendors:", error);
        // Friendly message for various error cases
        if (error.response && error.response.status === 404) {
          setError("No vendors found for this category. Check back later!"); // Friendly message
        } else {
          setError("Failed to load vendors. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, [category]); // Fetch vendors when the category changes

  if (loading) return (
    
      <div className="flex flex-col justify-center items-center h-screen">
        <LoadingSpinner />
        <p className="mt-2 text-lg text-purple-600">Loading vendors, please wait...</p>
      </div>
    
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Animated heading */}
      <motion.h2
        className="text-4xl font-bold mb-8 text-purple-600 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {category.charAt(0).toUpperCase() + category.slice(1)} Vendors
      </motion.h2>

      {/* Conditional rendering based on vendor availability */}
      {vendors.length === 0 ? (
        <motion.div
          className="text-center p-6 border rounded-lg shadow-lg bg-green-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-purple-700">
            {error || "No vendors available in this category. Check back soon!"}
          </h3>
          <p className="text-gray-500 mt-2">
            We’re constantly updating our listings. Stay tuned!
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {vendors.map((vendor) => (
            <motion.div
              key={vendor._id}
              className="transition-transform transform hover:scale-100"
              whileHover={{ scale: 1.02 }} // Slight hover effect
            >
              <VendorCard
                id={vendor._id}
                name={vendor.userId?.name || vendor.name || 'Unnamed Vendor'}
                occupation={vendor.occupation}
                price={vendor.price}
                address={vendor.address}
                image={vendor.profileImage || 'default-image-url.jpg'} // Fallback for profile image
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default VendorsByCategory;
