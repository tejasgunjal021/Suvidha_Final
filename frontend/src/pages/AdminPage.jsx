import { UserCircle, List, BarChart } from "lucide-react"; // Changed to the new icons
import { useState } from "react";
import { motion } from "framer-motion";
import UserList from "../components/UserList";
import MyProfile from "../components/MyProfile";
import AnalyticsTab from "../components/AnalyticsTab";
import { useUserStore } from "../stores/useUserStore"; // Import the user store
import LoadingSpinner from "../components/LoadingSpinner";

const tabs = [
  { id: "profile", label: "My Profile", icon: UserCircle },
  { id: "products", label: "User Requests", icon: List },
  { id: "analytics", label: "Analytics", icon: BarChart },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const { user } = useUserStore(); // Retrieve the current user

  if (!user) {
    return (
      <div className="flex flex-col items-center">
        <LoadingSpinner />
        <span className="mt-2">Loading user data...</span>
      </div>
    );
     // Handle loading spinner above text
  }

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(128,0,128,0.3)_0%,rgba(75,0,130,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1
          className="text-4xl font-bold mb-8 text-purple-600 text-center" // Changed to purple
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Admin Dashboard
        </motion.h1>

        <div className="flex justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white" // Active tab color
                  : "bg-gray-700 text-purple-300 hover:bg-purple-500" // Non-active tab color
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Conditional Rendering Based on Active Tab */}
        {activeTab === "profile" && <MyProfile id={user._id} />}
        {activeTab === "products" && <UserList />}
        {activeTab === "analytics" && <AnalyticsTab />}
      </div>
    </div>
  );
};

export default AdminPage;
