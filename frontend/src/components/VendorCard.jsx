/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const VendorCard = ({ id, name, occupation,price, address, image }) => {
  return (
    <div className="bg-gradient-to-br from-purple-500 to-purple-300 p-6 shadow-lg rounded-lg transition-colors duration-300 hover:bg-gradient-to-br hover:from-purple-600 hover:to-purple-400 flex flex-col items-center">
      {/* Profile Image */}
      <img
        src={image}
        alt={name}
        className="rounded-full w-32 h-32 border-4 border-white mb-4 shadow-md"
      />

      {/* Name */}
      <h3 className="font-bold text-2xl text-center text-white">{name}</h3>

      {/* Occupation */}
      <p className="text-gray-100 text-lg italic mt-1">{occupation}</p>

      <p className="text-gray-200 text-sm text-center mt-2"> {price} ₹</p>

      {/* Address */}
      <p className="text-gray-200 text-sm text-center mt-2">{address}</p>

      {/* Book Service Button */}
      <div className="flex justify-center mt-4 w-full">
        <Link to={`/vendor/${id}`}>
          <button className="bg-purple-600 text-white px-4 py-2 rounded transition-transform duration-300 hover:bg-purple-700 hover:scale-105">
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VendorCard;
