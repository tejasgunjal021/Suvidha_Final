/* eslint-disable no-unused-vars */
import { BarChart2, Clipboard, CheckCircle, Calendar, XCircle } from "lucide-react"; // Import new icon for cancelled bookings
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import StatCard from "./StatCard.jsx";
import BookingChart from "./BookingChart.jsx";
import StatusDistributionChart from "./StatusDistributionChart.jsx";
import { useBookingStore } from "../../stores/useBookingStore"; // Adjust the path as needed

const OrderOverview = () => {
  const { fetchVendorBookings, bookings, loading, error } = useBookingStore(); // Remove users from the store
  const [dailyBookings, setDailyBookings] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [completedBookings, setCompletedBookings] = useState(0);
  const [cancelledBookings, setCancelledBookings] = useState(0); // State for cancelled bookings

  useEffect(() => {
    fetchVendorBookings();
  }, [fetchVendorBookings]);

  useEffect(() => {
    if (bookings) {
      const today = new Date().toISOString().split("T")[0];
      const total = bookings.length; // Total bookings
      const completed = bookings.filter(booking => booking.status === "Completed").length; // Completed bookings
      const cancelled = bookings.filter(booking => booking.status === "Cancelled").length; // Cancelled bookings
      const daily = bookings.filter(booking => new Date(booking.createdAt).toISOString().split("T")[0] === today).length; // Daily bookings

      setTotalBookings(total);
      setCompletedBookings(completed);
      setCancelledBookings(cancelled); // Set cancelled bookings
      setDailyBookings(daily);
    }
  }, [bookings]);

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>

        {/* STATS */}
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name='Daily Bookings' icon={Calendar} value={dailyBookings} color='#6366F1' />
          <StatCard name='Total Bookings' icon={Clipboard} value={totalBookings} color='#8B5CF6' />
          <StatCard name='Completed Bookings' icon={CheckCircle} value={completedBookings} color='#10B981' />
          <StatCard name='Cancelled Bookings' icon={XCircle} value={cancelledBookings} color='#EF4444' /> {/* New Cancelled Bookings card */}
        </motion.div>

        {/* CHARTS */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <BookingChart />
          <StatusDistributionChart />
        </div>

      </main>
    </div>
  );
}

export default OrderOverview;
