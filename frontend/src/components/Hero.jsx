
// client/src/components/Hero.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/images/hero_bg.jpg';
import { searchVendors } from '../api.js'; // Import API call

const Hero = () => {
  const [location, setLocation] = useState('');
  const [serviceType, setServiceType] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [vendors, setVendors] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    setErrorMessage('');
    try {
      const results = await searchVendors(location, serviceType);
      console.log('Fetched vendors:', results);
      setVendors(results); // Set the vendors data for rendering
      navigate('/search-vendors', { state: { vendors: results } }); // Pass vendors in the state
    } catch (error) {
      console.error('Error fetching vendors:', error);
      setErrorMessage('Failed to fetch vendors. Please try again.');
    }
  };
  
  return (
    <section 
      className="relative bg-cover bg-center bg-gray-100" 
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative container mx-auto px-4 py-16 text-center text-white">
        <h1 className="text-4xl font-bold text-white">Find Your Service Provider</h1>
        <p className="mt-4 text-white">Served 25k plus requests all over India</p>
        {errorMessage && <p className="mt-4 text-red-400">{errorMessage}</p>}

        <div className="mt-8 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          <input 
            type="text" 
            placeholder="City, Zip" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border p-2 rounded-full w-full md:w-1/3 text-sm focus:outline-none focus:ring-2 text-gray-700 focus:ring-purple-600"
            aria-label="Location"
          />
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="border p-2 rounded-full w-full md:w-1/3 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            aria-label="Type of Service"
          >
            <option value="" disabled>Select Type of Service</option>
            <option value="cleaning">Cleaning</option>
            <option value="repair">Repair</option>
            <option value="painting">Painting</option>
            <option value="shifting">Shifting</option>
            <option value="plumber">Plumber</option>
            <option value="electric">Electrician</option>
          </select>
        </div>

        <button 
          onClick={handleSearch}
          className="mt-8 bg-purple-600 text-white px-12 py-2 rounded-full text-lg font-semibold transform transition duration-300 hover:scale-110 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default Hero;
