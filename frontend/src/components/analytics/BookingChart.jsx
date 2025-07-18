import { useEffect } from "react";
import { useBookingStore } from "../../stores/useBookingStore"; // Adjust the import according to your Zustand store file path
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

// Function to transform bookings data into daily format
const transformBookingsData = (bookings) => {
  const bookingMap = {};
  const today = new Date();
  const past10Days = [];

  // Generate dates for the past 10 days
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    past10Days.push(date.toISOString().split("T")[0]); // Format date to YYYY-MM-DD
  }

  bookings.forEach((booking) => {
    const date = new Date(booking.createdAt).toISOString().split("T")[0]; // Format date to YYYY-MM-DD
    bookingMap[date] = (bookingMap[date] || 0) + 1; // Increment the booking count for the date
  });

  // Prepare the daily bookings data, including zero counts for dates with no bookings
  return past10Days.map((date) => ({
    date,
    bookings: bookingMap[date] || 0, // Set to 0 if no bookings exist for the date
  }));
};

const BookingChart = () => {
  const { fetchVendorBookings, bookings, loading, error } = useBookingStore();

  useEffect(() => {
    fetchVendorBookings();
  }, [fetchVendorBookings]);

  const dailyBookings = transformBookingsData(bookings);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">Daily Bookings Overview</h2>

      {loading && <p className="text-gray-200">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="overflow-x-auto scroll-container">
        <div className="min-w-full"> {/* Changed to min-w-full to fit full width */}
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyBookings}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis dataKey={"date"} stroke="#9ca3af" angle={-45} textAnchor="end" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(31, 41, 55, 0.8)",
                  borderColor: "#4B5563",
                }}
                itemStyle={{ color: "#E5E7EB" }}
              />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#6366F1"
                strokeWidth={3}
                dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingChart;
