import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trash, Clock, CheckCircle, Mail, XCircle, CheckCircle as ConfirmedIcon } from 'lucide-react';
import { useBookingStore } from '../stores/useBookingStore';
import LoadingSpinner from './LoadingSpinner';

const BookingList = () => {
  const { fetchBookings, deleteBooking, bookings, loading, error } = useBookingStore();
  const [expandedBookingId, setExpandedBookingId] = useState(null); // State for expanded bookings

  useEffect(() => {
    const loadBookings = async () => {
      try {
        // console.log("Fetching bookings...");
        await fetchBookings();
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };
    loadBookings();
  }, [fetchBookings]);

  if (loading) {
    return <div><LoadingSpinner/></div>; // Consider using a spinner here
  }

  if (error) {
    return <div>Error: {error.message || 'Failed to fetch bookings.'}</div>; // Improved error message
  }

  // Sort bookings by createdAt in descending order
  const sortedBookings = [...bookings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <motion.div
      className='bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Desktop View */}
      <div className="hidden md:block">
        <table className='min-w-full divide-y divide-gray-700'>
          <thead className='bg-gray-700'>
            <tr>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Vendor</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Email</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Status</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Service Date</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Preferred Time</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Category</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Actions</th>
            </tr>
          </thead>

          <tbody className='bg-gray-900 divide-y divide-gray-600'>
  {sortedBookings.map((booking) => {
    // console.log("Booking object:", booking); // Log the whole booking object
    return (  // Return the JSX
      <tr key={booking._id} className='hover:bg-gray-700'>
        <td className='px-6 py-4 whitespace-nowrap max-w-[150px] overflow-hidden text-ellipsis'>
          <div className='flex items-center'>
            <div className='flex-shrink-0 h-10 w-10'>
              <img className='h-10 w-10 rounded-full object-cover' src={booking.vendor.profileImage} alt={booking.vendor.name} />
            </div>
            <div className='ml-4'>
              <div className='text-sm font-medium text-white overflow-hidden whitespace-nowrap overflow-ellipsis'>
                {booking.vendor.name}
              </div>
            </div>
          </div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm text-gray-300 flex items-center'>
            <Mail className='h-5 w-5 mr-2' />
            {booking.vendor.email}
          </div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm text-gray-300 flex items-center'>
            {booking.status === 'Completed' ? (
              <CheckCircle className='h-5 w-5 text-green-400 mr-2' />
            ) : booking.status === 'Cancelled' ? (
              <XCircle className='h-5 w-5 text-red-400 mr-2' />
            ) : booking.status === 'Confirmed' ? (
              <ConfirmedIcon className='h-5 w-5 text-blue-400 mr-2' />
            ) : (
              <Clock className='h-5 w-5 text-yellow-400 mr-2' />
            )}
            {booking.status}
          </div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm text-gray-300'>
            {booking.serviceDate ? new Date(booking.serviceDate).toLocaleDateString() : 'N/A'}
          </div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm text-gray-300'>{booking.preferredTime || 'N/A'}</div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm text-gray-300'>{booking.vendor.category || 'N/A'}</div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium w-24'>
          <button 
            onClick={() => {
              console.log("Deleting booking with ID:", booking._id); // Log the ID being deleted
              deleteBooking(booking._id);
            }} 
            className='text-red-400 hover:text-red-300' 
            aria-label={`Delete booking for ${booking.vendor.name}`}>
            <Trash className='h-5 w-5' />
          </button>
        </td>
      </tr>
    );
  })}
</tbody>

        </table>
      </div>

      {/* Mobile View */}
      <div className='block md:hidden'>
        {sortedBookings.map((booking) => (
          <div
            key={booking._id}
            className={`bg-gray-800 p-4 rounded-lg mb-4 ${expandedBookingId === booking._id ? 'shadow-lg' : 'shadow-md'} cursor-pointer`}
            onClick={() => setExpandedBookingId(expandedBookingId === booking._id ? null : booking._id)} // Toggle logic
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <img className='h-12 w-12 rounded-full object-cover' src={booking.vendor.profileImage} alt={booking.vendor.name} />
                <div className='ml-4'>
                  <div className='text-sm font-medium text-white'>{booking.vendor.name}</div>
                  <div className='text-sm text-gray-400'>{booking.status}</div>
                  <div className='text-sm text-gray-400'>{booking.serviceDate ? new Date(booking.serviceDate).toLocaleDateString() : 'N/A'}</div>
                </div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); deleteBooking(booking.id); }} className='text-red-400 hover:text-red-300' aria-label={`Delete booking for ${booking.vendor.name}`}>
                <Trash className='h-5 w-5' />
              </button>
            </div>
            {/* Show additional info when expanded */}
            {expandedBookingId === booking._id && (
              <div className='mt-2 text-gray-300'>
                <div><strong>Email:</strong> {booking.vendor.email}</div>
                <div><strong>Preferred Time:</strong> {booking.preferredTime || 'N/A'}</div>
                <div><strong>Category:</strong> {booking.vendor.category || 'N/A'}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BookingList;
