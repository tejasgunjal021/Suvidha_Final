/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Trash,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  CheckCircle as ConfirmedIcon,
} from 'lucide-react';
import { useBookingStore } from '../stores/useBookingStore';
import { useUserStore } from '../stores/useUserStore';
import LoadingSpinner from './LoadingSpinner';

const UserList = () => {
  const { user } = useUserStore();
  const {
    fetchVendorBookings,
    deleteBooking,
    updateBookingStatus,
    bookings,
    loading,
    error,
  } = useBookingStore();

  const [expandedBookingId, setExpandedBookingId] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState(null);
  const [showMore, setShowMore] = useState({}); // New state for toggle

  useEffect(() => {
    fetchVendorBookings();
  }, [fetchVendorBookings]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    console.error('Error fetching bookings:', error);
    return (
      <div className="text-red-500 text-center py-4">
        Error: {error.message || 'Failed to fetch bookings.'}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center text-gray-300 py-10">
        No bookings found.
      </div>
    );
  }

  const sortedBookings = [...bookings].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const handleStatusChange = async (bookingId, newStatus) => {
    setStatusUpdating(bookingId);
    try {
      await updateBookingStatus(bookingId, newStatus);

      fetchVendorBookings();
  
      // Update the booking status in the local state
      const updatedBookings = bookings.map((booking) => {
        if (booking.id === bookingId) {
          return { ...booking, status: newStatus }; // Update status
        }
        return booking;
      });

    } catch (error) {
      console.error('Error updating booking status:', error);
      // Show error feedback to user
    } finally {
      setStatusUpdating(null);
    }
  };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Desktop View */}
      <div className="hidden md:block scrollable overflow-x-auto">
        <table className="min-w-full  divide-y divide-gray-700"> {/* Increased minimum width */}
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Service Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Preferred Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">More</th> {/* Added More Column */}
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-600">
            {sortedBookings.map((booking) => {
              // console.log("booking",booking);
              const userName = booking.user.name || 'Unknown User';
              const firstLetter = userName.charAt(0).toUpperCase();

              return (
                <tr key={booking._id} className="hover:bg-gray-700 transition duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-600 text-white">
                          {firstLetter}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{userName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300 flex items-center">
                      <Mail className="h-5 w-5 mr-2" />
                      {booking.user.email || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300 flex items-center">
                      {booking.status === 'Completed' ? (
                        <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                      ) : booking.status === 'Cancelled' ? (
                        <XCircle className="h-5 w-5 text-red-400 mr-2" />
                      ) : booking.status === 'Confirmed' ? (
                        <ConfirmedIcon className="h-5 w-5 text-blue-400 mr-2" />
                      ) : (
                        <Clock className="h-5 w-5 text-yellow-400 mr-2" />
                      )}
                      {booking.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      {booking.serviceDate ? new Date(booking.serviceDate).toLocaleDateString() : 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{booking.preferredTime || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                      className="bg-gray-700 text-gray-300 rounded px-2 py-1"
                      disabled={statusUpdating === booking.id}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={() => deleteBooking(booking._id)}
                      className="text-red-400 hover:text-red-300"
                      aria-label={`Delete booking for ${userName}`}
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setShowMore((prev) => ({
                        ...prev,
                        [booking._id]: !prev[booking._id], // Toggle visibility
                      }))}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      {showMore[booking._id] ? 'Less' : 'More'}
                    </button>
                    {showMore[booking._id] && ( // Display more info if toggled
                      <div className="mt-2 text-gray-300">
                        <div><strong>Service Description:</strong> {booking.serviceDescription || 'N/A'}</div>
                        <div><strong>Address:</strong> {booking.address || 'N/A'}</div>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        {sortedBookings.map((booking) => {
          const userName = booking.user.name || 'Unknown User';
          const firstLetter = userName.charAt(0).toUpperCase();

          return (
            <div
              key={booking._id}
              className={`bg-gray-800 p-4 rounded-lg mb-4 transition-shadow duration-200 ${
                expandedBookingId === booking._id ? 'shadow-lg' : 'shadow-md'
              } cursor-pointer`}
            >
              <div
                className="flex items-center justify-between"
                onClick={() =>
                  setExpandedBookingId(expandedBookingId === booking._id ? null : booking._id)
                }
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-600 text-white">
                      {firstLetter}
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-white">{userName}</div>
                    <div className="text-sm text-gray-300">{booking.user.email || 'N/A'}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-300">
                  {booking.status === 'Completed' ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : booking.status === 'Cancelled' ? (
                    <XCircle className="h-5 w-5 text-red-400" />
                  ) : (
                    <Clock className="h-5 w-5 text-yellow-400" />
                  )}
                </div>
              </div>

              {expandedBookingId === booking._id && (
                <div className="mt-4">
                  <div className="text-sm text-gray-300">Service Date: {new Date(booking.serviceDate).toLocaleDateString() || 'N/A'}</div>
                  <div className="text-sm text-gray-300">Preferred Time: {booking.preferredTime || 'N/A'}</div>
                  <div className="text-sm text-gray-300">
                    <button
                      onClick={() => setShowMore((prev) => ({
                        ...prev,
                        [booking._id]: !prev[booking._id], // Toggle visibility
                      }))}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      {showMore[booking._id] ? 'Less' : 'More'}
                    </button>
                  </div>
                  {showMore[booking._id] && ( // Display more info if toggled
                    <div className="mt-2 text-gray-300">
                      <div><strong>Service Description:</strong> {booking.serviceDescription || 'N/A'}</div>
                      <div><strong>Address:</strong> {booking.address || 'N/A'}</div>
                    </div>
                  )}
                  <div className="flex justify-between mt-4">
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                      className="bg-gray-700 text-gray-300 rounded px-2 py-1"
                      disabled={statusUpdating === booking.id}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={() => deleteBooking(booking._id)}
                      className="text-red-400 hover:text-red-300"
                      aria-label={`Delete booking for ${userName}`}
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default UserList;
