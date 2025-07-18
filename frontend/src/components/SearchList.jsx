
import { useLocation } from 'react-router-dom';
import VendorCard from './VendorCard';

const SearchList = () => {
  const location = useLocation();
  const vendors = location.state?.vendors || []; // Get vendors from location state, default to an empty array if not found

  // console.log(vendors); // For debugging

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Available Vendors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vendors.length === 0 ? (
          <p>No vendors found.</p>
        ) : (
          vendors.map((vendor) => (
            <VendorCard
              key={vendor._id}
              id={vendor._id}
              name={vendor.userId?.name || vendor.name || 'Unnamed Vendor'}
              occupation={vendor.category} // Assuming category represents occupation
              price={vendor.price} // You may need to adjust this if price is not a direct property
              address={vendor.address} // Assuming location is the address
              image={vendor.profileImage} // Add image URL if available in the vendor data 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchList;

