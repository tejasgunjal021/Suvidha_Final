import {create} from 'zustand';
import axiosInstance from '../lib/axios'; // Assuming you have an axios instance set up

export const useBookingStore = create((set,get) => ({
  bookings: [], // Initial state for bookings
  loading: false, // Loading state
  error: null, // Error state

  // Fetch all bookings
  fetchBookings: async () => {
    set({ loading: true, error: null }); // Set loading to true and reset error
    try {
      const response = await axiosInstance.get('/bookings/all-bookings'); // Adjust this endpoint based on your API
      set({ bookings: response.data, loading: false }); // Set bookings and stop loading
    } catch (error) {
      set({ error: error.message, loading: false }); // Set error and stop loading
      console.error('Error fetching bookings:', error);
    }
  },

  deleteBooking: async (bookingId) => {
    // Get the current state of bookings
    const currentBookings = get().bookings;
  
    // Immediately update the state to remove the booking
    set({
      bookings: currentBookings.filter((booking) => booking._id !== bookingId),
      loading: true,
    });
  
    try {
      console.log("Deleting booking with ID:", bookingId);
      await axiosInstance.delete(`/bookings/delete/${bookingId}`);
      get().fetchBookings();
      // No further action needed if the delete was successful
      set({ loading: false });
    } catch (error) {
      // If an error occurs, revert to the previous bookings state
      set({
        bookings: currentBookings, // Revert to original bookings
        error: error.message,
        loading: false,
      });
      console.error('Error deleting booking:', error);
    }
  },
  

  // deleteBooking: async (bookingId) => {
  //   set({ loading: true });
  //   try {
  //     console.log("Deleting booking with ID:", bookingId);
  //       await axiosInstance.delete(`/bookings/delete/${bookingId}`); // Send ID in the body
  //     set((state) => ({
  //       bookings: state.bookings.filter((booking) => booking._id !== bookingId), // Remove booking from state
  //       loading: false,
  //     }));
  //   } catch (error) {
  //     set({ error: error.message, loading: false });
  //     console.error('Error deleting booking:', error);
  //   }
  // },


  updateBookingStatus: async (bookingId, newStatus) => {
    console.log('Updating booking with ID:', bookingId, 'to status:', newStatus);
    set({ loading: true });
    try {
      const response = await axiosInstance.put(`/bookings/${bookingId}/status`, { status: newStatus });
      set((state) => ({
        bookings: state.bookings.map((booking) =>
          booking._id === bookingId ? { ...booking, status: response.data.status } : booking
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.response?.data || error.message, loading: false });
      console.error('Error updating booking status:', error);
    }
  },

  fetchVendorBookings: async () => {
    set({ loading: true, error: null });
    try {
      // Fetching bookings for the current vendor (no need for vendorId as it's fetched based on userId)
      const response = await axiosInstance.get('/bookings/vendor-bookings');

      // console.log('Fetched Bookings:', response.data);
      
      set({ bookings: response.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data || error.message, loading: false });
      console.error('Error fetching bookings:', error);
    }
  },
  
}));
