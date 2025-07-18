import { useEffect, useState } from 'react';
import { getVendors } from '../api.js'; // Update this import based on your project structure
import VendorCard from './VendorCard'; // Adjust this import based on your project structure
import LoadingSpinner from './LoadingSpinner.jsx';
import { motion } from 'framer-motion'; // Importing Framer Motion for animations

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await getVendors();
        // console.log("Fetched vendors:", response.data);
        setVendors(response.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
        setError("Failed to load vendors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  if (loading) return <div><LoadingSpinner /></div>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Centered animated heading */}
      <motion.h2
        className="text-4xl font-bold mb-8 text-purple-600 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Our Trusted Vendors
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {Array.isArray(vendors) && vendors.length > 0 ? (
          vendors.map((vendor) => (
            <motion.div
              key={vendor._id}
              className="transition-transform transform hover:scale-100" // Adjusted scale on hover
              whileHover={{ scale: 1.02 }} // Slight hover effect
            >
              <VendorCard
                id={vendor._id}
                name={vendor.userId?.name || vendor.name || 'Unnamed Vendor'}
                occupation={vendor.occupation}
                address={vendor.address}
                price={vendor.price || 'N/A'} 
                image={vendor.profileImage || 'default-image-url.jpg'} // Fallback for profile image
              />
            </motion.div>
          ))
        ) : (
          <div className="text-center text-gray-500">No vendors available.</div>
        )}
      </motion.div>
    </div>
  );
};

export default VendorList;
