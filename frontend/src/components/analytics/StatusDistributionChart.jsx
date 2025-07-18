import { useEffect } from "react";
import { useBookingStore } from "../../stores/useBookingStore"; // Adjust the import according to your Zustand store file path
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Bars } from "react-loader-spinner"; // Import the loader

// Colors for the pie chart segments
const COLORS = ["#6366F1", "#10B981", "#EC4899", "#F59E0B"]; // Colors for different statuses

const StatusDistributionChart = () => {
  const { fetchVendorBookings, bookings, loading, error } = useBookingStore();

  useEffect(() => {
    fetchVendorBookings();
  }, [fetchVendorBookings]);

  // Function to transform bookings data into status distribution
  const transformBookingStatusData = (bookings) => {
    const statusCount = {
      Pending: 0,
      Confirmed: 0,
      Cancelled: 0,
      Completed: 0,
    };

    bookings.forEach((booking) => {
      if (Object.prototype.hasOwnProperty.call(statusCount, booking.status)) {
        statusCount[booking.status]++;
      }
    });

    return Object.entries(statusCount).map(([name, value]) => ({ name, value }));
  };

  const pieData = transformBookingStatusData(bookings);

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className='text-lg font-medium mb-4 text-gray-100'>Booking Status Distribution</h2>
      
      {/* Loading Indicator */}
      {loading && (
        <div className="flex items-center justify-center h-80">
          <Bars 
            height="80" 
            width="80" 
            color="#6366F1" 
            ariaLabel="loading-indicator"
            visible={true} // Ensure the loader is visible
          />
        </div>
      )}

      {/* Error Handling */}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Pie Chart */}
      {!loading && !error && pieData.length > 0 && (
        <div className='h-80'>
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <PieChart>
              <Pie
                data={pieData}
                cx={"50%"}
                cy={"50%"}
                labelLine={false}
                outerRadius={"60%"}
                fill='#8884d8'
                dataKey='value'
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                isAnimationActive={true} // Enable animation
                animationDuration={1000} // Duration of the animation in milliseconds
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(31, 41, 55, 0.8)",
                  borderColor: "#4B5563",
                }}
                itemStyle={{ color: "#E5E7EB" }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
      
      {/* Handle case with no data */}
      {!loading && !error && pieData.length === 0 && (
        <p className="text-gray-200">No bookings available.</p>
      )}
    </motion.div>
  );
};

export default StatusDistributionChart;
